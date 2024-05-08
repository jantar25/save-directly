import { Outlet } from 'react-router-dom'

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Dashboard = () => {
  return (
    <>
    <div >
      <Navbar />
      <div className='min-h-[50vh]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
  )
}

export default Dashboard