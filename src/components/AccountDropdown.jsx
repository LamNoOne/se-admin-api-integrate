import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import LogoutIcon from "./Icon/LogoutIcon"
import OrderIcon from "./Icon/OrderIcon"
import UserLightIcon from "./Icon/UserLightIcon"
import UserLoginIcon from "./Icon/UserLoginIcon"
import Popup from './Popup'
import { useGetUserInfoQuery } from "../features/user/userApiSlice"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function AccountDropdown() {
    const { data: userInfo, isLoading } = useGetUserInfoQuery()
    if(isLoading) return <div>Loading...</div>
    if(!userInfo) return <div>Missing user info!</div>
    const img = userInfo.metadata.user.imageUrl
    return (
        <Menu as="div" className="relative inline-block text-left z-50">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-full bg-transparent text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {img ? <img className="w-[40px] h-[40px] object-cover rounded-full" src={img}/> : <UserLoginIcon />}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-0 w-56 origin-top-right rounded-md bg-white backdrop-filter backdrop-blur-[75px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/profile"
                                    className={classNames(
                                        active
                                            ? "bg-[rgba(0,0,0,0.5)] text-gray-300"
                                            : "text-gray-100",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    <div className="flex items-center">
                                        <div className="me-2 ms-0">
                                            <UserLightIcon />
                                        </div>
                                        <span className="text-black font-medium">Setting Profile</span>
                                    </div>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/"
                                    className={classNames(
                                        active
                                            ? "bg-[rgba(0,0,0,0.5)] text-gray-300"
                                            : "text-gray-100",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    <div className="flex items-center">
                                        <div className="me-4 ms-1">
                                            <OrderIcon />
                                        </div>
                                        <span className="text-black font-medium">Dashboard</span>
                                    </div>
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active
                                            ? "bg-[rgba(0,0,0,0.5)] text-gray-300"
                                            : "text-gray-100",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    <Popup>
                                        <div className="flex items-center cursor-pointer">
                                            <div className="me-4 ms-0">
                                                <LogoutIcon />
                                            </div>
                                            <span className="text-black font-medium">Logout</span>
                                        </div>
                                    </Popup>
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
