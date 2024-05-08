import { compagnies } from '../Constants/dummydata'

const Compagnies = () => {
  return (
    <div className='flex items-center justify-center gap-4 flex-wrap mb-4 mt-8'>
    {compagnies.map(compagnie => 
      <div key={compagnie.id} className="w-[250px] h-[250px] shadow-xl rounded-xl border border-main-dark cursor-pointer">
        <img src={compagnie.logo} alt="compagnie's logo" className='w-full h-2/3 object-contain rounded-t-xl' />
        <div className="h-1/3 w-full flex items-center justify-center px-2">
          <p className="text-xl text-main-dark font-bold text-center">{compagnie.name}</p>
        </div>
      </div>
    )}
  </div>
  )
}

export default Compagnies