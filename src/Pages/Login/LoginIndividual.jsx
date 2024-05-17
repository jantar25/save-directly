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

const LoginIndividual = () => {
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
    <div className='w-full h-full flex flex-col items-center justify-center p-2'>
      <Notification failure={error} color={'red'} />
      <h2 className='text-xl md:text-4xl font-bold text-center mb-2'>Individual<span className='text-main ml-2'>Account</span></h2>
      <p className='text-sm md:text-xl text-center text-gray-400 mb-8 w-[450px]'>
        Fill the form below to continue where you left with your saving.
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 rounded-lg' onSubmit={handleSubmit}>
          <div className="relative">
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-sm md:text-lg font-bold'>Telephone*</label>
              <div className="flex items-center border rounded-lg">
                <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-2 cursor-pointer'>
                   <p className=''>{Countries.find(option => option.dial_code === inputs.countryCode)?.dial_code}</p>
                </div>
                <input type='text' name='telephone' value={inputs.telephone} placeholder='0 7XX XXX XXX'
                  className={`w-full border rounded-lg p-2 outline-none ${validationErrors['Telephone'] ? 'border-red-extended' : 'border-gray-300'}`}
                  onChange={handleChangePhone} />
              </div>
              {validationErrors['Telephone'] && (
                <p className='text-red-extended text-sm'>{validationErrors['Telephone']}</p>
              )}
            </div>
            {toggleCountryCode &&
              <div className="absolute top-18 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className='h-[400px] overflow-y-auto' ref={dropDownCountyCodeRef}>
                  {Countries.map((option, index) => (
                    <MenuOption key={index} item={option} number handleClick={() => countryCodeHandler(option)} />
                  ))}
                </ul>
              </div>}
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
            <Link to='/register/individual'><span className='text-main font-bold ml-1'>Sign Up</span></Link>
          </p>
          <Link to='/forgetPassword/individual'><p className='text-main font-bold my-2 text-sm md:text-lg'>Forgot Password?</p></Link>
          <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Logging...' : 'Login In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginIndividual