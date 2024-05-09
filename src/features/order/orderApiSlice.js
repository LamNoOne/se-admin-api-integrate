import { apiSlice } from "../../app/api/apiSlice"

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => {
                const { page = 1, limit = 20} = params
                return {
                    url: `/orders?_limit=${limit}&_page=${page}`
                }
            },
        }),
        getOrder: builder.query({
            query: ({ id }) => `/orders/get-order?orderId=${id}`
        }),
        getAllOrdersByUserId: builder.query({
            query: (params) => {
                const { id, page = 1, limit = 5 } = params
                return `/orders?userId=${id}&_limit=${limit}&_page=${page}`
            },
        }),
        updateOrderStatus: builder.mutation({
            query: (params) => {
                const { id, orderStatusId } = params
                return {
                    url: `/orders/update-order-status?id=${id}`,
                    method: "PATCH",
                    body: {
                        orderStatusId,
                    },
                }
            },
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/orders/delete-order?id=${id}`,
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
