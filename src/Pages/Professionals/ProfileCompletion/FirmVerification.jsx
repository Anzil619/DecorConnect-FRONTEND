import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input } from "@material-tailwind/react";
import { Progress, Textarea } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileCompletion } from "../../../Services/ProfessionalApi";
import axios from "axios";


function FirmVerification() {
  const { FirmInfo } = useSelector((state) => state.professional);
  const { address } = useSelector((state) => state.professional);
  const { userinfo } = useSelector((state) => state.professional);

  const [form, setForm] = useState({
    owner_name: "",
    owner_pan: null,
    firm_liscense: null,
    gst_certificate: null,
    insurance: null,
  });



  

  const validation = () => {
    if (form.owner_name === "") {
      toast.error("owner name should not be empty");
      return true;
    } else if (form.owner_pan === null) {
      toast.error("pan card should not be empty");
      return false;
    } else if (form.firm_liscense === null) {
      toast.error("firm liscense should not be empty");
      return false;
    } else if (form.gst_certificate === null) {
      toast.error("gst certificate should not be empty");
      return false;
    } else if (form.insurance === null) {
      toast.error("insurance should not be empty");
      return false;
    }
    return true;
  };


  

  
  

  const FormSubmission = async (e) => {
    e.preventDefault();
    
      if (validation()) {


        const formData = new FormData();
        const formData1 = new FormData();
        const formData2 = new FormData();
        const formData3 = new FormData();
        const formData4 = new FormData();
        // Append form data to the FormData object
        formData.append("owner_name", form.owner_name);
        formData1.append("owner_pan", form.owner_pan);
        formData2.append("firm_liscense", form.firm_liscense);
        formData3.append("gst_certificate", form.gst_certificate);
        formData4.append("insurance", form.insurance);
        for (const entry of formData1.entries()) {
          console.log(entry[0], entry[1]);
        }


        const imageBlob = localStorage.getItem('imageBlob');

        console.log(imageBlob,"anzn");
        const formImage = new FormData();

        
        // Append the image blob to the FormData
        formImage.append("cover_photo", imageBlob);
  
        
        const data2 = {
          owner_name: formData,
          owner_pan: formData1,
          firm_liscense: formData2,
          gst_certificate: formData3,
          insurance: formData4,
        };
        const data = {
          about: FirmInfo.about,
          cover_photo: formImage,
          logo: FirmInfo.logoBase64,
          address: address,
          FirmInfo: FirmInfo,
          verification: data2,
          user_id: userinfo.id,
        };

        try {
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };


          const response = await axios.post(
          import.meta.env.VITE_PROFESSIONAL_URL + "profilecompletion/",
          data // The data object
          
        );
      
          if (response.status === 200) {
              toast.success("nish monu")
            } else {
              console.log(response);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
    
  };

  return (
    <div className="">
      <ToastContainer />
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
        <form
          onSubmit={FormSubmission}
          action=""
          className="grid grid-cols-2 gap-x-20 gap-y-8"
        >
          <Input
            name="owner_name"
            value={form.owner_name}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Owner's Name"
            className="w-96 "
          />
          <Input
            name="owner_pan"
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.files[0] });
            }}
            color="teal"
            label="Owner's PAN Card"
            className="w-96"
            type="file"
          />
          <Input
            name="firm_liscense"
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.files[0] });
            }}
            color="teal"
            label="Firm Liscense"
            className="w-96 border-gray-300"
            type="file"
          />
          <Input
            name="gst_certificate"
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.files[0] });
            }}
            color="teal"
            label="GST Certificate "
            className="w-96 border-gray-300"
            type="file"
          />
          <Input
            name="insurance"
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.files[0] });
            }}
            color="teal"
            label="Insurance Copy"
            className="border-gray-300 w-96"
            type="file"
          />
          <button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default FirmVerification;
