import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import eye from '../Assets/Icons/eye.svg'
import eyeCrossed from '../Assets/Icons/eye-crossed.svg'
import { updateUserProfile } from '../Redux/ApiCalls'
import { apiRequest } from '../Redux/ApiCalls'
import Notification from '../Components/Notification'
import Loading from '../Components/Loading'

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser,error,isFetching  } = useSelector(state => state.currentUser)
  const [img,setImg] = useState('')
  const [names,setNames] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmNewPassword,setConfirmNewPassword] = useState('')
  const [notification,setNotification] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [successNotification,setSuccessNotification] = useState(null)
  const [newPasswordType, setNewPasswordType] = useState('password')
  const [oldPasswordType, setOldPasswordType] = useState('password')
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState('password')
  const [toggleChangePassword,setToggleChangePassword] = useState(false)

  const toggleNewPassword = () => {
    newPasswordType==='password'?
      setNewPasswordType('text') :
      setNewPasswordType('password')
  }

  const toggleOldPassword = () => {
    oldPasswordType==='password'?
      setOldPasswordType('text') :
      setOldPasswordType('password')
  }

  const toggleConfirmNewPassword = () => {
    confirmNewPasswordType==='password'?
      setConfirmNewPasswordType('text') :
      setConfirmNewPasswordType('password')
  }

  if (img) {
    const handleUpdateProfile = async() => {
      const imgString = img
      const updatedUser = { ...currentUser,userPicture:imgString }
      updateUserProfile(currentUser.userUid,dispatch,{ picture:imgString },updatedUser)
      setImg('')
    }
    handleUpdateProfile()
  }

  const handleEditname = (e) => {
    e.preventDefault()
    if (names === '' | names === currentUser.userName) {
      setNotification('Names must be changed and not empty')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else{
      const updatedUser = { ...currentUser,userName:names }
      updateUserProfile(currentUser.userUid,dispatch,{ name:names },updatedUser)
      setNames('')
    }
  }

  const handleChangeAdminPassowrd = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    if(!newPassword || !confirmNewPassword || !oldPassword) {
      setIsLoading(false)
      setNotification('All fields are required')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } else if (newPassword !== confirmNewPassword) {
      setIsLoading(false)
      setNotification('Confirm password must be the same as password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      try {
        const res = await apiRequest.put(`/users/change/password/${ currentUser.userUid }`,{ oldPassword,newPassword },{ timeout: 30000 })
        setIsLoading(false)
        setSuccessNotification(res.data.message)
        setTimeout(() => {
          setSuccessNotification(null)
        }, 5000)
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      } catch (error) {
        setIsLoading(false)
        if (error.response) {
          setNotification(error.response?.data.message)
        } else {
          setNotification(error.message)
        }
        setIsLoading(false)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }

  }

  return (
    <div className='w-full mx-auto p-4 md:p-8'>
      <Notification failure={notification || error} success={successNotification} color={successNotification? 'green' : 'red'} />
      { isFetching && <div className="w-full my-4"><Loading /></div> }
      <h1 className='text-4xl font-bold text-center my-8'>Profile</h1>
      <div className='shadow-xl p-4'>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <div className='basis-1/3'>
            {currentUser.userPicture ?
              <img src={currentUser?.userPicture} alt="avatar" className='w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full mx-auto' /> :
              <div className='w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full bg-main-dark  flex items-center justify-center mx-auto'>
                <p className='text-main font-bold text-[70px] md:text-[150px]'>{currentUser?.customerNames.slice(0,2).toUpperCase()}</p>
              </div>}
            <p data-testid='openReset' className='my-4 text-center underline underline-offset-2 text-headers cursor-pointer'
              onClick={() => setToggleChangePassword(!toggleChangePassword)}>
              Click here to change password
            </p>
          </div>
          <div className='basis-2/3 md:ml-4'>
            <h2 className='text-main-dark text-3xl md:text-5xl xl:text-7xl font-bold mb-4 text-center md:text-left'>{currentUser?.customerNames}</h2>
            <div className='flex flex-col md:flex-row items-center'>
              <p className='text-xl md:text-3xl text-headers'>{currentUser?.customerMsisdn}</p>
              <span className='text-xl md:text-3xl text-gray-400'></span>
            </div>
            {/* <div>
              <input data-testid='image-input' type="file" accept='Image/*' id="file" onChange={(e) => setImg(e.target.files[0])} className='hidden' />
              <label htmlFor="file" className='cursor-pointer'>
                <div className='border border-dashed p-4 md:p-8 mt-4 text-center border-4 text-text text-2xl'>
                  Click in this area to add a Picture
                </div>
              </label>
            </div> */}
          </div>
        </div>
        {toggleChangePassword &&
          <div className='my-8'>
            <form className='w-full p-4 border rounded-lg' onSubmit={handleChangeAdminPassowrd}>
              <div className='flex flex-col md:flex-row md:items-center w-full my-2'>
                <label htmlFor="oldPassword" className='mb-1 text-lg font-bold basis-1/3'>Old Password*</label>
                <div className="flex items-center border rounded-lg basis-2/3 w-full">
                  <input type={oldPasswordType} name='oldPassword' value={oldPassword} placeholder='Password'
                    className='p-2 w-full rounded-lg' onChange={(e) => setOldPassword(e.target.value)}/>
                  <div data-testid='toggle-oldPassword-button' onClick={toggleOldPassword} className='p-2 cursor-pointer'>
                    {oldPasswordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                  </div>
                </div>
              </div>
              <div className='flex flex-col md:flex-row md:items-center  w-full my-2'>
                <label htmlFor="newPassword" className='mb-1 text-lg font-bold basis-1/3'>New Password*</label>
                <div className="flex items-center border rounded-lg basis-2/3 w-full">
                  <input type={newPasswordType} name='newPassword' value={newPassword} placeholder='New Password'
                    className='p-2 w-full rounded-lg' onChange={(e) => setNewPassword(e.target.value)} />
                  <div data-testid='toggle-Password-button' onClick={toggleNewPassword} className='p-2 cursor-pointer'>
                    {newPasswordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                  </div>
                </div>
              </div>
              <div className='flex flex-col md:flex-row md:items-center  w-full my-2'>
                <label htmlFor="confirmNewPassword" className='mb-1 text-lg font-bold basis-1/3'>Confirm New Password*</label>
                <div className="flex items-center border rounded-lg basis-2/3 w-full">
                  <input type={confirmNewPasswordType} name='confirmNewPassword' value={confirmNewPassword} placeholder='Confirm New Password'
                    className='p-2 w-full rounded-lg' onChange={(e) => setConfirmNewPassword(e.target.value)} />
                  <div data-testid='toggle-confirm-password-button' onClick={toggleConfirmNewPassword} className='p-2 cursor-pointer'>
                    {confirmNewPasswordType !== 'text' ? <img src={eye} alt='eye-Icon' /> : <img src={eyeCrossed} alt='eyeCrossed-Icon' />}
                  </div>
                </div>
              </div>
              <button data-testid='Reset Password' type='submit' className='flex items-center justify-start px-4 py-2 text-md text-white
                bg-main-dark rounded-lg font-semibold shadow-sm' disabled={isLoading}>
                {isLoading && <div className="animate-spin rounded-full h-[20px] w-[20px] border-t-4 border-b-4 border-white mr-4"></div>}
                {isLoading? 'Reseting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        }
        <div>
          <h2 className='mt-4 text-4xl text-text font-bold text-center md:text-left'>Account</h2>
          <hr className='border boder-gray-700 my-8'/>
          <form onSubmit={handleEditname}>
            <div className='flex flex-col md:flex-row md:items-center w-full my-2'>
              <label htmlFor="email" className='mb-1 text-lg font-bold basis-1/3'>Number</label>
              <div className='p-2 border rounded-lg basis-2/3 w-full'>{currentUser?.customerMsisdn}</div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center  w-full my-2'>
              <label htmlFor="names" className='mb-1 text-lg font-bold basis-1/3'>Full Name*</label>
              <div className='p-2 border rounded-lg basis-2/3 w-full'>{currentUser?.customerNames}</div>
              {/* <input data-testid='names' type='text' name='names'  defaultValue={currentUser?.customerNames}
                className='p-2 border rounded-lg basis-2/3 w-full' onChange={(e) => setNames(e.target.value)} /> */}
            </div>
            {/* <button data-testid='update' type='submit' className='px-4 py-3 bg-main text-white font-bold rounded-lg mt-8' disabled={isFetching}>
              {isFetching? 'Updating...' : 'Update profile'}
            </button> */}
          </form>
        </div>

      </div>
    </div>
  )
}

export default Profile