import { apiSlice } from './apiSlice'
const CONVERSATIONS_URL = '/api/conversations'
export const conversationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({
            query: () => ({
                url: `${CONVERSATIONS_URL}/`,
            }),
            providesTags: ['Conversations']
        }),
        getConvoMessages: builder.query({
            query: (id) => ({
                url: `${CONVERSATIONS_URL}/${id}`
            }),
            providesTags: ['Messages']
        }),
        getAllUser: builder.query({
            query: () => ({
                url: `${CONVERSATIONS_URL}/users`
            }),
            providesTags: ['Users']
        })
    })
})

export const { 
    useGetAllConversationsQuery,
    useGetConvoMessagesQuery, 
    useGetAllUserQuery } = conversationsApiSlice

