import React from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import image from "../../../assets/pxfuel.jpg"
import {
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "../../../Components/Footer/footer";

function HomeownerHomepage() {
  return (
    <div>
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>
      
      <div className="absolute w-full">
        <NavBar />
      </div>

      <div className="h-screen pt-16 ">
        <img src='' alt="" />
        
      </div>
      <div className="h-screen pt-5">
        <Footer/>
      </div>
    </div>
  );
}

export default HomeownerHomepage;
