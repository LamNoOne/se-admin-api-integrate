import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "./authSlice"

const RequireAuth = ({ children }) => {
    // const userState = useSelector(selectCurrentUser)
    const isLogin = JSON.parse(sessionStorage.getItem('isLogin'))
    const location = useLocation()
    return isLogin ? (
        children
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace={true} />
    )
}

export default RequireAuth
