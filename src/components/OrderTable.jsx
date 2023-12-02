import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table, Pagination } from "antd"
// Get data from API
import { useGetAllOrdersQuery } from "../features/order/orderApiSlice"
import formatDate from "../config/FormatDate"

const statusRecord = {
    pending: ["#900", "#ffdcdc"],
    paid: ["#004b9a", "#d9ecff"],
    delivering: ["#5e4f00", "#f9f1c8"],
    delivered: ["#245900", "#def2d0"],
}

const findColor = (status, record) => {
    const index = Object.keys(record).findIndex(
        (item) => String(status).toLowerCase() === item.toLowerCase()
    )
    return Object.entries(record)[index]
}

const OrderTable = () => {
    const [limit, setlimit] = useState(20)
    const [current, setCurrent] = useState(1)
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null)
    const {
        data: orders,
        isLoading,
        isFetching,
    } = useGetAllOrdersQuery({
        page: current,
        limit,
    })

    if (isLoading) return <div>Loading...</div>
    if (!orders) return <div>Missing orders!</div>
    const total = orders?.metadata?.total
    const data = orders?.metadata?.orders

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
            dataIndex: "id",
            width: "10%",
            ...getColumnSearchProps("id"),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() =>
                        navigate(`/order-list/${record.id}`, {
                            state: { id: record.id },
                        })
                    }
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Date",
            className: "text-base",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "20%",
            sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
            sortDirections: ["descend", "ascend"],
            render: (text) => <span>{formatDate(text)}</span>,
        },
        {
            title: "Customer",
            className: "text-base",
            dataIndex: "user",
            key: "user",
            render: (_, record) => (
                <p>{`${record?.user?.firstName} ${record?.user?.lastName}`}</p>
            ),
        },
        {
            title: "Payment Method",
            className: "text-base",
            dataIndex: "paymentForm",
            key: "paymentForm",
            render: (_, record) => <p>{record?.paymentForm?.name}</p>,
        },
        {
            title: "Status",
            className: "text-base",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (_, record) => {
                const obj = findColor(record?.orderStatus?.name, statusRecord)
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
                                {record?.orderStatus?.name}
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
            dataIndex: "products",
            key: "products",
            sorter: (a, b) => a.products.length - b.products.length,
            sortDirections: ["descend", "ascend"],
            render: (_, record) => <p>{record?.products.length} items</p>,
        },
        {
            title: "Total",
            className: "text-base",
            dataIndex: "products",
            key: "products",
            render: (_, record) => (
                <p>
                    $
                    {record?.products.reduce(
                        (acc, value) => acc + value.quantity * value.price,
                        0
                    )}
                </p>
            ),
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
                        onClick={() =>
                            navigate(`/order-list/${record.id}`, {
                                state: { id: record.id },
                            })
                        }
                    >
                        Edit Status
                    </button>
                </>
            ),
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
            <div className="flex items-center justify-end">
                <Pagination
                    total={total}
                    current={current}
                    onChange={setCurrent}
                    pageSize={limit}
                    showSizeChanger={false}
                />
            </div>
        </>
    )
}
export default OrderTable
