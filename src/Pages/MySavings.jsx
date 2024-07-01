import { useState, useEffect } from 'react'

import { apiRequest } from '../Redux/ApiCalls'
import radiantLogo from '../Assets/Images/radiant.jpeg'
import Loading from '../Components/Loading'

const MySavings = () => {
  const [balance, setBalance] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const balanceDataWithTransactions = balance?.map(item => {
    const newTransactions = transactions?.filter(transaction => 
      transaction.productCategory === item.productCategoryName && transaction.product === item.productName && transaction.type === 'Saving')
    if(newTransactions.length > 0){
      return {...item, newTransactions}
    }
    return item
  })

  console.log(balance)
  console.log(transactions)
  console.log(balanceDataWithTransactions)


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

  const getTransactions = async () => {
    try {
      const response = await apiRequest.get('/history')
      if(response.data.status === 200 && response.data.data) {
          setTransactions(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBalance()
    getTransactions()
  }, [])

  if(isLoading) return <div className="mt-32">
    <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
    <Loading />
  </div>

  return (
    <div className='px-4 lg:px-24 py-8'>
      <h1 className='text-4xl font-bold text-center mt-8'>My Savings</h1>
      {balanceDataWithTransactions.length > 0 ? 
      <div className="flex flex-col sm:flex-row items-start justify-center gap-8 my-12">
        {balanceDataWithTransactions.map((item, index)=> (
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
            {item.newTransactions && item.newTransactions.length > 0 &&
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-4">
              <h3 className="text-lg font-semibold underline">Transactions</h3>
              {item.newTransactions.map((transaction, index) => (
                <div key={index} className="w-full flex flex-col gap-2 items-center justify-center p-4 text-white bg-main-dark rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold">{transaction.date}</h3>
                  <p className="text-xl font-bold text-main">{transaction.amount}</p>
                </div>
              ))}
            </div>
            }
          </div>
        ))}
      </div>
        : <p className='text-lg text-gray-400 text-center my-24 font-bold'>No Saving Yet!</p>
      }
    </div>
  )
}

export default MySavings