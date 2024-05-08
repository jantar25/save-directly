import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import useClickOutside from '../Hooks/useClickOutside'
import { countryCodeOptions, countryOptions } from '../Constants/navigations'
import { MenuOption } from '../Utils/MenuOptions'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
import { userLogin } from '../Redux/ApiCalls'

const Registration = () => {
  const dispatch = useDispatch()
  const { isFetching,error } = useSelector(state => state.currentUser)
  const [toggleCountryCode, setToggleCountryCode] = useState(false)
  const [toggleCountry, setToggleCountry] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState('CLIENT')
  const [inputs,setInputs] = useState({
    fullName:'',
    countryCode:'+250',
    telephone:'',
    email:'',
    nationality:'RWANDA',
    indentitication:'',
    isTermsAgreed:false,
  })

  const closeCountryCode = () => setToggleCountryCode(false)
  const closeCountry = () => setToggleCountry(false)
  const dropDownCountyCodeRef = useClickOutside(closeCountryCode)
  const dropDownCountryRef = useClickOutside(closeCountry)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin(dispatch,{ ...inputs })
    setInputs({
      countryCode:'+250',
      telephone:'',
      email:'',
      password:'',
    })
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-2 my-16'>
      <Notification failure={error} color={'red'} />
      <h2 className='text-xl md:text-4xl font-bold text-center mb-2'>Welcome to Save<span className='text-main'>Directly</span>!</h2>
      <p className='text-sm md:text-lg text-center text-gray-400 mb-4 w-[450px]'>
        Please fill out the form below to start saving and making deposits to your favorite brands.
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        <div className='flex items-center justify-center mb-4'>
          {[{ id: 'CLIENT', label: 'Client' }, { id: 'COORPORATE', label: 'Coorporate' }, { id: 'BUSINESS', label: 'Business' }]
          .map((option) => (
            <div key={option.id} className="flex items-center">
              <p
                className={`cursor-pointer text-xl font-bold  ease-in duration-200 border-b-4 px-4 py-2
                ${selectedUserType === option.id ? 'text-main border-main' : 'text-gray-400 border-gray-300'}`}
                onClick={() => setSelectedUserType(option.id)}>{option.label}
              </p>
              {/* {index !== 2 && <span className="px-2 text-gray-400">|</span>} */}
            </div>
          ))}
        </div>
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <div className="">
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>{selectedUserType === 'CLIENT'? 'Full' : 'Business'} Name*</label>
              <input type='text' name='name' value={inputs.telephone} placeholder='Name'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
            <div className="relative">
              <div className='flex flex-col w-full my-2'>
                <label htmlFor="Telephone" className='mb-1 text-sm md:text-lg font-bold'>Telephone*</label>
                <div className="flex items-center border rounded-lg">
                  <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-2 cursor-pointer'>
                    <img src={countryCodeOptions.find(option => option.value === inputs.countryCode)?.flag} alt='country-flag' className='w-6 h-4' />
                  </div>
                  <input type='text' name='telephone' value={inputs.telephone} placeholder='0 7XX XXX XXX'
                    className='p-2 border rounded-lg w-full' onChange={handleChange} />
                </div>
              </div>
              {toggleCountryCode && <div className="absolute top-18 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul ref={dropDownCountyCodeRef}>
                    {countryCodeOptions.map((option, index) => (
                      <MenuOption key={index} item={option} handleClick={() => onClickHandler(option)} />
                    ))}
                  </ul>
                </div>}
            </div>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>Email*</label>
              <input type='email' name='email' value={inputs.email} placeholder='Email'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
            <div className="relative">
              <div className='flex flex-col w-full my-2'>
                <label htmlFor="Telephone" className='mb-1 text-sm md:text-lg font-bold'>Nationality*</label>
                <div className="flex items-center border rounded-lg" onClick={() => setToggleCountry(!toggleCountry)}>
                  <div className='p-2 cursor-pointer'>
                    <img src={countryOptions.find(option => option.value === inputs.nationality)?.flag} alt='country-flag' className='w-6 h-4' />
                  </div>
                  <p className='p-2 border rounded-lg w-full'>{countryOptions.find(option => option.value === inputs.nationality)?.label}</p>
                </div>
              </div>
              {toggleCountry && <div className="absolute top-18 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul ref={dropDownCountryRef}>
                    {countryOptions.map((option, index) => (
                      <MenuOption key={index} item={option} handleClick={() => onClickHandlerCountry(option)} />
                    ))}
                  </ul>
                </div>}
            </div>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>{selectedUserType === 'CLIENT'? 'ID/Passport' : 'Tin'} Number*</label>
              <input type='text' name='indentitication' value={inputs.email} placeholder='Number'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
          </div>
          <div className='my-2'>
            <input type="checkbox" className='mr-1 accent-main cursor-pointer' checked={inputs.isTermsAgreed} required onClick={handleTermsAndConditions} />
            <label htmlFor="agreeTerms">
              I agree to the<Link to='/termsAndConditions'>
                <span className='text-main font-bold ml-1'>Terms and Conditions</span>.
              </Link>
            </label>
          </div>
          <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Registering...' : 'Sign Up'}
          </button>
          <p className='my-2'>Do you have an account?
            <Link to='/login'><span className='text-main font-bold ml-1'>Sign In</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration