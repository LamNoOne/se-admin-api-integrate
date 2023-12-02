import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { AiOutlineDashboard } from "react-icons/ai"
import { LuDatabase, LuUser2 } from "react-icons/lu"
import { FiShoppingCart } from "react-icons/fi"
import { BiSolidBarChartAlt2 } from "react-icons/bi"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, Menu, Button, theme } from "antd"
import { useNavigate } from "react-router-dom"
import Container from "./Container"
import AccountDropdown from "./AccountDropdown"
const { Header, Sider, Content } = Layout
const MainLayout = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const handleOnClick = ({ key }) => {
        navigate(key)
    }
    return (
        <Layout style={{ width: "100vw" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo flex items-center justify-around h-[50px] px-2 bg-[#1677ff]">
                    {!collapsed && (
                        <h1 className="text-2xl font-bold text-white">
                            SE-SHOP
                        </h1>
                    )}
                    <h2 className="text-gray-700 text-xs font-bold px-4 py-1 rounded bg-white">
                        ADMIN
                    </h2>
                </div>
                <h5 className="text-xs mt-4 text-center font-semibold leading-6 text-white">
                    APPLICATION
                </h5>
                <Menu
                    onClick={handleOnClick}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    style={{ fontSize: "16px" }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard size={20} />,
                            label: "Dashboard",
                        },
                        {
                            key: "catalog",
                            icon: <LuDatabase size={20} />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product-list",
                                    label: "Products List",
                                },
                                {
                                    key: "product",
                                    label: "Product",
                                },
                                {
                                    key: "category-list",
                                    label: "Categories List",
                                },
                                {
                                    key: "category",
                                    label: "Category",
                                },
                            ],
                        },
                        {
                            key: "user",
                            icon: <LuUser2 size={20} />,
                            label: "User",
                            children: [
                                {
                                    key: "user-list",
                                    label: "Users List",
                                },
                            ],
                        },
                        {
                            key: "order",
                            icon: <FiShoppingCart size={20} />,
                            label: "Order",
                            children: [
                                {
                                    key: "order-list",
                                    label: "Orders List",
                                },
                            ],
                        },
                        {
                            key: "profile",
                            icon: <BiSolidBarChartAlt2 size={20} />,
                            label: "Profile",
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={{ height: "100vh" }}>
                <Header
                    style={{
                        padding: 0,
                        height: 60,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="admin-dropdown me-10 mt-4">
                        <AccountDropdown />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "0 16px",
                        padding: 24,
                        overflow: "auto",
                        minHeight: 280,
                        background: "#f5f7fa",
                    }}
                >
                    <Container>
                        <Outlet />
                    </Container>
                </Content>
            </Layout>
        </Layout>
    )
}
export default MainLayout
