import React, { useEffect, useState } from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import { Avatar, Typography, IconButton,Button } from "@material-tailwind/react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { FaRegComment } from "react-icons/fa";
import ReadMore from "../../../Components/ReadMore";
import { ListPosts, SuggestionFirm } from "../../../Services/HomeownerApi";
import { useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Post() {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = React.useState(false);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  const { userinfo } = useSelector((state) => state.professional);


  const [post, setPost] = useState(null)
  const [firm, setFirm] = useState(null)

  useEffect(()=>{
    FetchPostInfo();
  },[])

  const FetchPostInfo = async () => {
    try {
      // Fetch posts
      const postResponse = await ListPosts();
      const posts = postResponse.data;
  
      // Sort posts by created_date in descending order
      posts.sort((a, b) => {
        const dateA = new Date(a.created_date);
        const dateB = new Date(b.created_date);
        return dateB - dateA;
      });
  
      // Fetch approved firms
      const firmResponse = await SuggestionFirm();
      const firms = firmResponse.data;
  
      // Filter approved firms
      const approvedFirms = firms.filter((firm) => firm.status === "approved");
  
      // Update state with sorted posts and approved firms
      setPost(posts);
      setFirm(approvedFirms);
  
      console.log(posts, "Sorted posts");
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div>
      {" "}
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>
      <div
        className="w-full sticky top-0 z-50
   transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>


      <div className="grid grid-cols-3">
        {/* <div className="bg-black">dsd</div> */}
        <div className="grid col-span-2 ">
          <div className="flex justify-end mt-4 mr-4">
            <Button
            onClick={()=>navigate("/homeowner/createpost/")}
            >
            Share your Post
            </Button>
            </div>

          {post?.map((feed)=>(
              <div className="flex justify-center">
              <div className="bg-white m-10 rounded-sm p-4 shadow-md w-3/4">
                {/* Profile Photo */}
                
                <div className="flex items-center gap-4">
                <Link to={`/homeowner/userprofile/${feed.user.id}`}>
                  <Avatar
                    src={feed.user.profile_photo}
                    alt="avatar"
                    variant="rounded"
                  />
                  </Link>

                  <div>
                  <Link to={`/homeowner/userprofile/${feed.user.id}`}>
                    <Typography variant="h6">{feed.user.name}</Typography>
                    </Link>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {feed.location}
                    </Typography>
                  </div>
                </div>
    
                {/* Post Title */}
    
                <div className="w-full bg-black">
                  <img
                    src={feed.image}
                    alt="Post Image"
                    className="mt-2 rounded-lg h-auto "
                  />
                </div>
    
                {/* Like and Comment Options */}
                <div className="flex mt-2">
                  <IconButton
                    className=""
                    variant="text"
                    size="sm"
                    color={isFavorite ? "red" : "blue-gray"}
                    onClick={handleIsFavorite}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </IconButton>
    
                  <button className="flex items-center ml-4">
                    <FaRegComment className="text-gray-800" size={19} />
                  </button>
                </div>
                <div className="text-sm ">17 likes</div>
                <div className="text-sm mt-2">View all 72 Comments</div>
                <ReadMore text= {feed.caption} maxLines = "2"/>
    
              </div>
              </div>
          ))}
        
          
          
        </div>
        <div className=" border border-l-2 flex justify-center">
          <div className="w-full">
            <div className=" bg-white flex justify-center mt-10">
              <img onClick={()=> navigate("/homeowner/homeownerprofile/")} className="rounded-full w-20 cursor-pointer" src={userinfo.profile_photo} alt="" />
            </div>
            <div className="mt-5 flex justify-center">
              <a href="" onClick={()=> navigate("/homeowner/homeownerprofile/")}>{userinfo.name}</a>
            </div>
            <div className="mt-10 ml-2 ">
              <div className="flex justify-around ">
            <h1>Suggested Firms</h1>
            
            <a onClick={()=> navigate("/homeowner/findprofessionals/")} className="text-indigo-800" href="">View All</a>
            </div>

            {firm?.map((firms)=>(
              <div className=" mt-5 flex ml-20">
              <img className="rounded-full w-8 mr-3" src={firms.cover_photo} alt="" />
              <Link to={`/homeowner/singlefirm/${firms.id}`}>
              <h1 className="font-serif">{firms.firm_name}</h1>
              </Link>
              </div> 
            ))}
            
              
                
       
             
                      
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
