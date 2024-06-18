import { apiSlice } from './apiSlice'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
const CONVERSATIONS_URL = '/api/conversations'
const MESSAGES_URL = '/api/messages'

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConvoMessages: builder.query({
            query: (id) => ({
                url: `${CONVERSATIONS_URL}/${id}`
            }),
            providesTags: ['Messages']
        }),
        postMessage: builder.mutation({
            query: (data) => ({
                url: `${MESSAGES_URL}/${data.id}`,
                method: 'POST',
                body: data
            }),
            providesTags: ['Messages', 'Conversations']
        })
    })
})

export const { useGetConvoMessagesQuery, usePostMessageMutation } = messagesApiSlice