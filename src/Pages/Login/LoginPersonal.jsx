/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Countries from '../../Constants/Countries.json'
import { MenuOption } from '../../Utils/MenuOptions'
import useClickOutside from '../../Hooks/useClickOutside'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { individualLogin } from '../../Redux/ApiCalls'
import eye from '../../Assets/Icons/eye.svg'
import eyeCrossed from '../../Assets/Icons/eye-crossed.svg'
import personalImg from '../../Assets/Images/login.jpg'

const LoginPersonal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validationErrors, setValidationErrors] = useState({})
  const { isFetching,error } = useSelector(state => state.currentUser)
  const [toggleCountryCode, setToggleCountryCode] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [inputs,setInputs] = useState({
    countryCode:'+250',
    telephone:'',
    password:''
  })

  const closeCountryCode = () => setToggleCountryCode(false)
  const dropDownCountyCodeRef = useClickOutside(closeCountryCode)

  const validatePhone = (value, fieldName) => {
    if (!value) {
      setValidationErrors(errors => ({ ...errors, [`${fieldName}`]: `${fieldName} cannot be empty.` }))
      return true
    }
    const nameRegex = /^[1-9]\d{7,9}$/
    if (!nameRegex.test(value)) {
      setValidationErrors(errors => ({ ...errors, [`${fieldName}`]: 'Invalid phone number format' }))
      return true
    }
    setValidationErrors(errors => ({ ...errors, [`${fieldName}`]: '' }))
    return true
  }

  const handleChangePhone = (e) => {
    const { name, value } = e.target
    const fieldName = 'Telephone'
    if (validatePhone(value, fieldName)) {
      setInputs({ ...inputs, [name]: value })
    }
  }

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const countryCodeHandler = (item) => {
    setInputs({ ...inputs,countryCode:item.dial_code })
    closeCountryCode()
  }

  const togglePassword = () => {
    passwordType==='password'?
      setPasswordType('text') :
      setPasswordType('password')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginSuccess = await individualLogin(dispatch,{ ...inputs })
    if (!loginSuccess) return
    setInputs({
      countryCode:'+250',
      telephone:'',
      password:'',
    })
    navigate("/dashboard")
  }

  return (
    <div className='flex items-center justify-center w-full h-full overflow-y-auto'>
      <Notification failure={error} color={'red'} />
      <div className="flex-1 hidden h-full bg-red-300 lg:flex">
        <img src={personalImg} alt="business registration" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full p-2">
        <h2 className='mb-2 text-2xl font-bold text-center md:text-4xl'>Personal<span className='ml-2 text-main'>Account</span></h2>
        <p className='text-md md:text-xl text-center text-gray-400 mb-8 max-w-[450px]'>
          Fill the form below to continue where you left with your saving.
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <form className='w-full p-4 border border-gray-300 rounded-lg md:w-1/2 xl:w-2/3 2xl:w-1/2' onSubmit={handleSubmit}>
            <div className="relative">
              <div className='flex flex-col w-full my-2'>
                <label htmlFor="email" className='mb-1 text-sm font-bold md:text-lg'>Telephone*</label>
                <div className="flex items-center border rounded-lg">
                  <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-2 cursor-pointer'>
                    <p className=''>{Countries.find(option => option.dial_code === inputs.countryCode)?.dial_code}</p>
                  </div>
                  <input type='text' name='telephone' value={inputs.telephone} placeholder='7XX XXX XXX'
                    className={`w-full border rounded-lg p-2 outline-none ${validationErrors['Telephone'] ? 'border-red-extended' : 'border-gray-300'}`}
                    onChange={handleChangePhone} />
                </div>
                {validationErrors['Telephone'] && (
                  <p className='text-sm text-red-extended'>{validationErrors['Telephone']}</p>
                )}
              </div>
              {toggleCountryCode &&
                <div className="absolute left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg top-18">
                  <ul className='h-[400px] overflow-y-auto' ref={dropDownCountyCodeRef}>
                    {Countries.map((option, index) => (
                      <MenuOption key={index} item={option} number handleClick={() => countryCodeHandler(option)} />
                    ))}
                  </ul>
                </div>}
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
              <Link to='/auth/register/personal'><span className='ml-1 font-bold text-main'>Sign Up</span></Link>
            </p>
            {/* <Link to='/auth/forgetPassword'><p className='my-2 text-sm font-bold text-main md:text-lg'>Forgot Password?</p></Link> */}
            <button type='submit' className='flex items-center justify-start px-4 py-2 font-semibold text-white rounded-lg shadow-sm text-md bg-main' disabled={isFetching}>
              {isFetching && <div className="w-full mr-2 loading-spinner"><Loading color={'white'} /></div>}
              {isFetching? 'Logging...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPersonal