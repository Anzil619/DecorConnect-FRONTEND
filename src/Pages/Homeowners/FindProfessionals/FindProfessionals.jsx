import React from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { NavBar } from "../../../Components/NavBar/NavBar";
import "./FindProfessionals.css";
import image1 from "../../../assets/homepage/image1.jpg";
import { Rating } from "@material-tailwind/react";

function FindProfessionals() {
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

      <div className="h-32 flex justify-center items-center">
        <h1 className="text-3xl">Get Connected to Professionals</h1>
      </div>
      <div class="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search..."
          class="w-96 px-4 py-2 border shadow-md focus:outline-none focus:ring-0"
        />
        <button class="m-4 px-4 py-2 text-black border border-gray-400 shadow-md search-input">
          Search
        </button>
      </div>
      <div className="flex justify-center">
        <hr className="mt-14 w-3/5 border border-gray-400" />
      </div>
      <div className=" flex-row container mx-auto">
        <div className="xl:mx-44">
          <div className="flex justify-end me-10">
            <button class="flex justify-center items-center  m-4 px-4 h-9 py-2 text-black border border-gray-400 shadow-md search-input">
              <p> Filter</p>
            </button>
          </div>
          <div className=" h-64 grid grid-cols-3 gap-2 p-2 border shadow-lg mb-6">
            <div className=" flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={image1}
                alt=""
              />
            </div>
            <div className=" grid grid-flow-col grid-rows-1 sm:grid-rows-3 mx-2">
              <div className=" row-span-1 sm:row-span-1 flex">
                <div className=" flex-1/3 overflow-hidden ">
                  <img
                    className="w-10 mt-2 border border-black p-1 rounded-full  object-cover object-center"
                    src={Logo}
                    alt=""
                  />
                </div>
                <div className=" flex-1">
                  <p className="ml-3">Az Creation</p>
                  <Rating className="ml-2" value={4} readonly />
                </div>
              </div>
              <div className=" mx-2 row-span-2 sm:row-span-2">
                <p className="font-serif">
                  A creation that is faithful to the functional need,
                  demonstrating a context of art and aesthetics. With skill in
                  the practice of architecture for five years
                </p>
              </div>
            </div>

            <div className=" grid grid-flow-col grid-rows-1 sm:grid-rows-3">
              <div className=" row-span-1 sm:row-span-1 flex justify-center">
                <button class="m-4 w-44 h-10 px-4 py-2 text-black border border-gray-400 shadow-md search-input">
                  Send Message
                </button>
              </div>
              <div className=" row-span-2 sm:row-span-2 mx-16 flex justify-center items-center">
                <p className="font-serif">
                  68/1236, East Hill Road, KOZHIKODE, Kerala, 673005
                </p>
              </div>
            </div>
          </div>
          <div className=" h-64 grid grid-cols-3 gap-2 p-2 border shadow-lg mb-4">
            <div className=" flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={image1}
                alt=""
              />
            </div>
            <div className=" grid grid-flow-col grid-rows-1 sm:grid-rows-3 mx-2">
              <div className=" row-span-1 sm:row-span-1 flex">
                <div className=" flex-1/3 overflow-hidden ">
                  <img
                    className="w-10 mt-2 border border-black p-1 rounded-full  object-cover object-center"
                    src={Logo}
                    alt=""
                  />
                </div>
                <div className=" flex-1">
                  <p className="ml-3">Az Creation</p>
                  <Rating className="ml-2" value={4} readonly />
                </div>
              </div>
              <div className=" mx-2 row-span-2 sm:row-span-2">
                <p className="font-serif">
                  A creation that is faithful to the functional need,
                  demonstrating a context of art and aesthetics. With skill in
                  the practice of architecture for five years
                </p>
              </div>
            </div>

            <div className=" grid grid-flow-col grid-rows-1 sm:grid-rows-3">
              <div className=" row-span-1 sm:row-span-1 flex justify-center">
                <button class="m-4 w-44 h-10 px-4 py-2 text-black border border-gray-400 shadow-md search-input">
                  Send Message
                </button>
              </div>
              <div className=" row-span-2 sm:row-span-2 mx-16 flex justify-center items-center">
                <p className="font-serif">
                  68/1236, East Hill Road, KOZHIKODE, Kerala, 673005
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default FindProfessionals;
