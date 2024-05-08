import { Outlet } from "react-router-dom"

import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {

  return (
    <>
      <div className='bg-white text-alternative'>
        <Navbar />
        <div className='h-[80vh]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
