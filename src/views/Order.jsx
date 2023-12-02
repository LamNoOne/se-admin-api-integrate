import React, { useState } from "react"
import { RowOrder } from "../components"
import { Select } from "antd"
import formatDate from "../config/FormatDate"
import formatCurrency from "../config/CustomCost"
import { useGetUserByIdQuery } from "../features/user/userApiSlice"
import { useUpdateOrderStatusMutation } from "../features/order/orderApiSlice"
import { useNavigate } from "react-router-dom"

const Order = (orderInfo) => {
    const userId = orderInfo?.user?.id
    const navigate = useNavigate()
    const [updateOrderStatus, { isLoading: isLoadingUpdate}] = useUpdateOrderStatusMutation()
    const [status, setStatus] = useState(orderInfo?.orderStatus?.name)
    const { data, isLoading, isSuccess, isError, error } = useGetUserByIdQuery({
        id: userId,
    })

    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        const userData = data?.metadata?.user
        content = (
            <div className="flex flex-col gap-6 w-full">
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Customer</h3>
                    <div className="flex flex-row gap-4">
                        <img
                            className="rounded-full w-[50px] h-[50px]"
                            src={userData?.imageUrl}
                            alt=""
                        />
                        <div className="flex flex-col items-start">
                            <h3 className="text-base font-medium">
                                {`${userData?.lastName} ${userData?.firstName}`}
                            </h3>
                            <h3 className="text-base font-medium">
                                {`Username: ${userData?.username}`}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Contact person</h3>
                    <div className="flex flex-col items-start gap-4">
                        <h3 className="text-sm font-medium">
                            {`Full name: ${userData?.lastName} ${userData?.firstName}`}
                        </h3>
                        <a href="#" className="text-sm font-medium">
                            {`Email: ${userData?.email}`}
                        </a>
                        <span className="text-sm font-medium text-[#777]">
                            {`Phone: +84 ${userData?.phoneNumber}`}
                        </span>
                    </div>
                </div>
                <div className="customer flex flex-col gap-4 items-start p-4 bg-white w-full">
                    <h3 className="text-lg font-medium">Shipping Address</h3>
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-sm font-medium text-[#777]">
                            {userData?.address}
                        </p>
                    </div>
                </div>
            </div>
        )
    } else if (isError) {
        content = <div>{error}</div>
    }

    const orderStatus = [
        {
            label: "Order Status",
            options: [
                {
                    label: "Pending",
                    value: "1",
                },
                {
                    label: "Paid",
                    value: "2",
                },
                {
                    label: "Delivering",
                    value: "3",
                },
                {
                    label: "Delivered",
                    value: "4",
                },
            ],
        },
    ]
    let subTotal = orderInfo.products.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
    )
    subTotal = formatCurrency(subTotal)

    const handleChangeStatus = (value) => {
        setStatus(value)
    }

    const handleSubmit = async () => {
        if(!isLoadingUpdate) {
            try {
                await updateOrderStatus({ id: orderInfo.id, orderStatusId: status})
                navigate('/order-list')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <section className="flex gap-6 w-full">
            <div className="flex flex-col gap-6 bg-white p-6">
                <div className="header flex items-center justify-between">
                    <h1 className="text-[28px] font-medium">
                        Order #{orderInfo.id}
                    </h1>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-[#666]">
                            Status:
                        </h3>
                        <Select
                            value={status}
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
                        {formatDate(orderInfo.createdAt)}
                    </span>
                    <span>|</span>
                    <p className="text-sm">
                        {orderInfo?.products.length}&nbsp;items
                    </p>
                    <span>|</span>
                    <p className="text-sm">Total&nbsp;{subTotal}</p>
                    <span>|</span>
                    <div className="status flex gap-2">
                        <span className="px-2 rounded text-[#245900] bg-[#def2d0]">
                            {orderInfo?.orderStatus?.name}
                        </span>
                        <span className="px-2 rounded text-[#5e4f00] bg-[#f9f1c8]">
                            Partially Fulfilled
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium">Items</h3>
                    {orderInfo.products.map((props, index) => (
                        <div key={index} className="py-2 border-t">
                            <RowOrder {...props} />
                        </div>
                    ))}
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">Subtotal</h3>
                        <span className="text-base">{subTotal}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">
                            Shipping
                            <br />
                            <span className="text-sm text-[#777]">
                                via FedEx International
                            </span>
                        </h3>
                        <span className="text-base">Free</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t">
                        <h3 className="text-base ">Total</h3>
                        <span className="text-base">{subTotal}</span>
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

            {content}
        </section>
    )
}

export default Order
