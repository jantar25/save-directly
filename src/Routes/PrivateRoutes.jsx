import { Navigate } from 'react-router-dom'

import AuthService from '../Services/AuthService'

const PrivateRoutes = () => {
    const token = AuthService.getToken()
    if (!token) {
        return <Navigate to="/login" />
      }
    return <Navigate to="/dashboard" />
}

export default PrivateRoutes