/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthService from '../Services/AuthService'
import { apiRequest } from '../Redux/ApiCalls'
import PinInputModal from './PinInputModal'

import Loading from './Loading'

const PersonalInformation = ({ setError, setSuccess }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [names, setNames] = useState('')
  const [toggleInputPin, setToggleInputPin] = useState(false)
  const [inputs,setInputs] = useState({
    indentitication:'',
    isTermsAgreed:false,
  })

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }
    const handleTermsAndConditions = () => {
    setInputs({ ...inputs,isTermsAgreed:!inputs.isTermsAgreed })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!inputs.isTermsAgreed) return
    if(!inputs.indentitication) {
      setError('Please fill in all the required fields')
      setTimeout(() => {
        setError(null)
      }, 5000)
    } else {
      setIsFetching(true)
      try {
        const response = await apiRequest.get(`/lookup/${inputs.indentitication}`, {
          headers: { 'Authorization': `Basic ${AuthService.getTemporaryToken()}`} })

        setNames(`${response.data.firstname} ${response.data.lastname}`)
        setToggleInputPin(true)
        setIsFetching(false)
      } catch (error) {
        setError(error.response.data.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setIsFetching(false)
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <h2 className='text-xl md:text-4xl font-bold text-center mb-4'>Personal<span className='text-main ml-2'>Information</span></h2>
      <div className="w-full flex flex-col items-center justify-center">
        <form className='w-full lg:w-2/3 xl:w-1/2 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <div className="">
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>ID/Passport Number*</label>
              <input type='text' name='indentitication' value={inputs.indentitication} placeholder='Number'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
          </div>
          <div className='my-2'>
            <input type="checkbox" className='mr-1 accent-main cursor-pointer' checked={inputs.isTermsAgreed} required onChange={handleTermsAndConditions} />
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
            {isFetching? 'Verififying...' : 'Verify Identity'}
          </button>
        </form>
      </div>
      {toggleInputPin &&
        <PinInputModal
          names={names}
          setToggleInputPin={setToggleInputPin}
          isTermsAgreed={inputs.isTermsAgreed}
          setError={setError}
          setInputs={setInputs}
          setSuccess={setSuccess}
        />
      }
    </div>
  )
}

export default PersonalInformation