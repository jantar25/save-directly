import { useState }  from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { navigations, accountNavigations } from '../Constants/navigations'
import useClickOutside from '../Hooks/useClickOutside'
import menuIcon from '../Assets/Icons/menu.svg'
import logoutIcon from '../Assets/Icons/logout.svg'
import userIcon from '../Assets/Icons/user.svg'

import { userLogout } from '../Redux/ApiCalls'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.currentUser)
  const [toggleMenu,setToggleMenu] = useState(false)
  const [toggleProfile,setToggleProfile] = useState(false)
  const closeMenu = () => setToggleMenu(false)
  const closeProfile = () => setToggleProfile(false)
  const dropDownMenuRef = useClickOutside(closeMenu)
  const dropDownProfilRef = useClickOutside(closeProfile)

  const navLinkActive = 'border-b-4 border-main ease-in duration-200'

  const logOut = () => {
    userLogout(dispatch)
    setToggleProfile(false)
    navigate("/login")
  }


  return (
    <div className='h-[10vh] sticky top-0 z-50 bg-main-dark flex items-center justify-between px-4 lg:px-24'>
      <div className='flex items-center gap-16'>
        <img src={ menuIcon } alt='menu-icon' className='lg:hidden' onClick={() => setToggleMenu(!toggleMenu)}/>
        <NavLink to='/'>
          <h1 className="text-xl">Save<span className='text-main'>Directly</span></h1>
        </NavLink>
      </div>

      <div className='flex items-center justify-between'>
        <div className='hidden lg:flex items-center justify-between'>
          {navigations.map((nav) => (
            <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive? navLinkActive : ''}>
              <span className='text-md font-semibold mx-2 text-white hover:border-b-4 border-main ease-in duration-200'>{nav.name}</span>
            </NavLink>
            ))
          }
        </div>
        {!currentUser?
          <div className="flex items-center gap-1">
            <Link to='/login/individual'>
              <button className='hidden border border-2 border-main rounded-lg md:flex text-md md:text-xl font-bold px-4 py-1 text-main hover:text-orange-500'>Individual</button>
            </Link>
            <Link to='/login/corporate' className="bg-main ml-4 rounded-lg hover:bg-orange-500">
              <button className='text-md md:text-xl font-bold px-4 py-2 text-white'>Corporate</button>
            </Link>
          </div>:
          <div
            className='w-[40px] h-[40px] rounded-full bg-headers flex items-center justify-center ml-4 cursor-pointer border-2 border-white'
            onClick={() => setToggleProfile(!toggleProfile)}>
            {currentUser?.userPicture?
              <img src={ currentUser?.userPicture } alt="Client-Img" className="w-full h-full rounded-full object-cover" />:
              <img src={ userIcon } alt="Client-Icon" className="w-full h-full rounded-full object-cover" />}
          </div>
        }
      </div>
      {toggleProfile &&
        <div data-testid='profile-dropdown' className='absolute top-[8vh] right-4 lg:right-24 shadow-xl bg-gray-100 min-w-[270px] p-2 rounded-xl' ref={ dropDownProfilRef }>
          <div className="bg-white rounded-xl flex flex-col items-center justify-start py-4">
            <div className='flex flex-col items-center justify-center'>
              {accountNavigations.map((nav) => (
                <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive? 'bg-headers my-1 w-full text-center py-2 rounded-md text-white'
                : 'bg-gray-100 my-1 w-full text-center py-2 rounded-md'} onClick={ closeProfile }>
                  <span className='text-xl font-semibold'>{nav.name}</span>
                </NavLink>
                ))
              }

            </div>
            <hr className='border border-gray-200 w-[90%]'/>
            <div data-testid='logout-button' className="flex items-center justify-start cursor-pointer hover:bg-gray-100 px-4 py-2 mt-4 rounded-xl" onClick={ logOut }>
              <img src={ logoutIcon } alt="logoutIcon" className="mr-4 h-4 w-4" />
              <button className='font-bold'>Log Out</button>
            </div>
          </div>
          <div className='flex items-center mt-4 justify-between text-[10px]'>
            <Link to='/privacyPolicy' onClick={ closeProfile }>
              <p className='hover:text-headers text-text text-center'>Privacy Policy</p>
            </Link>
            <Link to='/cookiesPolicy' onClick={ closeProfile }>
              <p className='hover:text-headers text-text text-center'>Cookies Policy</p>
            </Link>
            <Link to='/termsAndConditions' onClick={ closeProfile }>
              <p className='hover:text-headers text-text text-center'>Terms and Conditions</p>
            </Link>
          </div>
        </div>}
      {toggleMenu &&
        <div data-testid='mobile-menu' className='absolute top-[10vh] left-0 right-0 lg:hidden flex flex-col items-center justify-between
         bg-white p-4 border' ref={ dropDownMenuRef }>
          {navigations.map((nav) => (
            <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive?  'bg-headers my-1 w-full text-center py-2 rounded-md text-white'
            : 'bg-gray-100 my-1 w-full text-center py-2 rounded-md'} onClick={ closeMenu }>
              <span className='text-xl font-semibold'>{nav.name}</span>
            </NavLink>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Navbar