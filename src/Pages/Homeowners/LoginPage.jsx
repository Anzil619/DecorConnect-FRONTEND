import React, { useEffect, useRef, useState } from "react";
import "./LoginPage.css";
import { Input } from "@material-tailwind/react";
import image1 from "../../assets/Free_Sample_By_Wix.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GetUserInfo, HomeownerGoogleSignin, HomeownerSignin } from "../../Services/HomeownerApi";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFirmInfo, setUserInfo } from "../../Redux/ProfessionalSlice";
import { GetFirmInfo } from "../../Services/ProfessionalApi";


function LoginPage() {
  const navigate = useNavigate();
  const [homeowner, setHomeowner] = useState({ email: "", password: "" });
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const dispatch = useDispatch()

   useEffect(() => {
    emailInputRef.current.focus();
    document.title = "Login | DecorConnect";
  }, []);

  //validations

  const validation = () => {
    if (homeowner.email.trim() === "") {
      toast.error("email should not be empty");
      return false;
    } else if (!isValidEmail(homeowner.email.trim())) {
      setHomeowner({ email: "" });
      emailInputRef.current.focus();
      toast.warn("enter a valid email");
      return false;
    } else if (homeowner.password.trim() === "") {
      toast.error("password should not be empty");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  const FetchUserInfo = async (token) =>{
    try {
    const id = token.id
    const res = await GetUserInfo(id)
    
    const data ={
      id : res.data.id,
      name : res.data.name,
      email : res.data.email,
      role : res.data.role,
      is_active : res.data.is_active,
      is_google : res.data.is_google,
      is_completed : res.data.is_google
    }
    dispatch(setUserInfo({
      userinfo : data
  }))}
  catch{
    toast.error("something error")  
  }
  }


 const FetchFirmInfo = async (token) =>{
  try{
    const id = token.id
    const ress = await GetFirmInfo(id)
    console.log(ress);
    console.log(ress.data.id);
    const data = {
      id : ress.data.id,
      firm_name : ress.data.firm_name,
      website : ress.data.website,
      about : ress.data.about,
      firm_description : ress.data.firm_description,
      awards : ress.data.awards,
      user : ress.data.user,
      address : ress.data.address,
    }

    dispatch(setFirmInfo({
      firminfo : data
    }))   


    
  }catch{
    toast.error("something error")  
  }
 }

  // form submission

  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (validation()) {

      HomeownerSignin(homeowner).then((res) => {
        // console.log(res.status)
        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          const decoded = jwtDecode(token);

          FetchUserInfo(decoded)
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
              if(decoded.is_completed){
                navigate("/professional/professionalhomepage/")
              }else{
                FetchFirmInfo(decoded)
                navigate("/professional/basicinfo/")
              }

            }else{
              toast.error("your account is inactive , please try again later")
              navigate("/login/");
            }
          } 
        }else {
          toast.error(
            "invalid login credentials please verify your email and password "
          );  
        }
      });
    }
  };

  // GOOGLE AUTHENTICATION
  const [guser,setGuser] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGuser(codeResponse);
      GoogleAuth();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  console.log(guser.access_token);
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

      const res = await HomeownerGoogleSignin(response.data);
      const token = JSON.stringify(res.data);
      const decoded = jwtDecode(token);
      if (decoded.role === "homeowner") {
        localStorage.setItem("token", token);
        navigate("/homeowner/homeownerhomepage/");
      } else if (decoded.role === "professional") {
        localStorage.setItem("token", token);
        navigate("/professional/professionalhomepage/");
      }
     
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred during signup.");
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
          <Input
            ref={emailInputRef}
            name="email"
            value={homeowner.email}
            id="email"
            onChange={(e) => {
              // console.log(homeowner);
              setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
            }}
            className=""
            variant="standard"
            label="Email"
          />
          <Input
            ref={passInputRef}
            name="password"
            id="password"
            type="password"
            value={homeowner.password}
            onChange={(e) => {
              // console.log(homeowner);
              setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
            }}
            variant="standard"
            label="Password"
          />
          <div className="flex justify-end">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm" onClick={()=>navigate("/forgotpassword")}>
              Forgot password?
            </a>
          </div>
          <button className="w-11/12 bg-red-900 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
            Login
          </button>
          <div className="flex justify-center items-center space-x-2">
          
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-blue-gray-700">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button onClick={() => login()} className="w-11/12 bg-white  text-black border-2 border-gray-400 mt-16 mx-4 my-6 px-4 py-2 rounded-full hover:bg-opacity-70">
            Continue with Google
          </button>
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?
              <a onClick={()=>navigate("/roleselection/")} className="text-blue-600 hover:text-blue-800">
                Sign up
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

export default LoginPage;
