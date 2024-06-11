import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Routes/PrivateRoutes'

import Home from './Pages/Home'
import LoginIndividual from './Pages/Login/LoginIndividual'
import LoginCorporate from './Pages/Login/LoginCorporate'
import RegistrationPersonal from './Pages/Registration/RegistrationPersonal'
import RegistrationPartner from './Pages/Registration/RegistrationPartner'
import RegisterBusiness from './Pages/Registration/RegistrationBusiness'
import MyRoutes from './Routes/Routes'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {

  return (
    <div className="font-Manrope">
      <Router>
        <Navbar />
        <div className="flex flex-col h-[90vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PrivateRoutes><MyRoutes /></PrivateRoutes>} />
            <Route path="/login/personal" element={<LoginIndividual/>} />
            <Route path="/login/business" element={<LoginCorporate/>} />
            <Route path="/register/personal" element={<RegistrationPersonal/>} />
            <Route path="/register/business" element={<RegisterBusiness/>} />
            <Route path="/register/partner" element={<RegistrationPartner/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
