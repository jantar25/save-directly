/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../Services/AuthService'
import { apiRequest } from '../Redux/ApiCalls'
import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'
import Loading from './Loading'

const PinInputModal = ({ names, setToggleInputPin, isTermsAgreed, setError, setInputs, setSuccess }) => {
  const navigate = useNavigate()
  const [passwordType, setPasswordType] = useState('password')
  const [isFetching, setIsFetching] = useState(false)
  const [password, setPassword] = useState('')

  const handlePasswordChange = (e) => {
    const { value } = e.target
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setPassword(value)
    }
    return
  }

  const togglePassword = () => {
    passwordType==='password'?
    setPasswordType('text') :
    setPasswordType('password')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password.length < 4 ) {
        setError('Password must be at least 4 numbers with no letters or special characters.')
        setTimeout(() => {
          setError(null)
        }, 5000)
    } else {
        setIsFetching(true)
        try {
            const response = await apiRequest.post('/individual/registration', { pin: password, isTermsAccepted: isTermsAgreed }, {
                headers: { 'Authorization': `Basic ${AuthService.getTemporaryToken()}`} })
            setSuccess(response.data.message)
            setIsFetching(false)
            AuthService.removeTemporaryToken()
            setInputs({
              indentitication:'',
              isTermsAgreed:false,
            })
            setToggleInputPin(false)
            setTimeout(() => {
              setSuccess(null)
              navigate("/login/individual")
            }, 5000)
        } catch (error) {
          console.log(error)
          setError(error.response.data.message)
          setIsFetching(false)
          setTimeout(() => {
            setError(null)
          }, 5000)
        }
    }
  }

  return (
    <div className='h-screen w-screen fixed bottom-0 left-0 right-0 top-0 z-40'>
      <div className='h-screen w-screen fixed top-0 bottom-0 left-0 right-0 bg-black/[0.7]'></div>
      <div className="absolute top-[30vh] left-0 right-0 mx-auto w-5/6 md:w-1/2 xl:w-1/3 max-h-[50%] rounded-lg bg-white text-black p-4 md:p-8">
        <div className='flex justify-end mb-2'>
          <button className='text-5xl font-bold text-main-dark' onClick={() => setToggleInputPin(null)}>&times;</button>
        </div>
        <div className="mb-4">
          <h2 className='text-xl md:text-4xl font-bold text-center mb-4'>Welcome <span className='text-main'>{names}</span></h2>
          <p className='text-sm md:text-lg text-center text-gray-400 mb-4'>
            Please set your PIN code to secure your account.
          </p>
        </div>
        <form className='w-full p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <label htmlFor="email" className='mb-1 text-sm md:text-lg font-bold'>PIN Code*</label>
          <div className="flex items-center border rounded-lg">
            <input type={passwordType} name='password' value={password} placeholder='Password'
              className='p-2 w-full rounded-lg' onChange={handlePasswordChange} />
            <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
              {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
            </div>
          </div>
          <button type='submit' className='mt-4 flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PinInputModal