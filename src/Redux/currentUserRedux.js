import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name:'currentUser',
  initialState:{
    currentUser: null,
    error: null,
    isFetching: false,
  },
  reducers:{
    // USER LOGIN
    userLoginStart:(state) => {
      state.isFetching=true
    },
    userLoginSuccess:(state,action) => {
      state.isFetching=false
      state.currentUser=action.payload
      state.error=null
    },
    userLoginFailure:(state,error) => {
      state.isFetching=false
      state.error=error.payload
    },
    // USER LOGOUT
    userLogoutSuccess:(state) => {
      state.currentUser= null
    },
    // UPDATE A USER
    updateUserProfileStart:(state) => {
      state.isFetching=true
      state.error=null
    },
    updateUserProfileSuccess:(state,action) => {
      state.isFetching=false
      state.currentUser = action.payload.updatedUser
      state.error=null
    },
    updateUserProfileFailure:(state,error) => {
      state.isFetching=false
      state.error=error.payload
    },
  }
})

export const { userLoginStart,userLoginSuccess,userLoginFailure,userLogoutSuccess,updateUserProfileStart,
  updateUserProfileSuccess,updateUserProfileFailure } = currentUserSlice.actions
export default currentUserSlice.reducer