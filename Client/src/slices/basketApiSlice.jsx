import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const basketAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = basketAdapter.getInitialState()

export const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBasket: builder.query({
            query: () => ({
                url: '/basket',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedBasket = responseData.map(basket => {
                    basket.id = basket._id
                    return basket
                });

                return basketAdapter.setAll(initialState, loadedBasket)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Basket', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Basket', id }))
                    ]
                } else {
                    return [{ type: 'Basket', id: 'LIST' }]
                }
            }
        }),

        addBasket: builder.mutation({
            query: initialBasket => ({
                url: '/basket',
                method: 'POST',
                body: { ...initialBasket },
            }),
            invalidatesTags: [
                { type: 'Basket', id: "LIST" }
            ]
        }),

        deleteBasket: builder.mutation({
            query: ({ id }) => ({
                url: '/basket',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Basket', id: arg.id }
            ]
        }),

        updateBasket: builder.mutation({
            query: initialBasket => ({
                url: '/basket',
                method: 'PATCH',
                body: {
                    ...initialBasket,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Basket', id: arg.id }
            ]
        })
    })
})

export const {
    useGetBasketQuery,
    useAddBasketMutation,
    useDeleteBasketMutation,
    useUpdateBasketMutation,
} = basketApiSlice

// return query result
export const selectBasketResult = basketApiSlice.endpoints.getBasket.select()

// create memorized selector
const selectBasketData = createSelector(
    selectBasketResult,
    basketResult => basketResult.data
)

export const {
    selectAll: selectAllBasket,
    selectById: selectBasketById,
    selectIds: selectBasketIds
} = basketAdapter.getSelectors(state => selectBasketData(state) ?? initialState)