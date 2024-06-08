import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Routes/PrivateRoutes'

import Home from './Pages/Home'
import LoginIndividual from './Pages/Login/LoginIndividual'
import LoginCorporate from './Pages/Login/LoginCorporate'
import RegisterIndividual from './Pages/Registration/RegistrationIndividual'
import RegisterCorporate from './Pages/Registration/RegistrationCorporate'
import RegisterBusiness from './Pages/Registration/RegistrationBusiness'
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
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PrivateRoutes><MyRoutes /></PrivateRoutes>} />
            <Route path="/login/individual" element={<LoginIndividual/>} />
            <Route path="/login/corporate" element={<LoginCorporate/>} />
            <Route path="/register/individual" element={<RegisterIndividual/>} />
            <Route path="/register/corporate" element={<RegisterCorporate/>} />
            <Route path="/register/business" element={<RegisterBusiness/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
