import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useClickOutside from '../../Hooks/useClickOutside'
import Countries from '../../Constants/Countries.json'
import { MenuOption } from '../../Utils/MenuOptions'
import Notification from '../../Components/Notification'
import Loading from '../../Components/Loading'
import { apiRequest } from '../../Redux/ApiCalls'
import partnerImg from '../../Assets/Images/partner.jpg'

const RegistrationPartner = () => {
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [toggleCountryCode, setToggleCountryCode] = useState(false)
  const [toggleCountry, setToggleCountry] = useState(false)
  const [inputs,setInputs] = useState({
    businessName:'',
    email:'',
    countryCode:'+250',
    telephone:'',
    tinNumber:'',
    pin: '',
    businessDescription:'',
    isTermsAccepted: false,
  })

  const closeCountryCode = () => setToggleCountryCode(false)
  const closeCountry = () => setToggleCountry(false)
  const dropDownCountyCodeRef = useClickOutside(closeCountryCode)

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const onClickHandler = (item) => {
    setInputs({ ...inputs,countryCode:item.dial_code })
    closeCountryCode()
  }

  const handleTermsAndConditions = () => {
    setInputs({ ...inputs,isTermsAccepted:!inputs.isTermsAccepted })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    setError(null);
    
    try {
      const payload = {
        businessName: inputs.businessName.trim(),
        email: inputs.email.trim(),
        telephone: `${inputs.countryCode.slice(1, inputs.countryCode.length)}${inputs.telephone.trim()}`,
        tinNumber: inputs.tinNumber.trim(),
        nationality: inputs.nationality,
        pin: inputs.pin.trim(),
        businessDescription: inputs.businessDescription.trim(),
        isTermsAccepted: inputs.isTermsAccepted ? 'Y' : 'N'
      };
      
      const response = await apiRequest.post('/corporate/registration', payload, { 
        headers: {
          "Content-Type": "application/json"
        }
      });
      const otpToken = response.data.token;
      localStorage.setItem('OTPToken', otpToken);
      setInputs({
        businessName: '',
        email: '',
        telephone: '',
        countryCode:'+250',
        tinNumber: '',
        pin: '',
        businessDescription: '',
        isTermsAccepted: '',
      })
      setIsFetching(false)
      navigate('/auth/verify-email');
    } catch (error) {
      console.log('error', error)
      setError(error.response?.data.message)
      setTimeout(() => {
        setError(null)
      }, 5000)

      setIsFetching(false)
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Notification failure={error} color={'red'} />
      <div className="flex flex-col items-center justify-center flex-1 h-full p-4 overflow-y-auto">
        <h2 className='mb-2 text-2xl font-bold text-center 2xl:text-4xl'>Register for <span className='text-main'>Corporate</span> Account</h2>
        <p className='text-sm 2xl:text-lg text-center text-gray-400 mb-4 max-w-[450px]'>
          Please fill out the form below to start saving and making deposits to your favorite brands.
        </p>
        <div className="flex flex-col items-center justify-center w-full">
          <form className='w-full p-2 p-4 border border-gray-300 rounded-lg xl:w-3/4 2xl:w-2/3 2xl:p-4' onSubmit={handleSubmit}>
            <div className="">
              <div className='flex flex-col w-full my-1'>
                <label htmlFor="email" className='text-sm font-bold 2xl:text-lg'>Business Name*</label>
                <input type='text' name='businessName' value={inputs.businessName} placeholder='Business Name'
                  className='p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
              </div>
              <div className='flex flex-col w-full my-1'>
                <label htmlFor="email" className='text-sm font-bold 2xl:text-lg'>Email*</label>
                <input type='email' name='email' value={inputs.email} placeholder='Email'
                  className='p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
              </div>
              <div className="relative">
                <div className='flex flex-col w-full my-1'>
                  <label htmlFor="Telephone" className='text-sm font-bold 2xl:text-lg'>Telephone*</label>
                  <div className="flex items-center border rounded-lg">
                    <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-1 cursor-pointer 2xl:p-2'>
                      <p className=''>{Countries.find(option => option.dial_code === inputs.countryCode)?.dial_code}</p>
                    </div>
                    <input type='text' name='telephone' value={inputs.telephone} placeholder='XXX XXX XXX'
                      className='w-full p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
                  </div>
                </div>
                {toggleCountryCode && <div className="absolute left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg top-18">
                    <ul ref={dropDownCountyCodeRef}>
                      {Countries.map((option, index) => (
                        <MenuOption key={index} item={option} handleClick={() => onClickHandler(option)} />
                      ))}
                    </ul>
                  </div>}
              </div>
              <div className='flex flex-col w-full my-1'>
                <label htmlFor="email" className='text-sm font-bold 2xl:text-lg'>Tin Number*</label>
                <input type='text' name='tinNumber' value={inputs.tinNumber} placeholder='Tin Number'
                  className='p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
              </div>
              <div className='flex flex-col w-full my-1'>
                <label htmlFor="email" className='text-sm font-bold 2xl:text-lg'>PIN*</label>
                <input type='text' name='pin' value={inputs.pin} placeholder='PIN'
                  className='p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
              </div>
              <div className='flex flex-col w-full my-1'>
                <label htmlFor="description" className='text-sm font-bold 2xl:text-lg'>Business Description*</label>
                <textarea type='text' name='businessDescription' value={inputs.businessDescription} placeholder='Tell us about your business'
                  className='p-1 border rounded-lg 2xl:p-2' onChange={handleChange} />
              </div>
            </div>
            <div className='my-1'>
              <input type="checkbox" className='mr-1 cursor-pointer accent-main' checked={inputs.isTermsAccepted} required onChange={handleTermsAndConditions} />
              <label htmlFor="agreeTerms">
                I agree to the
                <Link to='https://savedirectly.com/terms.html' target="_blank">
                  <span className='ml-1 font-bold text-main'>Terms and Conditions</span>
                </Link> and 
                <Link to='https://savedirectly.com/privacy.html' target="_blank">
                  <span className='ml-1 font-bold text-main'>Privacy Policy</span>.
                </Link>
              </label>
            </div>
            <button type='submit' className='flex items-center justify-start px-4 py-2 font-semibold text-white rounded-lg shadow-sm text-md bg-main' disabled={isFetching}>
              {isFetching && <div className="w-full mr-2 loading-spinner"><Loading color={'white'} /></div>}
              {isFetching? 'Registering...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden h-full bg-red-300 md:flex">
        <img src={partnerImg} alt="business registration" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}

export default RegistrationPartner