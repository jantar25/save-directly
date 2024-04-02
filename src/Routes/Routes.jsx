import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'hotel', element: <div>Hotel</div> },
      { path: 'car-rentals', element: <div>Car Rental</div> },
      { path: 'attractions', element: <div>Attractions</div> },
    ],
  },
])