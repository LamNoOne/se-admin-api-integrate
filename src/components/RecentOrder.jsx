import React from "react"
import { Space, Table, Tag } from "antd"
import { useNavigate } from "react-router-dom"

// Data just for demo without API integrate
const data = [
    {
        key: "1",
        code: "#00745",
        status: "Pending",
        name: "Giordano Bruno",
        date: "2020-11-02",
        total: "$2,742.00",
    },
    {
        key: "2",
        code: "#00513",
        status: "Hold",
        name: "Hans Weber",
        date: "2020-09-05",
        total: "$204.00",
    },
    {
        key: "3",
        code: "#00507",
        status: "Pending",
        name: "Andrea Rossi",
        date: "2020-08-21",
        total: "$5,039.00",
    },
    {
        key: "4",
        code: "#00104",
        status: "Canceled",
        name: "Richard Feynman",
        date: "2020-06-22",
        total: "$79.00",
    },
    {
        key: "5",
        code: "#00097",
        status: "Completed",
        name: "Leonardo Garcia",
        date: "2020-05-09",
        total: "$826.00",
    },
    {
        key: "6",
        code: "#00082",
        status: "Completed",
        name: "Nikola Tesla",
        date: "2020-04-27",
        total: "$1,052.00",
    },
    {
        key: "7",
        code: "#00063",
        status: "Pending",
        name: "Marie Curie",
        date: "2020-02-09",
        total: "$441.00",
    },
    {
        key: "8",
        code: "#00012",
        status: "Completed",
        name: "Konstantin Tsiolkovsky",
        date: "2020-01-01",
        total: "$12,961.00",
    },
]

const RecentOrder = () => {
    const navigate = useNavigate()

    const statusRecord = {
        pending: ["#004b9a", "#d9ecff"],
        hold: ["#5e4f00", "#f9f1c8"],
        canceled: ["#900", "#ffdcdc"],
        completed: ["#245900", "#def2d0"],
    }

    const findColor = (status) => {
        const index = Object.keys(statusRecord).findIndex(
            (item) => String(status).toLowerCase() === item.toLowerCase()
        )
        return Object.entries(statusRecord)[index]
    }

    const columns = [
        {
            title: "Code",
            className: "text-base",
            dataIndex: "code",
            key: "code",
            render: (text, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() => navigate(`/order/${record.key}`)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Status",
            className: "text-base",
            dataIndex: "status",
            key: "status",
            render: (text) => {
                const obj = findColor(text)
                return (
                    <>
                        {obj ? (
                            <span
                                style={{
                                    color: obj[1][0],
                                    backgroundColor: obj[1][1],
                                    padding: "4px 8px",
                                    borderRadius: "2px",
                                }}
                            >
                                {text}
                            </span>
                        ) : (
                            <></>
                        )}
                    </>
                )
            },
        },
        {
            title: "Customer",
            className: "text-base",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() => navigate(`/user/${record.key}`)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Date",
            className: "text-base",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Total",
            className: "text-base",
            dataIndex: "total",
            key: "total",
        },
    ]

    return (
        <div className="w-full border shadow-sm py-6 bg-white">
            <h1 className="font-medium text-xl pb-4 px-4">Recent orders</h1>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default RecentOrder
