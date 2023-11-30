import React from "react"
import { CategoryTable } from "../components"

const CategoryList = () => {
    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-[28px] font-medium">Categories</h1>
            <CategoryTable />
        </section>
    )
}

export default CategoryList
