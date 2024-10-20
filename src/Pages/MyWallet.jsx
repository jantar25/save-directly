import { useSelector } from 'react-redux'

import defaultLogo from '../Assets/Images/logo.png'
import marchantLogos from '../Constants/logos'


const MyWallet = () => {
  const { balanceData } = useSelector(state => state.balances)

  return (
    <div className='px-4 lg:px-24 py-8'>
      <h1 className='text-4xl font-bold text-center mt-8'>My Wallet</h1>
      {balanceData.length > 0 ? 
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-12">
        {balanceData.map((item, index)=> (
          <div key={index} className={`w-full flex-1 flex flex-col gap-2 items-center justify-center p-4 text-white bg-main-dark rounded-xl shadow-lg`}>
            <div className={`flex items-center p-2 justify-center rounded-full bg-main border-4 border-white -mt-12`} >
              <img src={marchantLogos[item.merchantName] || defaultLogo} alt="radiant logo icon" className="w-12 h-12 rounded-full" />
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


