import { useState }  from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { navigations, accountNavigations } from '../Constants/navigations'
import AuthService from '../Services/AuthService'
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
  const token = AuthService.getToken()

  const logOut = () => {
    userLogout(dispatch)
    setToggleProfile(false)
    navigate("/")
  }


  return (
    <div className='h-[10vh] sticky top-0 z-50 bg-main-dark flex items-center justify-between px-4 lg:px-24'>
      <div className='flex items-center gap-16'>
        <img src={ menuIcon } alt='menu-icon' className='cursor-pointer lg:hidden' onClick={() => setToggleMenu(!toggleMenu)}/>
        <NavLink to='/' className="hidden text-xl sm:inline-block">
          <h1>Save<span className='text-main'>Directly</span></h1>
        </NavLink>
      </div>

      <div className='flex items-center justify-between gap-4'>
        {!token &&
          <div className='items-center justify-between hidden lg:flex'>
            {navigations.map((nav) => (
              <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive? navLinkActive : ''}>
                <span className='mx-2 font-semibold text-white duration-200 ease-in text-md hover:border-b-4 border-main'>{nav.name}</span>
              </NavLink>
              ))
            }
          </div>
        }
        {!token?
          <div className="flex items-center gap-1">
            <Link to='/auth/login/personal'>
              <button className='px-4 py-1 font-bold border border-2 rounded-lg border-main text-md md:text-xl text-main hover:text-orange-500'>Personal</button>
            </Link>
            <Link to='/auth/login/merchant' className="ml-4 rounded-lg bg-main hover:bg-orange-500">
              <button className='px-4 py-2 font-bold text-white text-md md:text-xl'>Corporate</button>
            </Link>
          </div>:
          <div
            className='w-[40px] h-[40px] rounded-full bg-headers flex items-center justify-center ml-4 cursor-pointer border-2 border-white'
            onClick={() => setToggleProfile(!toggleProfile)}>
            {currentUser?.userPicture?
              <img src={ currentUser?.userPicture } alt="Client-Img" className="object-cover w-full h-full rounded-full" />:
              <img src={ userIcon } alt="Client-Icon" className="object-cover w-full h-full rounded-full" />}
          </div>
        }
      </div>
      {toggleProfile &&
        <div data-testid='profile-dropdown' className='absolute top-[8vh] right-4 lg:right-24 shadow-xl bg-gray-100 min-w-[270px] p-2 rounded-xl' ref={ dropDownProfilRef }>
          <div className="flex flex-col items-center justify-start py-4 bg-white rounded-xl">
            <div className='flex flex-col items-center justify-center'>
              {accountNavigations.map((nav) => (
                <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive? 'bg-main my-1 w-full text-center p-2 rounded-md text-white'
                : 'my-1 w-full text-center p-2 rounded-md hover:bg-main hover-text-white'} onClick={ closeProfile }>
                  <span className='text-xl font-semibold'>{nav.name}</span>
                </NavLink>
                ))
              }

            </div>
            <hr className='border border-gray-200 w-[90%]'/>
            <div data-testid='logout-button' className="flex items-center justify-start px-4 py-2 mt-4 cursor-pointer hover:bg-gray-100 rounded-xl" onClick={ logOut }>
              <img src={ logoutIcon } alt="logoutIcon" className="w-4 h-4 mr-4" />
              <button className='font-bold'>Log Out</button>
            </div>
          </div>
          <div className='flex items-center mt-4 justify-between text-[10px]'>
            <Link to='https://savedirectly.com/privacy.html' target="_blank" onClick={ closeProfile }>
              <p className='text-center hover:text-headers text-text'>Privacy Policy</p>
            </Link>
            <Link to='https://savedirectly.com/privacy.html' target="_blank" onClick={ closeProfile }>
              <p className='text-center hover:text-headers text-text'>Cookies Policy</p>
            </Link>
            <Link to='https://savedirectly.com/terms.html' target="_blank" onClick={ closeProfile }>
              <p className='text-center hover:text-headers text-text'>Terms and Conditions</p>
            </Link>
          </div>
        </div>}
      {toggleMenu &&
        <div data-testid='mobile-menu' className='absolute top-[10vh] left-0 right-0 lg:hidden flex flex-col items-center justify-between
         bg-white p-4 border' ref={ dropDownMenuRef }>
          {navigations.map((nav) => (
            <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive?  'bg-main my-1 w-full text-center py-2 rounded-md text-white'
            : 'bg-gray-100 my-1 w-full text-center py-2 rounded-md hover:bg-main hover:text-white'} onClick={ closeMenu }>
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