import React from "react"
import { useNavigate } from "react-router-dom"

const RowOrder = (props) => {
    const navigate = useNavigate()
    const { id, url, title, price, quantity } = props
    const total = price * quantity
    return (
        <div className="flex items-center justify-between min-w-[800px]">
            <div className="flex items-center justify-between w-[600px] me-10">
                <div
                    onClick={() => navigate(`/product/${id}`)}
                    className="left-part flex items-center gap-4"
                >
                    <img
                        src={url}
                        alr=""
                        className="w-[40px] h-[40px] object-contain"
                    />
                    <h3 className="text-base">{title}</h3>
                </div>
                <div className="right-part flex justify-end items-center gap-14">
                    <span className="text-base">${price}</span>
                    <span className="text-base">{quantity}</span>
                </div>
            </div>
            <span className="text-base">${total}</span>
        </div>
    )
}

export default RowOrder
