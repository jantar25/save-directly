import { useState } from 'react'
import { Link } from 'react-router-dom'

import Notification from '../Components/Notification'
import { NotificationTypes } from '../Types/Types'
import { apiKYCRequest } from '../Redux/apiCalls'
import Spinner from '../Components/Spinner'

const ForgetPassword = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<NotificationTypes>({ type: null, message: '' })
  const [validationErrors, setValidationErrors] = useState('')

  const isDisabled = validationErrors !== ''

  const validateEmail = (value, fieldName) => {
    if (!value) {
      setValidationErrors(`${fieldName} cannot be empty.`)
      return true
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setValidationErrors('Invalid email format.')
      return true
    }

    setValidationErrors('')
    return true
  }

  const handleChangeEmail = (e) => {
    const { value } = e.target
    const fieldName = 'Email'

    if (validateEmail(value, fieldName)) {
      setEmail(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setValidationErrors('Email cannot be empty.')
      return
    }
    setIsFetching(true)
    try {
      const response = await apiKYCRequest.post('/users/forgot/password', { email })
      if(response.status === 200) {
        setMessage({ type: 'success', message: response.data.message })
      }
      setIsFetching(false)
      setEmail('')
    } catch (error) {
      console.log(error)
      setMessage({ type: 'error', message: 'Something went wrong. Please try again later.' })
      setIsFetching(false)
    }
  }
  return (
    <div className='w-full min-h-[50vh] flex items-center justify-center my-24'>
      {message.type && (
        <Notification type={message.type} message={message.message } onClose={() => setMessage({ type: null, message: '' })}/>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h2 className='text-4xl font-bold text-main'>Forgot Password</h2>
          <p className='text-ld text-gray-500'>Please provide your registered  email to reset your password.</p>
        </div>
        <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-200 p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label htmlFor="" className='font-bold'>Email*</label>
              <input type="email" name='email' value={email}
                placeholder='Email'
                className={`w-full border rounded-lg p-2 outline-none ${validationErrors ? 'border-red-extended' : 'border-gray-300'}`}
                onChange={handleChangeEmail} />
              {validationErrors && (
                <p className='text-red-extended text-sm'>{validationErrors}</p>
              )}
            </div>
            <button
              type='submit'
              className={`w-full flex items-center justify-center px-4 py-2 mb-2 mt-8 text-md text-yellow-extended bg-main rounded-lg font-semibold shadow-sm ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-main-hover'}`}
              disabled={isFetching || isDisabled}>
              {isFetching && <div className="loading-spinner mr-2"><Spinner /></div>}
              {isFetching? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>
        <p className='my-2 text-sm md:text-lg'>Or
          <Link to='/login'><span className='font-bold ml-1 text-red-extended'>Sign In</span></Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPassword