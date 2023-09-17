import React, { useEffect, useRef, useState } from "react";
import "../Pages/Homeowners/LoginPage.css";
import { Input } from "@material-tailwind/react";
import image1 from "../assets/Free_Sample_By_Wix.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '' });

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);


   useEffect(() => {
    emailInputRef.current.focus();
    document.title = "Forgot Password | DecorConnect";
  }, []);

  //validations

  const validation = () => {
    if (form.email.trim() === "") {
      toast.error("email should not be empty");
      return false;
    } else if (!isValidEmail(form.email.trim())) {
      setForm([]);
      emailInputRef.current.focus();
      toast.warn("enter a valid email");
      return false;
    } 

    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }


  

  // form submission

  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (validation()) {
      try{
        const response = await axios.post(
          import.meta.env.VITE_HOMEOWNER_URL + "homeowners/forgotpassword/",form)

    toast.success(response.data.message)   
        console.log(response.data)
        console.log(response.data.message)
        navigate("/login/")
        localStorage.setItem("user_id", response.data.user_id);
        setForm({email: ''})
      
      }catch{
        console.log(response.data)
        toast.error(response.data.message)
      }

      return true
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
                <h1>Forgot Password ?</h1>
            </div>
            
            <Input
  ref={emailInputRef}
  name="email"
  value={form.email}
  id="email"
  onChange={(e) => {
    setForm({ ...form, email: e.target.value });
  }}
  className=""
  variant="standard"
  label="Email"
/>

          <div className="flex justify-end">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm invisible">
              Forgot password?
            </a>
          </div>
          <button className="w-11/12 bg-red-900 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
            Send Verification Mail
          </button>
          <div className="flex justify-center items-center space-x-2">
            
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

export default ForgotPassword;
