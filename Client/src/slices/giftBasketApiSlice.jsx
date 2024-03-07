import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const giftBasketAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = giftBasketAdapter.getInitialState()

export const giftBasketApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGiftBasket: builder.query({
            query: () => '/giftbasket',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedGiftBasket = responseData.map(giftbasket => {
                    giftbasket.id = giftbasket._id
                    return giftbasket
                });
                return giftBasketAdapter.setAll(initialState, loadedGiftBasket)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'GiftBasket', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'GiftBasket', id}))
                    ]
                } else {
                    return [{type: 'GiftBasket', id: 'LIST'}]
                }
            },
        }),        

        addGiftBasket: builder.mutation({
            query: initialGiftBasket => ({
                url: '/giftbasket',
                method: 'POST',
                body: {...initialGiftBasket},
            }),
            invalidatesTags: [
                { type: 'GiftBasket', id: "LIST" }
            ]
        }),

        deleteGiftBasket: builder.mutation({
            query: ({id}) => ({
                url: '/giftbasket',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'GiftBasket', id: arg.id}
            ]
        }),
    })
})

export const {
    useGetGiftBasketQuery,
    useAddGiftBasketMutation,
    useDeleteGiftBasketMutation,
} = giftBasketApiSlice

export const selectAllGiftBasketResult = giftBasketApiSlice.endpoints.getGiftBasket.select()

const selectAllGiftBasketData = createSelector(
    selectAllGiftBasketResult,
    giftBasketResult => giftBasketResult.data
)

export const {
    selectAll: selectAllGiftBasket,
    selectById: selectGiftBasketById,
    selectIds: selectAllGiftBasketIds
} = giftBasketAdapter.getSelectors(state => selectAllGiftBasketData(state) ?? initialState)