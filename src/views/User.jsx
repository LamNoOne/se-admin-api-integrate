import React from "react"
import { UserInfo, OrderCustomerTable } from "../components"
import { useGetUserByIdQuery } from "../features/user/userApiSlice"
import { useLocation } from "react-router-dom"

// get UserInfo
// const userInfo = {
//     id: "111",
//     firstName: "Jessica",
//     lastName: "Moore",
//     img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-1-96x96.jpg",
//     gender: "Female",
//     phoneNumber: "+38 (094) 730-24-25",
//     email: "jessica-moore@example.com",
//     address: "7000 Paris Street",
//     userName: "jessica-moore",
// }

const order = [
    {
        id: "#80294",
        createAt: "Today at 6:10 pm",
        status: "Pending",
        quantity: "4",
        total: "320.0",
    },
    {
        id: "#63736",
        createAt: "May 15, 2019	",
        status: "Completed",
        quantity: "7",
        total: "2,574.31",
    },

    {
        id: "#63501",
        createAt: "January 7 2019",
        status: "Completed",
        quantity: "1",
        total: "34.00",
        id: "#40278",
        createAt: "October 19, 2018	",
        status: "Completed",
        quantity: "2",
        total: "704.00",
    },
]

const User = () => {
    const location = useLocation()
    const userId = location.state?.id
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserByIdQuery({ id: userId })
    let content
    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        const userInfo = user?.metadata?.user

        content = (
            <section className="flex flex-col items-start gap-6">
                <h1 className="text-[28px] font-medium">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h1>
                <div className="flex flex-row gap-6 w-full">
                    <UserInfo {...userInfo} />
                    <div className="w-full bg-white p-6">
                        <h3 className="text-lg font-medium mb-4">Orders</h3>
                        <OrderCustomerTable userId={userId} />
                    </div>
                </div>
            </section>
        )
    } else if (isError) {
        content = <div>{error}</div>
    }
    return content
}

export default User
