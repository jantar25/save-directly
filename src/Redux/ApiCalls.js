import axios from 'axios'
import { Base64 } from 'js-base64'
import AuthService from '../Services/AuthService'
import { userLoginStart,userLoginSuccess,userLoginFailure,userLogoutSuccess,updateUserProfileStart,
  updateUserProfileSuccess,updateUserProfileFailure } from './currentUserRedux'
import { getMerchantResultsStart, getMerchantResultsSuccess, getMerchantResultsFailure } from './merchantsRedux'
import { getBalanceStart, getBalanceSuccess, getBalanceFailure } from './balanceRedux'
import { getMerchantMainDataSuccess, getMerchantMainDataFailure } from './merchantsMainDataRedux'


const baseURL = import.meta.env.VITE_API_URL
export const apiRequest = axios.create({ baseURL:baseURL })

apiRequest.interceptors.request.use(async (config) => {
  const token = AuthService.getToken()
  const isTokenExpired = AuthService.isTokenExpired()
  if (token && isTokenExpired) {
    // try {
    //   const newToken = await refreshToken()
    //   config.headers.Authorization = `Bearer ${newToken}`
    // } catch (error) {
    AuthService.removeToken()
    window.location.href = '/'
  } else if (token) {
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

export const getMerchants = async (dispatch) => {
  dispatch(getMerchantResultsStart())
  try {
    const res = await apiRequest.get('/product/list', { timeout: 30000 })
    if (res.data.status === 200) {
      dispatch(
        getMerchantResultsSuccess(res.data.data)
      )
      dispatch(
        getMerchantMainDataSuccess(res.data.data)
      )
    } else {
      dispatch(
        getMerchantResultsFailure({ type: 'error', message: res.data.message }),
      )
      dispatch(
        getMerchantMainDataFailure(),
      )
    }
  } catch (error) {
    dispatch(getMerchantResultsFailure({ type: null, message: '' }))
  }
}

export const getBalance = async (dispatch) => {
  dispatch(getBalanceStart())
  try {
    const res = await apiRequest.get('/inquiry/balance', { timeout: 30000 })
    if (res.data.status === 200) {
      dispatch(getBalanceSuccess(res.data))
    } else {
      dispatch(getBalanceFailure())
    }
  } catch (error) {
    dispatch(getBalanceFailure())
  }
}



