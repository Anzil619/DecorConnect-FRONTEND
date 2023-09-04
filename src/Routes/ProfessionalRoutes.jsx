


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import ProfessionalSignup from '../Pages/Professionals/Signup/ProfessionalSignup'
import ProfessionalHomePage from '../Pages/Professionals/ProfessionalHomePage'
import ProfessionalProtected from '../ProtectedRoutes/ProfessionalProtected'

function ProfessionalRoutes() {
  return (
    
    <Routes>
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/signup/' element = {<ProfessionalSignup/>}/>
        </Route>

        <Route exact element = {<ProfessionalProtected/>}>
            <Route path='/professionalhomepage/' element = {<ProfessionalHomePage/>}/>
        </Route>
    </Routes>
  )
}

export default ProfessionalRoutes
