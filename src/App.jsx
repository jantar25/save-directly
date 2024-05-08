import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Routes/PrivateRoutes'

import Login from './Pages/Login'
import Register from './Pages/Registration'
import MyRoutes from './Routes/Routes'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {

  return (
    <div className="font-Manrope">
      <Router>
        <Navbar />
        <div className="h-[80vh]">
          <Routes>
            <Route path="/*" element={<PrivateRoutes><MyRoutes /></PrivateRoutes>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
