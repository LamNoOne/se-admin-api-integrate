import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
const data = [
    {
        id: 1,
        number: "3201",
        createAt: "June 26, 2021",
        customer: "Jessica Moore",
        paid: "Yes",
        status: "New",
        quantity: 3,
        total: "200.00",
    },
    {
        id: 2,
        number: "2091",
        createAt: "May 15, 2021",
        customer: "Helena Garcia",
        paid: "No",
        status: "Pending",
        quantity: 7,
        total: "5,023.00",
    },

    {
        id: 3,
        number: "1937",
        createAt: "February 23, 2021",
        customer: "Helena Garcia",
        paid: "No",
        status: "Shipped",
        quantity: 1,
        total: "703.00",
    },
    {
        id: 4,
        number: "1724",
        createAt: "December 10, 2020",
        customer: "Ryan Ford",
        paid: "Partial",
        status: "Shipped",
        quantity: 2,
        total: "1,200.00",
    },

    {
        id: 5,
        number: "1603",
        createAt: "August 27, 2020",
        customer: "Helena Garcia",
        paid: "Yes",
        status: "Canceled",
        quantity: 12,
        total: "3,701.00",
    },

    {
        id: 6,
        number: "1544",
        createAt: "June 15, 2020",
        customer: "Olivia Smith",
        paid: "Yes",
        status: "Shipped",
        quantity: 1,
        total: "127.00",
    },
    {
        id: 7,
        number: "1501",
        createAt: "May 29, 2020",
        customer: "Kevin Smith",
        paid: "Yes",
        status: "Shipped",
        quantity: 2,
        total: "2,299.00",
    },

    {
        id: 8,
        number: "1429",
        createAt: "May 2, 2020",
        customer: "Charlotte Jones",
        paid: "Partial",
        status: "Shipped",
        quantity: 1,
        total: "794.00",
    },
    {
        id: 9,
        number: "1373",
        createAt: "March 9, 2020",
        customer: "Jacob Lee",
        paid: "Yes",
        status: "Pending",
        quantity: 28,
        total: "27,899.00",
    },

    {
        id: 10,
        number: "1288",
        createAt: "February 12, 2020",
        customer: "Isabel Williams",
        paid: "Yes",
        status: "Shipped",
        quantity: 4,
        total: "4,302.00",
    },
]

const statusRecord = {
    new: ["#900", "#ffdcdc"],
    pending: ["#004b9a", "#d9ecff"],
    canceled: ["#444a4f", "#e2e3e5"],
    shipped: ["#245900", "#def2d0"],
}

const paidRecord = {
    yes: ["#245900", "#def2d0"],
    no: ["#444a4f", "#e2e3e5"],
    partial: ["#5e4f00", "#f9f1c8"],
}

const findColor = (status, record) => {
    const index = Object.keys(record).findIndex(
        (item) => String(status).toLowerCase() === item.toLowerCase()
    )
    return Object.entries(record)[index]
}

const OrderTable = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null)
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }
    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText("")
    }
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            })
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    })
    const columns = [
        {
            title: "Number",
            classnumber: "text-base",
            dataIndex: "number",
            width: "10%",
            ...getColumnSearchProps("number"),
            sorter: (a, b) => a.number - b.number,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() => navigate(`/order/${record.id}`)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Date",
            className: "text-base",
            dataIndex: "createAt",
            key: "createAt",
            width: "20%",
            ...getColumnSearchProps("createAt"),
            sorter: (a, b) => a.createAt.length - b.createAt.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Customer",
            className: "text-base",
            dataIndex: "customer",
            key: "customer",
            ...getColumnSearchProps("customer"),
            sorter: (a, b) => a.customer.length - b.customer.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Paid",
            className: "text-base",
            dataIndex: "paid",
            key: "paid",
            ...getColumnSearchProps("paid"),
            sorter: (a, b) => a.paid.length - b.paid.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => {
                const obj = findColor(text, paidRecord)
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
            title: "Status",
            className: "text-base",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => {
                const obj = findColor(text, statusRecord)
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
            title: "Items",
            className: "text-base",
            dataIndex: "quantity",
            key: "quantity",
            ...getColumnSearchProps("quantity"),
            sorter: (a, b) => a.quantity - b.quantity,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>{text} items</p>,
        },
        {
            title: "Total",
            className: "text-base",
            dataIndex: "total",
            key: "total",
            ...getColumnSearchProps("total"),
            sorter: (a, b) => a.total - b.total,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Action",
            className: "text-base",
            dataIndex: "key",
            width: "15%",
            render: (_, record) => (
                <>
                    <button
                        className="text-base px-4 py-1 rounded bg-[#ff0000] text-white"
                        onClick={() => navigate(`/order/${record.id}`)}
                    >
                        Edit Status
                    </button>
                </>
            ),
        },
    ]
    return <Table columns={columns} dataSource={data} pagination />
}
export default OrderTable
