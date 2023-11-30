import React from "react"
import { useGetProductByIdQuery } from "../features/product/productApiSlice"
import { useLocation } from "react-router-dom"
import Product from "./Product"

// Get data of single product and pass props to Product component

const ProductEdit = () => {
    const location = useLocation()
    const productId = location.state?.id
    const { data, isLoading, isSuccess, isError, error } = useGetProductByIdQuery({ id: productId })
    let content
    if(isLoading) {
        content = <div>Loading...</div>
    } else if(isSuccess) {
        const product = data?.metadata?.product
        content = <Product {...product}/>
    } else if(isError) {
        content = <div>{error}</div>
    }

    return content
}

export default ProductEdit
