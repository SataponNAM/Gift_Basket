import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const productAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = productAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProduct: builder.query({
            query: () => '/product',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedProduct = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return productAdapter.setAll(initialState, loadedProduct)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else {
                    return [{ type: 'Product', id: 'LIST' }]
                }
            },
        }),

        addProduct: builder.mutation({
            query: initialProduct => ({
                url: '/product',
                method: 'POST',
                body: { ...initialProduct },
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: '/product',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),

        updateProduct: builder.mutation({
            query: initialProduct => ({
                url: '/product',
                method: 'PATCH',
                body: { ...initialProduct },
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        })
    })
})

// return query result
export const selectAllProductResult = productApiSlice.endpoints.getProduct.select()

// create memorized selector
const selectAllProductData = createSelector(
    selectAllProductResult,
    productResult => productResult.data
)

export const {
    selectAll: selectProduct,
    selectById: selectProductById,
    selectIds: selectProductIds
} = productAdapter.getSelectors(state => selectAllProductData(state) ?? initialState)

export const {
    useGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productApiSlice