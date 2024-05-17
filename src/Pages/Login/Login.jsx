/* eslint-disable react/jsx-key */
import { Link } from 'react-router-dom'

import { loginUsers } from "../../Constants/usersTypes"
import UserTypeSelector from "../../Components/UserTypeSelector"

const Login = () => {

  return (
    <div className='w-full h-full flex flex-col items-center lg:justify-center overflow-y-auto py-8'>
      <div>
        <h2 className='text-xl sm:text-4xl font-bold text-center mb-2'>Welcome <span className='text-main'>Back</span>!</h2>
        <p className='text-sm sm:text-xl text-center text-gray-400 mb-8 sm:w-[450px]'>
        Choose whether you are Individual or an Corporate.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {loginUsers.map((user) => <UserTypeSelector user={user} />)}
      </div>
      <p className='mt-16 text-sm md:text-lg'>Don&#39;t you have an account?
        <Link to='/register'><span className='text-main font-bold ml-1'>Sign Up</span></Link>
      </p>
    </div>
  )
}

export default Login