import { useRef, useState } from "react"

const UploadImage = ({ selectedFile, setSelectedFile, imageOrigin }) => {
    // Set initial name before from user's state
    const inputRef = useRef(null)
    const onButtonClick = () => {
        inputRef.current.click()
    }

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <div className="upload flex items-start justify-between p-6 w-full min-h-[150px] bg-white border shadow-sm">
            <div className="flex flex-col">
                <h2 className="text-lg font-medium">Upload image</h2>
                <input
                    type="file"
                    multiple
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={fileSelectedHandler}
                />
                <button
                    className="px-4 py-2 border mt-2 my-2"
                    onClick={onButtonClick}
                >
                    Pick file
                </button>
            </div>

            <div className="w-[100px] object-contain">
                {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} alt="Thumb" />
                ) : (
                    <img src={imageOrigin} />
                )}
            </div>
        </div>
    )
}

export default UploadImage
