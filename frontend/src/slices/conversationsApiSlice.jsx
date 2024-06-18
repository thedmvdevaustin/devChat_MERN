import { apiSlice } from './apiSlice'
const CONVERSATIONS_URL = '/api/conversations'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

const conversationsAdapter = createEntityAdapter({
    selectId: state => state._id,
    sortComparer: (a,b) => b.updatedAt.localeCompare(a.date)
})

const conversationsInitialState = conversationsAdapter.getInitialState()

export const conversationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({
            query: () => ({
                url: `${CONVERSATIONS_URL}/`,
            }),
            transformResponse: responseData => {
                return conversationsAdapter.setAll(conversationsInitialState, responseData)
            },
            providesTags: ['Conversations']
        })
    })
})

export const { useGetAllConversationsQuery } = conversationsApiSlice

export const getContactData = conversationsApiSlice.endpoints.getAllConversations.select()

const getContactsData = createSelector(
    getContactData,
    contactResult => contactResult.data
)

export const {
    selectAll: selectAllConversations,
    selectById: selectConversationsById,
    selectIds: selectConversationsId
} = conversationsAdapter.getSelectors(state => getContactsData(state) ?? conversationsInitialState)



