import { apiSlice } from '../app/apiSlice'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"

const cardAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = cardAdapter.getInitialState()

export const cardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCard: builder.query({
            query: () => '/card',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedcard = responseData.map(card => {
                    card.id = card._id
                    return card
                });
                return cardAdapter.setAll(initialState, loadedcard)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'card', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Card', id }))
                    ]
                } else {
                    return [{ type: 'Card', id: 'LIST' }]
                }
            },
        }),

        addCard: builder.mutation({
            query: initialcard => ({
                url: '/card',
                method: 'POST',
                body: { ...initialcard },
            }),
            invalidatesTags: [
                { type: 'Card', id: "LIST" }
            ]
        }),

        deleteCard: builder.mutation({
            query: ({ id }) => ({
                url: '/card',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: [
                { type: 'Card', id: "LIST" }
            ]
        }),

        updateCard: builder.mutation({
            query: initialCard => ({
                url: '/card',
                method: 'PATCH',
                body: { ...initialCard },
            }),
            invalidatesTags: [
                { type: 'Card', id: "LIST" }
            ]
        })
    })
})

// return query result
export const selectAllCardResult = cardApiSlice.endpoints.getCard.select()

// create memorized selector
const selectAllCardData = createSelector(
    selectAllCardResult,
    cardResult => cardResult.data
)

export const {
    selectAll: selectCard,
    selectById: selectCardById,
    selectIds: selectCardIds
} = cardAdapter.getSelectors(state => selectAllCardData(state) ?? initialState)

export const {
    useGetCardQuery,
    useAddCardMutation,
    useDeleteCardMutation,
    useUpdateCardMutation,
} = cardApiSlice