import { useEffect, useState } from "react"
import {
    CategorySelection,
    Description,
    Inventory,
    Pricing,
    UploadImage,
} from "../components"
import { useParams, useNavigate } from "react-router-dom"
const Category = () => {
    let { id: categoryId } = useParams()
    const naviagte = useNavigate()
    console.log(categoryId)
    useEffect(() => {
        // if has categoryId
        // dispactch get category info
    }, [])
    // if has product id => get product info and fill
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    // quantity of products in category, we get it just for showing
    // only deleted if there is no product in category
    // get all single Product Info

    const submitHandler = () => {
        console.log(description, name)

        // Take data and send
        //post request-FOR NEW or
        ///put request to server-FOR HAS product ID => if and else
    }

    const deleteHandler = () => {
        // dispatch action delete
        // get promises state using ...(quen ba nos roi), a nho roi, la cham .wrap() trong RTK query
        // if status is success => navigate to category list
        naviagte("/category-list")
    }

    return (
        <>
            <section className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[28px] font-medium mb-2">
                        Edit Category
                    </h1>
                    <button
                        type="submit"
                        disabled={!Boolean(categoryId)}
                        className="text-base mb-2 px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                </div>
                <div className="flex flex-col gap-6 border shadow-sm p-6 bg-white">
                    <h3 className="text-lg font-semibold mb-4">
                        Basic Infomation
                    </h3>
                    <div className="input-name-product flex flex-col items-start w-full gap-2">
                        <label
                            htmlFor="form-product/name"
                            className="form-label font-medium text-base"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control text-base px-2 py-2 border outline-none hover:shadow-md w-full"
                            id="form-product/name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <h3 className="text-base font-semibold">Description</h3>
                        <Description
                            desciption={description}
                            setDescription={setDescription}
                        />
                    </div>
                </div>
                <div className="button-submit">
                    <button
                        type="submit"
                        className="text-base px-6 py-2 w-[120px] border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                        onClick={submitHandler}
                    >
                        Save
                    </button>
                </div>
            </section>
        </>
    )
}

export default Category
