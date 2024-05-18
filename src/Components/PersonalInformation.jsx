import { useState } from 'react'
import { Link } from 'react-router-dom'
import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'

import Loading from './Loading'

const PersonalInformation = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [inputs,setInputs] = useState({
    indentitication:'',
    password:'',
    isTermsAgreed:false,
  })

  const togglePassword = () => {
    passwordType==='password'?
      setPasswordType('text') :
      setPasswordType('password')
  }

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }
    const handleTermsAndConditions = () => {
    setInputs({ ...inputs,isTermsAgreed:!inputs.isTermsAgreed })
  }

  const handleSubmit = async (e) => {
    setIsFetching(true)
    e.preventDefault
    console.log(inputs)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <h2 className='text-xl md:text-4xl font-bold text-center mb-4'>Personal<span className='text-main ml-2'>Information</span></h2>
      <div className="w-full flex flex-col items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <div className="">
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>Tin Number*</label>
              <input type='text' name='indentitication' value={inputs.email} placeholder='Number'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
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
        </form>
      </div>
    </div>
  )
}

export default PersonalInformation