import React from "react"
import { useGetOrderQuery } from "../features/order/orderApiSlice"
import { useLocation } from "react-router-dom"
import Order from "./Order"

const OrderEdit = () => {
    const location = useLocation()
    const orderId = location.state.id

    const { data, isLoading, isSuccess, isError, error } = useGetOrderQuery({
        id: orderId,
    })
    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        const orderInfo = data?.metadata?.order
        content = <Order {...orderInfo} />
    } else if (isError) {
        content = <div>{error}</div>
    }
    return content
}

export default OrderEdit
