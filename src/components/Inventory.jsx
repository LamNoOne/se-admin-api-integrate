import React from "react"
import { useState } from "react"

const Inventory = ({ stockQuantity, setStockQuantity }) => {
    const setQuantityHandler = (value) => {
        value > 0 ? setStockQuantity(value) : setStockQuantity(0)
    }
    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-lg font-semibold mb-4">Inventory</h1>
            <div className="flex justify-between items-center gap-4">
                <div className="input-price-product flex flex-col items-start w-full gap-2">
                    <label
                        htmlFor="form-product/stock-quantity"
                        className="form-label font-medium text-base"
                    >
                        Stock quantity
                    </label>
                    <input
                        type="number"
                        className="form-control text-base px-2 py-2 border outline-none hover:shadow-md w-full"
                        id="form-product/stock-quantity"
                        value={stockQuantity}
                        onChange={(e) => setQuantityHandler(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Inventory
