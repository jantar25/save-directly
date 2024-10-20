/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'

import AuthService from '../Services/AuthService'

const PrivateRoutes = ({ children }) => {
    const token = AuthService.getToken()
    if (!token) {
        return <Navigate to="/" />
      }
    return children
}

export default PrivateRoutes