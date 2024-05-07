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
import CourseHomePage from './pages/coursemanagement/index.jsx'
import CoursePage from './pages/coursemanagement/course.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import AdminRegisterPage from './pages/admin/register.jsx'
import ForgotPasswordPage from './pages/forgotPassword.jsx'
import CourseContentPage from './pages/coursemanagement/courseContent.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> } >
      
      {/* Public Routes */}
      <Route index={ true } path='/' element={ <HomePage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/register' element={ <RegisterPage /> } />
      <Route path='/forgotpassword' element={ <ForgotPasswordPage /> } />

        
      {/* Private Routes */}
      <Route path='' element={ <PrivateRoute /> }>
        {/* <Route path='/profile' element={ <ProfilePage /> } /> */}

        {/* Admin Routes */}
        <Route path='/admin' element={ <AdminRoute /> }>
          <Route path='/admin/courses' element={ <CourseHomePage /> } />
          <Route path='/admin/courses/create' element={ <CoursePage /> } />
          <Route path='/admin/courses/update/:id' element={ <CoursePage /> } />
          <Route path='/admin/courses/:id' element={ <CourseContentPage /> } />

          <Route path='/admin/users/create' element={ <AdminRegisterPage /> } />
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
