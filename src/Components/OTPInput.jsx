/* eslint-disable react/prop-types */
import { useState } from 'react'
import AuthService from '../Services/AuthService'

const OTPInput = ({ setError, setToggleOTP, setTogglePersonalInfo }) => {
  const OTPlength = 6
  const [otp, setOtp] = useState(new Array(OTPlength).fill(''))

  const checkOTP = (otp) => {
    if (otp.length === OTPlength) {
      const storedOTP = AuthService.getOTP()
      if(otp === storedOTP) {
        AuthService.removeOTP()
        setToggleOTP(false)
        setTogglePersonalInfo(true)
      } else {
        setError('Invalid code, please try again.')
        setTimeout(() => {
          setError(null)
        }, 5000)
      
      }
    }
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    let newOtp = [...otp];
    newOtp[index] = element.value
    setOtp(newOtp)

    if (element.nextSibling && element.value) {
      element.nextSibling.focus()
    }

    checkOTP(newOtp.join(''))
  }

  const goBack = () => {
    AuthService.removeOTP()
    AuthService.removeTemporaryToken()
    setToggleOTP(false)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <h2 className='text-xl md:text-4xl font-bold text-center mb-4'>Mobile Number<span className='text-main ml-2'>Verification</span></h2>
      <div className="flex items-center justify-center">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            className="w-12 md:w-24 h-12 md:h-24 text-2xl text-4xl outline-none text-center border-2 border-main rounded-lg m-2"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
        <p className='mt-8 text-md'>Didn&apos;t receive the code?
          <span className='text-main font-bold ml-1 cursor-pointer' onClick={goBack}>Go Back to resend</span>
        </p>
    </div>
  )
}

export default OTPInput
