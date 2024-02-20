import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../app/apiSlice"

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                } else {
                    return [{type: 'User', id: 'LIST'}]
                }
            }
        }),

        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                {type: 'User', id: "LIST"}
            ]
        }),

        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),

        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSlice

// return query resuly
export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

// create memorized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

// getSelectors create these selectors and rename
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors(state => selectUsersData(state) ?? initialState)