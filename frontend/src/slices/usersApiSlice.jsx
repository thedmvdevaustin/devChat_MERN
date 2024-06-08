import { apiSlice } from './apiSlice'
const USERS_URL = '/api'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: user
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: user
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = usersApiSlice