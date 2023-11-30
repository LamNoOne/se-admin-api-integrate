import React from "react"
import converDate from "../config/ConvertDate"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"

const TotalCard = ({ name, total, percent, from = "2023-10-10" }) => {
    return (
        <div className="bg-white p-5 flex flex-col items-start shadow-sm border border-[rgba(0,0,0,0.125)] w-full">
            <h1 className="text-sm font-medium text-[#828f99]">{name}</h1>
            <div className="flex items-center justify-between w-full">
                <span className="number text-[32px] font-medium">${total}</span>
                <div className="flex flex-col items-end">
                    <div className="percent flex items-center gap-2">
                        {percent >= 25 ? (
                            <FaArrowTrendUp color="#47ad24"/>
                        ) : (
                            <FaArrowTrendDown color="#e52e2e"/>
                        )}
                        <span
                            className={`text-sm font-medium ${
                                percent >= 25
                                    ? "text-[#47ad24]"
                                    : "text-[#e52e2e]"
                            }`}
                        >
                            {percent}%
                        </span>
                    </div>
                    <div className="compared">
                        <span className="text-xs font-medium text-[#828f99]">
                            Compared to {converDate(from)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalCard
