import React from 'react'
import { useGetUserInfoQuery } from '../features/user/userApiSlice'
import Profile from './Profile'

const ProfileEdit = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery()
    let content
    if(isLoading) {
        content = <div>Loading...</div>
    } else if(isSuccess) {
        const userData = data?.metadata?.user
        content = <Profile {...userData}/>
    } else if(isError) {
        content = <div>{error}</div>
    }
  return content
}

export default ProfileEdit