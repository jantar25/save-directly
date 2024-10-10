import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { setMarchantsResults } from '../Redux/merchantsMainDataRedux'
import { getMerchants, getBalance } from '../Redux/ApiCalls'
import Loading from '../Components/Loading'
import PaymentMethods from '../Components/PaymentMethods'
import danubeLogo from '../Assets/Images/danube.png'
import radiantLogo from '../Assets/Images/radiant.jpeg'
import wallet from '../Assets/Images/wallet.png'


const Dashboard = () => {
  const dispatch = useDispatch()
  const [togglePaymentMode, setTogglePaymentMode] = useState('')
  const { currentUser } = useSelector(state => state.currentUser)
  const { balanceData, total } = useSelector(state => state.balances)
  const { data, isFetching } = useSelector(state => state.merchants)
  const { mainData } = useSelector(state => state.merchantsMainData)

  const filterByMerchant = (e) => {
    const merchantId = e.target.value
    if(merchantId){
      const filteredMerchants = data.filter(merchant => merchant.productId === merchantId)
      dispatch(setMarchantsResults(filteredMerchants))
    }else{
      dispatch(setMarchantsResults(data))
    }
  }

  const searchMerchant = (e) => {
    const searchValue = e.target.value
    if(searchValue){
      const searchedMerchants = data.filter(merchant => merchant.merchants[0]?.merchantName.toLowerCase().includes(searchValue.toLowerCase()))
      dispatch(setMarchantsResults(searchedMerchants))
    }else{
      dispatch(setMarchantsResults(data))
    }
  }

  useEffect(() => {
    getBalance(dispatch)
    getMerchants(dispatch)
  }, [])

  if(isFetching) return <div className="mt-32 overflow-hidden">
    <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
    <Loading />
  </div>

  return (
    <div>
      <div className="px-4 lg:px-24 pt-12">
        <div className="flex items-center flex-col md:flex-row md:justify-between mt-4">
          <h1 className="font-bold text-3xl mb-4">Welcom <span className="text-main">{currentUser?.customerNames}</span>!</h1>
        </div>
        <div className="w-300 sm:w-[400px] h-300 sm:h-[400px] rounded-full bg-gradient mx-auto my-8">
          <div className="relative w-1/3 h-1/3 mx-auto">
            <img src={wallet} alt="wallet" className="w-full h-full" />
            <div className="inline-block absolute -top-8 -right-16 text-white bg-main px-4 py-2 rounded-full text-xl font-bold">
              {total} Frw
            </div>
          </div>
          <div className="h-48 w-full sm:w-3/4 mx-auto rounded-xl shadow-2xl">
            <Carousel autoPlay infiniteLoop interval={3000} renderIndicator={false} showThumbs={false} className='rounded-xl'>
              {balanceData?.map((bal, index)=> 
                <div key={index} className="h-full bg-white rounded-xl">
                  <div className="bg-gray-100 p-2 rounded-t-xl">
                    <p className="text-center font-bold text-main-dark">Save</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="text-xl font-bold text-center mb-2">
                      {bal.productCategoryName} from
                      <span className="text-main ml-1">{bal.merchantName}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-md">{bal.productName}</p>
                      <p className="text-md font-bold">{bal.balance} Frw</p>
                    </div>
                    <hr className="my-4" />
                    <button className="w-full bg-main-dark py-2 px-4 font-bold text-white rounded-full" onClick={() => setTogglePaymentMode(bal.productName)}>
                      Save more
                    </button>
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        </div>
        <div className="my-8">
          <div className='flex flex-col md:flex-row items-center justify-between gap-2 md:gap-8 mb-8'>
            <div className='w-full flex-1'>
              <input type="text" placeholder='Search for a merchant'
                className="w-full border border-gray-500 px-4 py-3 rounded-2xl"
                onChange={searchMerchant}
              />
            </div>
            <div className='w-full flex-1'>
              <select className="w-full border border-gray-500 px-4 py-3 rounded-2xl" onChange={filterByMerchant}>
                <option value="">SORT BY</option>
                {data.map(merchant =>
                  <option key={merchant.productId} value={merchant.productId}>{merchant.merchants[0]?.merchantName}</option>
                )}
              </select>
            </div>
          </div>
          {mainData.length === 0 ?
            <div className="flex items-center justify-center h-96">
              <p className="text-2xl font-bold text-main-dark">No merchant found</p>
            </div>:
          <div className='flex items-center justify-center gap-8 flex-wrap mb-4'>
            {mainData.map(merchant => 
              <div key={merchant.productId} className="w-[350px] h-[400px] shadow-xl rounded-xl border border-main-dark">
                <div className="h-3/4 relative">
                  <img
                    src={merchant.merchants[0]?.merchantName === "RADIANT"? radiantLogo : danubeLogo}
                    alt="compagnie's logo"
                    className='w-full h-full object-cover rounded-t-xl border-b-8 border-main-dark'
                  />
                  <button className="absolute px-6 py-2 text-xl bg-main-dark hover:bg-main-hover text-white font-bold rounded-full right-8 -bottom-4">
                    <Link to={`/products/${merchant.productId}/${merchant.merchants[0]?.merchantId}`}>Explore</Link>
                  </button>
                </div>
                <div className="h-1/4 w-full flex flex-col items-center justify-center">
                  <p className="text-xl text-main-dark font-bold text-center">{merchant.merchants[0]?.merchantName}</p>
                  {/* <div className="flex items-center gap-2">
                    <img src={boltIcon} alt="bolt icon" className="w-4 h-4" />
                    <span>Earn at least</span>
                    <div className="w-12 h-12 bg-main flex items-center justify-center font-bold rounded-xl">{`${compagnie.discount}%`}</div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
          }
        </div>
      </div>
      {togglePaymentMode &&
        <PaymentMethods
          onClose={() => setTogglePaymentMode('')}
          productId={togglePaymentMode}
          merchantId={'test'}
          categoryId={'test'}
        />
      }
    </div>
  )
}

export default Dashboard