import { compagnies, Products } from '../Constants/dummydata'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="px-4 lg:px-24 mb-24">
      <div className="flex items-center flex-col md:flex-row md:justify-between my-4">
        <h1 className="font-bold text-3xl mb-4">Welcom <span className="text-main">Gad</span>!</h1>
        <div className="flex items-center text-xl lg:text-3xl font-bold text-main-dark shadow-lg rounded-lg p-4 bg-gray-200">
          Total Bal: 
          <p>FRW 20 500 000</p>
        </div>
      </div>
      <div className="my-8">
        <div className='mb-4'>
          <h1 className='text-main-dark text-lg lg:text-2xl font-bold'>Our Companies</h1>
          <p className='text-gray-500 text-md lg:text-lg'>Check our compmpagnied products for saving placement.</p>
        </div>
        <div className='flex items-center justify-center gap-4 flex-wrap mb-4'>
          {compagnies.map(compagnie => 
            <div key={compagnie.id} className="w-[250px] h-[250px] shadow-xl rounded-xl border border-main-dark cursor-pointer">
              <img src={compagnie.logo} alt="compagnie's logo" className='w-full h-2/3 object-contain rounded-t-xl' />
              <div className="h-1/3 w-full flex items-center justify-center px-2">
                <p className="text-xl text-main-dark font-bold text-center">{compagnie.name}</p>
              </div>
            </div>
          )}
        </div>
        <Link to='/companies' className='bg-main px-4 py-2 rounded-lg text-white mt-2'>Explore more</Link>
      </div>
      <div className="my-8">
        <div className='mb-4'>
          <h1 className='text-main-dark text-lg lg:text-2xl font-bold'>Our Products</h1>
          <p className='text-gray-500 text-md lg:text-lg'>Check our compmpagnied products for saving placement.</p>
        </div>
        <div className='flex items-center justify-center gap-4 flex-wrap'>
          {Products.map(product => 
            <div key={product.id} className="w-[250px] h-[250px] shadow-xl rounded-xl border border-main-dark cursor-pointer">
              <img src={product.product} alt="compagnie's logo" className='w-full h-2/3 object-cover rounded-t-xl' />
              <div className="h-1/3 w-full flex items-center justify-center px-2">
                <p className="text-xl text-main-dark font-bold text-center">{product.productName}</p>
              </div>
            </div>
          )}
        </div>
        <Link to='/products' className='bg-main px-4 py-2 rounded-lg text-white mt-2'>Explore more</Link>
      </div>
    </div>
  )
}

export default Dashboard