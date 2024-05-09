import { apiSlice } from "../../app/api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/sign-out",
                method: "POST",
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: "/auth/sign-up",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = authApiSlice
