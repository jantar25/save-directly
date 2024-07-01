import { useState, useEffect } from 'react'

import { apiRequest } from '../Redux/ApiCalls'
import radiantLogo from '../Assets/Images/radiant.jpeg'
import Loading from '../Components/Loading'


const MyWallet = () => {
  const [balance, setBalance] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getBalance = async () => {
    setIsLoading(true)
    try {
      const response = await apiRequest.get('/inquiry/balance')
      if(response.data.status === 200){
        setBalance(response.data.data)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  console.log(balance)

  useEffect(() => {
    getBalance()
  }, [])

  if(isLoading) return <div className="mt-32">
    <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
    <Loading />
  </div>

  return (
    <div className='px-4 lg:px-24 py-8'>
      <h1 className='text-4xl font-bold text-center mt-8'>My Wallet</h1>
      {balance.length > 0 ? 
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-12">
        {balance.map((item, index)=> (
          <div key={index} className={`w-full flex-1 flex flex-col gap-2 items-center justify-center p-4 text-white bg-main-dark rounded-xl shadow-lg`}>
            <div className={`flex items-center p-2 justify-center rounded-full bg-main border-4 border-white -mt-12`} >
              <img src={radiantLogo} alt="radiant logo icon" className="w-12 h-12 rounded-full" />
            </div>
            <h3 className="text-lg font-semibold">{item.merchantName}</h3>
            <p className="text-xl font-bold text-main">{item.productCategoryName} ({item.productName})</p>
            <div className="flex items-end gap-2">
              <h1 className="text-5xl font-bold">{item.balance}</h1>
              <span className="text-2xl font-bold">Frw</span>
            </div>
          </div>
        ))}
      </div>
        : <p className='text-lg text-gray-400 text-center my-24 font-bold'>No Saving Yet!</p>
      }
    </div>
  )
}

export default MyWallet


