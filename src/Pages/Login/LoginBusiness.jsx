/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { apiRequest, corporateLogin } from '../../Redux/ApiCalls'
import eye from '../../Assets/Icons/eye.svg'
import eyeCrossed from '../../Assets/Icons/eye-crossed.svg'
import businessImg from '../../Assets/Images/business-loggin.jpg'
import { userLoginSuccess } from '../../Redux/currentUserRedux'
import AuthService from '../../Services/AuthService'

const LoginBusiness = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFetching,error } = useSelector(state => state.currentUser)
  const [passwordType, setPasswordType] = useState('password')
  const [validationErrors, setValidationErrors] = useState({})
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const validateEmail = (value, fieldName) => {
    if (!value) {
      setValidationErrors(errors => ({ ...errors, [fieldName]: `${fieldName} cannot be empty.` }))
      return true
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setValidationErrors(errors => ({ ...errors, [fieldName]: 'Invalid email format.' }))
      return true
    }

    setValidationErrors(errors => ({ ...errors, [fieldName]: '' }))
    return true
  }

  const handleChangeEmail = (e) => {
    const { name, value } = e.target
    const fieldName = 'Email'

    if (true) {
      setInputs({ ...inputs, [name]: value })
    }
  }


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

    try {
      const response = await apiRequest.get('/authenticate/corporate', {
        auth:{
          username: inputs.email,
          password: inputs.password
        }
      })
      const currentUser = response.data
      setInputs({
        email:'',
        password:'',
      })
      dispatch(userLoginSuccess(currentUser))
      AuthService.setToken(currentUser.accessToken)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error occurred", error)
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-full overflow-y-auto'>
      <Notification failure={error} color={'red'} />
      <div className="flex-1 hidden h-full bg-red-300 lg:flex">
        <img src={businessImg} alt="business registration" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full p-2">
        <h2 className='mb-2 text-2xl font-bold text-center md:text-4xl'>Merchant<span className='ml-2 text-main'>Account</span></h2>
        <p className='text-md md:text-xl text-center text-gray-400 mb-8 max-w-[450px]'>
          Fill the form below to continue where you left with your saving.
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <form className='w-full p-4 border border-gray-300 rounded-lg md:w-1/2 xl:w-2/3 2xl:w-1/2' onSubmit={handleSubmit}>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-sm font-bold md:text-lg'>TIN Number*</label>
              <input name='email' value={inputs.email} placeholder='Email'
                className={`w-full border rounded-lg p-2 outline-none ${validationErrors['Email'] ? 'border-red-extended' : 'border-gray-300'}`}
                onChange={handleChangeEmail} />
              {validationErrors['Email'] && (
                <p className='text-sm text-red-extended'>{validationErrors['Email']}</p>
              )}
            </div>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-sm font-bold md:text-lg'>PIN Code*</label>
              <div className="flex items-center border rounded-lg">
                <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                  className='w-full p-2 rounded-lg' onChange={handleChange} />
                <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                  {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                </div>
              </div>
            </div>
            <p className='my-2 text-sm md:text-lg'>Don&#39;t you have an account?
              <Link to='/auth/register/merchant'><span className='ml-1 font-bold text-main'>Sign Up</span></Link>
            </p>
            {/* <Link to='/auth/forgetPassword'><p className='my-2 text-sm font-bold text-main md:text-lg'>Forgot Password?</p></Link> */}
            <button type='submit' className='flex items-center justify-start px-4 py-2 font-semibold text-white rounded-lg shadow-sm text-md bg-main' disabled={isFetching}>
              {isFetching && <div className="w-full mr-2 loading-spinner"><Loading color={'white'} /></div>}
              {isFetching? 'Logging...' : 'Login In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginBusiness