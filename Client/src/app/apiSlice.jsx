import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", 'Bearer ${token}')
        }
        return headers
    }
})

// wrapper base query
const baseQueryWithReauth = async (args, api, extraOpion) => {
    let result = await baseQuery(args, api, extraOpion)

    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access
        const refreshResult = await baseQuery('/refresh', api, extraOpion)
        console.log(refreshResult)

        if(refreshResult?.data){
            const user = api.getState().auth.user

            // store new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOpion)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})