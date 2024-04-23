import { Outlet } from "react-router-dom"

import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

const App = () => {

  return (
    <>
      <div className='px-4 md:px-8 lg:px-32 bg-white text-alternative'>
        <Navbar />
        <div className='min-h-[50vh]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
