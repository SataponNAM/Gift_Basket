import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const decorationAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = decorationAdapter.getInitialState()

export const decorationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDecoration: builder.query({
            query: () => '/decoration',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedDecoration = responseData.map(decoration => {
                    decoration.id = decoration._id
                    return decoration
                });
                return decorationAdapter.setAll(initialState, loadedDecoration)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Decoration', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Decoration', id}))
                    ]
                } else {
                    return [{type: 'Decoration', id: 'LIST'}]
                }
            },
        }),

        addDecoration: builder.mutation ({
            query: initialDecoration => ({
                url: '/decoration',
                method: 'POST',
                body: {...initialDecoration},
            }),
            invalidatesTags: [
                { type: 'Decoration', id: 'LIST' }
            ]
        }),

        deleteDecoration: builder.mutation ({
            query: ({id}) => ({
                url: '/decoration',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Decoration', id: arg.id }
            ]
        }),

        updateDecoration: builder.mutation ({
            query: initialDecoration => ({
                url: '/decoration',
                method: 'PATCH',
                body: {...initialDecoration},
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Decoration', id: arg.id }
            ]
        }),
    })
})

// return query result
export const selectAllDecorationResult = decorationApiSlice.endpoints.getDecoration.select()

// create memorized selector
const selectAllDecorationData = createSelector(
    selectAllDecorationResult,
    decorationResult => decorationResult.data
)

export const {
    selectAll: selectDecoration,
    selectById: selectDecorationById,
    selectIds: selectDecorationIds
} = decorationAdapter.getSelectors(state => selectAllDecorationData(state) ?? initialState)

export const {
    useGetDecorationQuery,
    useAddDecorationMutation,
    useDeleteDecorationMutation,
    useUpdateDecorationMutation,
} = decorationApiSlice