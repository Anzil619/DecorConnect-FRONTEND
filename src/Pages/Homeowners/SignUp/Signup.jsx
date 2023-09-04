import React from "react";
import "../LoginPage.css";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../../../assets/Free_Sample_By_Wix.png";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.headers["Content-Type"] = "application/json";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { HomeownerGoogleSignup } from "../../../Services/HomeownerApi";
import jwtDecode from "jwt-decode";


function SignupPage() {

  const navigate = useNavigate();

  useEffect(() => {
    FirstInputRef.current.focus();
    
  }, []);



  const FirstInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const [pass, setPass] = useState({ cpassword: "", check: true });
  const [homeowner, setHomeowner] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    if ( homeowner.name.trim() === "") {
      toast.error("First name should not be empty");
      return false;
    
    } else if (homeowner.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(homeowner.email.trim())) {
      setHomeowner({ email: "" });
      toast.error("Enter a valid Email");
      return false;
    } else if (homeowner.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;



    } else if (homeowner.password.trim().length < 6) {
      toast.warn("Password should be at least 6 characters");
      return false;
    } else if (pass.cpassword === "") {
      toast.error("Confirm Password should not be empty");
      return false;
    } else if (homeowner.password !== pass.cpassword) {
      toast.error("Password didn't match");
      return false;
    } else if (!pass.check) {
      toast.error("Checkbox should be checked");
      return false;
    }
    return true;
  };





  // form submission

  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_HOMEOWNER_URL + "homeowners/register/",
          homeowner // The data object
          
        );
        
        toast.success(response.data.msg);
        alert()
        console.log(response.data);
        // navigate("/login/");
        setHomeowner({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setPass({ cpassword: "", check: true });
      } catch (error) {
        
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.email) {
            toast.error(errorData.email[0]);
          }
        } else {
          toast.error("An error occurred during registration.");
        }
      }
    }
  };


  //google authentication

  const [guser,setGuser] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGuser(codeResponse);
      GoogleAuth();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const GoogleAuth = async () => {
    try {
      if (!guser) return;
     
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${guser.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const res = await HomeownerGoogleSignup(response.data);
      toast.success(res.data.msg);
      setGuser([]);
      
      const token = JSON.stringify(res.data.token)
      const decoded = jwtDecode(token)
      localStorage.setItem('token',token)
      if (decoded.role === "homeowner") {
        if (decoded.is_active) {
          navigate("/homeowner/homeownerhomepage/");
        } else {
          toast.error("Your account is not active , Please try again later")
          navigate("/login/");
        }
      }else if (decoded.role === 'professional'){
        if (decoded.is_active){
          navigate("/professional/professionalhomepage/")
        }else{
          toast.error("your account is inactive , please try again later")
          navigate("/login/");
        }
      } 
    
      
      // navigate("/login/");
    } catch (error) {
      
      
      if (error.response && error.response.data && error.response.data.email) {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };







  return (
    <div className="maindiv h-screen w-full flex justify-center items-center">
      <ToastContainer />
      <div className="sm:outward-shadow sm:h-5/6 sm:w-1/3 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img className="h-36" src={image1} alt="" />
          <h5 className="text-white my-5 text-lg">Discover Interiors with Us</h5>
        </div>
      </div>
  
      <div className="outward-shadow bg-white w-4/5 h-4/5 sm:w-1/3 flex justify-center items-center">
        <form
          className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mb-12 mt-24"
          onSubmit={FormHandlerSignup}
        >
          <Input
            ref={FirstInputRef}
            value={homeowner.name}
            name="name"
            onChange={(e) => {
              
              setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
            }}
            variant="standard"
            label="Name"
          />
  
          <Input
            ref={emailInputRef}
            value={homeowner.email}
            name="email"
            onChange={(e) => {
              setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
            }}
            variant="standard"
            label="Email"
          />
  
          <Input
            value={homeowner.password}
            name="password"
            type="password"
            onChange={(e) => {
              setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
            }}
            variant="standard"
            label="Password"
          />
          <Input
            value={pass.cpassword}
            name="cpassword"
            type="password"
            onChange={(e) => {
              setPass({ ...pass, [e.target.name]: e.target.value });
            }}
            variant="standard"
            label="Confirm Password"
          />
          <button className="w-11/12 bg-red-900 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
            Sign Up
          </button>
          
  
          <div className="flex justify-center items-center space-x-2 mt-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-blue-gray-700">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
  
          <button onClick={() => login()} className="w-11/12 bg-white text-black border-2 border-gray-400 mt-4 mx-4 my-6 px-4 py-2 rounded-full hover:bg-opacity-70">
            Continue with Google
          </button>
          <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <a onClick={()=>navigate("/login/")} href="" className="text-blue-600 hover:text-blue-800">
              Log In
            </a>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
          }

export default SignupPage;
