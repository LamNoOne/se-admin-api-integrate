import React from "react"
import { ProductTable } from "../components"

const ProductList = () => {
    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-[28px] font-medium">Products</h1>
            <ProductTable />
        </section>
    )
}

export default ProductList
