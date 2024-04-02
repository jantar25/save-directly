import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './Redux/store.js'
import { router } from './Routes/Routes'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor} >
      <React.Suspense fallback="Loading">
        <RouterProvider router={router} />
      </React.Suspense>
    </PersistGate>
  </Provider>
)
