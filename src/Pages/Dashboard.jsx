import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { setMarchantsResults } from '../Redux/merchantsMainDataRedux'
import { getMerchants, getBalance } from '../Redux/ApiCalls'
import marchantLogos from '../Constants/logos'
import Loading from '../Components/Loading'
import PaymentMethods from '../Components/PaymentMethods'
import defaultLogo from '../Assets/Images/logo.png'
import wallet from '../Assets/Images/wallet.png'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [togglePaymentMode, setTogglePaymentMode] = useState(null)
  const { currentUser } = useSelector(state => state.currentUser)
  const { balanceData, total } = useSelector(state => state.balances)
  const { data, isFetching } = useSelector(state => state.merchants)
  const { mainData } = useSelector(state => state.merchantsMainData)

  const consolidateMerchants = (data) => {
    const merchantMap = new Map()

    data.forEach(product => {
      product.merchants.forEach(merchant => {
        if (!merchantMap.has(merchant.merchantName)) {
          merchantMap.set(merchant.merchantName, {
            merchantName: merchant.merchantName,
            merchantId: merchant.merchantId,
            products: new Map(),
            categories: new Set()
          })
        }

        const merchantEntry = merchantMap.get(merchant.merchantName)
        
        merchantEntry.categories.add({
          productId: product.productId,
          productName: product.productName
        })

        merchant.products.forEach(prod => {
          merchantEntry.products.set(prod.merchantProductId, prod)
        })
      })
    })

    return Array.from(merchantMap.values()).map(merchant => ({
      ...merchant,
      products: Array.from(merchant.products.values()),
      categories: Array.from(merchant.categories)
    }))
  }

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
    const searchValue = e.target.value.toLowerCase()
    if(searchValue){
      const searchedMerchants = data.filter(product => 
        product.merchants.some(merchant => 
          merchant.merchantName.toLowerCase().includes(searchValue)
        )
      )
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
    <h1 className="text-3xl font-bold text-center text-main-dark">Loading</h1>
    <Loading />
  </div>

  const consolidatedMerchants = consolidateMerchants(mainData)

  return (
    <div>
      <div className="px-4 pt-12 lg:px-24">
        <div className="flex flex-col items-center mt-4 md:flex-row md:justify-between">
          <h1 className="mb-4 text-3xl font-bold">Welcome <span className="text-main">{currentUser?.customerNames}</span>!</h1>
        </div>
        <div className="w-300 sm:w-[400px] h-300 sm:h-[400px] rounded-full bg-gradient mx-auto my-8">
          <div className="relative w-1/3 mx-auto h-1/3">
            <img src={wallet} alt="wallet" className="w-full h-full" />
            <div className="absolute inline-block px-4 py-2 text-xl font-bold text-white rounded-full -top-8 -right-16 bg-main">
              {total} Frw
            </div>
          </div>
          <div className="w-full h-48 mx-auto shadow-2xl sm:w-3/4 rounded-xl">
            <Carousel autoPlay infiniteLoop interval={3000} renderIndicator={false} showThumbs={false} className='rounded-xl'>
              {balanceData?.map((bal, index)=> 
                <div key={index} className="h-full bg-white rounded-xl">
                  <div className="p-2 bg-gray-100 rounded-t-xl">
                    <p className="font-bold text-center text-main-dark">Save</p>
                  </div>
                  <div className="px-4 py-2">
                    <p className="mb-2 text-xl font-bold text-center">
                      {bal.productCategoryName} from
                      <span className="ml-1 text-main">{bal.merchantName}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-md">{bal.productName}</p>
                      <p className="font-bold text-md">{bal.balance} Frw</p>
                    </div>
                    <hr className="my-4" />
                    <button className="w-full px-4 py-2 font-bold text-white rounded-full bg-main-dark" onClick={() => setTogglePaymentMode(bal)}>
                      Save more
                    </button>
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        </div>
        <div className="my-8">
          <div className='flex flex-col items-center justify-between gap-2 mb-8 md:flex-row md:gap-8'>
            <div className='flex-1 w-full'>
              <input type="text" placeholder='Search for a merchant'
                className="w-full px-4 py-3 border border-gray-500 rounded-2xl"
                onChange={searchMerchant}
              />
            </div>
            <div className='flex-1 w-full'>
              <select className="w-full px-4 py-3 border border-gray-500 rounded-2xl" onChange={filterByMerchant}>
                <option value="">SORT BY</option>
                {consolidatedMerchants.map(merchant =>
                  <option key={merchant.merchantId} value={merchant.merchantId}>
                    {merchant.merchantName}
                  </option>
                )}
              </select>
            </div>
          </div>
          {consolidatedMerchants.length === 0 ?
            <div className="flex items-center justify-center h-96">
              <p className="text-2xl font-bold text-main-dark">No merchant found</p>
            </div>:
            <div className='flex flex-wrap items-center justify-center gap-8 mb-4'>
              {consolidatedMerchants.map(merchant => (
                <div key={merchant.merchantId} className="w-[350px] h-[400px] shadow-xl rounded-xl border border-main-dark">
                  <div className="relative h-3/4">
                    <img
                      src={marchantLogos[merchant.merchantName] || defaultLogo}
                      alt="compagnie's logo"
                      className='object-contain w-full h-full border-b-8 rounded-t-xl border-main-dark'
                    />
                    <button className="absolute px-6 py-2 text-xl font-bold text-white rounded-full bg-main-dark hover:bg-main-hover right-8 -bottom-4">
                      <Link to={`/products/${merchant.categories[0].productId}/${merchant.merchantId}`}>Explore</Link>
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-1/4">
                    <p className="text-xl font-bold text-center text-main-dark">{merchant.merchantName}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
      {togglePaymentMode &&
        <PaymentMethods
          onClose={() => setTogglePaymentMode(null)}
          productId={togglePaymentMode.productId}
          merchantId={togglePaymentMode.merchantId}
          categoryId={togglePaymentMode.productCategoryId}
        />
      }
    </div>
  )
}

export default Dashboard
