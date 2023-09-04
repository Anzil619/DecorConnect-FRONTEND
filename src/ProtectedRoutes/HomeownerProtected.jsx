



import jwtDecode from 'jwt-decode'
import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfessionalHomePage from '../Pages/Professionals/ProfessionalHomePage'
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import UnknownUser from '../Pages/UnknownUser/UnknownUser'

function HomeownerProtected() {
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)
        if (decoded.role === 'homeowner'){
            return <Outlet/>
        }else if (decoded.role === 'professional'){
            return <ProfessionalHomePage/>
        }else if (decoded.role === "admin" && decoded.is_admin){
            return <AdminHomePage/>
        }
    }else{
        return <UnknownUser/>
    }

  
}

export default HomeownerProtected
