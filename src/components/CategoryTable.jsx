import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
import { useGetAllCategoriesQuery } from "../features/category/categoryApiSlice"

const CategoryTable = () => {
    const navigate = useNavigate()
    const { data: categories, isLoading, isError } = useGetAllCategoriesQuery()
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Missing category!</div>

    const data = categories?.metadata?.categories

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
            title: "Name",
            className: "text-base",
            dataIndex: "name",
            width: "40%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <button
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() =>
                        navigate(`/category/${record.id}`, {
                            state: { id: record.id },
                        })
                    }
                >
                    {text}
                </button>
            ),
        },
        {
            title: "Description",
            className: "text-base",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
            sorter: (a, b) => a.description.length - b.description.length,
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
                        onClick={() =>
                            navigate(`/category/${record.id}`, {
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
    return <Table columns={columns} dataSource={data} pagination={true} />
}
export default CategoryTable
