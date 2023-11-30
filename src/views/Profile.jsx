import axios from "axios"
import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Line, RadioButton } from "../components"
import style from "../style"
import { CiUser } from "react-icons/ci"

const Profile = () => {
    // Set initial name before from user's state
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const onButtonClick = () => {
        inputRef.current.click()
    }
    const [name, setName] = useState("Henry William")
    const [gender, setGender] = useState("male")
    const [address, setAddress] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const canSave = Boolean(name) && Boolean(gender) && Boolean(address)

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const isChecked = (value) => gender === value

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const submitHandler = (e) => {
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("upload_preset", "a5ymyhyp")
        if(selectedFile) {
            axios
            .post(
                "https://api.cloudinary.com/v1_1/dmnzkqysq/image/upload",
                formData
            )
            .then((response) => response?.data?.url)
            .then((url) => {
                // dispatch to update user's info
                console.log(url, name, address, gender)
            })
        } else {
            console.log(name, address, gender)
        }
    }

    return (
        <div className="my-4 flex bg-white p-6">
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-full">
                    <h1 className="text-[28px] font-medium">
                        Profile Information
                    </h1>
                    <div className="my-6">
                        <Line style={style.lineStyleCart} />
                    </div>
                    <div className="Profile-info-edit flex flex-col gap-8 border-r border-[rgba(0,0,0,0.4)]">
                        <div className="flex flex-row items-center gap-6 px-4 py-2">
                            <h1 className="text-base">Login name:</h1>
                            <p className="text-base">henrywilliam</p>
                        </div>
                        <div className="flex flex-row items-center justify-between me-8 gap-6 px-4 py-2">
                            <h1 className="text-base">Name:</h1>
                            <input
                                className="text-base w-[660px] p-2 outline-none border border-[#ccc]"
                                type="text"
                                value={name}
                                onChange={handleChangeName}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between me-8 gap-6 px-4 py-2">
                            <h1 className="text-base">Address:</h1>
                            <input
                                className="text-base w-[660px] p-2 outline-none border border-[#ccc]"
                                type="text"
                                value={address}
                                onChange={handleChangeAddress}
                            />
                        </div>
                        <div className="flex flex-row items-center gap-6 px-4 py-2">
                            <h1 className="text-base">Email:</h1>
                            <p className="text-base">
                                {"henrywilliam@gmail.com"}
                            </p>
                            <span
                                className="text-sm underline text-blue-700 cursor-pointer"
                                onClick={() => navigate("/verify/email")}
                            >
                                Change
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-6 px-4 py-2">
                            <h1 className="text-base">Phone number:</h1>
                            <p className="text-base">{"0123456789"}</p>
                            <span
                                className="text-sm underline text-blue-700 cursor-pointer"
                                onClick={() => navigate("/verify/phone")}
                            >
                                Change
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-6 px-4 py-2">
                            <h1 className="text-base">Gender:</h1>
                            <form className="flex items-center gap-4">
                                <RadioButton
                                    id="male"
                                    name="male"
                                    value="male"
                                    text="Male"
                                    onChange={handleChangeGender}
                                    checked={isChecked("male")}
                                />
                                <RadioButton
                                    id="female"
                                    name="female"
                                    value="female"
                                    text="Female"
                                    onChange={handleChangeGender}
                                    checked={isChecked("female")}
                                />
                                <RadioButton
                                    id="other"
                                    name="other"
                                    value="other"
                                    text="Other"
                                    onChange={handleChangeGender}
                                    checked={isChecked("other")}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="upload min-w-[300px] flex flex-col gap-4 items-center justify-center w-[250px]">
                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={fileSelectedHandler}
                    />
                    <button
                        className="px-4 py-2 border mt-2"
                        onClick={onButtonClick}
                    >
                        Pick file
                    </button>
                    <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Thumb"
                            />
                        ) : (
                            <CiUser size={50} />
                        )}
                    </div>
                </div>
            </div>
            <div className="button-submit mt-10">
                <button
                    type="submit"
                    disabled={!canSave}
                    className="px-6 py-2 border text-base mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:cursor-none"
                    onClick={submitHandler}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Profile
