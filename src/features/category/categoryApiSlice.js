import { apiSlice } from "../../app/api/apiSlice"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => "/categories",
            providesTags: ["Category"],
        }),
        getCategoryById: builder.query({
            query: ({ id }) => `/categories/get-category?id=${id}`,
        }),
        createCategory: builder.mutation({
            query: (params) => {
                const { name, description } = params
                return {
                    url: "/categories/create",
                    method: "POST",
                    body: {
                        name,
                        description,
                    },
                }
            },
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation({
            query: (params) => {
                const { id, name, description } = params
                return {
                    url: `/categories/update-category?id=${id}`,
                    method: "PATCH",
                    body: {
                        name,
                        description,
                    },
                }
            },
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/categories/delete-category?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
})

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice
