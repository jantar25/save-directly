/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const UserTypeSelector = ({ user }) => {
  const { icon, title, description, path } = user
  return (
    <div className='w-[250px] sm:w-[350px] h-[300px] sm:h-[400px] shadow-2xl rounded-xl flex flex-col items-center justify-center gap-16 sm:gap-24 p-2'>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-16 sm:w-32 h-16 sm:h-32 bg-main-dark rounded-full flex items-center justify-center mb-4">
            <img src={icon} alt={title} className="w-8 sm:w-16 h-8 sm:h-16" />
        </div>
        <h1 className="text-xl md:text-2xl text-center font-black text-main-dark">{title}</h1>
        <p className="text-sm md:text-lg text-center text-gray-600">{description}</p>
      </div>
      <Link to={path} className='w-full sm:w-2/3 p-2 bg-main text-black rounded-full text-center font-bold hover:bg-orange-500'>
        Login as {title}
      </Link>
    </div>
  )
}

export default UserTypeSelector