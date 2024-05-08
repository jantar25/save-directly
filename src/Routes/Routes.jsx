import { Routes, Route } from 'react-router-dom'

import Dashboard from '../Pages/Dashboard'
import Profile from '../Pages/Profile'
// import RoleBasedRoutes from '@/components/Dashboard/RoleBasedRoutes'


const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/profile' element={<Profile />} />
      {/* <Route path='/announcements' element={<Announcement />} />
      <Route path='/verification-requests' element={<RoleBasedRoutes><Verifications /></RoleBasedRoutes>} />
      <Route path='/speed-test' element={<RoleBasedRoutes><SpeedTest /></RoleBasedRoutes>} /> */}
    </Routes>
    )
}

export default MyRoutes