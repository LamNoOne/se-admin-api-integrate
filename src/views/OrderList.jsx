import React from "react"
import { OrderTable } from "../components"

const OrderList = () => {
    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-[28px] font-medium">Orders</h1>
            <OrderTable />
        </section>
    )
}

export default OrderList
