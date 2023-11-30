import React from "react"

const Pricing = ({ price, setPrice}) => {
    const setPriceHandler = (value) => {
       value > 0 ? setPrice(value) : setPrice('')
    } 

    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-lg font-semibold mb-4">Pricing</h1>
            <div className="flex justify-between items-center gap-4">
                <div className="input-price-product flex flex-col items-start w-full gap-2">
                    <label
                        htmlFor="form-product/price"
                        className="form-label font-medium text-base"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control text-base px-2 py-2 border outline-none hover:shadow-md w-full"
                        id="form-product/price"
                        value={price}
                        onChange={(e) => setPriceHandler(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pricing
