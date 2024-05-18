/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom'

import { registerUsers } from "../../Constants/usersTypes"
import UserTypeSelector from "../../Components/UserTypeSelector"

const Registration = () => {
  return (
    <div className='w-full h-full flex flex-col items-center lg:justify-center overflow-y-auto py-8'>
      <div>
        <h2 className='text-xl sm:text-4xl font-bold text-center mb-2'>Welcome to Save<span className='text-main'>Directly</span>!</h2>
        <p className='text-sm sm:text-xl text-center text-gray-400 mb-8 sm:w-[450px]'>
          Please Choose whether you are Individual, Corporate or Business.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {registerUsers.map((user, index) => <UserTypeSelector key={index} user={user} />)}
      </div>
      <p className='mt-16'>Do you have an account?
        <Link to='/login'><span className='text-main font-bold ml-1'>Sign In</span></Link>
      </p>
    </div>
  )
}

export default Registration