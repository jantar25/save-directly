/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { apiRequest } from '../Redux/ApiCalls'
import Notification from './Notification'
import Loading from './Loading'
import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'

// eslint-disable-next-line react/prop-types
const SavingModal = ({ product, merchant, onClose }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [inputs, setInputs] = useState({
    amount: 0,
    password: ''
  })
  const [passwordType, setPasswordType] = useState('password')
  const togglePassword = () => {
    passwordType==='password'? setPasswordType('text') : setPasswordType('password')
  }

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const isFieldEmpty = inputs.amount <= 0 || inputs.password === ""

  const startSaving = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await apiRequest.post('/saving/process', {
        merchantId: merchant?.merchantId        ,
        productId: product?.merchantProductId,
        amount: inputs.amount,
        pin: inputs.password,
        source: "APP"
      }, {timeout: 30000})
      setIsLoading(false)
      if(response.data.status === 201){
        onClose()
        navigate('/payment-request')
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if(error.response) {
        setError(error.response?.data.message)
      } else {
        setError(error.message)
      }
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div className='h-screen w-screen fixed bottom-0 left-0 right-0 top-0 z-50'>
      <Notification failure={error} color={'red'} />
      <div className='h-screen w-screen fixed top-0 bottom-0 left-0 right-0 bg-black/[0.5]'></div>
      <div role="dialog" className="absolute top-32 left-0 right-0 mx-auto w-5/6 md:w-1/2 xl:w-1/3 max-h-[50%] rounded-lg bg-white text-black p-4 md:p-8">
        <div className='flex justify-end'>
          <button className='text-2xl font-bold text-main' onClick={onClose}>&times;</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className='text-center mb-4 font-bold text-xl md:text-3xl'>Start Saving</h2>
          <p className='text-center mb-6 text-sm md:text-lg text-main font-bold'>
            You are about to start saving on the {product?.merchantProductName} form {merchant?.merchantName}
          </p>
          <form className="w-full" onSubmit={startSaving}>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="password" className='mb-1 text-sm md:text-lg font-bold'>Amount*</label>
              <div className="flex items-center border rounded-lg">
                <input type='number' name='amount' value={inputs.amount} placeholder='Enter amount'
                  className='p-2 w-full rounded-lg' onChange={handleChange} />
              </div>
            </div>
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="password" className='mb-1 text-sm md:text-lg font-bold'>PIN Code*</label>
              <div className="flex items-center border rounded-lg">
                <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                  className='p-2 w-full rounded-lg' onChange={handleChange} />
                <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                  {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                </div>
              </div>
            </div>
            <button
              type='submit'
              className={`flex items-center justify-start px-4 py-2 text-md bg-main text-white font-semibold rounded-lg font-semibold shadow-sm
                ${isFieldEmpty || isLoading ? 'opacity-70 cursor-not-allowed': ''}`}
              disabled={isLoading || isFieldEmpty}
            >
              {isLoading && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
              {isLoading? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SavingModal