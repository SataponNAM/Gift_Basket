import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const cartAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = cartAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCart: builder.query({
            query: () => '/cart',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCart = responseData.map(cart => {
                    cart.id = cart._id
                    return cart
                });
                return cartAdapter.setAll(initialState, loadedCart)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Cart', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Cart', id}))
                    ]
                } else {
                    return [{type: 'Cart', id: 'LIST'}]
                }
            }
        }),

        addCart: builder.mutation({
            query: initialCart => ({
                url: '/cart',
                method: 'POST',
                body: {...initialCart},
            }),
            invalidatesTags: [
                { type: 'Cart', id: "LIST" }
            ]
        }),

        deleteCart: builder.mutation({
            query: ({id}) => ({
                url: '/cart',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Cart', id: arg.id}
            ]
        }),

        deleteCartProduct: builder.mutation({
            query: ({id, giftBasketId}) => ({
                url: '/cart/product',
                method: 'DELETE',
                body: { id, giftBasketId }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Cart', id: arg.id}
            ]
        }),

        updateCart: builder.mutation({
            query: initialCart => ({
                url: '/cart',
                method: 'PATCH',
                body: {
                    ...initialCart,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        })
    })
})

export const {
    useGetCartQuery,
    useAddCartMutation,
    useDeleteCartMutation,
    useDeleteCartProductMutation,
    useUpdateCartMutation,
} = cartApiSlice

// return query result
export const selectAllCartResult = cartApiSlice.endpoints.getCart.select()

// create memorized selector
const selectAllCartData = createSelector(
    selectAllCartResult,
    cartResult => cartResult.data
)

export const {
    selectAll: selectAllCart,
    selectById: selectAllCartById,
    selectIds: selectAllCartIds
} = cartAdapter.getSelectors(state => selectAllCartData(state) ?? initialState)