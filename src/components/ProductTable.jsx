import React, { useRef, useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Highlighter from "react-highlight-words"
import { Button, Input, Space, Table } from "antd"
// Get data from API
const data = [
    {
        title: "Drill Screwdriver Brandix ALX7054B 200 Watts",
        id: 8821,
        productTypeId: "123",
        sku: "ALX7054B",
        category: "Screwdrivers",
        stock: "3",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-1-40x40.jpg",
        price: 850.0,
    },

    {
        title: "Brandix Router Power Tool 2017ERX9",
        id: 3326,
        productTypeId: "123",
        sku: "2017ERX9",
        category: "Routers",
        stock: "Preorder",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-2-40x40.jpg",
        price: 1.7,
    },

    {
        title: "Undefined Tool IRadix DPS300SY 2700 Watts",
        id: 1746,
        productTypeId: "123",
        sku: "DPS300SY",
        category: "Power Tools",
        stock: "Out of Stock",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-3-40x40.jpg",
        price: 1.019,
    },

    {
        title: "Brandix Screwdriver SCREW150",
        id: 7321,
        productTypeId: "123",
        sku: "SCREW150",
        category: "Power Tools",
        stock: "18",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-4-40x40.jpg",
        price: 1.499,
    },

    {
        title: "Brandix Electric Jigsaw JIG7000B",
        id: 5221,
        productTypeId: "123",
        sku: "JIG7000B",
        category: "Power Tools",
        stock: "1",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-5-40x40.jpg",
        price: 290.0,
    },

    {
        title: "Brandix Angle Grinder KZX389PQ",
        id: 7203,
        productTypeId: "123",
        sku: "KZX389PQ",
        category: "Power Tools",
        stock: "2",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-6-40x40.jpg",
        price: 649.0,
    },

    {
        title: "Ashs Chainsaw 3.5kW",
        id: 1022,
        productTypeId: "123",
        sku: "AC6660KW",
        category: "Power Tools",
        stock: "Out of Stock",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-7-40x40.jpg",
        price: 666.99,
    },

    {
        title: "Water Tap",
        id: 6428,
        productTypeId: "123",
        sku: "TAP883WT",
        category: "Plumbing",
        stock: "24",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-8-40x40.jpg",
        price: 15.0,
    },

    {
        title: "Water Hose 40cm",
        id: 2002,
        productTypeId: "123",
        sku: "WATER40C",
        category: "Plumbing",
        stock: "Preorder",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-9-40x40.jpg",
        price: 15.0,
    },

    {
        title: "Electric Planer Brandix KL370090 300 Watts",
        id: 2043,
        productTypeId: "123",
        sku: "KL370090",
        category: "Planers",
        stock: "25",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-10-40x40.jpg",
        price: 749.0,
    },

    {
        title: "Spanner Wrench",
        id: 4955,
        productTypeId: "123",
        sku: "SP0072WR",
        category: "Hand Tools",
        stock: "15",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-11-40x40.jpg",
        price: 19.0,
    },

    {
        title: "Brandix Pliers",
        id: 9637,
        productTypeId: "123",
        sku: "BDX100PL",
        category: "Hand Tools",
        stock: "8",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-12-40x40.jpg",
        price: 24.0,
    },

    {
        title: "Hand Tool Kit",
        id: 1302,
        productTypeId: "123",
        sku: "HT75002K",
        category: "Hand Tools",
        stock: "9",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-13-40x40.jpg",
        price: 149.0,
    },

    {
        title: "Drill Series 3 Brandix KSR4590P 1500 Watts",
        id: 5312,
        productTypeId: "123",
        sku: "KSR4590P",
        category: "Drills",
        stock: "7",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-14-40x40.jpg",
        price: 949.0,
    },

    {
        title: "Brandix Drilling Machine DM2019KW 4kW",
        id: 4402,
        productTypeId: "123",
        sku: "DM2019KW",
        category: "Drills",
        stock: "On Backorder",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-15-40x40.jpg",
        price: 3.199,
    },

    {
        title: "Brandix Air Compressor DELTA500",
        id: 4402,
        productTypeId: "123",
        sku: "DELTA500",
        category: "Compressors",
        stock: "7",
        img: "https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/products/product-16-40x40.jpg",
        price: 1.8,
    },
]
const ProductTable = () => {
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
            title: "Product",
            className: "text-base",
            dataIndex: "title",
            width: "40%",
            ...getColumnSearchProps("title"),
            sorter: (a, b) => a.title.length - b.title.length,
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
                        onClick={() => navigate(`/product/${record.id}`)}
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
                        <span className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700" onClick={() => navigate(`/product/${record.id}`)}>
                            {text}
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <span>ID: {record.id}</span>
                            <span style={{ margin: "0 2px" }}>|</span>
                            <span>SKU: {record.sku}</span>
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
            ...getColumnSearchProps("category"),
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ["descend", "ascend"],
            render: (text, record) => (
                <span className="text-base font-medium cursor-pointer hover:underline hover:text-blue-700"
                    onClick={() =>
                        navigate(`/category/${record.productTypeId}`)
                    }
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Stock",
            className: "text-base",
            dataIndex: "stock",
            key: "stock",
            ...getColumnSearchProps("stock"),
            sorter: (a, b) => a.stock.length - b.stock.length,
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
                        onClick={() => navigate(`/product/${record.id}`)}
                    >
                        Edit
                    </button>
                </>
            ),
        },
    ]
    return <Table columns={columns} dataSource={data} pagination />
}
export default ProductTable
