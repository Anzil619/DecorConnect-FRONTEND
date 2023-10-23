import React, { useState } from 'react';
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input, Textarea,Button } from '@material-tailwind/react';
import { CreatePosts } from '../../../Services/HomeownerApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
    const navigate = useNavigate()
  const [newImg, setNewImg] = useState(null); // To track the selected image file
  const [showImage, setShowImage] = useState(null); // To display the selected image
  const [form,setForm] = useState({"location" : "" , "caption" : ""})
  const { userinfo } = useSelector((state) => state.professional);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewImg(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setShowImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const AddPost = async() =>{
    try{
        const formData = new FormData()

        formData.append("location" , form.location)
        formData.append("user" , userinfo.id)
        formData.append("caption" , form.caption)
        formData.append("image" , newImg)
        const res =  await CreatePosts(formData)
        if (userinfo.role === "professional"){
          navigate("/professional/explore/")
        }else{
          navigate("/homeowner/explore/")
        }
        console.log(res);

    }catch(error){
        console.log(error);
    }
  }


  
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

      <div className='flex justify-center mt-5'>
        <h1 className='text-2xl'>Share Your Post</h1>
      </div>

      <div className='flex items-center flex-col'>
        
        <div className="w-96 mt-10">
      <Input
      name='location'
      onChange={(e)=>{
        setForm({...form, [e.target.name] : e.target.value})
        console.log(form);
      }}
      label="Location"
        />
    </div>
        
      <div className='w-1/3 mt-10'>

      <div className="flex items-center justify-center h-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600"
        >
          {newImg ? (
            <img src={showImage} className="w-56 h-full" alt="Selected" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or
                drag and drop image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
      </div>
      <div className="w-96 mt-10">
      <Textarea 
      name='caption'
      onChange={(e)=>{
        setForm({...form, [e.target.name] : e.target.value})
        console.log(form);
      }}
      label="Post Content" />
    </div>
    <div className='mt-5 flex justify-center w-96'>
            <Button
            onClick={AddPost}
            >Submit</Button>
    </div>
    <div className='mt-10'>
    </div>

    </div>
    </div>
  );
}

export default CreatePost;
