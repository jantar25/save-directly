import { compagnies } from '../Constants/dummydata'

import { processes, workingProcesses } from '../Constants/process'
import boltIcon from '../Assets/Icons/bolt.svg'

const Dashboard = () => {

  return (
    <div>
      <div className="bg-main py-8 flex flex-col items-center justify-center gap-8">
        <h1 className='text-4xl font-bold'>Save Now, Buy Later</h1>
        <p className="text-center text-lg w-full md:w-1/2 xl:w-1/4">
          A new way of getting <span className="font-bold">paid to save</span>. Earn instant
          rewards on every deposit you make.
        </p>
        <div className="flex items-center justify-center flex-wrap gap-8 -mb-16">
          {processes.map(process => 
            <div key={process.id} className="w-[400px] flex flex-col items-center justify-center shadow-2xl rounded-xl bg-main-dark text-black gap-4">
              <div className="w-[400px] p-8 flex flex-col items-center justify-center shadow-2xl rounded-xl bg-white text-black gap-4 -mr-6 mb-4">
                <img src={process.icon} alt="process Icon" className="w-12 h-12" />
                <h3 className='font-bold text-xl text-center text-main-dark'>{process.title}</h3>
                <p className="text-gray-500 text-center">{process.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 lg:px-24 pt-12">
        <div className="flex items-center flex-col md:flex-row md:justify-between my-4">
          <h1 className="font-bold text-3xl mb-4">Welcom <span className="text-main">Gad</span>!</h1>
          <div className="flex items-center text-xl lg:text-3xl font-bold text-main-dark shadow-lg rounded-lg p-4 bg-gray-200">
            Total Bal: 
            <p>FRW 20 500 000</p>
          </div>
        </div>
        <div className="my-8">
          <div className='mb-8 flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='flex-1'>
              <input type="text" placeholder='Search for a merchant' className="w-full border border-gray-500 px-4 py-3 rounded-2xl" />
            </div>
            <div className='flex-1'>
              <select name="" id="" className="w-full border border-gray-500 px-4 py-3 rounded-2xl">
                <option value="">Sort By</option>
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
          <div className='flex items-center justify-center gap-8 flex-wrap mb-4'>
            {compagnies.map(compagnie => 
              <div key={compagnie.id} className="w-[350px] h-[400px] shadow-xl rounded-xl border border-main-dark cursor-pointer">
                <img src={compagnie.logo} alt="compagnie's logo" className='w-full h-2/3 object-contain rounded-t-xl' />
                <div className="h-1/3 w-full flex flex-col items-center justify-center px-2">
                  <p className="text-xl text-main-dark font-bold text-center">{compagnie.name}</p>
                  <div className="flex items-center gap-2">
                    <img src={boltIcon} alt="bolt icon" className="w-4 h-4" />
                    <spa>Earn at least</spa>
                    <div className="w-12 h-12 bg-main flex items-center justify-center font-bold rounded-xl">{`${compagnie.discount}%`}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="my-8">
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
        </div> */}
      </div>
      <div className="bg-main py-8 flex flex-col items-center justify-center gap-8">
        <h3 className="text-3xl font-bold">How it works</h3>
        <div className="flex items-center justify-center flex-wrap gap-8">
          {workingProcesses.map(process => 
            <div key={process.id} className="w-[300px] flex flex-col items-center justify-center shadow-2xl rounded-xl bg-main-dark text-black gap-4">
              <div className="w-[300px] p-8 flex flex-col items-center justify-center shadow-2xl rounded-xl bg-white text-black gap-4 -mr-6 mb-4">
                <img src={process.icon} alt="process Icon" className="w-12 h-12" />
                <p className="text-gray-500 text-center">{process.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard