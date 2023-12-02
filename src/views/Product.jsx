import { useEffect, useState } from "react"
import uploadCloud from "../config/Upload"

import {
    CategorySelection,
    Description,
    Inventory,
    Pricing,
    UploadImage,
} from "../components"
import { useNavigate, useLocation } from "react-router-dom"
import Specification from "../components/Specification"
import {
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation,
    useCreateProductMutation,
} from "../features/product/productApiSlice"

const Product = (product) => {
    const naviagte = useNavigate()
    const isCreate = Object.keys(product).length === 0
    console.log(isCreate, "create")
    const location = useLocation()
    const [updateProductById, { isLoading }] = useUpdateProductByIdMutation()
    const [deleteProductById] = useDeleteProductByIdMutation()
    const [createProduct] = useCreateProductMutation()
    // const productId = location.state?.id
    // const { data: product, isLoading, isSuccess, isError, error } = useGetProductByIdQuery({ id: productId })
    // const product = product?.metadata?.product
    // if has product id => get product info and fill
    const [name, setName] = useState(product?.name)
    const [description, setDescription] = useState(product?.description)
    const [selectedFile, setSelectedFile] = useState(null)
    const [screen, setScreen] = useState(product?.screen)
    const [operatingSystem, setOperatingSystem] = useState(
        product?.operatingSystem
    )
    const [processor, setProcessor] = useState(product?.processor)
    const [ram, setRam] = useState(product?.ram)
    const [storageCapacity, setStorageCapacity] = useState(
        product?.storageCapacity
    )
    const [dimensions, setDimensions] = useState(product?.dimensions)
    const [weight, setWeight] = useState(product?.weight)
    const [batteryCapacity, setbatteryCapacity] = useState(
        product?.batteryCapacity
    )
    const [frontCameraResolution, setFrontCameraResolution] = useState(
        product?.frontCameraResolution
    )
    const [rearCameraResolution, setRearCameraResolution] = useState(
        product?.rearCameraResolution
    )
    const [connectivity, setConnectivity] = useState(product?.connectivity)
    const [color, setColor] = useState(product?.color)
    const [categoryId, setCategoryId] = useState(product?.categoryId)
    const [price, setPrice] = useState(product?.price)
    const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity)

    console.log(
        name,
        description,
        screen,
        operatingSystem,
        processor,
        ram,
        storageCapacity,
        dimensions,
        weight,
        batteryCapacity,
        frontCameraResolution,
        rearCameraResolution,
        connectivity,
        color,
        price,
        stockQuantity,
        categoryId
    )

    function handleChangeScreen(e) {
        setScreen(e.target.value)
    }
    function handleChangeOperatingSystem(e) {
        setOperatingSystem(e.target.value)
    }
    function handleChangeProcessor(e) {
        setProcessor(e.target.value)
    }
    function handleChangeRam(e) {
        setRam(e.target.value)
    }
    function handleChangeStorageCapacity(e) {
        setStorageCapacity(e.target.value)
    }
    function handleChangeDimensions(e) {
        setDimensions(e.target.value)
    }
    function handleChangeWeight(e) {
        setWeight(e.target.value)
    }
    function handleChangebatteryCapacity(e) {
        setbatteryCapacity(e.target.value)
    }
    function handleChangeFrontCameraResolution(e) {
        setFrontCameraResolution(e.target.value)
    }
    function handleChangeRearCameraResolution(e) {
        setRearCameraResolution(e.target.value)
    }
    function handleChangeConnectivity(e) {
        setConnectivity(e.target.value)
    }
    function handleChangeColor(e) {
        setColor(e.target.value)
    }

    const specification = {
        screen,
        handleChangeScreen,
        operatingSystem,
        handleChangeOperatingSystem,
        processor,
        handleChangeProcessor,
        ram,
        handleChangeRam,
        storageCapacity,
        handleChangeStorageCapacity,
        dimensions,
        handleChangeDimensions,
        weight,
        handleChangeWeight,
        batteryCapacity,
        handleChangebatteryCapacity,
        frontCameraResolution,
        handleChangeFrontCameraResolution,
        rearCameraResolution,
        handleChangeRearCameraResolution,
        connectivity,
        handleChangeConnectivity,
        color,
        handleChangeColor,
    }

    const canSave =
        [
            name,
            description,
            screen,
            operatingSystem,
            processor,
            ram,
            storageCapacity,
            dimensions,
            weight,
            batteryCapacity,
            frontCameraResolution,
            rearCameraResolution,
            connectivity,
            color,
            price,
            stockQuantity,
            categoryId,
        ].every(Boolean) && !isLoading

    const submitHandleDeleteProduct = async () => {
        try {
            await deleteProductById({ id: product?.id }).unwrap()
            naviagte("/product-list")
        } catch (error) {
            console.error(error)
        }
    }
    const submitHanleCreateProduct = async () => {
        const createProductObj = {
            name,
            description,
            image: selectedFile,
            screen,
            operatingSystem,
            processor,
            ram,
            storageCapacity,
            dimensions,
            weight,
            batteryCapacity,
            frontCameraResolution,
            rearCameraResolution,
            connectivity,
            color,
            price,
            stockQuantity,
            categoryId,
        }
        try {
            await createProduct(createProductObj).unwrap()
            naviagte("/product-list")
        } catch (error) {
            console.error(error)
        }
    }
    const submitHandleUpdateProduct = async () => {
        // Discuss update product's image,
        const updateProduct = {
            id: product?.id,
            body: {
                name,
                description,
                screen,
                operatingSystem,
                processor,
                ram,
                storageCapacity,
                dimensions,
                weight,
                batteryCapacity,
                frontCameraResolution,
                rearCameraResolution,
                connectivity,
                color,
                price,
                stockQuantity,
                categoryId,
            },
        }
        if (canSave) {
            try {
                await updateProductById(updateProduct).unwrap()
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
                        Edit Product
                    </h1>
                    {!isCreate && (
                        <button
                            type="submit"
                            disabled={!Boolean(product.id)}
                            className="text-base mb-2 px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitHandleDeleteProduct}
                        >
                            Delete
                        </button>
                    )}
                </div>
                <div className="flex flex-row gap-6">
                    <div className="part-1 flex flex-col gap-6 flex-1">
                        <div className="flex flex-col border shadow-sm p-6 bg-white">
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
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="text-base font-semibold">
                                    Description
                                </h3>
                                <Description
                                    description={description}
                                    setDescription={setDescription}
                                />
                            </div>
                        </div>
                        <Specification {...specification} />
                    </div>
                    <div className="part-2 flex flex-col gap-6 w-[384px]">
                        <div className="flex flex-col border shadow-sm px-6 pb-6 bg-white">
                            <Pricing price={price} setPrice={setPrice} />
                        </div>
                        <div className="flex flex-col border shadow-sm px-6 pb-6 bg-white">
                            <Inventory
                                stockQuantity={stockQuantity}
                                setStockQuantity={setStockQuantity}
                            />
                        </div>
                        <div className="category">
                            <CategorySelection
                                categoryId={categoryId}
                                setCategoryId={setCategoryId}
                            />
                        </div>
                        <div className="upload-multiple-images">
                            <UploadImage
                                imageOrigin={product?.imageUrl}
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
                        </div>
                    </div>
                </div>
                {isCreate ? (
                    <div className="button-submit-create">
                        <button
                            type="submit"
                            className="text-base px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitHanleCreateProduct}
                        >
                            Create Product
                        </button>
                    </div>
                ) : (
                    <div className="button-submit-update">
                        <button
                            type="submit"
                            className="text-base px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                            onClick={submitHandleUpdateProduct}
                        >
                            Update Product
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}

export default Product
