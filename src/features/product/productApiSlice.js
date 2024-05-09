import { apiSlice } from "../../app/api/apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: (params) => {
                let queryString
                const { page = 1, order, limit = 20 } = params
                if (!order) {
                    queryString = `/products?_page=${page}&_limit=${limit}`
                } else {
                    queryString = `/products?_page=${page}&_limit=${limit}&_order=${order}&_sortBy=price`
                }
                return queryString
            },
            providesTags: ["Product"],
        }),
        getProductById: builder.query({
            query: ({ id }) => `/products/get-product?id=${id}`,
        }),
        getLimitProduct: builder.query({
            query: (limit = 10) => `/products?_limit=${limit}`,
        }),
        searchProduct: builder.query({
            query: (params) => {
                const {
                    page = 1,
                    name,
                    order,
                    limit = 100,
                    sortBy = "price",
                } = params
                let queryString
                if (!order && name) {
                    queryString = `/products?name=${name}&_page=${page}&_limit=${limit}`
                } else if (order && name) {
                    queryString = `/products?name=${name}&_page=${page}&_limit=${limit}&_order=${order}&_sortBy=${sortBy}`
                }
                return queryString
            },
        }),
        createProduct: builder.mutation({
            query: (params) => {
                const {
                    name,
                    description,
                    image,
                    screen,
                    operatingSystem,
                    processor,
                    ram,
                    storageCapacity,
                    dimensions,
                    weight,
                    batteryCapacity,
                    frontCameraResolution,
                    rearCameraResolution,
                    connectivity,
                    color,
                    price,
                    stockQuantity,
                    categoryId,
                } = params
                const bodyFormData = new FormData()
                if (image) {
                    bodyFormData.append("image", image)
                }
                bodyFormData.append("name", name)
                bodyFormData.append("description", description)
                bodyFormData.append("screen", screen)
                bodyFormData.append("operatingSystem", operatingSystem)
                bodyFormData.append("processor", processor)
                bodyFormData.append("ram", ram)
                bodyFormData.append("storageCapacity", storageCapacity)
                bodyFormData.append("dimensions", dimensions)
                bodyFormData.append("weight", weight)
                bodyFormData.append("batteryCapacity", batteryCapacity)
                bodyFormData.append(
                    "frontCameraResolution",
                    frontCameraResolution
                )
                bodyFormData.append(
                    "rearCameraResolution",
                    rearCameraResolution
                )
                bodyFormData.append("connectivity", connectivity)
                bodyFormData.append("color", color)
                bodyFormData.append("price", price)
                bodyFormData.append("stockQuantity", stockQuantity)
                bodyFormData.append("categoryId", categoryId)
                return {
                    url: "/products/create",
                    method: "POST",
                    body: bodyFormData,
                }
            },
        }),
        updateProductById: builder.mutation({
            query: (params) => {
                const { id, body } = params
                return {
                    url: `/products/update-product?id=${id}`,
                    method: "PATCH",
                    body,
                }
            },
            invalidatesTags: ["Product"],
        }),
        deleteProductById: builder.mutation({
            query: ({ id }) => ({
                url: `/products/delete-product?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
})

export const {
    useGetAllProductQuery,
    useGetLimitProductQuery,
    useGetProductByIdQuery,
    useSearchProductQuery,
    useCreateProductMutation,
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation,
} = productApiSlice
