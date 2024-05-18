/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthService from '../Services/AuthService'
import { apiRequest } from '../Redux/ApiCalls'
import useClickOutside from '../Hooks/useClickOutside'
import Countries from '../Constants/Countries.json'
import { MenuOption } from '../Utils/MenuOptions'
import Loading from './Loading'

const NumberLookup = ({ setError, setToggleOTP}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [toggleCountryCode, setToggleCountryCode] = useState(false)
  const [inputs,setInputs] = useState({
    countryCode:'RW',
    telephone:'',
  })

  const closeCountryCode = () => setToggleCountryCode(false)
  const dropDownCountyCodeRef = useClickOutside(closeCountryCode)

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const onClickHandler = (item) => {
    setInputs({ ...inputs,countryCode:item.code })
    closeCountryCode()
  }

  const handleSubmit = async (e) => {
    setIsFetching(true)
    e.preventDefault()
    try {
      const response = await apiRequest.post('/lookup/msisdn', {
        countryCode: inputs.countryCode,
        msisdn: inputs.telephone
      })
      setInputs({
        countryCode:'RW',
        telephone:'',
      })

      AuthService.setOTP(response.data.otp)
      AuthService.setTemporaryToken(response.data.registrationToken)
      setToggleOTP(true)
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
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <h2 className='text-xl md:text-4xl font-bold text-center mb-2'>Register for <span className='text-main'>Individual</span> Account</h2>
      <p className='text-sm md:text-lg text-center text-gray-400 mb-4 w-[450px]'>
      Please fill out the form below to start saving and making deposits to your favorite brands.
      </p>
      <div className="w-full flex flex-col items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <div className="relative">
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="Telephone" className='mb-1 text-sm md:text-lg font-bold'>Telephone*</label>
              <div className="flex items-center border rounded-lg">
                <div onClick={() => setToggleCountryCode(!toggleCountryCode)} className='p-2 cursor-pointer'>
                  <p className=''>{Countries.find(option => option.code === inputs.countryCode)?.dial_code}</p>
                </div>
                <input type='text' name='telephone' value={inputs.telephone} placeholder='XXX XXX XXX'
                  className='p-2 border rounded-lg w-full' onChange={handleChange} />
              </div>
            </div>
            {toggleCountryCode && <div className="absolute top-18 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className='h-[400px] overflow-y-auto' ref={dropDownCountyCodeRef}>
                  {Countries.map((option, index) => (
                    <MenuOption key={index} item={option} number handleClick={() => onClickHandler(option)} />
                  ))}
                </ul>
              </div>}
          </div>
          <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Verifying...' : 'Verify'}
          </button>
          <p className='my-2'>Do you have an account?
            <Link to='/login/individual'><span className='text-main font-bold ml-1'>Sign In</span></Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default NumberLookup