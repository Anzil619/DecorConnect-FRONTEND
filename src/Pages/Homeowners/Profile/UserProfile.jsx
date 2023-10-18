import React, { useEffect } from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { FaRegCheckCircle } from "react-icons/fa";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUserAddress,
  UpdateUser,
  EditUserAddress,
  GetUserInfo,
  GetUserPosts,
} from "../../../Services/HomeownerApi";
import {
  setUserAddress,
  setupdateInfo,
} from "../../../Redux/ProfessionalSlice";
import { PostModal } from "../../../Components/Modal/PostModal";
import { useParams } from "react-router-dom";

function UserProfile() {

    const { userId } = useParams();
  

  const { userinfo } = useSelector((state) => state.professional);
  const { user_address } = useSelector((state) => state.professional);

    const [user,setUser] = useState(null) 
    const [post,setPost] = useState(null) 

  const [address, setAddress] = useState({
    user: userinfo.id,
    district: Object.keys(user_address).length > 0 ? user_address.district : "",
    state: Object.keys(user_address).length > 0 ? user_address.state : "",
    country: Object.keys(user_address).length > 0 ? user_address.country : "",
    address_line:
      Object.keys(user_address).length > 0 ? user_address.address_line : "",
    phone: Object.keys(user_address).length > 0 ? user_address.phone : "",
  });

  const dispatch = useDispatch();

  useEffect(()=>{
    FetchUserInfo();
    FetchUserPost();
  },[])


  const FetchUserInfo = async () =>{

    try {
    const id = userId
    const res = await GetUserInfo(id)
    setUser(res.data)

    console.log(res.data,"anzilleee");
    }
  catch(error){
    console.log(error);
    toast.error("something error")  
  }
}

  const FetchUserPost = async () => {

    try {
      const user_id = userId;
      const res = await GetUserPosts(user_id);
      setPost(res.data)  
      console.log(res.data, "Posts");

    }catch (error) {

      console.log(error);
      
    }
  };


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

      <div className="profile-page">
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover bg-black"
            style={{ backgroundImage: `url(${user?.cover_photo})` }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
            <div className="flex justify-end p-3">
              
            </div>
            
          </div>

          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-14">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="h-28 flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative h-44 w-44 -top-24">
                      <div className="group relative h-44 w-44">
                        <img
                          alt="..."
                          src={user?.profile_photo}
                          className="w-full h-full shadow-xl  object-center rounded-full border-none "
                        />
                        
                        
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Message
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className=" flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                        <span className="text-sm text-blueGray-400">Posts</span> */}
                      </div>
                      <div className="mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                        <span className="text-sm text-blueGray-400">Posts</span> */}
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                        <span className="text-sm text-blueGray-400">Comments</span> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center ">
                  <div className="flex justify-center">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mr-2">
                      {user?.name}
                    </h3>
                    
                  </div>

                  {user?.role === "professional" ? (
                    <div className="flex justify-center">
                      <h1 className="font-serif text-xs pr-2 text-indigo-500">
                        PROFESSIONAL
                      </h1>
                      <FaRegCheckCircle color="indigo" size={15} />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {Object.keys(user_address).length > 0 ? (
                      <>
                        <div>
                          {user_address.state},{user_address.country}
                        </div>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {user?.email}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    7989889898
                  </div>
                </div>

                <div className="mt-10 py-10  text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                        Hey, there im Looking for experienced professional who
                        can build my home like how i wnato
                      </p>

                      <a href="#pablo" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="flex justify-center">
                  <h1 className="font-serif">Posts</h1>
                </div>

                <div className="grid grid-cols-3 mt-10 mb-10 gap-10">
                    {post?.map((posts)=>(
                        
                        <div>
                        <PostModal cardImage = {posts.image}
                         profile_photo = {posts.user.profile_photo}
                          name={posts.user.name}
                          contentImage = {posts.image}
                          
                          />
                      </div>
                        
                    ))}
                  
                 
                </div>
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center bg-black"></div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
