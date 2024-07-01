/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { corporateLogin } from '../../Redux/ApiCalls'
import eye from '../../Assets/Icons/eye.svg'
import eyeCrossed from '../../Assets/Icons/eye-crossed.svg'
import businessImg from '../../Assets/Images/business-loggin.jpg'

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

    if (validateEmail(value, fieldName)) {
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
    const loginSuccess = await corporateLogin(dispatch,{ ...inputs })
    if (!loginSuccess) return
    setInputs({
      email:'',
      password:'',
    })
    navigate("/dashboard")
  }

  return (
    <div className='flex w-full h-full items-center justify-center overflow-y-auto'>
      <Notification failure={error} color={'red'} />
      <div className="h-full hidden lg:flex flex-1 bg-red-300">
        <img src={businessImg} alt="business registration" className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-2">
        <h2 className='text-2xl md:text-4xl font-bold text-center mb-2'>Merchant<span className='text-main ml-2'>Account</span></h2>
        <p className='text-md md:text-xl text-center text-gray-400 mb-8 max-w-[450px]'>
          Fill the form below to continue where you left with your saving.
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <form className='w-full md:w-1/2 xl:w-2/3 2xl:w-1/2 p-4 border border-gray-300 rounded-lg' onSubmit={handleSubmit}>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-sm md:text-lg font-bold'>Email*</label>
              <input type='email' name='email' value={inputs.email} placeholder='Email'
                className={`w-full border rounded-lg p-2 outline-none ${validationErrors['Email'] ? 'border-red-extended' : 'border-gray-300'}`}
                onChange={handleChangeEmail} />
              {validationErrors['Email'] && (
                <p className='text-red-extended text-sm'>{validationErrors['Email']}</p>
              )}
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
              <Link to='/auth/register/merchant'><span className='text-main font-bold ml-1'>Sign Up</span></Link>
            </p>
            {/* <Link to='/auth/forgetPassword'><p className='text-main font-bold my-2 text-sm md:text-lg'>Forgot Password?</p></Link> */}
            <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
              {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
              {isFetching? 'Logging...' : 'Login In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginBusiness