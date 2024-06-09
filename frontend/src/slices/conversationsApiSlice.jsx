import { apiSlice } from './apiSlice'
const CONVERSATIONS_URL = '/api/conversations'
import { createSelector } from '@reduxjs/toolkit'
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
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${CONVERSATIONS_URL}/user/${id}`
            }),
            providesTags: ['Users']
        })
    })
})

export const { 
    useGetAllConversationsQuery,
    useGetConvoMessagesQuery, 
    useGetAllUserQuery, useGetUserByIdQuery } = conversationsApiSlice

export const getUsersData = conversationsApiSlice.endpoints.getAllUser.select()

export const getUsersDataResults = createSelector(
    getUsersData,
    (state, fullName) => fullName,
    (dataResults, fullName) => dataResults.map(x => fullName)
)