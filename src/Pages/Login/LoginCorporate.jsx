/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { corporateLogin } from '../../Redux/ApiCalls'
import eye from '../../Assets/Icons/eye.svg'
import eyeCrossed from '../../Assets/Icons/eye-crossed.svg'

const LoginCorporate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginSuccess = await corporateLogin(dispatch,{ ...inputs })
    if (!loginSuccess) return
    setInputs({
      email:'',
      password:'',
    })
    navigate("/dashboard")
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-2'>
      <Notification failure={error} color={'red'} />
      <h2 className='text-xl md:text-4xl font-bold text-center mb-2'>Welcome <span className='text-main'>Back</span>!</h2>
      <p className='text-sm md:text-xl text-center text-gray-400 mb-8 w-[450px]'>
        Fill the form below to continue where you left with your saving.
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 rounded-lg' onSubmit={handleSubmit}>
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="email" className='mb-1 text-sm md:text-lg font-bold'>Email*</label>
            <input type='email' name='email' value={inputs.email} placeholder='Email'
              className='p-2 border rounded-lg' onChange={handleChange} />
          </div>
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="email" className='mb-1 text-sm md:text-lg font-bold'>PIN Code*</label>
            <div className="flex items-center border rounded-lg">
              <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                className='p-2 w-full rounded-lg' onChange={handleChange} />
              <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
              </div>
            </div>
          </div>
          <p className='my-2 text-sm md:text-lg'>Don&#39;t you have an account?
            <Link to='/register'><span className='text-main font-bold ml-1'>Sign Up</span></Link>
          </p>
          <Link to='/forgetPassword'><p className='text-main font-bold my-2 text-sm md:text-lg'>Forgot Password?</p></Link>
          <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Logging...' : 'Login In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginCorporate