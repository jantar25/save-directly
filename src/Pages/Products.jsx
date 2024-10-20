import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import PaymentMethods from "../Components/PaymentMethods"
import defaultLogo from '../Assets/Images/logo.png'

const Products = () => {
  const { categoryId, merchantId } = useParams()
  const [productId, setProductId] = useState("")
  const { balanceData } = useSelector(state => state.balances)
  const { data } = useSelector(state => state.merchants)

  const selectedCategoryProducts = data.find(category => category.productId === categoryId)
  const selectedMerchantProducts = selectedCategoryProducts?.merchants.find(merchant => merchant.merchantId === merchantId)

  const savingBalanceMap = balanceData.reduce((acc, { productName, balance }) => {
    acc[productName] = balance;
    return acc;
  }, {})

  const closeSavingModal = () => {
    setProductId("")
  }

  return (
    <div className='flex items-center justify-center gap-4 flex-wrap mt-8 px-4 lg:px-24'>
    {selectedMerchantProducts ? selectedMerchantProducts?.products.map(prod => {
      const savingBalance = savingBalanceMap[prod.merchantProductName]

      return (
      <div key={prod.merchantProductId} className="w-[250px] h-[250px] shadow-xl rounded-xl border border-main-dark">
        <div className="h-3/4 relative">
          <img
            src={defaultLogo}
            alt="product's logo"
            className='w-full h-full object-contain rounded-t-xl border-b-8 border-main-dark'
          />
          <button
            onClick={() => {
              setProductId(prod.merchantProductId)
            }}
            className="absolute px-6 py-2 text-md bg-main-dark text-white font-bold rounded-full right-4 -bottom-4 hover:bg-main-hover">
            {savingBalance? 'Save More' : 'Start Saving'}
          </button>
        </div>
        <div className="h-1/4 w-full flex items-center justify-between px-2">
          <p className="text-xl text-main-dark font-bold text-center">{prod.merchantProductName}</p>
          {savingBalance && <p className="text-lg font-bold text-main">{savingBalance} Frw</p>}
        </div>
      </div>
      )
    }
    ) : <div className="flex items-center justify-center h-96">
      <p className="text-2xl font-bold text-main-dark">No Product found</p>
    </div>}
    {productId &&
      <PaymentMethods
        onClose={closeSavingModal}
        categoryId={categoryId}
        merchantId={merchantId}
        productId={productId}
      />
    }
  </div>
  )
}

export default Products