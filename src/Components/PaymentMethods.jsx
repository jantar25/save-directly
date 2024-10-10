/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import methods from '../Constants/paymentMethods'

const PaymentMethods = ({ onClose, categoryId, merchantId, productId }) => {
  return (
    <div className='h-screen w-screen fixed bottom-0 left-0 right-0 top-0 z-50'>
      <div className='h-screen w-screen fixed top-0 bottom-0 left-0 right-0 bg-black/[0.5]'></div>
      <div className="absolute top-32 left-0 right-0 mx-auto w-5/6 md:w-1/2 xl:w-1/3 min-h-[30%] rounded-lg bg-white text-black p-4 md:p-8">
        <div className='flex justify-end'>
          <button className='text-3xl font-bold text-main' onClick={onClose}>&times;</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className='text-center font-bold text-xl md:text-3xl'>Choose Saving Method</h2>
          <p className='text-center mb-6 text-sm md:text-lg text-gray-400 font-bold'>
            Select your preferred payment method
          </p>
            <div className='flex flex-col items-center justify-center'>
                {methods.map(method => 
                  <Link to={`/products/${categoryId}/${merchantId}/${productId}/payment/${method.id}`} key={method.id} className='w-full flex items-center justify-center gap-4 mb-4 p-2 bg-[#EAEFF2] rounded-lg hover:bg-main'>
                    <img src={method.icon} alt={method.name} className='w-12 h-12' />
                    <div className='flex flex-col items-start'>
                        <p className='text-lg font-bold text-main-dark'>{method.name}</p>
                        <p className='text-sm text-gray-900'>{method.description}</p>
                    </div>
                  </Link>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods