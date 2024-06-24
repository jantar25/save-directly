import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Routes/PrivateRoutes'
import ProtectedRoutes from './Routes/ProtectedRoutes'

import Home from './Pages/Home'
import AuthRoutes from './Routes/AuthRoutes'
import MyRoutes from './Routes/Routes'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {

  return (
    <div className="font-Manrope">
      <Router>
        <Navbar />
        <div className="flex flex-col min-h-[80vh] md:h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PrivateRoutes><MyRoutes /></PrivateRoutes>} />
            <Route path="/auth/*" element={<ProtectedRoutes><AuthRoutes /></ProtectedRoutes>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
