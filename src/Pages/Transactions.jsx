import { useEffect, useState } from 'react'

import { apiRequest } from '../Redux/ApiCalls'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  console.log(transactions)

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await apiRequest.get('/history')
        if(response.status === 200 & response.data.data) {
            setTransactions(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getTransactions()
  }, [])

  return (
    <div className='px-4 lg:px-24 py-8'>
        <h1 className='text-4xl font-bold text-center mt-8'>My Transactions</h1>
        {transactions.length > 0 ? 
        <div className='flex flex-col items-center gap-8 mt-8'>
            {transactions.map(transaction => (
            <div key={transaction.transactionId} className='w-full flex flex-col md:flex-row items-center justify-between bg-main-dark p-4 rounded-xl shadow-2xl gap-2'>
                <p className='text-md text-white'>{transaction.transactionId}</p>
                <div className="flex items-center justify-center md:flex-col gap-2 md:gap-0">
                    <h3 className='text-lg font-bold text-main'>{transaction.productCategory}</h3>
                    <p className='text-md text-white'>({transaction.product})</p>
                </div>
                <div className={`p-2 rounded-full text-white font-semibold ${transaction.type === 'Saving' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {transaction.type}
                </div>
                <div className="flex items-center gap-2">
                    <p className='text-lg font-bold text-main'>{transaction.amount}</p>
                    <p className='text-md text-white'>Bal: {transaction.balanceAfter}</p>
                </div>
                <p className='text-sm text-white font-bold'>{transaction.date}</p>
            </div>
            ))}
        </div>
        : <p className='text-lg text-gray-400 text-center my-24 font-bold'>No Transaction Yet!</p>
        }
    </div>
  )
}

export default Transactions