import { apiSlice } from './apiSlice'
const USERS_URL = '/api'
const CONVERSATIONS_URL = '/api/conversations'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
const usersAdapter = createEntityAdapter({
    selectId: state => state._id
})

const usersInitialState = usersAdapter.getInitialState()



export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Conversations', 'Messages', 'Users']
        }),
        login: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Conversations', 'Messages']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: `${CONVERSATIONS_URL}/users`
            }),
            transformResponse: responseData => {
                return usersAdapter.setAll(usersInitialState, responseData)
            },
            providesTags: ['Users']
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetAllUserQuery } = usersApiSlice

export const getUserData = usersApiSlice.endpoints.getAllUser.select()

const getUserResults = createSelector(
    getUserData,
    userData => userData.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectIds: selectUsersId
} = usersAdapter.getSelectors(state => getUserResults(state) ?? usersInitialState)
