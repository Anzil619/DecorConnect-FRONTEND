import React from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import image1 from "../../../assets/homepage/image1.jpg";
import image2 from "../../../assets/homepage/image2.jpeg";

function Explore() {
  return (
    <div>
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>

      <div className="w-full sticky top-0 z-50 transition-all duration-300 ease-in-out">
        <NavBar />
      </div>

      <div className="container mx-auto mt-8 grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md ">
          <div className="p-4 h-full">
            <img
              src={image2} // Replace with the actual image source
              alt=""
              className="w-full h-80 object-cover object-center" // Adjust the height here as needed
            />
            
          </div>
          <div className="flex justify-center items-center ">
            <p className="font-serif text-blue-gray-400">SummerWood</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 h-full">
            <img
              src={image2} // Replace with the actual image source
              alt=""
              className="w-full h-80 object-cover object-center" // Adjust the height here as needed
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="font-serif text-blue-gray-400">SummerWood</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
