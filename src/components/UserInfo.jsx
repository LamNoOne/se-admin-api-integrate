import React, { useState } from "react"
import Line from "./Line"
import style from "../style"
import { Select } from "antd"

const userType = [
    {
        label: "Manager",
        options: [
            {
                label: "Admin",
                value: "admin",
            },
            {
                label: "Staff",
                value: "staff",
            },
        ],
    },
    {
        label: "Customer",
        options: [
            {
                label: "Customer",
                value: "customer",
            },
        ],
    },
]

const UserInfo = (props) => {
    const [type, setType] = useState('customer')
    const handleChange = (value) => {
        setType(value)
    }

    const handleUpdate = () => {
        console.log(type)
    }
    const { firstName, lastName, email, phoneNumber } = props
    return (
        <section className="flex flex-row gap-6">
            <div className="flex justify-center items-center flex-col bg-white border shadow-md p-6 w-[322px]">
                <div className="flex justify-center items-center flex-col">
                    <img
                        className="w-[96px] h-[96px] object-contain rounded-full"
                        src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-1-96x96.jpg"
                        alt=""
                    />
                    <h3 className="text-base font-medium">{`${firstName} ${lastName}`}</h3>
                    <a href="#" className="text-sm text-blue-700">
                        {email}
                    </a>
                    <span className="text-sm text-[#6c757d]">
                        {phoneNumber}
                    </span>
                </div>
                <div className="my-6 w-full">
                    <Line style={style.lineTable} />
                </div>
                <div className="flex flex-col items-start gap-6 w-full">
                    <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">Last Order</h3>
                        <p className="text-sm text-[#6c757d]">
                            7 days ago - <a href={`order/`}>#80294</a>
                        </p>
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">
                            Average Order Value
                        </h3>
                        <p className="text-sm text-[#6c757d]">$574.00</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">Registered</h3>
                        <p className="text-sm text-[#6c757d]">2 months ago</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">Email Marketing</h3>
                        <p className="text-sm text-[#6c757d]">Subscribed</p>
                    </div>
                    <div className="permission flex flex-col items-start gap-2">
                        <h3 className="text-sm font-medium">User type:</h3>
                        <Select
                            defaultValue={type}
                            style={{
                                width: 200,
                            }}
                            onChange={handleChange}
                            options={userType}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-base mb-2 px-6 py-2 w-[120px] border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>
        </section>
    )
}

export default UserInfo
