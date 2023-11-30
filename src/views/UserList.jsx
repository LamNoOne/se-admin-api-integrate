import React from "react"
import { UserTable } from "../components"

const UserList = () => {
    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-[28px] font-medium">Users</h1>
            <UserTable />
        </section>
    )
}

export default UserList
