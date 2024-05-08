import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Login from '../Pages/Login'
import Register from '../Pages/Registration'
import PrivateRoutes from './PrivateRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <PrivateRoutes /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'about', element: <div>About</div> },
      { path: 'contact', element: <div>Contact</div> },
      { path: 'services', element: <div>Services</div> },
    ],
  },
])