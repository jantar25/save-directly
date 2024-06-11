import { useState } from 'react'
import { Link } from 'react-router-dom'

import useClickOutside from '../../Hooks/useClickOutside'
import Countries from '../../Constants/Countries.json'
import { MenuOption } from '../../Utils/MenuOptions'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { apiRequest } from '../../Redux/ApiCalls'
import eye from '../../Assets/Icons/eye.svg'
import eyeCrossed from '../../Assets/Icons/eye-crossed.svg'
import businessImg from '../../Assets/Images/business.jpg'

const RegistrationBusiness = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')
  const [toggleCountryCode, setToggleCountryCode] = useState(false)
  const [toggleCountry, setToggleCountry] = useState(false)
  const [inputs,setInputs] = useState({
    fullName:'',
    countryCode:'+250',
    telephone:'',
    email:'',
    nationality:'RW',
    indentitication:'',
    isTermsAgreed:false,
  })

  const closeCountryCode = () => setToggleCountryCode(false)
  const closeCountry = () => setToggleCountry(false)
  const dropDownCountyCodeRef = useClickOutside(closeCountryCode)
  const dropDownCountryRef = useClickOutside(closeCountry)

  const togglePassword = () => {
    passwordType==='password'?
      setPasswordType('text') :
      setPasswordType('password')
  }

  const toggleConfirmPassword = () => {
    passwordType==='password'?
    setConfirmPasswordType('text') :
    setConfirmPasswordType('password')
  }

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const onClickHandler = (item) => {
    setInputs({ ...inputs,countryCode:item.value })
    closeCountryCode()
  }

  const handleTermsAndConditions = () => {
    setInputs({ ...inputs,isTermsAgreed:!inputs.isTermsAgreed })
  }

  const onClickHandlerCountry = (item) => {
    setInputs({ ...inputs,nationality:item.value })
    closeCountryCode()
  }

  const handleSubmit = async (e) => {
    setIsFetching(true)
    e.preventDefault()
    try {
      const response = await apiRequest.post('/lookup/msisdn',{ countryCode: inputs.countryCode,msisdn:inputs.telephone })
      setInputs({
        countryCode:'+250',
        telephone:'',
        email:'',
        password:'',
      })
      console.log(response)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      setError(error.response?.data.message)
      setTimeout(() => {
        setError(null)
      }, 5000)

      setIsFetching(false)
    }
  }

  return (
    <div className='w-full h-full flex items-center justify-center overflow-y-auto'>
      <Notification failure={error} color={'red'} />
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-2">
        <h2 className='text-xl md:text-4xl font-bold text-center mb-2'>Register for <span className='text-main'>Business</span> Account</h2>
        <p className='text-sm md:text-lg text-center text-gray-400 mb-4 max-w-[450px]'>
          Please fill out the form below to start saving and making deposits to your favorite brands.
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <form className='w-full xl:w-3/4 2xl:w-1/2 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
            <div className="">
              <div className='flex flex-col w-full my-2'>
                <label htmlFor="email" className='mb-1 text-lg font-bold'>Business Name*</label>
                <input type='text' name='name' value={inputs.telephone} placeholder='Name'
                  className='p-2 border rounded-lg' onChange={handleChange} />
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className='flex-1 flex flex-col w-full my-2'>
                  <label htmlFor="email" className='mb-1 text-lg font-bold'>Email*</label>
                  <input type='email' name='email' value={inputs.email} placeholder='Email'
                    className='p-2 border rounded-lg' onChange={handleChange} />
                </div>
                <div className="flex-1 w-full relative">
                  <div className='flex flex-col w-full my-2'>
                    <label htmlFor="Telephone" className='mb-1 text-sm md:text-lg font-bold'>Telephone*</label>
                    <div className="flex items-center border rounded-lg">
                      <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-2 cursor-pointer'>
                        <p className=''>{Countries.find(option => option.dial_code === inputs.countryCode)?.dial_code}</p>
                      </div>
                      <input type='text' name='telephone' value={inputs.telephone} placeholder='0 7XX XXX XXX'
                        className='p-2 border rounded-lg w-full' onChange={handleChange} />
                    </div>
                  </div>
                  {toggleCountryCode &&
                    <div className="absolute top-18 left-0 z-50 w-[320px] h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
                      <ul ref={dropDownCountyCodeRef}>
                        {Countries.map((option, index) => (
                          <MenuOption key={index} item={option} handleClick={() => onClickHandler(option)} />
                        ))}
                      </ul>
                    </div>}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className="flex-1 w-full relative">
                  <div className='flex flex-col w-full my-2'>
                    <label htmlFor="Telephone" className='mb-1 text-sm md:text-lg font-bold'>Nationality*</label>
                    <div className="flex items-center border rounded-lg" onClick={() => setToggleCountry(!toggleCountry)}>
                      <div className='p-2 cursor-pointer'>
                        <p className='w-6 h-4'>{Countries.find(option => option.code === inputs.nationality)?.flag}</p>
                      </div>
                      <p className='p-2 border rounded-lg w-full'>{Countries.find(option => option.code === inputs.nationality)?.name}</p>
                    </div>
                  </div>
                  {toggleCountry &&
                    <div className="absolute top-18 left-0 z-50 w-[320px] h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
                      <ul ref={dropDownCountryRef}>
                        {Countries.map((option, index) => (
                          <MenuOption key={index} item={option} handleClick={() => onClickHandlerCountry(option)} />
                        ))}
                      </ul>
                    </div>}
                </div>
                <div className='flex-1 flex flex-col w-full my-2'>
                  <label htmlFor="email" className='mb-1 text-lg font-bold'>Tin Number*</label>
                  <input type='text' name='indentitication' value={inputs.email} placeholder='Number'
                    className='p-2 border rounded-lg' onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-2">
                <div className='flex flex-col w-full my-2'>
                  <label htmlFor="password" className='mb-1 text-sm md:text-lg font-bold'>Password*</label>
                  <div className="flex items-center border rounded-lg">
                    <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                      className='p-2 w-full rounded-lg' onChange={handleChange} />
                    <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                      {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full my-2'>
                  <label htmlFor="confirmPassword" className='mb-1 text-sm md:text-lg font-bold'>Confirm Password*</label>
                  <div className="flex items-center border rounded-lg">
                    <input type={confirmPasswordType} name='confirmPassword' value={inputs.password} placeholder='Password'
                      className='p-2 w-full rounded-lg' onChange={handleChange} />
                    <div onClick={toggleConfirmPassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                      {confirmPasswordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full my-2'>
                <label htmlFor="address" className='mb-1 text-lg font-bold'>Address*</label>
                <input type='text' name='address' value={inputs.telephone} placeholder='Address'
                  className='p-2 border rounded-lg' onChange={handleChange} />
              </div>
            </div>
            <div className='my-2'>
              <input type="checkbox" className='mr-1 accent-main cursor-pointer' checked={inputs.isTermsAgreed} required onClick={handleTermsAndConditions} />
              <label htmlFor="agreeTerms">
              I agree to the
              <Link to='https://savedirectly.com/terms.html' target="_blank">
                <span className='text-main font-bold ml-1'>Terms and Conditions</span>
              </Link> and 
              <Link to='https://savedirectly.com/privacy.html' target="_blank">
                <span className='text-main font-bold ml-1'>Privacy Policy</span>.
              </Link>
            </label>
            </div>
            <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
              {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
              {isFetching? 'Registering...' : 'Sign Up'}
            </button>
            <p className='my-2'>Do you have an account?
              <Link to='/auth/login/business'><span className='text-main font-bold ml-1'>Sign In</span></Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:flex flex-1 h-full">
        <img src={businessImg} alt="business registration" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default RegistrationBusiness