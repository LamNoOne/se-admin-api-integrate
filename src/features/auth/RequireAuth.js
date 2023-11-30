import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "./authSlice"

const RequireAuth = ({ children }) => {
    const userState = useSelector(selectCurrentUser)
    const location = useLocation()
    return Boolean(userState) ? (
        children
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace={true} />
    )
}

export default RequireAuth
