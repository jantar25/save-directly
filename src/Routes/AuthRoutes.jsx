import { Routes, Route } from 'react-router-dom'

import LoginPersonal from '../Pages/Login/LoginPersonal'
import LoginBusiness from '../Pages/Login/LoginBusiness'
import RegistrationPersonal from '../Pages/Registration/RegistrationPersonal'
import RegistrationPartner from '../Pages/Registration/RegistrationPartner'
import RegisterBusiness from '../Pages/Registration/RegistrationBusiness'
// import RoleBasedRoutes from '@/components/Dashboard/RoleBasedRoutes'


const AuthRoutes = () => {
  return (
    <div className="flex-1 h-full w-full overflow-y-auto">
      <Routes>
        <Route path="/login/personal" element={<LoginPersonal/>} />
        <Route path="/login/merchant" element={<LoginBusiness/>} />
        <Route path="/register/personal" element={<RegistrationPersonal/>} />
        <Route path="/register/merchant" element={<RegisterBusiness/>} />
        <Route path="/register/corporate" element={<RegistrationPartner/>} />
      </Routes>
    </div>
    )
}

export default AuthRoutes