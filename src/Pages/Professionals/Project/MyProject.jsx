import React, { useEffect, useState } from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { ProjectCarousal } from "../../../Components/Carousel/ProjectCarousal";
import { ImageModal } from "../../../Components/Modal/ImageModal";
import { useParams } from "react-router-dom";
import { GetProject } from "../../../Services/HomeownerApi";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { InputModal } from "../../../Components/Modal/InputModal";
import {
  CreateProjectImages,
  EditProject,
} from "../../../Services/ProfessionalApi";
import PhotoUploadDrawer from "../../../Components/Drawer/PhotoUploadDrawer";
import { Loader } from "../../../Components/Loading/Loader";

function MyProject() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  console.log(projectId, "aju");
  const [project, setProject] = useState(null);

  useEffect(() => {
    FetchProject();
  }, []);

  const FetchProject = async () => {
    handleLoading();
    try {
      const res = await GetProject(projectId);
      console.log(res.data);
      setProject(res.data);
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
    }
  };

  const handledescription = async (data) => {
    try {
      const res = await EditProject(projectId, data);
      FetchProject();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImages = async (file) => {
    try {
      const formData = new FormData();
      formData.append("project_id", projectId);
      formData.append("images", file);
      const res = await CreateProjectImages(formData);
      FetchProject();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

      {project && (
        <div>

          <ProjectCarousal
            project_id={projectId}
            fetch={FetchProject}
            projectName={project.project_name}
            address={project.project_address}
            images={project.images}
          />

        </div>
      )}

      <div className="flex flex-col justify-center p-24">
        <div className="flex justify-end">
          <InputModal
            onOkClick={handledescription}
            ModalHeader="Edit Project Description"
            ModalContent="Project Description"
            inputname="project_description"
            buttonsize="20"
          />
        </div>
        <div className="flex justify-center">
          <h1 className="font-serif">{project?.project_description}</h1>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-3 flex justify-center">
          <h1 className="text-2xl">Images</h1>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-1 flex justify-center">
          <Button
            className="flex items-center gap-3 hover:bg-black hover:text-white mb-3"
            size="20"
            aria-label="Edit"
            onClick={() => setOpenDrawer(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload Images
          </Button>
        </div>
        <PhotoUploadDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          title="Add Project Images"
          onUpload={handleAddImages}
        />
      </div>

      <div className="flex justify-center">
        <div className="container grid grid-cols-3 gap-10 p-10 w-full">
          {/* First Image */}
          {project?.images.map((img) => (
            <div className="col-span-1">
              {/* Your Image Component Here */}
              <ImageModal
                image={img.image}
                imageId={img.id}
                fetch={FetchProject}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProject;
