import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import methods from "../Constants/paymentMethods"
import SavingModal from "../Components/SavingModal"
import momo from '../Assets/Images/momo.jpg'
import airtel_money from '../Assets/Images/airtel_money.jpg'

const PaymentHandler = () => {
  const { categoryId, merchantId, paymentId, productId } = useParams()
  const method = methods.find(method => method.id === paymentId)
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [togglePaymentMode, setTogglePaymentMode] = useState('')
  const { data } = useSelector(state => state.merchants)

  const selectedCategoryProducts = data.find(category => category.productId === categoryId)
  const selectedMerchantProducts = selectedCategoryProducts?.merchants.find(merchant => merchant.merchantId === merchantId)

  const closeSavingModal = () => {
    setTogglePaymentMode("")
  }

  return (
    <div className="my-8 px-4 lg:px-24">
      <div className="mb-12">
        <h1 className="text-main text-4xl">{method.name}</h1>
        <p className="text-main-dark text-lg">{method.description}</p>
      </div>
      {paymentId === '3d082b07-e176-4035-a0a6-19fda8648636' ? (
      <div>
        <div className="">
            <div className="">
              <div className='flex items-center gap-4'>
                <img src={momo} alt="momo" className='w-24 h-12 object-cover ' />
                <img src={airtel_money} alt="momo" className='w-24 h-12 object-cover' />
              </div>
            </div>
        </div>
        <div className='mt-4'>
          <input
            type="checkbox"
            className='mr-1 accent-main cursor-pointer'
            checked={isTermsAgreed}
            required
            onChange={() => setIsTermsAgreed(!isTermsAgreed)}
          />
          <label htmlFor="agreeTerms">
            I agree to the
            <Link to='https://savedirectly.com/terms.html' target="_blank" >
              <span className='text-red-extended font-bold mx-1'>terms and conditions</span>
            </Link>
            and
            <Link to='https://savedirectly.com/privacy.html' target="_blank">
              <span className='text-red-extended font-bold mx-1'>privacy policy</span>.
            </Link>
          </label>
        </div>
        <button
          onClick={()=> setTogglePaymentMode(productId)}
          className={`flex items-center justify-center bg-main-dark px-8 py-4 mb-4 mt-8 text-md text-yellow-extended
          ${!isTermsAgreed ? 'opacity-70 cursor-not-allowed' : 'hover:bg-main-hover'} rounded-lg font-semibold shadow-sm`}
          disabled={!isTermsAgreed}
        >
          CONTINUE TO PAY
        </button>
      </div>
      ) : (
        <div className="">Under Intergration</div>
      )}
      {togglePaymentMode &&
        <SavingModal
          product={selectedMerchantProducts?.products.find(prod => prod.merchantProductId === togglePaymentMode)}
          merchant={selectedMerchantProducts}
          onClose={closeSavingModal}
      />
    }
    </div>
  )
}

export default PaymentHandler