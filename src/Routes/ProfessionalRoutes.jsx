


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
import Explore from '../Pages/Homeowners/Explore/Explore'
import ProfessionalProfile from '../Pages/Professionals/Profile/ProfessionalProfile'
import MyFirm from '../Pages/Professionals/MyFirm/MyFirm'
import MyProject from '../Pages/Professionals/Project/MyProject'


function ProfessionalRoutes() {
  return (
    
    <Routes>
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/signup/' element = {<ProfessionalSignup/>}/>
        </Route>

        <Route exact element = {<ProfessionalProtected/>}>
          
            <Route path='/professionalhomepage/' element = {<ProfessionalHomePage/>}/>
            <Route path='/explore/' element = {<Explore/>}/>
            <Route path='/basicinfo/' element = {<BasicInfo/>}/>
            <Route path='/businessdetails/' element = {<BusinessDetails/>}/>
            <Route path='/firmverification/' element = {<FirmVerification/>}/>
            <Route path='/addproject/' element = {<AddProject/>}/>
            <Route path='/professionalprofile/' element = {<ProfessionalProfile/>}/>
            <Route path='/myfirm/' element = {<MyFirm/>}/>
            <Route path='/myproject/:projectId/' element = {<MyProject/>}/>
            
        </Route>
    </Routes>
  )
}

export default ProfessionalRoutes
