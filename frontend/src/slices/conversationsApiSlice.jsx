import { apiSlice } from './apiSlice'

export const conversationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({

        }),
        getConversation: builder.query({

        }),
        getAllUser: builder.query({
            
        })
    })
})

