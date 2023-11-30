import React from "react"
import { useLocation } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../features/category/categoryApiSlice"
import Category from "./Category"

const CategoryEdit = () => {
    const location = useLocation()
    const categoryId = location.state?.id
    const { data, isLoading, isSuccess, isError, error } =
        useGetCategoryByIdQuery({ id: categoryId })

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        const categoryObj = data?.metadata?.category
        content = <Category {...categoryObj} />
    } else if (isError) {
        content = <div>{error}</div>
    }
    return content
}

export default CategoryEdit
