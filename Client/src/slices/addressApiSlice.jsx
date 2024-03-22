import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const addressAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = addressAdapter.getInitialState()

export const addressApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAddress: builder.query({
            query: () => ({
                url: '/address',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedAddress = responseData.map(address => {
                    address.id = address._id
                    return address
                });
                //console.log('Loaded Basket:', loadedAddress);
                return addressAdapter.setAll(initialState, loadedAddress)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Address', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Address', id}))
                    ]
                } else {
                    return [{type: 'Address', id: 'LIST'}]
                }
            }
        }),

        addAddress: builder.mutation({
            query: initialAddress => ({
                url: '/address',
                method: 'POST',
                body: {...initialAddress},
            }),
            invalidatesTags: [
                { type: 'Address', id: "LIST" }
            ]
        }),

        deleteAddress: builder.mutation({
            query: ({id}) => ({
                url: '/address',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Address', id: arg.id}
            ]
        }),

        updateAddress: builder.mutation({
            query: initialAddress => ({
                url: '/address',
                method: 'PATCH',
                body: {
                    ...initialAddress,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Address', id: arg.id }
            ]
        })
    })
})

export const {
    useGetAddressQuery,
    useAddAddressMutation,
    useDeleteAddressMutation,
    useUpdateAddressMutation,
} = addressApiSlice

// return query result
export const selectAllAddressResult = addressApiSlice.endpoints.getAddress.select()

// create memorized selector
const selectAllAddressData = createSelector(
    selectAllAddressResult,
    addressResult => addressResult.data
)

export const {
    selectAll: selectAllAddress,
    selectById: selectAddressById,
    selectIds: selectAddressIds
} = addressAdapter.getSelectors(state => selectAllAddressData(state) ?? initialState)