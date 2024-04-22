import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
import { userLogin } from '../Redux/ApiCalls'
import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'

const Login = () => {
  const dispatch = useDispatch()
  const { isFetching,error } = useSelector(state => state.currentUser)
  const [passwordType, setPasswordType] = useState('password')
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const togglePassword = () => {
    passwordType==='password'?
      setPasswordType('text') :
      setPasswordType('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin(dispatch,{ ...inputs })
    setInputs({
      email:'',
      password:'',
    })
  }

  return (
    <div className='px-4 md:px-20 py-16'>
      {/* <Notification failure={error} color={'red'} /> */}
      <h2 className='mb-8 text-4xl font-bold text-center'>Sign In</h2>
      <div className="flex items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border rounded-lg' onSubmit={handleSubmit}>
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="email" className='mb-1 text-lg font-bold'>Email*</label>
            <input type='email' name='email' value={inputs.email} placeholder='Email'
              className='p-2 border rounded-lg' onChange={handleChange} />
          </div>
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="email" className='mb-1 text-lg font-bold'>Password*</label>
            <div className="flex items-center border rounded-lg">
              <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                className='p-2 w-full rounded-lg' onChange={handleChange} />
              <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
              </div>
            </div>
          </div>
          <p className='my-2'>Don&#39;t you have an account?
            <Link to='/registration'><span className='text-headers font-bold ml-1'>Sign Up</span></Link>
          </p>
          <Link to='/forgetPassword'><p className='text-headers font-bold my-2'>Forgot Password?</p></Link>
          <button type='submit' className='login-text flex items-center justify-start px-4 py-2 text-md text-white bg-headers rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Logging...' : 'Login In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login