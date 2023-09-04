

import jwtDecode from 'jwt-decode'
import React from 'react'
import HomeownerHomepage from '../Pages/Homeowners/Homepage/HomeownerHomepage'
import ProfessionalHomePage from '../Pages/Professionals/ProfessionalHomePage'
import { Outlet } from 'react-router-dom'
import UnknownUser from '../Pages/UnknownUser/UnknownUser'

function AdminProtected() {
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)
        if (decoded.role === 'homeowner'){
            return <HomeownerHomepage/>
        }else if (decoded.role === 'professional'){
            return <ProfessionalHomePage/>
        }else if (decoded.role === 'admin' && decoded.is_admin){
            return <Outlet/>
        }
    }else{
        return <UnknownUser/>
    }
  
}

export default AdminProtected