import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Notification from '../Components/Notification'
import Loading from '../Components/Loading'
import { userLogin } from '../Redux/ApiCalls'
import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'

const Registration = () => {
  const dispatch = useDispatch()
  const { isFetching,error } = useSelector(state => state.currentUser)
  const [selectedUserType, setSelectedUserType] = useState('CLIENT')
  const [passwordType, setPasswordType] = useState('password')
  const [inputs,setInputs] = useState({
    telephone:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setInputs({ ...inputs,[e.target.name]:e.target.value })
  }

  const togglePassword = () => {
    passwordType==='password'?
      setPasswordType('text') :
      setPasswordType('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin(dispatch,{ ...inputs })
    setInputs({
      telephone:'',
      email:'',
      password:'',
    })
  }

  return (
    <div className='my-16'>
      <Notification failure={error} color={'red'} />
      <h2 className='mb-8 text-4xl font-bold text-center text-main'>Sign Up</h2>
      <div className="flex items-center justify-center">
        <form className='w-full md:w-2/3 lg:w-1/3 p-4 border border-gray-300 p-4 rounded-lg' onSubmit={handleSubmit}>
          <div className='flex items-center justify-between mb-4'>
            {[{ id: 'CLIENT', label: 'Client' }, { id: 'COORPORATE', label: 'Coorporate' }].map((option) => (
              <div key={option.id} className="flex items-center">
                <label className="text-sm font-bold">
                  <input
                    type="radio"
                    value={option.id}
                    checked={selectedUserType === option.id}
                    onChange={() => setSelectedUserType(option.id)}
                    className='mr-2 accent-main'
                  />
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {selectedUserType === 'CLIENT'? 
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>Telephone*</label>
              <input type='text' name='telephone' value={inputs.telephone} placeholder='+250 7XX XXX XXX'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div> :
            <div className='flex flex-col w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold'>Email*</label>
              <input type='email' name='email' value={inputs.email} placeholder='Email'
                className='p-2 border rounded-lg' onChange={handleChange} />
            </div>
          }
          <div className='flex flex-col w-full my-2'>
            <label htmlFor="email" className='mb-1 text-lg font-bold'>PIN Code*</label>
            <div className="flex items-center border rounded-lg">
              <input type={passwordType} name='password' value={inputs.password} placeholder='Password'
                className='p-2 w-full rounded-lg' onChange={handleChange} />
              <div onClick={togglePassword} className='p-2 cursor-pointer' data-testid='toggle-password-button'>
                {passwordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
              </div>
            </div>
          </div>
          <p className='my-2'>Do you have an account?
            <Link to='/login'><span className='text-main font-bold ml-1'>Sign In</span></Link>
          </p>
          <button type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white bg-main rounded-lg font-semibold shadow-sm' disabled={isFetching}>
            {isFetching && <div className="loading-spinner w-full mr-2"><Loading color={'white'} /></div>}
            {isFetching? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration