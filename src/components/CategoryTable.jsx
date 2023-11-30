import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
const data = [
    {
        id: 1,
        name: "Air Filters",
        items: 0,
        description:
            "Non minim anim eiusmod nisi non deserunt incididunt ea duis.",
    },

    {
        id: 2,
        name: "Cargo Accessories",
        items: 0,
        description:
            "Minim labore Lorem non pariatur occaecat adipisicing voluptate proident ea ad.",
    },

    {
        id: 3,
        name: "Consoles & Organizers",
        items: 0,
        description:
            "Nostrud veniam fugiat et nulla sunt dolore veniam sunt est aute excepteur nulla.",
    },

    {
        id: 4,
        name: "Engine & Drivetrain",
        items: 0,
        description:
            "Voluptate proident tempor cupidatat incididunt et veniam tempor.",
    },

    {
        id: 5,
        name: "Floor Mats",
        items: 0,
        description: "Esse consectetur irure dolor tempor aute minim.",
    },

    {
        id: 6,
        name: "Fuel Systems",
        items: 11,
        description:
            "Commodo dolor ullamco occaecat cupidatat quis deserunt magna veniam aliquip.",
    },

    {
        id: 7,
        name: "For premiumGauges",
        items: 0,
        description:
            "Mollit ullamco laborum labore deserunt ullamco adipisicing labore eu excepteur ipsum reprehenderit incididunt occaecat.",
    },

    {
        id: 8,
        name: "Headlights & Lighting",
        items: 3,
        description:
            "Anim nostrud amet eiusmod nulla reprehenderit nisi tempor ipsum ipsum incididunt.",
    },

    {
        id: 9,
        name: "Interior Parts",
        items: 15,
        description:
            "Aute velit commodo ea officia voluptate dolor duis quis eiusmod excepteur ea tempor amet.",
    },

    {
        id: 10,
        name: "Mobile Electronics",
        items: 0,
        description:
            "Aute labore magna mollit labore velit excepteur sunt sit mollit excepteur veniam ipsum veniam.",
    },
]

const CategoryTable = () => {
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
            dataIndex: "name",
            width: "20%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <button
                    className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() => navigate(`/category/${record.id}`)}
                >
                    {text}
                </button>
            ),
        },
        {
            title: "Items",
            className: "text-base",
            dataIndex: "items",
            key: "items",
            width: "20%",
            ...getColumnSearchProps("items"),
            sorter: (a, b) => a.items - b.items,
            sortDirections: ["descend", "ascend"],
            render: (text) => <span>{text}</span>,
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
export default CategoryTable
