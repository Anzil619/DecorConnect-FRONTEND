


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminProtected from '../ProtectedRoutes/AdminProtected'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import AdminLogin from '../Pages/Admin/AdminLogin'


function AdminRoutes() {
  return (
    <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/adminlogin/' element={<AdminLogin/>}/>
        </Route>
        <Route element={<AdminProtected/>}>
            <Route path='/adminhomepage/' element={<AdminHomePage/>}/>

        </Route>
    </Routes>
  )
}

export default AdminRoutes