import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress, Textarea } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setFirmInfo } from "../../../Redux/ProfessionalSlice";
import { useNavigate } from "react-router-dom";
import { ProfileCompletion } from "../../../Services/ProfessionalApi";

function BusinessDetails() {
  const { FirmInfo } = useSelector((state) => state.professional);
  

  const [forms, setForms] = useState({
    firm_name : "",
    website: "",
    about: "",
    awards: "",
    firm_description: "",
  });
  

  useEffect(() => {
    setForms({
      website: FirmInfo.website,
      logoBase64: FirmInfo.logoBase64,
      coverphotoBase64: FirmInfo.coverphotoBase64,
      about: FirmInfo.about,
      firm_description: FirmInfo.firm_description,
      awards: FirmInfo.awards,
    });
  }, []);
  
  const [images, setImage] = useState({ coverphoto: null });

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });



 

  const validation = () => {
    if (hasAtLeast50Words(forms.about)) {
      toast.error("about section should contain atleast 50 words");
      return false;
    } else if (hasAtLeast50Words(forms.firm_description)) {
      toast.error("business details should contain atleast 50 words");
      return false;
    } else if (forms.coverphoto === null) {
      toast.error("image field should not be empty ");
      return false;
    }
    return true;
  };
  const hasAtLeast50Words = (text) => {
    // Define a regular expression pattern to match words
    const wordPattern = /\w+/g;
    
    // Use the regular expression to find all words in the text
    const words = text.match(wordPattern);
  
    // Check if there are at least 50 words
    if (words && words.length >= 50) {
      return true;
    }
  
    return false;
  };
  

  const FormSubmission = async (e) => {
    e.preventDefault();
     const formData = new FormData();
    if (validation()) {
      
      try{
        
        const formData = new FormData();
        formData.append('firm_name', forms.firm_name);
        formData.append('website', forms.website);
        formData.append('about', forms.about);
        formData.append('cover_photo', images.coverphoto);
        formData.append('firm_description', forms.firm_description);
        formData.append('awards', forms.awards);
        
        const firm_id =FirmInfo.id
        const res = await ProfileCompletion(firm_id,formData )
        console.log(res);

      }catch(error){
        console.log(error);
      }
      
     
     

      
      
      navigate("/professional/firmverification/");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-center my-12">
        <img src={Logo} className="w-20" alt="" />
      </div>
      <Progress
        value={66}
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
            value={forms.website}
            name="website"
            onChange={(e) => {
              setForms({ ...forms, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Website"
            className="w-96"
          />
          <Input
            value={forms.firm_name}
            name="firm_name"
            onChange={(e) => {
              setForms({ ...forms, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Logo (optional)"
            className="w-96"
          />
          <Input
            name="coverphoto"
            onChange={(e) => {
              setImage({ ...images, [e.target.name]: e.target.files[0] });
              
            }}
            color="teal"
            label="Cover Photo"
            className="w-96"
            accept="image/*"
            type="file"
          />

          <Input
            value={forms.awards}
            name="awards"
            onChange={(e) => {
              setForms({ ...forms, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Awards (optional)"
            className="w-96"
          />
          <Textarea
            value={forms.about}
            name="about"
            onChange={(e) => {
              setForms({ ...forms, [e.target.name]: e.target.value });
              
            }}
            color="teal"
            label="About"
          />
          <Textarea
            value={forms.firm_description}
            name="firm_description"
            onChange={(e) => {
              setForms({ ...forms, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Firm Description"
          />
          <button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessDetails;
