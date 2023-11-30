import { useRoutes } from "react-router-dom"
import { MainLayout } from "../components"
import {
    DashBoard,
    Product,
    ProductList,
    CategoryList,
    Category,
    UserList,
    User,
    OrderList,
    Order,
    SignIn,
    SignUp,
    ForgotPassword,
    Profile,
} from "../views"
import RequireAuth from "../features/auth/RequireAuth"

export default function Router() {
    let element = useRoutes([
        {
            element: (
                <RequireAuth>
                    <MainLayout />
                </RequireAuth>
            ),
            children: [
                { path: "/", element: <DashBoard /> },
                { path: "/product-list", element: <ProductList /> },
                { path: "/product", element: <Product /> },
                { path: "/product/:id", element: <Product /> },
                { path: "/category-list", element: <CategoryList /> },
                { path: "/category", element: <Category /> },
                { path: "/category/:id", element: <Category /> },
                { path: "/user-list", element: <UserList /> },
                { path: "/user", element: <User /> },
                { path: "/user/:id", element: <User /> },
                { path: "/order-list", element: <OrderList /> },
                { path: "/order", element: <Order /> },
                { path: "/profile", element: <Profile /> },
            ],
        },
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,
        },
    ])
    return element
}
