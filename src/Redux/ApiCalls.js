import axios from 'axios'
import { Base64 } from 'js-base64'
import AuthService from '../Services/AuthService'
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
export const individualLogin = async (dispatch, user) => {
  dispatch(userLoginStart())
  if (user.telephone === '' || user.password === '' || user.countryCode === '') {
    dispatch(userLoginFailure('All fields are required'))
    setTimeout(() => {
      dispatch(userLoginFailure(null))
    }, 5000)
    return false
  } else{
    try {
      const credentials = Base64.encode(`${user.countryCode.replace('+', '')}${user.telephone}:${user.password}`)
      const res = await apiRequest.get('/authenticate', {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      } , { timeout: 30000 })
      const { accessToken, ...loggedInUser } = res.data
      dispatch(userLoginSuccess(loggedInUser))
      AuthService.setToken(accessToken)
      return true
    } catch (error) {
      if (error.response) {
        dispatch(userLoginFailure(error.response?.data.message))
      } else {
        dispatch(userLoginFailure(error.message))
      }
      setTimeout(() => {
        dispatch(userLoginFailure(null))
      }, 5000)
      return false
    }
  }
}

// LOGIN USER
export const corporateLogin = async (dispatch,user) => {
  dispatch(userLoginStart())
  if (user.email === '' || user.password === '') {
    dispatch(userLoginFailure('All fields are required'))
    setTimeout(() => {
      dispatch(userLoginFailure(null))
    }, 5000)
    return false
  } else{
    try {
      dispatch(userLoginSuccess(user))
      AuthService.setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
      return true
    } catch (error) {
      if (error.response) {
        dispatch(userLoginFailure(error.response?.data.message))
      } else {
        dispatch(userLoginFailure(error.message))
      }
      setTimeout(() => {
        dispatch(userLoginFailure(null))
      }, 5000)
      return false
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



