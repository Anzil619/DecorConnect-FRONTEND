


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminProtected from '../ProtectedRoutes/AdminProtected'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import AdminLogin from '../Pages/Admin/AdminLogin'
import ListProfessionals from '../Pages/Admin/ListProfessionals'
import ListFirms from '../Pages/Admin/ListFirms'
import AdminSingleFirmView from '../Pages/Admin/AdminSingleFirmView'


function AdminRoutes() {
  return (
    <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/adminlogin/' element={<AdminLogin/>}/>
        </Route>
        <Route element={<AdminProtected/>}>
            <Route path='/adminhomepage/' element={<AdminHomePage/>}/>
            <Route path='/listprofessionals/' element={<ListProfessionals/>}/>
            <Route path='/listfirms/' element={<ListFirms/>}/>
            <Route path='/adminsinglefirmview/:firmId/' element={<AdminSingleFirmView/>}/>

        </Route>
    </Routes>
  )
}

export default AdminRoutes