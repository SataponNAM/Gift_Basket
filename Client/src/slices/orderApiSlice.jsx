import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const orderAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = orderAdapter.getInitialState()

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        checkout: builder.mutation({
            query: initialOrder => ({
                url: '/order/checkout',
                method: 'POST',
                body: {...initialOrder}
            }),
            invalidatesTags: [
                { type: 'Order', id: "LIST" }
            ]
        }),

        webhook: builder.mutation({
            query: initialOrder => ({
                url: '/webhook',
                method: 'POST',
                body: {...initialOrder}
            }),
            invalidatesTags: [
                { type: 'Order', id: "LIST" }
            ]
        }),

        getOrderId: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedOrder = responseData.map((order) => {
                    order.id = order._id;
                    return order;
                });
                return orderAdapter.setAll(initialState, loadedOrder);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Order', id })),
                    ];
                } else {
                    return [{ type: 'Order', id: 'LIST' }];
                }
            },
        }),

        getOrder: builder.query({
            query: () => ({
                url: '/order/getOrder',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedOrder = responseData.map((order) => {
                    order.id = order._id;
                    return order;
                });
                return orderAdapter.setAll(initialState, loadedOrder);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Order', id })),
                    ];
                } else {
                    return [{ type: 'Order', id: 'LIST' }];
                }
            },
        }),

        updateDeliver: builder.mutation({
            query: initialOrder => ({
                url: '/order/updateDeliver',
                method: 'PATCH',
                body: {
                    ...initialOrder,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        })

    })
})

export const {
    useCheckoutMutation,
    useWebhookMutation,
    useGetOrderIdQuery,
    useGetOrderQuery,
    useUpdateDeliverMutation
} = orderApiSlice;

export const selectOrderResult = orderApiSlice.endpoints.getOrder.select()

// create memorized selector
const selecOrderData = createSelector(
    selectOrderResult,
    orderResult => orderResult.data
)

export const {
    selectAll: selectAllOrder,
    selectById: selectOrderById,
    selectIds: selectOrderIds
} = orderAdapter.getSelectors(state => selecOrderData(state) ?? initialState)



