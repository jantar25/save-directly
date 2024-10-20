

const PaymentRequest = () => {
  return (
    <div className='w-full h-[60vh] md:h-[70vh] flex flex-col items-center justify-center gap-1 md:gap-4 px-4 lg:px-24'>
      <h1 className="font-bold text-xl md:text-3xl text-green-500 text-center">Thanks for initiating your saving with us.</h1>
      <h2 className="font-bold text-lg md:text-2xl text-main text-center">We received your order and a payment push was trigered to your phone.</h2>
      <p className='text-gray-500 text-sm md:text-lg md:w-2/3 text-center'>Please confirm the pending payment approval to finalize tha saving process.
        If you did not receive the mobile money payment push, please dial *182*7*1# for MTN and *182*5*6# for AIRTEL to approve the payment.
      </p>
      <p className='text-md text-main text-center'>
        <span className="font-bold mr-2">FYI:</span>
        A confirmation saving message will be sent you.
      </p>
    </div>
  )
}

export default PaymentRequest