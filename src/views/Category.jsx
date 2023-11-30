import { useEffect, useState } from "react"
import { Description } from "../components"
import { useNavigate } from "react-router-dom"
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from "../features/category/categoryApiSlice"
const Category = (categoryObj) => {
    const naviagte = useNavigate()
    const isCreate = Object.keys(categoryObj).length === 0
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [createCategory] = useCreateCategoryMutation()
    // if has product id => get product info and fill
    const [name, setName] = useState(categoryObj?.name || "")
    const [description, setDescription] = useState(
        categoryObj?.description || ""
    )
    // quantity of products in category, we get it just for showing
    // only deleted if there is no product in category
    // get all single Product Info

    const canSave = [name, description].every(Boolean) && !isLoading

    const submitHandler = () => {
        console.log(description, name)

        // Take data and send
        //post request-FOR NEW or
        ///put request to server-FOR HAS product ID => if and else
    }

    const submitDeleteHandler = async () => {
        try {
            await deleteCategory({ id: categoryObj?.id })
            naviagte('/category-list')
        } catch (error) {
            console.error(error)
        }
    }

    const submitCreateHandler = async () => {
        if(canSave) {
            try {
                await createCategory({ name, description}).unwrap()
                naviagte('/category-list')
            } catch (error) {
                console.error(error)
            }
        }
    }

    const submitUpdateHandler = async () => {
        if (canSave) {
            try {
                await updateCategory({
                    id: categoryObj?.id,
                    name,
                    description,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <>
            <section className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[28px] font-medium mb-2">
                        Edit Category
                    </h1>
                    {!isCreate && (
                        <button
                            type="submit"
                            className="text-base mb-2 px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitDeleteHandler}
                        >
                            Delete
                        </button>
                    )}
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
                            description={description}
                            setDescription={setDescription}
                        />
                    </div>
                </div>
                <div className="button-submit">
                    {isCreate ? (
                        <button
                            type="submit"
                            className="text-base px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitCreateHandler}
                        >
                            Create Category
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="text-base px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitUpdateHandler}
                        >
                            Update Category
                        </button>
                    )}
                </div>
            </section>
        </>
    )
}

export default Category
