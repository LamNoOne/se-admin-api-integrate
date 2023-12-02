// import React, { useRef, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { CiUser } from "react-icons/ci"
// import {
//     useGetUserInfoQuery,
//     useUpdateUserInfoMutation,
// } from "../features/user/userApiSlice"

// const Profile = () => {
//     const inputRef = useRef(null)
//     const navigate = useNavigate()
//     const { data, isLoading: isLoadingUserData } = useGetUserInfoQuery()
//     const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation()
//     const userDetail = data?.metadata?.user

//     const [firstName, setFirstName] = useState(`${userDetail?.firstName || ""}`)
//     const [lastName, setLastName] = useState(`${userDetail?.lastName || ""}`)
//     const [address, setAddress] = useState(`${userDetail?.address || ""}`)
//     const [selectedFile, setSelectedFile] = useState(null)

//     if (isLoadingUserData) return <div>Loading...</div>
//     if (!data) return <div>Missing user!</div>
//     const onButtonClick = () => {
//         inputRef.current.click()
//     }
//     const canSave = Boolean(firstName) && Boolean(lastName) && Boolean(address)

//     const handleChangeFirstName = (e) => {
//         setFirstName(e.target.value)
//     }

//     const handleChangeLastName = (e) => {
//         setLastName(e.target.value)
//     }

//     const handleChangeAddress = (e) => {
//         setAddress(e.target.value)
//     }

//     const fileSelectedHandler = (e) => {
//         setSelectedFile(e.target.files[0])
//     }

//     const handleSubmitUpdate = async () => {
//         // console.log(firstName, lastName, address, selectedFile)
//         try {
//             await updateUserInfo({
//                 firstName,
//                 lastName,
//                 address,
//                 image: selectedFile,
//             }).unwrap()
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return (
//         <div className="my-4 flex">
//             <div className="flex flex-col pb-8 px-8 w-full">
//                 <div className="flex flex-row w-full">
//                     <div className="flex flex-1 flex-col">
//                         <h1 className="text-lg font-medium">
//                             Profile Information
//                         </h1>
//                         <div className="Profile-info-edit flex flex-col gap-8 border-r-2 border-[rgba(0,0,0,0.3)]">
//                             <div className="flex flex-row items-center gap-6 px-4 py-2">
//                                 <h1 className="text-sm">Login name:</h1>
//                                 <p className="text-sm">
//                                     {userDetail?.username}
//                                 </p>
//                             </div>
//                             <div className="flex flex-row items-center justify-between me-8 gap-6 px-4 py-2">
//                                 <h1 className="text-sm">First name:</h1>
//                                 <input
//                                     className="w-[450px] text-sm p-2 outline-none border border-[#ccc]"
//                                     type="text"
//                                     value={firstName || ""}
//                                     onChange={handleChangeFirstName}
//                                 />
//                             </div>
//                             <div className="flex flex-row items-center justify-between me-8 gap-6 px-4 py-2">
//                                 <h1 className="text-sm">Last name:</h1>
//                                 <input
//                                     className="w-[450px] text-sm p-2 outline-none border border-[#ccc]"
//                                     type="text"
//                                     value={lastName || ""}
//                                     onChange={handleChangeLastName}
//                                 />
//                             </div>
//                             <div className="flex flex-row items-center justify-between me-8 gap-6 px-4 py-2">
//                                 <h1 className="text-sm">Address:</h1>
//                                 <input
//                                     className="w-[450px] text-sm p-2 outline-none border border-[#ccc]"
//                                     type="text"
//                                     value={address || ""}
//                                     onChange={handleChangeAddress}
//                                 />
//                             </div>
//                             <div className="flex flex-row items-center gap-6 px-4 py-2">
//                                 <h1 className="text-sm">Email:</h1>
//                                 <p className="text-sm">
//                                     {userDetail?.email || ""}
//                                 </p>
//                                 <span
//                                     className="text-xs underline text-blue-700 cursor-pointer"
//                                     onClick={() =>
//                                         navigate("/member/verify/email")
//                                     }
//                                 >
//                                     Change
//                                 </span>
//                             </div>
//                             <div className="flex flex-row items-center gap-6 px-4 py-2">
//                                 <h1 className="text-sm">Phone number:</h1>
//                                 <p className="text-sm">
//                                     {userDetail?.phoneNumber || ""}
//                                 </p>
//                                 <span
//                                     className="text-xs underline text-blue-700 cursor-pointer"
//                                     onClick={() =>
//                                         navigate("/member/verify/phone")
//                                     }
//                                 >
//                                     Change
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="upload flex flex-col-reverse items-center justify-center w-[250px]">
//                         <input
//                             type="file"
//                             ref={inputRef}
//                             style={{ display: "none" }}
//                             onChange={fileSelectedHandler}
//                         />
//                         <button
//                             className="px-4 py-2 border mt-2"
//                             onClick={onButtonClick}
//                         >
//                             Pick file
//                         </button>
//                         <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
//                             {selectedFile ? (
//                                 <img
//                                     src={URL.createObjectURL(selectedFile)}
//                                     alt="Thumb"
//                                 />
//                             ) : (
//                                 <CiUser size={50} />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="button-submit">
//                     <button
//                         type="submit"
//                         disabled={!canSave}
//                         className="px-4 py-2 border mt-2 bg-[#ff0000] rounded text-white hover:bg-orange-500 cursor-pointer disabled:bg-red-400 disabled:cursor-none"
//                         onClick={() => handleSubmitUpdate()}
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile
