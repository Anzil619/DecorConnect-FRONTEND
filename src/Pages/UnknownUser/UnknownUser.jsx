import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import Logo from "../../assets/logos/dc-black-transparent.png"
import image from "../../assets/pxfuel.jpg"


function UnknownUser() {
  return (
    <div>
    <div className="flex justify-center my-4">
      <img src={Logo} className="w-20" alt="" />
    </div>
    

    <div className="absolute w-full">
      <NavBar />
    </div>


    <div className="h-screen pt-16 ">
      <img src={image} alt="" />
    </div>
  </div>
  )
}

export default UnknownUser