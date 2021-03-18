import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData : null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser : (state, action) => {
            state.userData = action.payload
        },
        removeUser : (state) => {
            state.userData = null;
        }
    }
});

export const {saveUser,removeUser} = userSlice.actions
export const selectUserData = state => state.user.userData
export default userSlice.reducer