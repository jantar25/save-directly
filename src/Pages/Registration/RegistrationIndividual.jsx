import { useState } from 'react'

import Notification from '../../Components/Notification'
import NumberLookup from '../../Components/NumberLookup'
import OTPInput from '../../Components/OTPInput'
import PersonalInformation from '../../Components/PersonalInformation'

const RegistrationIndividual = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [togglePersonalInfo, setTogglePersonalInfo] = useState(false)
  const [toggleOTP, setToggleOTP] = useState(false)

  return (
    <div className='w-full h-full'>
      <Notification success={success} failure={error} color={error ? 'red': 'green'} />
      {!toggleOTP && !togglePersonalInfo && <NumberLookup setError={setError} setToggleOTP={setToggleOTP} />}
      {toggleOTP && !togglePersonalInfo &&<OTPInput setError={setError} setTogglePersonalInfo={setTogglePersonalInfo} setToggleOTP={setToggleOTP} />}
      {togglePersonalInfo && !toggleOTP && <PersonalInformation setError={setError} setSuccess={setSuccess} />}
    </div>
  )
}

export default RegistrationIndividual