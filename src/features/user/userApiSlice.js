import { apiSlice } from "../../app/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "/users",
        }),
        getUserById: builder.query({
            query: ({ id }) => `/users/get-user?id=${id}`,
        }),
        getUserInfo: builder.query({
            query: () => `/users/get-info`,
        }),
        updateUserInfo: builder.mutation({
            query: (params) => {
                const { firstName, lastName, address, image = null } = params
                const bodyFormData = new FormData()
                if (image) {
                    bodyFormData.append("image", image)
                }
                bodyFormData.append("firstName", firstName)
                bodyFormData.append("lastName", lastName)
                bodyFormData.append("address", address)
                return {
                    url: "/users/update-profile",
                    method: "PATCH",
                    body: bodyFormData,
                }
            },
        }),
        deleteUserById: builder.query({
            query: ({ id }) => ({
                url: `/users/delete-user?id=${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useGetUserInfoQuery,
    useUpdateUserInfoMutation,
    useDeleteUserByIdQuery,
} = userApiSlice
