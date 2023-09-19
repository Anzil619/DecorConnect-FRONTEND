


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import ProfessionalSignup from '../Pages/Professionals/Signup/ProfessionalSignup'
import ProfessionalHomePage from '../Pages/Professionals/ProfessionalHomePage'
import ProfessionalProtected from '../ProtectedRoutes/ProfessionalProtected'
import BasicInfo from '../Pages/Professionals/ProfileCompletion/BasicInfo'
import BusinessDetails from '../Pages/Professionals/ProfileCompletion/BusinessDetails'
import FirmVerification from '../Pages/Professionals/ProfileCompletion/FirmVerification'
import AddProject from '../Pages/Professionals/ProfileCompletion/AddProject'


function ProfessionalRoutes() {
  return (
    
    <Routes>
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/signup/' element = {<ProfessionalSignup/>}/>
        </Route>

        <Route exact element = {<ProfessionalProtected/>}>
            <Route path='/professionalhomepage/' element = {<ProfessionalHomePage/>}/>
            <Route path='/basicinfo/' element = {<BasicInfo/>}/>
            <Route path='/businessdetails/' element = {<BusinessDetails/>}/>
            <Route path='/firmverification/' element = {<FirmVerification/>}/>
            <Route path='/addproject/' element = {<AddProject/>}/>
            
        </Route>
    </Routes>
  )
}

export default ProfessionalRoutes
