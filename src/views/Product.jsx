import { useEffect, useState } from "react"
import uploadCloud from "../config/Upload"

import {
    CategorySelection,
    Description,
    Inventory,
    Pricing,
    UploadImage,
} from "../components"
import { useParams, useNavigate } from "react-router-dom"
import Specification from "../components/Specification"
const Product = () => {
    let { id: productId } = useParams()
    const naviagte = useNavigate()
    console.log(productId)
    useEffect(() => {
        // if has product id
        // dispactch get product info
    }, [])
    // if has product id => get product info and fill
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [screen, setScreen] = useState("")
    const [operatingSystem, setOperatingSystem] = useState("")
    const [processor, setProcessor] = useState("")
    const [ram, setRam] = useState("")
    const [storageCapacity, setStorageCapacity] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [weight, setWeight] = useState("")
    const [batteryCapacity, setbatteryCapacity] = useState("")
    const [frontCameraResolution, setFrontCameraResolution] = useState("")
    const [rearCameraResolution, setRearCameraResolution] = useState("")
    const [connectivity, setConnectivity] = useState("")
    const [color, setColor] = useState("")
    const [category, setCategory] = useState()
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    console.log(
        name,
        description,
        selectedFile,
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
        category,
        price,
        quantity
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

    // get all single Product Info
    const submitImageHandler = async () => {
        try {
            let arr = []
            for (let i = 0; i < selectedFile.length; i++) {
                const data = await uploadCloud(selectedFile[i])
                arr.push(data)
            }
            return arr
        } catch (error) {
            console.log(error)
        }
    }

    const submitHandler = async () => {
        let url = []
        url = await submitImageHandler()
        console.log(description, name, url, category, price, quantity)

        // Take data and send
        //post request-FOR NEW or
        ///put request to server-FOR HAS product ID => if and else
    }

    const deleteHandler = () => {
        // dispatch action delete
        // get promises state using ...(quen ba nos roi)
        // if status is success => navigate to product list
        naviagte("/product-list")
    }

    console.log(description)

    return (
        <>
            <section className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[28px] font-medium mb-2">
                        Edit Product
                    </h1>
                    <button
                        type="submit"
                        disabled={!Boolean(productId)}
                        className="text-base mb-2 px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white disabled:bg-red-500 hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="text-base font-semibold">
                                    Description
                                </h3>
                                <Description
                                    desciption={description}
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
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        </div>
                        <div className="category">
                            <CategorySelection
                                category={category}
                                setCategory={setCategory}
                            />
                        </div>
                        <div className="upload-multiple-images">
                            <UploadImage
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
                        </div>
                    </div>
                </div>
                <div className="button-submit">
                    <button
                        type="submit"
                        className="text-base px-6 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                        onClick={submitHandler}
                    >
                        Save
                    </button>
                </div>
            </section>
        </>
    )
}

export default Product
