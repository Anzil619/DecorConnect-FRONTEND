import React, { useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input } from "@material-tailwind/react";
import { Progress, Textarea } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateProject,
  CreateProjectImages,
} from "../../../Services/ProfessionalApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../Components/Loading/Loader";

function AddProject() {
  const navigate = useNavigate();
  const { FirmInfo } = useSelector((state) => state.professional);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const [form, setForm] = useState({
    project_name: "",
    year: "",
    project_address: "",
    project_description: "",
    cost: "",
    firm_id: FirmInfo.id,
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFormData, setImageFormData] = useState(new FormData());

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectURL = URL.createObjectURL(file);
      imageArray.push(objectURL);
      // Append each selected image file to FormData
      imageFormData.append("images", file);
    }
    setSelectedImages(imageArray);
    console.log(imageFormData);
  };



  const validation = () => {
    if (!form.project_name || form.project_name.trim() === "") {
      toast.error("project name should not be empty");
      return false;
    } else if (!form.year || form.year.trim() === "") {
      toast.error("year should not be empty");
      return false;
    } else if (!form.project_address || form.project_address.trim() === "") {
      toast.error("address should not be empty");
      return false;
    } else if (
      !form.project_description ||
      form.project_description.trim() === ""
    ) {
      toast.error("description should not be empty ");
      return false;
    } else if (!form.cost || form.cost.trim() === "") {
      toast.error("project cost should not be empty ");
      return false;
    } else if (selectedImages.length === 0) {
      toast.error("image field should not be empty");
      return false;
    }
    return true;
  };

  const FormSubmission = async (e) => {
    e.preventDefault();
    if (validation()) {
      handleLoading();
      try {
        const res = await CreateProject(form);
        console.log(res);
        console.log(res.data.id);
        imageFormData.append("project_id", res.data.id);
        const res2 = await CreateProjectImages(imageFormData);
        navigate("/professional/professionalhomepage/");
        console.log(res2);
        toast.success("Project added successfully");
        handleLoading();

      } catch (error) {
        handleLoading();

        console.log(error);
        toast.error("Failed to add the project");
      }
    }
  };

  return (
    <div className="">
      {loading && <Loader/>}
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
            name="project_name"
            value={form.project_name}
            onChange={(e) => {
              console.log(form);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Project Name"
            className="w-96"
          />

          <Input
            name="year"
            value={form.year}
            onChange={(e) => {
              console.log(form);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Project Year"
            className="w-96 border-gray-300"
            type="number"
          />

          <Textarea
            name="project_address"
            value={form.project_address}
            onChange={(e) => {
              console.log(form);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Project Address"
            
          />

          <Textarea
            name = "project_description"
            value={form.project_description}
            onChange={(e) => {
              console.log(form);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Project Description"
          />

          <Input
            name="cost"
            value={form.cost}
            onChange={(e) => {
              console.log(form);
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Project Cost"
            className="w-96 border-gray-300"
            type="number"
          />

          <Input
            color="teal"
            accept="image/*"
            label="Project Image"
            className="w-96 border-gray-300"
            onChange={handleFileInputChange}
            type="file"
            multiple
          />

          <div className="flex items-center col-span-2 justify-end">
            {/* Skip Button */}
            <button
              onClick={() => navigate("/professional/professionalhomepage/")}
              className="bg-black text-white px-4 py-2 w-28 mr-2 rounded-2xl hover:bg-blue-gray-900"
            >
              Skip
            </button>

            {/* Continue Button */}
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-gray-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProject;
