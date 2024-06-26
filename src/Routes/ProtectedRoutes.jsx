/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'

import AuthService from '../Services/AuthService'

const ProtectedRoutes = ({ children }) => {
    const token = AuthService.getToken()
    if (token) {
        return <Navigate to="/dashboard" />
      }
    return children
}

export default ProtectedRoutes