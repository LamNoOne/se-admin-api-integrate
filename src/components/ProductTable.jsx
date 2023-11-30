import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table, Pagination } from "antd"
// Get data from API
import { useGetAllProductQuery } from "../features/product/productApiSlice"

const ProductTable = () => {
    const [limit, setlimit] = useState(20)
    const navigate = useNavigate()
    const [current, setCurrent] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null)
    const {
        data: products,
        isFetching,
        isLoading,
    } = useGetAllProductQuery({
        page: current,
        limit,
    })

    if (isLoading) return <div>Loading...</div>
    if (!products) return <div>Missing products!</div>
    const total = products?.metadata?.total
    const data = products?.metadata?.products

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
            title: "Product",
            className: "text-base",
            dataIndex: "name",
            width: "40%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="me-2 cursor-pointer"
                        onClick={() =>
                            navigate(`/product/${record.id}`, {
                                state: { id: record.id },
                            })
                        }
                    >
                        <img
                            src={record.imageUrl}
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div>
                        <span
                            className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                            onClick={() =>
                                navigate(`/product/${record.id}`, {
                                    state: { id: record.id },
                                })
                            }
                        >
                            {text}
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <span>ID: {record.id}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Category",
            className: "text-base",
            dataIndex: "category",
            key: "category",
            width: "20%",
            render: (_, record) => (
                <span
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() =>
                        navigate(`/category/${record.category.id}`, {
                            state: { id: record.category.id },
                        })
                    }
                >
                    {record.category.name}
                </span>
            ),
        },
        {
            title: "Stock",
            className: "text-base",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
            ...getColumnSearchProps("stockQuantity"),
            sorter: (a, b) => a.stockQuantity - b.stockQuantity,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Price",
            className: "text-base",
            dataIndex: "price",
            key: "price",
            ...getColumnSearchProps("price"),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            className: "text-base",
            dataIndex: "key",
            render: (_, record) => (
                <>
                    <button
                        className="text-base px-4 py-1 rounded bg-[#ff0000] text-white"
                        onClick={() =>
                            navigate(`/product/${record.id}`, {
                                state: { id: record.id },
                            })
                        }
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Pagination
                total={total}
                current={current}
                onChange={setCurrent}
                pageSize={limit}
                showSizeChanger={false}
            />
        </>
    )
}
export default ProductTable
