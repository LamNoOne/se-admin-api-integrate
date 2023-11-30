import React from "react"
import { Select } from "antd"
import { useGetAllCategoriesQuery } from "../features/category/categoryApiSlice"

const CategorySelection = ({ categoryId, setCategoryId }) => {
    const { data: categories, isFetching, isError } = useGetAllCategoriesQuery()

    if(isError) return <div>An error has occurred</div>
    if(isFetching && !categories) return <div>No categories</div>
    const optionData = categories?.metadata?.categories

    const options = []

    for (let i = 0; i < optionData.length; i++) {
        const name = `${optionData[i].name}`
        const value = `${optionData[i].id}`
        options.push({
            label: name,
            value,
        })
    }
    const handleChange = (value) => {
        setCategoryId(value[0])
    }

    const findNameCategory = (categoryId) => {
        for(let index = 0; index < optionData.length; index++) {
            if(categoryId === optionData[index].id)
                return optionData[index].name
        }
    }

    return (
        <div className="w-full p-6 border shadow-sm bg-white">
            <h2 className="text-lg font-medium">Category</h2>
            <div className="py-6">
                <Select
                    mode="only"
                    style={{
                        width: "100%",
                        height: "40px",
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                    value={findNameCategory(categoryId)}
                />
            </div>
        </div>
    )
}

export default CategorySelection
