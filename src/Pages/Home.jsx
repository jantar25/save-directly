import { useState } from 'react'
import { Link } from 'react-router-dom'

import savingImg from '../Assets/Images/saving.png'

const Home = () => {
  const [account, setAccount] = useState('personal')

  const handleAccount = (e) => {
    setAccount(e.target.id)
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center w-full h-full overflow-y-auto py-8 px-4 lg:px-24 gap-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={savingImg} alt="saving"/>
        <h1 className="hidden md:inline-block text-2xl lg:text-5xl text-center font-bold">
          Join thousands of businesses and individuals who love and use Save
          <span className='text-main'>Directly</span>.
        </h1>
      </div>
      <div className="flex-1">
        <h1 className='text-3xl font-bold text-center md:text-start'>
          Register to Save<span className='text-main'>Directly</span> for free.
        </h1>
        <p className='text-xl text-gray-400 text-center md:text-start'>Choose your desired account.</p>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-start">
            <input type="radio" name="account" id="personal" checked={account === 'personal'} className="mr-2 w-8 h-8 accent-main-dark" onChange={handleAccount}/>
            <label htmlFor="personal" className="text-main text-xl font-semibold">
              <h2 className='text-main text-2xl font-bold'>Personal</h2>
              <p className='text-sm text-gray-400 w-full xl:w-1/2'>Plan ahead by putting money aside for things like household items, a vacation, wedding  or a new computer and 
                checkout from a wide range of merchants.
              </p>
            </label>
          </div>
          <div className="flex items-start">
            <input type="radio" name="account" id="business" checked={account === 'business'} className="mr-2 w-8 h-8 accent-main-dark" onChange={handleAccount}/>
            <label htmlFor="business" className="text-main text-xl font-semibold">
              <h2 className='text-main text-2xl font-bold'>Business</h2>
              <p className='text-sm text-gray-400 w-full xl:w-1/2'>Accept flexible payments both online and offline and increase sales by converting more customers.
                Grow with the most trusted way to pay.
              </p>
            </label>
          </div>
          <div className="flex items-start">
            <input type="radio" name="account" id="partner" checked={account === 'partner'} className="mr-2 w-8 h-8 accent-main-dark" onChange={handleAccount}/>
            <label htmlFor="partner" className="text-main text-xl font-semibold">
              <h2 className='text-main text-2xl font-bold'>Partner</h2>
              <p className='text-sm text-gray-400 w-full xl:w-1/2'>Get paid faster by sending professional invoices to your customers. 
                Accept card payments and get paid directly into your bank account.
              </p>
            </label>
          </div>
        </div>
        <Link to={`/auth/register/${account}`}>
          <button className='bg-main text-2xl font-bold text-white px-12 py-2 rounded-lg mt-8'>
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home