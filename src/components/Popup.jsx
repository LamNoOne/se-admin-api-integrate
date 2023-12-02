import React from "react"
import Popup from "reactjs-popup"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../features/auth/authApiSlice"

export default ({ children }) => {
    const [logout, { isLoading }] = useLogoutMutation()
    const navigate = useNavigate()
    const handleLogout = async () => {
        if (!isLoading) {
            try {
                localStorage.removeItem("admin")
                sessionStorage.removeItem("isLogin")
                await logout()
                navigate("/signin")
            } catch (error) {
                console.error(error)
            } finally {
                window.location.reload(true)
            }
        }
    }
    return (
        <Popup
            overlayStyle={{ backgroundColor: "rgba(10,10,10,.86)" }}
            trigger={children}
            modal
            nested
        >
            {(close) => (
                <div className="flex flex-col min-w-fit p-2 border rounded-lg bg-white">
                    <button
                        className="self-end flex items-center justify-center w-8 h-8 border-[2px] rounded text-4xl text-[#ff0000]"
                        onClick={close}
                    >
                        &times;
                    </button>
                    <h1 className="mx-20 text-xl mb-5">
                        Do you want to log out?
                    </h1>
                    <div className="flex items-center justify-between px-10 mb-4">
                        <button
                            className="flex justify-center items-center min-w-[120px] h-[28px] text-xl border-[2px] border-[#ff0000] rounded px-5 py-5 bg-[#ff0000]"
                            onClick={() => handleLogout()}
                        >
                            Yes
                        </button>
                        <button
                            className="flex justify-center items-center min-w-[120px] h-[28px] text-xl border-[2px] rounded px-5 py-5 bg-[#e7e7e7]"
                            onClick={() => {
                                console.log("modal closed ")
                                close()
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}
