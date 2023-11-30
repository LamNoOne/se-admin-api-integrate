import React, { useState } from "react"
import { Select, Typography } from "antd"

const CategorySelection = ({ category, setCategory }) => {
    const { Title } = Typography
    const options = []

    const data = [
        {
            id: 1,
            name: "Routers",
        },
        {
            id: 2,
            name: "Power Tools",
        },
        {
            id: 3,
            name: "Screwdrivers",
        },
        {
            id: 4,
            name: "Hand Tools",
        },
    ]
    for (let i = 0; i < data.length; i++) {
        const value = `${data[i].name}`
        options.push({
            label: value,
            value,
        })
    }
    const handleChange = (value) => {
        setCategory(value)
    }
    return (
        <div className="w-full p-6 border shadow-sm bg-white">
            <h2 className="text-lg font-medium">Category</h2>
            <div className="py-6">
                <Select
                    mode="multiple"
                    style={{
                        width: "100%",
                        height: "40px",
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                />
            </div>
        </div>
    )
}

export default CategorySelection
