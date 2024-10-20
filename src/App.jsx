import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import AuthService from './Services/AuthService'
import { userLogout } from './Redux/currentUserRedux'
import PrivateRoutes from './Routes/PrivateRoutes'
import ProtectedRoutes from './Routes/ProtectedRoutes'

import Home from './Pages/Home'
import AuthRoutes from './Routes/AuthRoutes'
import MyRoutes from './Routes/Routes'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (AuthService.isTokenExpired()) {
      userLogout(dispatch)
    }
  }, [])
  
  return (
    <div className="font-Manrope">
      <Router>
        <Navbar />
        <div className="flex flex-col min-h-[80vh] md:h-[80vh]">
          <Routes>
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/*" element={<PrivateRoutes><MyRoutes /></PrivateRoutes>} />
            <Route path="/auth/*" element={<ProtectedRoutes><AuthRoutes /></ProtectedRoutes>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
