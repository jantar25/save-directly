import { useState } from 'react'
import { Link } from 'react-router-dom'

import { accounts } from '../Constants/accounts'
import AccountOption from '../Components/AccountOption'
import savingImg from '../Assets/Images/saving.png'

const Home = () => {
  const [selectedAccount, setSelectedAccount] = useState('personal')

  const handleAccount = (e) => {
    setSelectedAccount(e.target.id)
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full h-full overflow-y-auto py-8 px-4 lg:px-24 gap-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={savingImg} alt="saving"/>
        <h1 className="hidden md:inline-block text-2xl lg:text-3xl 2xl:text-5xl text-center font-bold">
          Join thousands of businesses and individuals who love and use Save
          <span className='text-main'>Directly</span>.
        </h1>
      </div>
      <div className="flex-1">
        <h1 className='text-xl md:text-2xl xl:text-3xl font-bold text-center lg:text-start'>
          Register to Save<span className='text-main'>Directly</span> for free.
        </h1>
        <p className='text-mg lg:text-lg text-gray-400 text-center lg:text-start'>Choose your desired account.</p>
        <div className="flex flex-col gap-4 mt-8">
          {accounts.map((account) => (
            <AccountOption 
              key={account.id}
              id={account.id}
              title={account.title}
              description={account.description}
              account={selectedAccount}
              onChange={handleAccount}
            />
          ))}
        </div>
        <Link to={`/auth/register/${selectedAccount}`}>
          <button className='bg-main text-2xl font-bold text-white px-12 py-2 rounded-lg mt-8'>
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home