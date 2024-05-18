import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'user'
const OPT_KEY = 'otp'

const AuthService = {
  getToken: () => {
    return Cookies.get(TOKEN_KEY)
  },

  getOTP: () => {
    return Cookies.get(OPT_KEY)
  },

  setToken: (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1 })
  },

  setOTP: (otp) => {
    Cookies.set(OPT_KEY, otp, { expires: 1 })
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY)
  },
  removeOTP: () => {
    Cookies.remove(OPT_KEY)
  },

  isTokenExpired: () => {
    const token = AuthService.getToken()
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
          return true
        }
      } catch (error) {
        return true
      }
    }
    return false
  },
}

export default AuthService