


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
import HomeownerProfile from '../Pages/Homeowners/Profile/MyUserProfile'
import Post from '../Pages/Homeowners/Post/Post'
import UserProfile from '../Pages/Homeowners/Profile/UserProfile'
import CreatePost from '../Pages/Homeowners/Post/CreatePost'
import SingleFirm from '../Pages/Homeowners/FindProfessionals/SingleFirm'
import HomeownersChat from '../Pages/Homeowners/chat/HomeownersChat'
import About from '../Pages/About'


function ProfessionalRoutes() {
  return (
    
    <Routes>
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/signup/' element = {<ProfessionalSignup/>}/>
        </Route>

        <Route exact element = {<ProfessionalProtected/>}>
          
            <Route path='/professionalhomepage/' element = {<ProfessionalHomePage/>}/>
            <Route path='/explore/' element = {<Post/>}/>
            <Route path='/basicinfo/' element = {<BasicInfo/>}/>
            <Route path='/businessdetails/' element = {<BusinessDetails/>}/>
            <Route path='/firmverification/' element = {<FirmVerification/>}/>
            <Route path='/about/' element = {<About/>}/>

            <Route path='/singlefirm/:firmId/' element={<SingleFirm />} />
            <Route path='/addproject/' element = {<AddProject/>}/>
            <Route path='/createpost/' element={<CreatePost/>} />
            <Route path='/professionalprofile/' element = {<HomeownerProfile/>}/>
            <Route path='/userprofile/:userId/' element={<UserProfile/>} />
            <Route path='/myfirm/' element = {<MyFirm/>}/>
            <Route path='/myproject/:projectId/' element = {<MyProject/>}/>
            <Route path='/chat/' element={<HomeownersChat/>} />

            
        </Route>
    </Routes>
  )
}

export default ProfessionalRoutes
