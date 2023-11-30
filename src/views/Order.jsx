import React, { useState } from "react"
import { RowOrder } from "../components"
import { Select } from "antd"

const orderByUser = {
    orders: [
        {
            id: 1,
            url: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-2-40x40.jpg",
            title: "Brandix Brake Kit BDX-750Z370-S",
            price: 840,
            quantity: 1,
        },

        {
            id: 2,
            url: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-7-40x40.jpg",
            title: 'Glossy Gray 19" Aluminium Wheel AR-19',
            price: 699,
            quantity: 2,
        },
        {
            id: 3,
            url: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-16-40x40.jpg",
            title: "Twin Exhaust Pipe From Brandix Z54",
            price: 1210,
            quantity: 3,
        },
    ],
    shipping: 25,
}

const Order = () => {
    const [shipping, setShipping] = useState(orderByUser?.shipping)
    const [status, setStatus] = useState("Pending")
    const orderStatus = [
        {
            label: "Order Status",
            options: [
                {
                    label: "New",
                    value: "new",
                },
                {
                    label: "Pending",
                    value: "pending",
                },
                {
                    label: "Shipped",
                    value: "shipped",
                },
                {
                    label: "Canceled",
                    value: "canceled",
                },
            ],
        },
    ]
    const subTotal = orderByUser.orders.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
    )

    const handleChangeShipping = (e) => {
        const value = e.target.value
        value > 0 ? setShipping(value) : setShipping(0)
    }

    const handleChangeStatus = (value) => {
        setStatus(value)
    }

    const handleSubmit = () => {
        console.log(shipping, status)
    }

    return (
        <section className="flex gap-6 w-full">
            <div className="flex flex-col gap-6 bg-white p-6">
                <div className="header flex items-center justify-between">
                    <h1 className="text-[28px] font-medium">Order #80294</h1>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-[#666]">
                            Status:{" "}
                        </h3>
                        <Select
                            defaultValue={status}
                            style={{
                                width: 200,
                            }}
                            onChange={handleChangeStatus}
                            options={orderStatus}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 font-medium text-[#777] py-2 border-t border-b border-[#999]">
                    <span className="order-date text-sm">
                        October 7, 2020 at 9:08 pm
                    </span>
                    <span>|</span>
                    <p className="text-sm">6 items</p>
                    <span>|</span>
                    <p className="text-sm">Total $5,882.00</p>
                    <span>|</span>
                    <div className="status flex gap-2">
                        <span className="px-2 rounded text-[#245900] bg-[#def2d0]">
                            Paid
                        </span>
                        <span className="px-2 rounded text-[#5e4f00] bg-[#f9f1c8]">
                            Partially Fulfilled
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium">Items</h3>
                    {orderByUser.orders.map((props, index) => (
                        <div key={index} className="py-2 border-t">
                            <RowOrder {...props} />
                        </div>
                    ))}
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">Subtotal</h3>
                        <span className="text-base">${subTotal}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">
                            Shipping
                            <br />
                            <span className="text-sm text-[#777]">
                                via FedEx International
                            </span>
                        </h3>
                        <input
                            type="number"
                            className="text-base outline-none w-[60px]"
                            min={0}
                            value={shipping}
                            onChange={handleChangeShipping}
                        />
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">Total</h3>
                        <span className="text-base">
                            ${subTotal + shipping}
                        </span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-base mb-2 px-6 py-2 max-w-[120px] border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
            <div className="flex flex-col gap-6 w-full">
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Customer</h3>
                    <div className="flex flex-row gap-4">
                        <img
                            className="rounded-full"
                            src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-1-40x40.jpg"
                            alt=""
                        />
                        <div className="flex flex-col items-start">
                            <h3 className="text-base font-medium">
                                Jessica Moore
                            </h3>
                            <p className="text-sm font-medium text-[#777]">
                                This is a first order
                            </p>
                        </div>
                    </div>
                </div>
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Contact person</h3>
                    <div className="flex flex-col items-start gap-4">
                        <h3 className="text-sm font-medium">Jessica Moore</h3>
                        <a href="#" className="text-sm font-medium">
                            moore@example.com
                        </a>
                        <span className="text-sm font-medium text-[#777]">
                            +38 (094) 730-24-25
                        </span>
                    </div>
                </div>
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Shipping Address</h3>
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-sm font-medium text-[#777]">
                            Jessica Moore Random Federation 115302, Moscow ul.
                            Varshavskaya, 15-2-178
                        </p>
                    </div>
                </div>
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Billing Address</h3>
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-sm font-medium text-[#777]">
                            Jessica Moore Random Federation 115302, Moscow ul.
                            Varshavskaya, 15-2-178
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Order
