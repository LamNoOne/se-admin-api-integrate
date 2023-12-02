import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
import { useGetAllUsersQuery } from "../features/user/userApiSlice"

const UserTable = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null)

    const { data: users, isLoading } = useGetAllUsersQuery()

    if (isLoading) return <div>Loading...</div>
    if (!users) return <div>Missing users!</div>
    const data = users?.metadata?.users

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
            dataIndex: ["firstName", "lastName"],
            width: "20%",
            ...getColumnSearchProps("firstName"),
            ...getColumnSearchProps("lastName"),
            sortDirections: ["descend", "ascend"],
            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="me-2 cursor-pointer"
                        onClick={() =>
                            navigate(`/user-list/${record.id}`, {
                                state: { id: record.id },
                            })
                        }
                    >
                        <img
                            src={record.imageUrl}
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div>
                        <span
                            className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                            onClick={() =>
                                navigate(`/user-list/${record.id}`, {
                                    state: { id: record.id },
                                })
                            }
                        >
                            {record.firstName + " " + record.lastName}
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <a>{record.email}</a>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Phone Number",
            className: "text-base",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            ...getColumnSearchProps("phoneNumber"),
            render: (_, record) => <a>{record?.phoneNumber}</a>,
        },
        {
            title: "Address",
            className: "text-base",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
            render: (_, record) => <p>{record?.address}</p>,
        },
        {
            title: "Registered",
            className: "text-base",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "20%",
            ...getColumnSearchProps("createdAt"),
            sorter: (a, b) => a.createdAt.length - b.createdAt.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Gender",
            className: "text-base",
            dataIndex: "gender",
            key: "gender",
            ...getColumnSearchProps("gender"),
            render: (_, record) => <p>{record?.gender?.name}</p>,
        },
        {
            title: "Role",
            className: "text-base",
            dataIndex: "role",
            key: "role",
            ...getColumnSearchProps("role"),
            render: (_, record) => <p>{record?.role?.name}</p>,
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
                            navigate(`/user-list/${record.id}`, {
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
            <Table columns={columns} dataSource={data} pagination />
        </>
    )
}
export default UserTable
