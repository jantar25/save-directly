import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { apiRequest } from "../Redux/ApiCalls"
import SavingModal from "../Components/SavingModal"
import Loading from "../Components/Loading"
import insurance from '../Assets/Images/insurance.jpg'
import furniture from '../Assets/Images/furniture.jpg'

const Products = () => {
  const { merchantId } = useParams()
  const [merchants, setMerchants] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [productId, setProductId] = useState('')

  const prods = merchants.find(merchant => merchant.productId === merchantId)?.merchants[0]

  const getMerchants = async () => {
    setIsLoading(true)
    try {
      const response = await apiRequest.get('/product/list')
      setMerchants(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const closeSavingModal = () => {
    setProductId("")
  }

  useEffect(() => {
    getMerchants()
  }, [])

  if(isLoading) return <div className="mt-32">
  <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
  <Loading />
</div>

  return (
    <div className='flex items-center justify-center gap-4 flex-wrap mt-8'>
    {prods ? prods?.products.map(prod => 
      <div key={prod.merchantProductId} className="w-[250px] h-[250px] shadow-xl rounded-xl border border-main-dark">
        <div className="h-3/4 relative">
          <img
            src={prods.merchantName === "RADIANT"? insurance : furniture}
            alt="compagnie's logo"
            className='w-full h-full object-cover rounded-t-xl border-b-8 border-main-dark'
          />
          <button
            onClick={() => {
              setProductId(prod.merchantProductId)
            }}
            className="absolute px-6 py-2 text-md bg-main-dark text-white font-bold rounded-full right-4 -bottom-4 hover:bg-main-hover">
            Start Saving
          </button>
        </div>
        <div className="h-1/4 w-full flex items-center justify-center px-2">
          <p className="text-xl text-main-dark font-bold text-center">{prod.merchantProductName}</p>
        </div>
      </div>
    ) : <div className="flex items-center justify-center h-96">
      <p className="text-2xl font-bold text-main-dark">No Product found</p>
    </div>}
    {productId &&
      <SavingModal
        product={prods?.products.find(prod => prod.merchantProductId === productId)}
        merchant={prods}
        onClose={closeSavingModal}
      />
    }
  </div>
  )
}

export default Products