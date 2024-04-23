import React,{ useState }  from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { navigations } from '../Constants/navigations'
import Notification from './Notification'
import useClickOutside from '../Hooks/useClickOutside'
import menuIcon from '../Assets/Icons/menu.svg'
import logoutIcon from '../Assets/Icons/logout.svg'
import cameraIcon from '../Assets/Icons/camera.svg'

import { userLogout,updateUserProfile } from '../Redux/ApiCalls'


const Navbar = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.currentUser)
  const [img,setImg] = useState('')
  const [userName,setUserName] = useState('')
  const [notification,setNotification] = useState('')
  const [navbarBorder,setNavbarBorder] = useState(false)
  const [toggleMenu,setToggleMenu] = useState(false)
  const [toggleProfile,setToggleProfile] = useState(false)
  const [toggleEditName,setToggleEditName] = useState(false)
  const closeMenu = () => setToggleMenu(false)
  const closeProfile = () => setToggleProfile(false)
  const dropDownMenuRef = useClickOutside(closeMenu)
  const dropDownProfilRef = useClickOutside(closeProfile)

  const navLinkActive = 'border-b-4 border-blue-300 text-headers ease-in duration-200'
  const changeBackground=() => {
    if(window.scrollY>=60){
      setNavbarBorder(true)
    } else{
      setNavbarBorder(false)
    }
  }
  window.addEventListener('scroll',changeBackground)

  const logOut = () => {
    userLogout(dispatch)
    setToggleProfile(false)
  }

  if (img) {
    const handleUpdateProfile = async() => {
      const imgString = await convertToBase64(img)
      const updatedUser = { ...currentUser,userPicture:imgString }
      updateUserProfile(currentUser.userUid,dispatch,{ picture:imgString },updatedUser)
      setImg('')
    }
    handleUpdateProfile()
  }

  const handleEditname = (e) => {
    e.preventDefault()
    if (userName === '' | userName === currentUser.userName) {
      setNotification('Names must be changed and not empty')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else{
      const updatedUser = { ...currentUser,userName:userName }
      updateUserProfile(currentUser.userUid,dispatch,{ name:userName },updatedUser)
      setUserName('')
    }
  }

  return (
    <div className={`h-16 sticky top-0 z-50 bg-white flex items-center justify-between ${navbarBorder && 'shadow-md'}`}>
      <Notification failure={notification} color={!notification? 'green' : 'red'} />
      <img src={ menuIcon } alt='menu-icon' className='lg:hidden' onClick={() => setToggleMenu(!toggleMenu)}/>
      <NavLink to='/'>
      <h1 className="text-2xl font-bold">Save<span className='text-main'>Directly</span></h1>
      </NavLink>
      {/* <div className='flex items-center justify-between'>
        <div className='hidden lg:flex items-center justify-between'>
          {navigations.map((nav) => (
            <NavLink key={nav.id} to={nav.path} className={({ isActive }) => isActive? navLinkActive : ''}>
              <span className='text-xl font-semibold mx-2'>{nav.name}</span>
            </NavLink>
            ))
          }
        </div>
        {!currentUser?
          <Link to='/login' className="bg-blue-400 ml-4 rounded-lg hover:bg-strong">
            <button className='text-xl font-semibold px-4 py-1 text-white'>Login</button>
          </Link> :
          <div data-testid='user-profile-button' className='w-[40px] h-[40px] rounded-full bg-headers flex items-center justify-center ml-4 cursor-pointer' onClick={() => setToggleProfile(!toggleProfile)}>
            {currentUser?.userPicture?
              <img src={ currentUser?.userPicture } alt="Client-Img" className="w-full h-full rounded-full object-cover" />:
              <p className='text-white font-bold text-2xl'>{currentUser?.userName?.slice(0,2).toUpperCase()}</p>}
          </div>
        }
      </div> */}
      {toggleProfile && currentUser?.userType !== false &&
        <div data-testid='profile-dropdown' className='absolute top-[70px] right-4 md:right-20 shadow-xl bg-gray-100 min-w-[270px] p-2 rounded-xl' ref={ dropDownProfilRef }>
          <div className="bg-white rounded-xl flex flex-col items-center justify-start py-4">
            <div className='flex flex-col items-center justify-center'>
              <div className='relative w-[80px] h-[80px] rounded-full bg-headers flex items-center justify-center ml-4 mb-4'>
                {currentUser.userPicture?
                  <img src={ currentUser.userPicture } alt="Client-Img" className="w-full h-full rounded-full object-cover" />:
                  <p className='text-white font-bold text-2xl'>{currentUser.userName?.slice(0,2).toUpperCase()}</p>}
                <div className='absolute -bottom-2 right-0 p-2 bg-gray-600 rounded-full'>
                  <input data-testid='image-input' type="file" accept='Image/*' id="file" onChange={(e) => setImg(e.target.files[0])} className='hidden' />
                  <label htmlFor="file" className='cursor-pointer'><img src={ cameraIcon } alt='cameraIcon' /></label>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <h3 className='text-header font-bold mr-2'>{currentUser.userName}</h3>
                <div data-testid='toggleNameEdit' className='w-[30px] h-[30px] bg-gray-200 flex items-center justify-center rounded-full cursor-pointer' onClick={() => setToggleEditName(!toggleEditName)} >
                  <img src={editIcon} alt="edit-icon" />
                </div>
              </div>
              {toggleEditName &&
                <div className='m-2'>
                  <form className='flex items-center justify-center' onSubmit={ handleEditname }>
                    <input data-testid='user-email' className='bg-gray-100 text-black text-[16px] px-2 py-1 rounded-l-md' defaultValue={currentUser.userName} onChange={(e) => setUserName(e.target.value)} />
                    <button data-testid='UpdateName' type='submit' className='bg-[#3D61AD] text-white px-2 py-1 font-[700] rounded-r-md'>Update</button>
                  </form>
                </div>
              }
              <p className='text-header'>{currentUser.userEmail}</p>
            </div>
            <Link to='/resetUserPassword' className='my-4 '>
              <p className='text-center underline underline-offset-2 text-headers cursor-pointer'>change password</p>
            </Link>
            <hr className='border border-gray-200 w-[90%]'/>
            <div data-testid='logout-button' className="flex items-center justify-start cursor-pointer hover:bg-gray-100 px-4 py-2 mt-4 rounded-xl" onClick={ logOut }>
              <img src={ logoutIcon } alt="logoutIcon" className="mr-4" />
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
        <div data-testid='mobile-menu' className='absolute top-16 left-0 right-0 lg:hidden flex flex-col items-center justify-between
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