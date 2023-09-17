import React, { useEffect, useRef, useState } from "react";
import "../Pages/Homeowners/LoginPage.css";
import { Input } from "@material-tailwind/react";
import image1 from "../assets/Free_Sample_By_Wix.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function ResetPassword() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id")
  const [form, setForm] = useState({ password: "", cpassword: "", 'user_id' : user_id });

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

   useEffect(() => {
    emailInputRef.current.focus();
    document.title = "Forgot Password | DecorConnect";
  }, []);

  //validations

  const validation = () => {
    if (form.password.trim() === ""){
      toast.error("Enter your new password")
      return false;
    }else if(form.cpassword.trim() === ""){
      toast.error("Confirm your password")
      return false;
    }else if (form.cpassword.trim() !== form.password.trim()){
      toast.error("password does not match")
      return false;
    }
    return true;
  };

  


  // form submission

  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (validation){
      try{
        const response = await axios.post(
          import.meta.env.VITE_HOMEOWNER_URL + "homeowners/reset-password/",form)
          
        toast.success(response.data.message)
        console.log("hiiii")
        setForm({password : "",cpassword : ""})
        localStorage.removeItem("user_id")
        navigate("/login")
        toast.success(response.data.message)
      }catch{
        toast.error("error occured while changing password ! please try again")
        console.log("hello")
        
      }
    }
    
  };

  


  return (
   <>
   
    <div className="maindiv h-screen w-full flex justify-center items-center">
      <div className="sm:outward-shadow sm:h-5/6 sm:w-1/3 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img className="h-36" src={image1} alt="" />
          <h5 className="text-white my-5 text-lg">Join with Us</h5>
        </div>
      </div>
      
      <div className="outward-shadow bg-white w-4/5 h-4/5 sm:w-1/3 flex justify-center items-center">
      
        <form
          onSubmit={FormHandlerLogin}
          className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mt-32"
          action=""
        >
            <div className="flex justify-center text-2xl font-bold text-blue-gray-400 pb-5">
                <h1>Reset Password</h1>
            </div>
            
          <Input
            ref={emailInputRef}
            name="password"
            value={form.password}
            type="password"
            id="password"
            onChange={(e) => {
              // console.log(homeowner);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            className=""
            variant="standard"
            label="New Password"
          />
          <Input
            ref={emailInputRef}
            type="password"
            name="cpassword"
            value={form.cpassword}
            id="cpassword"
            onChange={(e) => {
              // console.log(homeowner);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            className=""
            variant="standard"
            label="Confirm Password"
          />

          <div className="flex justify-end">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm invisible">
              Forgot password?
            </a>
          </div>
          <button className="w-11/12 bg-red-900 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
            Continue
          </button>
          <div className="flex justify-center items-center space-x-2">
            {" "}
            {/* Center the "or" text */}
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-blue-gray-700">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">
            Continue to Login ?{" "}
              <a onClick={()=>navigate("/login/")} href="" className="text-blue-600 hover:text-blue-800">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default ResetPassword;
