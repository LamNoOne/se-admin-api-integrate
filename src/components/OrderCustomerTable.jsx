import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
const data = [
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
    },
    {
        id: "#40278",
        createAt: "October 19, 2018	",
        status: "Completed",
        quantity: "2",
        total: "704.00",
    },
]

const OrderCustomerTable = () => {
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
                    color: filtered ? "#1677ff" : undefined,
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
                        backgroundColor: "#ffc069",
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
            title: "Code",
            className: "text-base",
            dataIndex: "id",
            width: "20%",
            ...getColumnSearchProps("id"),
            sorter: (a, b) => a.id.length - b.id.length,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() => navigate(`/category/${record.id}`)}
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
            ...getColumnSearchProps("createAt"),
            sorter: (a, b) => a.createAt - b.createAt,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Status",
            className: "text-base",
            dataIndex: "status",
            key: "status",
            width: "20%",
            ...getColumnSearchProps("status"),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ["descend", "ascend"],
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Quantity",
            className: "text-base",
            dataIndex: "quantity",
            key: "quantity",
            ...getColumnSearchProps("quantity"),
            sorter: (a, b) => a.quantity - b.quantity,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Total",
            className: "text-base",
            dataIndex: "total",
            key: "total",
            ...getColumnSearchProps("total"),
            sorter: (a, b) => a.total - b.total,
            sortDirections: ["descend", "ascend"],
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Action",
            className: "text-base",
            dataIndex: "key",
            width: "10%",
            render: (_, record) => (
                <>
                    <button
                        className="text-base px-4 py-1 rounded bg-[#ff0000] text-white"
                        onClick={() => navigate(`/category/${record.id}`)}
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ]
    return <Table columns={columns} dataSource={data} pagination />
}
export default OrderCustomerTable
