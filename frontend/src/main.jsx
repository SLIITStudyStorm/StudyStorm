import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import Loading from './components/loading.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import PrivateRoute from './components/privateRoute.jsx'
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      
      {/* Public Routes */}
      {/* <Route index={ true } path='/' element={ <HomePage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/register' element={ <RegisterPage /> } /> */}
        
      {/* Private Routes */}
      <Route path='' element={ <PrivateRoute /> }>
        {/* <Route path='/profile' element={ <ProfilePage /> } /> */}
      </Route>
      
      {/* Not Found Route */}
      {/* <Route path='*' element={ <NotFoundPage /> } /> */}
    </Route>
  )
);      

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={ router } />
        </Suspense>
      </React.StrictMode>
  </Provider>
)
