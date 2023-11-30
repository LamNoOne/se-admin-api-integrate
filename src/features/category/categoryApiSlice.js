import { apiSlice } from "../../app/api/apiSlice"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => "/api/categories",
        }),
    }),
})

export const { useGetAllCategoriesQuery } = categoryApiSlice
