import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
const data = [
    {
        id: 1,
        lastName: "Adam",
        firstName: "Taylor",
        gender: "Male",
        role: "admin",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-1-40x40.jpg",
        email: "taylor-adam@example.com",
        createdAt: "May 15, 2021",
        spent: "34.392.10",
    },

    {
        id: 2,
        lastName: "Anna",
        firstName: "Wilson",
        gender: "Female",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-2-40x40.jpg",
        email: "wilson-anna@example.com",
        createdAt: "February 26, 2021",
        spent: "25.486.20",
    },

    {
        id: 3,
        lastName: "Brian",
        firstName: "Wood",
        gender: "Male",
        role: "admin",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-3-40x40.jpg",
        email: "wood-brian@example.com",
        createdAt: "August 17, 2021",
        spent: "1.332.58",
    },
    {
        id: 4,
        lastName: "Charlotte",
        firstName: "Jones",
        gender: "Female",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-40x40.jpg",
        email: "jones-charlotte@example.com",
        createdAt: "December 31, 2021",
        spent: "5.192.42",
    },
    {
        id: 5,
        lastName: "Ethan",
        firstName: "Young",
        gender: "Male",
        role: "staff",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-5-40x40.jpg",
        email: "young-ethan@example.com",
        createdAt: "September 28, 2021",
        spent: "594.97",
    },
    {
        id: 6,
        lastName: "Helena",
        firstName: "Garcia",
        gender: "Female",
        role: "staff",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-6-40x40.jpg",
        email: "garcia-helena@example.com",
        createdAt: "February 23, 2021",
        spent: "5.702.02",
    },
    {
        id: 7,
        lastName: "Isabel",
        firstName: "Williams",
        gender: "Female",
        role: "staff",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-7-40x40.jpg",
        email: "williams-isabel@example.com",
        createdAt: "October 2, 2021",
        spent: "35.762.74",
    },

    {
        id: 8,
        lastName: "Jacob",
        firstName: "Lee",
        gender: "Male",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-8-40x40.jpg",
        email: "lee-jacob@example.com",
        createdAt: "May 12, 2021",
        spent: "911.27",
    },
    {
        id: 9,
        lastName: "Jessica",
        firstName: "Moore",
        gender: "Male",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-9-40x40.jpg",
        email: "moore-jessica@example.com",
        createdAt: "June 26, 2021",
        spent: "28.522.35",
    },

    {
        id: 10,
        lastName: "Kevin",
        firstName: "Smith",
        gender: "Female",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-10-40x40.jpg",
        email: "smith-kevin@example.com",
        createdAt: "April 4, 2021",
        spent: "6.147.64",
    },
    {
        id: 11,
        lastName: "Olivia",
        firstName: "Smith",
        gender: "Male",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-11-40x40.jpg",
        email: "smith-olivia@example.com",
        createdAt: "November 9, 2021",
        spent: "8.061.02",
    },
    {
        id: 12,
        lastName: "Ryan",
        firstName: "Force",
        gender: "Female",
        role: "customer",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-12-40x40.jpg",
        email: "ford-ryan@example.com",
        createdAt: "Oct 19, 2021",
        spent: "973.64",
    },
]

const UserTable = () => {
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
            title: "Name",
            className: "text-base",
            dataIndex: ["firstName", "lastName"],
            width: "40%",
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
                        onClick={() => navigate(`/user/${record.id}`)}
                    >
                        <img
                            src={record.img}
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div>
                        <span className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700" onClick={() => navigate(`/user/${record.id}`)}>
                            {record.firstName + " " + record.lastName}
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <span>{record.email}</span>
                        </div>
                    </div>
                </div>
            ),
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
            sorter: (a, b) => a.gender.length - b.gender.length,
        },
        {
            title: "Role",
            className: "text-base",
            dataIndex: "role",
            key: "role",
            ...getColumnSearchProps("role"),
            sorter: (a, b) => a.role - b.role,
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
                        onClick={() => navigate(`/user/${record.id}`)}
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ]
    return <Table columns={columns} dataSource={data} pagination />
}
export default UserTable
