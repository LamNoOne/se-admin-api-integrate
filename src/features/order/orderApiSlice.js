import { apiSlice } from "../../app/api/apiSlice"

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => {
                const { page = 1, limit = 20} = params
                return {
                    url: `/api/orders?_limit=${limit}&_page=${page}`
                }
            },
        }),
        getOrder: builder.query({
            query: ({ id }) => `/api/orders/get-order?orderId=${id}`
        }),
        getAllOrdersByUserId: builder.query({
            query: (params) => {
                const { id, page = 1, limit = 5 } = params
                return `/api/orders?userId=${id}&_limit=${limit}&_page=${page}`
            },
        }),
        updateOrderStatus: builder.mutation({
            query: (params) => {
                const { id, orderStatusId } = params
                return {
                    url: `/api/orders/update-order-status?id=${id}`,
                    method: "PATCH",
                    body: {
                        orderStatusId,
                    },
                }
            },
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/api/orders/delete-order?id=${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useGetAllOrdersQuery,
    useGetOrderQuery,
    useGetAllOrdersByUserIdQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation
} = orderApiSlice
