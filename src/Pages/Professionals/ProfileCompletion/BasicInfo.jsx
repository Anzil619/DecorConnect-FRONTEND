import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input, Textarea, tab } from "@material-tailwind/react";
import { Progress, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setAddress, setFirmInfo } from "../../../Redux/ProfessionalSlice";
import { useNavigate } from "react-router-dom";

function BasicInfo() {
    const [form, setForm] = useState({state : "", city : "", country : "", address_line : "",phone : "" });
    const [firm, setfirm] = useState({firm_name : ""})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {address} = useSelector((state)=> state.professional)
    const { FirmInfo } = useSelector((state) => state.professional)


    useEffect (()=>{
        setfirm({firm_name : FirmInfo.firm_name})
        setForm({
            state : address.state,
            city : address.city,
            country : address.country,
            address_line : address.address,
            phone : address.phone
        })
        
    },[])
    const validation = ()=>{
        if (firm.firm_name.trim() === ""){
            toast.error("firm name should not be empty")
            return false;
        }
        else if (form.state.trim() === ""){
            toast.error("state should not be empty")
            return false;
        }
        else if (form.city.trim() === ""){
            toast.error("city name should not be empty")
            return false;
        }
        else if (form.country.trim() === ""){
            toast.error("country name should not be empty")
            return false;
        }
        else if (form.phone.trim() === ""){
            toast.error("phone number should not be empty")
            return false;
        }else if (!/^\d{10}$/.test(form.phone.trim())) {
            toast.error("Phone number should be exactly 10 digits");
            return false;
        }
        return true;

    }
const FormSubmission = (e) =>{
    e.preventDefault()
    if (validation()){

        dispatch(setAddress({
            address : form
        }))
        dispatch(setFirmInfo({
            firminfo : firm
        }))
        navigate("/professional/businessdetails/")

    }
    
}


  return (
    <div className="">
        <ToastContainer/>
      <div className="flex justify-center my-12">
        <img src={Logo} className="w-20" alt="" />
      </div>
      
      <Progress
        value={50}
        size="lg"
        className="border border-gray-900/10 bg-gray-900/5 p-1 my-12"
      />

      <div className="flex justify-center my-20">
        <h1 className="text-2xl font-bold text-blue-gray-400">
          COMPLETE YOUR PROFILE
        </h1>
      </div>

      <div className="flex justify-center">
  <form onSubmit={FormSubmission} action="" className="grid grid-cols-2 gap-x-20 gap-y-8">
    <div className="w-96">
    <Input 
    name="firm_name"
     value={firm.firm_name} 
     onChange={(e)=>{
        
        setfirm({...firm, [e.target.name] : e.target.value})
     }}
      color="teal" 
      label="Business Name" 
      className="w-96" />
    </div>
    <Input
    name="state"
    value={form.state}
    onChange={(e)=>{
        setForm({...form , [e.target.name] : e.target.value})
    }}
     color="teal"
      label="State"
       className="" />
    <Input
     name="city"
     value={form.city}
     onChange={(e)=>{
         setForm({...form , [e.target.name] : e.target.value})
     }}

     color="teal"
     label="City"
      className="" />
    <Input
     name="country"
     value={form.country}
     onChange={(e)=>{
         setForm({...form , [e.target.name] : e.target.value})
     }}
     color="teal"
      label="Country" 
      className="" />
    <Textarea
     name="address_line"
     value={form.address_line}
     onChange={(e)=>{
         setForm({...form , [e.target.name] : e.target.value})
     }}
     color="teal"
      label="Address" 
      className="" />
    <Input 
     name="phone"
     value={form.phone}
     onChange={(e)=>{
         setForm({...form , [e.target.name] : e.target.value})
     }}
    color="teal"
     label="Phone"
     type="number"
      className="" />
    <button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
      Next
    </button>
  </form>
</div>
    </div>
  );
}

export default BasicInfo;
