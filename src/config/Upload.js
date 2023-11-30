import axios from "axios"

const uploadCloud = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "a5ymyhyp")
    let { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dmnzkqysq/image/upload",
        formData
    )
    return { publicId: data?.public_id, url: data?.secure_url }
}


export default uploadCloud