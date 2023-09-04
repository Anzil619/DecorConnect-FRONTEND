



import React from 'react'
import { Route,Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import LoginPage from '../Pages/Homeowners/LoginPage'
import SignupPage from '../Pages/Homeowners/SignUp/Signup'
import HomeownerProtected from '../ProtectedRoutes/HomeownerProtected'
import HomeownerHomepage from '../Pages/Homeowners/Homepage/HomeownerHomepage'


export default function HomeownerRoutes() {
  return (
    <Routes>
        <Route exact element = {<PrivateRoute/>}>
            <Route path='/login/' element={<LoginPage/>}/> 
            <Route path='/signup/' element={<SignupPage/>}/> 

        </Route>
        <Route exact element = {<HomeownerProtected/>}>
            <Route path='/homeownerhomepage/' element = {<HomeownerHomepage/>}/>

        </Route>
    </Routes>
  )
}