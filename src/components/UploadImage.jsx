import { useRef, useState } from "react"


const UploadImage = ({ selectedFile, setSelectedFile}) => {
    // Set initial name before from user's state
    const inputRef = useRef(null)
    const onButtonClick = () => {
        inputRef.current.click()
    }

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files)
    }

    return (
        <div className="upload flex flex-col items-start justify-start p-6 w-full min-h-[200px] bg-white border shadow-sm">
            <h2 className="text-lg font-medium">Upload image</h2>
            <input
                type="file"
                multiple
                ref={inputRef}
                style={{ display: "none" }}
                onChange={fileSelectedHandler}
            />
            <button className="px-4 py-2 border mt-2 my-2" onClick={onButtonClick}>
                Pick file
            </button>

            <div className="grid grid-cols-3 gap-2">
                {selectedFile &&
                    Object.entries(selectedFile).map(([index, file]) => (
                        <div key={index} className="w-[100px] h-[100px] border rounded bg-white">
                            <img
                                className="w-full h-full p-1 object-contain"
                                src={URL?.createObjectURL(file)}
                                alt="Thumb"
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default UploadImage
