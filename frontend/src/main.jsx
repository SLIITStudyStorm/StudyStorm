import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import Loading from './components/loading.jsx'

import PrivateRoute from './components/privateRoute.jsx'
import AdminRoute from './components/adminRoute.jsx'

import App from './App.jsx'
import HomePage from './pages/home.jsx'
import NotFoundPage from './pages/404.jsx'

import './index.css'
import AddCoursePage from './pages/coursemanagement/addCourse.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> } >
      
      {/* Public Routes */}
      <Route index={ true } path='/' element={ <HomePage /> } />
      {/* <Route path='/login' element={ <LoginPage /> } />
      <Route path='/register' element={ <RegisterPage /> } /> */}
        
      {/* Private Routes */}
      <Route path='' element={ <PrivateRoute /> }>
        {/* <Route path='/profile' element={ <ProfilePage /> } /> */}

        {/* Admin Routes */}
        <Route path='/admin' element={ <AdminRoute /> }>
          <Route path='/admin/course/add' element={ <AddCoursePage /> } />
        </Route>
      </Route>
      
      {/* Not Found Route */}
      <Route path='*' element={ <NotFoundPage /> } />
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
