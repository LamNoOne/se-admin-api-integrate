import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
        },
        logOut: (state, action) => {
            state.user = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

// state, state.auth
export const selectCurrentUser = (state) => state.auth.user