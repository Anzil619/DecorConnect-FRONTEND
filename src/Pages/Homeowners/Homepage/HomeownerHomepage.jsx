import React from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Footer } from "../../../Components/Footer/footer";
import homepage from "../../../assets/homepage/homepage.jpg";
import aboutImg from "../../../assets/homepage/image2.jpeg";
import homeImg from "../../../assets/homepage/image 3.jpg";
import testImg from "../../../assets/homepage/image5.jpg";
import proImage from "../../../assets/homepage/image6.jpg";
import contImg from "../../../assets/homepage/image7.jpg";
import "../../../Components/NavBar/NavBar.css";

function HomeownerHomepage() {
  return (
    <div>
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>

      <div
        className="w-full sticky top-0 z-50
       transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>

      <div className=" ">
        <img src={homepage} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center p-32">
        <h1 className="text-3xl font-bold">
          FOREVER LEAP IN THE FANTASY OF OUR OWN MANSION
        </h1>
        <h1 className="text-2xl font-medium mt-7 text-blue-gray-500">
          WE DO GREAT WORK FOR GOOD PEOPLE
        </h1>
      </div>

      <div className="h-screen bg-white grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {/* Grid Group 1 (Cells 1, 2, 4, 5) */}
        <div className="relative bg-white col-span-2 row-span-2">
          {/* Content for Grid Group 1 */}
          <img
            src={testImg}
            className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out transform hover:opacity-80"
            alt=""
            style={{ filter: "brightness(90%)" }}
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            PROJECTS
          </h1>
        </div>

        {/* Grid Cell 3 */}
        <div className="relative bg-white">
          <img
            src={aboutImg}
            className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out transform hover:opacity-80"
            alt=""
            style={{ filter: "brightness(90%)" }}
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            HOME
          </h1>
        </div>

        {/* Grid Cell 6 */}
        <div className="bg-white relative">
          <img
            src={homeImg}
            className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out transform hover:opacity-80"
            alt=""
            style={{ filter: "brightness(90%)" }}
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            ABOUT
          </h1>
        </div>
      </div>

      <div className=" bg-white grid grid-cols-2 gap-4 pl-4 pr-4 pb-4 ">
      <div className="grid-cols-1 flex justify-center items-center relative group">
  <img
    className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-80"
    src={proImage}
    alt=""
  />
  <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
    
  </h1>
</div>


<div className="grid-cols-2 relative group">
  <img
    className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-80"
    src={contImg}
    alt=""
  />
  <h1 className="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold">
    CONTACT US 
  </h1>
</div>


      </div>

      <div className="h-screen pt-5">
        <Footer />
      </div>
    </div>
  );
}

export default HomeownerHomepage;
