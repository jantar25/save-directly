import { useEffect, useState } from 'react'

import { DownloadArrayAsExcel } from '../Utils/MenuOptions'
import { apiRequest } from '../Redux/ApiCalls'
import Loading from '../Components/Loading'

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage] = useState(5)

  const filteredTransactions = allTransactions.filter(transaction =>
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastTransaction = currentPage * itemsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const downloadTransactionReport = async () => {
    DownloadArrayAsExcel(transactions, 'SaveDirectly-Transactions-Report')
  }

  useEffect(() => {
    const getTransactions = async () => {
      setIsLoading(true)
      try {
        const response = await apiRequest.get('/history')
        if(response.data.status === 200 && response.data.data) {
            setTransactions(response.data.data)
            setAllTransactions(response.data.data)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    getTransactions()
  }, [])

  if(isLoading) return <div className="mt-32 overflow-hidden">
  <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
  <Loading />
</div>

  return (
    <div className='px-4 lg:px-24 py-8'>
      <h1 className='text-4xl font-bold text-center mt-8'>My Transactions</h1>
      {allTransactions.length > 0 && 
        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 my-8'>
          <div className='w-full flex-1'>
            <input 
              type="text" 
              placeholder='Search for transaction by reference ID'
              className="w-full border border-gray-500 px-4 py-3 rounded-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className='w-full flex-1 bg-main p-3 text-white font-semibold rounded-2xl' 
            onClick={downloadTransactionReport}
          >
            Download Transaction Report
          </button>
        </div>
      }
      {filteredTransactions.length > 0 ? 
      <div className='flex flex-col items-center gap-8 mt-8'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th className='p-2'>Transaction ID</th>
              <th className='p-2'>Product Category</th>
              <th className='p-2'>Type</th>
              <th className='p-2'>Amount</th>
              <th className='p-2'>Balance After</th>
              <th className='p-2'>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={transaction.transactionId} className={`bg-${index % 2 === 0 ? 'main-dark' : 'gray-800'} text-white`}>
                <td className='p-2'>{transaction.transactionId}</td>
                <td className='p-2'>
                  <h3 className='text-lg font-bold text-main'>{transaction.productCategory}</h3>
                  <p className='text-md'>{transaction.product}</p>
                </td>
                <td className={`p-2 text-center font-semibold ${transaction.type === 'Saving' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {transaction.type}
                </td>
                <td className='p-2 text-lg font-bold text-main'>{transaction.amount}</td>
                <td className='p-2 text-md'>Bal: {transaction.balanceAfter}</td>
                <td className='p-2 text-sm'>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className='flex justify-center mt-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index + 1} 
              className={`mx-1 p-2 rounded ${currentPage === index + 1 ? 'bg-main text-white' : 'bg-gray-300 text-black'}`} 
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      : <p className='text-lg text-gray-400 text-center my-24 font-bold'>No Transaction Found!</p>
      }
    </div>

  )
}

export default Transactions