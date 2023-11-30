import React from "react"
import activeUser from "../views/data/ActiveUser"
import Line from "../components/Line"
import style from "../style"

const ActiveTable = () => {
    const total = activeUser.reduce((acc, cur) => acc + cur.number, 0)

    return (
        <section className="flex flex-col gap-6 px-4 py-6 border shadow-sm bg-white">
            <h3 className="text-xl font-medium">Active users</h3>
            <div className="flex items-center justify-center py-6 min-h-[100px] bg-[#d9ecff]">
                <span className="number-user-active text-4xl font-semibold">{total}</span>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center py-3">
                    <span className="text-[#828f99] text-sm">Acive pages</span>
                    <span className="text-[#828f99] text-sm">Users</span>
                </div>
                <Line style={style.lineTable} />
                {activeUser.map(({ url, number }) => (
                    <>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-[#828f99] text-sm font-medium">
                                {url}
                            </span>
                            <span className="text-[#828f99] text-sm font-medium">
                                {number}
                            </span>
                        </div>
                        <Line style={style.lineTable} />
                    </>
                ))}
            </div>
        </section>
    )
}

export default ActiveTable
