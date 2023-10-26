



import React from 'react'
import { Route,Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import LoginPage from '../Pages/Homeowners/LoginPage'
import SignupPage from '../Pages/Homeowners/SignUp/Signup'
import HomeownerProtected from '../ProtectedRoutes/HomeownerProtected'
import HomeownerHomepage from '../Pages/Homeowners/Homepage/HomeownerHomepage'
import FindProfessionals from '../Pages/Homeowners/FindProfessionals/FindProfessionals'
import SingleFirm from '../Pages/Homeowners/FindProfessionals/SingleFirm'
import HomeownerProfile from '../Pages/Homeowners/Profile/MyUserProfile'
import SingleProject from '../Pages/Homeowners/Projects/SingleProject'
import Post from '../Pages/Homeowners/Post/Post'
import CreatePost from '../Pages/Homeowners/Post/CreatePost'
import HomeownersChat from '../Pages/Homeowners/chat/HomeownersChat'
import UserProfile from '../Pages/Homeowners/Profile/UserProfile'
import About from '../Pages/About'


export default function HomeownerRoutes() {
  return (
    <Routes>
      
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/login/' element={<LoginPage/>}/> 
            <Route path='/signup/' element={<SignupPage/>}/> 
        </Route>

        <Route exact element = {<HomeownerProtected/>}>

            <Route path='/homeownerhomepage/' element = {<HomeownerHomepage/>}/>
            <Route path='/findprofessionals/' element = {<FindProfessionals/>}/>
            <Route path='/explore/' element = {<Post/>}/>
            <Route path='/about/' element = {<About/>}/>
            <Route path='/singlefirm/:firmId/' element={<SingleFirm />} />
            <Route path='/homeownerprofile/' element={<HomeownerProfile />} />
            <Route path='/createpost/' element={<CreatePost/>} />
            
            <Route path='/chat/' element={<HomeownersChat/>} />
            <Route path='/userprofile/:userId/' element={<UserProfile/>} />
            <Route path='/singleproject/:projectId/' element={<SingleProject />} />
        </Route>
    </Routes>
  )
}