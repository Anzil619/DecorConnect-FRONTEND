import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { NavBar } from "../../../Components/NavBar/NavBar";
import { Rating } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import studio from "../../../assets/Free_Sample_By_Wix.png";

import {
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

import { SingleFirmInfo } from "../../../Services/HomeownerApi";
import { Loader } from "../../../Components/Loading/Loader";
import { useSelector } from "react-redux";
import PhotoUploadDrawer from "../../../Components/Drawer/PhotoUploadDrawer";
import { CreateProject, CreateProjectImages, EditFirmInfo } from "../../../Services/ProfessionalApi";
import { InputModal } from "../../../Components/Modal/InputModal";
import { ProjectModal } from "../../../Components/Modal/ProjectModal";
import ReviewModal from "../../../Components/Modal/ReviewModal";
import { ConfirmationModal } from "../../../Components/Modal/ConfirmationModal";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MyFirm() {
  const { FirmInfo } = useSelector((state) => state.professional);
  const [firminfo, setfirminfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [open, setOpen] = React.useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCoverDrawer, setOpenCoverDrawer] = useState(false);

  useEffect(() => {
    FetchFirmInfo();
  }, []);

  const FetchFirmInfo = async (e) => {
    handleLoading();
    try {
      const firmId = FirmInfo.id;
      const res = await SingleFirmInfo(firmId);
      const data = res.data;
      console.log(data);
      setfirminfo(data);
      handleLoading();
    } catch {
      handleLoading();
      console.log("error trying fetch");
    }
  };

  const handleOpen = () => setOpen(!open);
  const handleLogoEdit = async (file) => {
    try {
      const id = firminfo.id;
      const formData = new FormData();
      formData.append("logo", file);
      const res = await EditFirmInfo(id, formData);
      FetchFirmInfo();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirmwebsite = async (data) => {
    try {
      const id = firminfo.id;
      const res = await EditFirmInfo(id, data);
      FetchFirmInfo();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlefirmcoverphoto = async(file) =>{
    try{
        const id = firminfo.id
        const formData = new FormData();
        formData.append('cover_photo', file);
        const res = await EditFirmInfo(id,formData)
        FetchFirmInfo();
        console.log(res.data);

    }catch(error){
        console.log(error);
    }
  }

  const handleEditAbout = async(data) =>{
    try{
    const id = firminfo.id
    const res = await EditFirmInfo(id,data)
    console.log(res.data);
    FetchFirmInfo();
    }catch(error){
        console.log(error);
    }
}


    const handleAddProject = async(data , images) =>{
      try{
        const res = await CreateProject(data)
        console.log(res.data);
        const proj_id = res.data.id
        images.append('project_id',proj_id)
        const res2 = await CreateProjectImages(images)
        console.log(res2.data);
        FetchFirmInfo();

      }catch(error){
        console.log(error);
      }
        
    }


  return (
    <div>
      {loading && <Loader />}
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>

      <div
        className="w-full sticky top-0 z-50
       transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>

      <div className="flex flex-col items-center m-5">
        <div className="flex flex-row ml-6">
          <img
            className="w-36 h-36 m-5 shadow-2xl "
            src={firminfo?.logo ? firminfo?.logo : studio}
            alt=""
          />
          <Tooltip content="Edit logo" placement="right-end">
            <IconButton
              className="w-6 h-6 bg-white"
              aria-label="Edit"
              onClick={() => setOpenDrawer(true)}
            >
              <FaEdit color="grey" size={15}/>
            </IconButton>
          </Tooltip>
        </div>
        <PhotoUploadDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          title="Upload Cover Photo"
          onUpload={handleLogoEdit}
        />

        <h1 className="text-xl font-bold m-2">{firminfo?.firm_name}</h1>

        <div className="flex items-center gap-2 m-2">
          <Rating value={4} />
          <Typography color="blue-gray" className="font-medium">
            {4}.0 Rated
          </Typography>
        </div>
        <h1 className="text-2xl font-serif text-blue-gray-700 m-2">
          Architecture & Interior Designs
        </h1>
        <h1 className="m-2">{firminfo?.address.phone}</h1>
        <div>
          <a href="" className="text-indigo-800 m-2">
            {firminfo?.website}
          </a>
          <InputModal
            inputname="website"
            buttonsize="13"
            ModalHeader="Update website name"
            ModalContent="Website"
            onOkClick={handleFirmwebsite}
          />
        </div>
      </div>

      <div className="relative m-10 h-1/3">
        <img
          className="w-full object-cover object-center"
          src={firminfo?.cover_photo}
          alt=""
        />
        <div className="absolute top-0 right-0 m-2 p-2">
        <Tooltip content="Edit Cover photp" placement="right-end">
          <IconButton
          className="bg-white"

            aria-label="Edit"
            onClick={() => setOpenCoverDrawer(true)}
          >
          
            <FaEdit color="grey" size={24}/>
          </IconButton>
          </Tooltip>
        </div>
        <PhotoUploadDrawer
          open={openCoverDrawer}
          onClose={() => setOpenCoverDrawer(false)}
          title="Upload Cover Photo"
          onUpload={handlefirmcoverphoto}
        />
      </div>

      <div className="flex items-center flex-col m-16 ml-44 mr-44">
        <div className="flex flex-row">
        <h1 className="text-3xl font-serif font-bold ml-6 mr-3">About US</h1>
        
        <InputModal
            inputname="about"
            buttonsize="17"
            ModalHeader="Update About Section"
            ModalContent="About Us"
            onOkClick={handleEditAbout}
          />
          
        </div>
        <p className="mt-3 text-center">
          {" "}
          {firminfo?.about},{firminfo?.firm_description}
        </p>
      </div>

        <div className="grid grid-cols-3">
            <div></div>
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-serif font-bold">Projects</h1>
      </div>
      <div className="flex justify-center">
     
      <ProjectModal
            
            ModalHeader="Add Project"
            onOkClick={handleAddProject}
          />
      </div>


      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2">
          {firminfo?.project.map((project) => (
            <Card className="w-80 h-96">
              <CardHeader floated={false} className="h-80">
                {console.log(project.images[0]?.image)}
                <Link to={`/professional/myproject/${project.id}`}>
                  <img
                    className="w-full object-cover object-center h-full"
                    src={
                      project.images[0]?.image
                    }
                    alt="profile-picture"
                  />
                </Link>
              </CardHeader>
              <CardBody className="text-center">

                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {project.project_name}
                </Typography>

                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {project.project_description}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                  <Typography
                    as="a"
                    href="#facebook"
                    variant="lead"
                    color="blue"
                    textGradient
                  >
                    <i className="fab fa-facebook" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#twitter"
                    variant="lead"
                    color="light-blue"
                    textGradient
                  >
                    <i className="fab fa-twitter" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#instagram"
                    variant="lead"
                    color="purple"
                    textGradient
                  >
                    <i className="fab fa-instagram" />
                  </Typography>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}

          {/* Add more cards as needed */}
        </div>
      </div>

      <div className="flex justify-end ">
        <div className="grid grid-cols-3 mt-28">
          <div></div>

          <div className="grid-cols-2">
            <h1 className=" w-96 text-3xl font-serif font-bold mr-6">
              Reviews
            </h1>
            {/* Add content for the 2nd column here */}
          </div>
          <div className="grid-cols-3 w-96 ">
            
            {/* Add content for the 3rd column here */}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex flex-col gap-8 w-2/3">
        {firminfo?.reviews.map((review) => (
            <Card
              color="transparent"
              shadow={false} 
              className="w-full max-w-[61rem]"
            >
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src={
                    review.user.profile_photo
                  }
                  alt="Unavailable"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                      {review.user.name}
                    </Typography>
                    <div className="5 flex items-center gap-0">
                      <Rating value={review.rating} readonly />
                    </div>
                  </div>
                </div>
               
                 
      
                
              </CardHeader>
              <div className="flex justify-center">
                <CardBody className="mb-6 p-0 w-11/12">
                  <Typography style={{ wordWrap: "break-word" }}>
                    {review.comment}
                  </Typography>
                </CardBody>
              </div>
              <hr />
            </Card>
          ))}
        </div>
      </div>

      <div className="h-50">adsfsf</div>
    </div>
  );
}

export default MyFirm;
