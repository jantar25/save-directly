import { Routes, Route } from 'react-router-dom'

import Dashboard from '../Pages/Dashboard'
import Profile from '../Pages/Profile'
import Products from '../Pages/Products'
import Transactions from '../Pages/Transactions'
import MyWallet from '../Pages/MyWallet'
import MySavings from '../Pages/MySavings'
import PaymentRequest from '../Pages/PaymentRequest'
import PaymentHandler from '../Pages/PaymentHandler'
import PendingApprovals from '../Pages/PendingApprovals'


const MyRoutes = () => {
  return (
    <div className="overflow-y-auto">
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products/:categoryId/:merchantId' element={<Products />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/savings' element={<MySavings />} />
        <Route path='/wallet' element={<MyWallet />} />
        <Route path='/products/:categoryId/:merchantId/:productId/payment/:paymentId' element={<PaymentHandler />} />
        <Route path='/payment-request' element={<PaymentRequest />} />
        <Route path='/pending-approvals' element={<PendingApprovals />} />
      </Routes>
    </div>
    )
}

export default MyRoutes