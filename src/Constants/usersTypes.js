import userIcon from '../Assets/Icons/newUser.svg'
import corporateIcon from '../Assets/Icons/corporate.svg'
import businessIcon from '../Assets/Icons/business.svg'

export const loginUsers = [
  {
    title: 'Individual',
    icon: userIcon,
    path: '/login/individual',
    description: 'Login to your individual account'
  },
  {
    title: 'Corporate',
    icon: corporateIcon,
    path: '/login/corporate',
    description: 'Login to your corporate account'
  }
]

export const registerUsers = [
  {
    title: 'Individual',
    icon: userIcon,
    path: '/register/individual',
    description: 'Create an individual account'
  },
  {
    title: 'Corporate',
    icon: corporateIcon,
    path: '/register/corporate',
    description: 'Register a corporate account'
  },
  {
    title: 'Business',
    icon: businessIcon,
    path: '/register/business',
    description: 'Sign up for a business account'
  }
]