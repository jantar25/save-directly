import axios from 'axios'
import AuthService from '../Components/AuthService'
import { userLoginStart,userLoginSuccess,userLoginFailure,userLogoutSuccess,updateUserProfileStart,
  updateUserProfileSuccess,updateUserProfileFailure } from './currentUserRedux'

const baseURL = import.meta.env.VITE_API_URL

export const apiRequest = axios.create({ baseURL:baseURL })
apiRequest.interceptors.request.use((config) => {
  const token = AuthService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// LOGIN USER
export const userLogin = async (dispatch,user) => {
  dispatch(userLoginStart())
  if (user.email === '' || user.password === '') {
    dispatch(userLoginFailure('All fields are required'))
    setTimeout(() => {
      dispatch(userLoginFailure(null))
    }, 5000)
  } else{
    try {
      const res = await apiRequest.post('/users/login',user, { timeout: 30000 })
      dispatch(userLoginSuccess(res.data.data))
      AuthService.setToken(res.data.token)
    } catch (error) {
      if (error.response) {
        dispatch(userLoginFailure(error.response?.data.message))
      } else {
        dispatch(userLoginFailure(error.message))
      }
      setTimeout(() => {
        dispatch(userLoginFailure(null))
      }, 5000)
    }
  }
}

// USER LOG OUT
export const userLogout = async (dispatch) => {
  dispatch(userLogoutSuccess())
  AuthService.removeToken()
}

// UPDATE A USER PROFILE
export const updateUserProfile = async (id,dispatch,fieldToUpdate,updatedUser) => {
  dispatch(updateUserProfileStart())
  try {
    await apiRequest.put(`/users/${id}`,fieldToUpdate,{ timeout: 30000 })
    dispatch(updateUserProfileSuccess({ updatedUser }))
  } catch (error) {
    if (error.response) {
      dispatch(updateUserProfileFailure(error.response.data.message))
    } else {
      dispatch(updateUserProfileFailure(error.message))
    }
    setTimeout(() => {
      dispatch(updateUserProfileFailure(null))
    }, 5000)
  }
}



