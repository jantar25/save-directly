import { Routes, Route } from 'react-router-dom'

import Dashboard from '../Pages/Dashboard'
import Profile from '../Pages/Profile'
import Products from '../Pages/Products'
// import RoleBasedRoutes from '@/components/Dashboard/RoleBasedRoutes'


const MyRoutes = () => {
  return (
    <div className="overflow-y-auto">
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products/:productId' element={<Products />} />
        {/* <Route path='/Account' element={<SpeedTest />} /> */}
      </Routes>
    </div>
    )
}

export default MyRoutes