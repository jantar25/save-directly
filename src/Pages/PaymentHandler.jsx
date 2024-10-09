import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import methods from "../Constants/paymentMethods"

import SavingModal from "../Components/SavingModal"
import Loading from "../Components/Loading"
import { apiRequest } from '../Redux/ApiCalls'
import momo from '../Assets/Images/momo.jpg'
import airtel_money from '../Assets/Images/airtel_money.jpg'

const PaymentHandler = () => {
  const { paymentId, productId } = useParams()
  const method = methods.find(method => method.id === paymentId)
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [togglePaymentMode, setTogglePaymentMode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [merchants, setMerchants] = useState([])

  const prods = merchants.find(merchant => merchant.productId === productId)?.merchants[0]
  console.log(merchants.find(merchant => merchant.productId === productId))

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
    setTogglePaymentMode("")
  }

  useEffect(() => {
    getMerchants()
  }, [])

  if(isLoading) return <div className="mt-32">
  <h1 className="text-3xl text-main-dark font-bold text-center">Loading</h1>
  <Loading />
</div>

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
          product={prods?.products.find(prod => prod.merchantProductId === togglePaymentMode)}
          merchant={prods}
          onClose={closeSavingModal}
      />
    }
    </div>
  )
}

export default PaymentHandler