import { apiSlice } from "../../app/api/apiSlice"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => "/api/categories",
            providesTags: ["Category"],
        }),
        getCategoryById: builder.query({
            query: ({ id }) => `/api/categories/get-category?id=${id}`,
        }),
        createCategory: builder.mutation({
            query: (params) => {
                const { name, description } = params
                return {
                    url: "/api/categories/create",
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
                    url: `/api/categories/update-category?id=${id}`,
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
                url: `/api/categories/delete-category?id=${id}`,
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
