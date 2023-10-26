import React, { useEffect, useState } from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { ProjectCarousal } from "../../../Components/Carousel/ProjectCarousal";
import { ImageModal } from "../../../Components/Modal/ImageModal";
import { useParams } from "react-router-dom";
import { GetProject } from "../../../Services/HomeownerApi";
import { Loader } from "../../../Components/Loading/Loader";

function SingleProject() {
  const { projectId } = useParams();
  console.log(projectId, "aju");
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const [project, setProject] = useState()

  useEffect(()=>{
    FetchProject();

  },[])

  const FetchProject = async () => {
    handleLoading();

    try {
      const res = await GetProject(projectId);
      console.log(res.data);
      setProject(res.data)
      handleLoading();

    } catch (error) {
      handleLoading();
      console.log(error);
    }
  };

 

  return (
    <div>
      {loading && <Loader/>}
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
      projectName={project.project_name}
      address={project.project_address}
      images={project.images}
    />
  </div>
)}

      <div className="flex justify-center p-24">
        <h1 className="font-serif">
          {project?.project_description}
        </h1>
      </div>

      <div className="flex justify-center ">
        <h1 className="text-2xl">Images</h1>
      </div>

      <div className="flex justify-center">
        <div className="container grid grid-cols-3 gap-10 p-10 w-full">
          {/* First Image */}
          {project?.images.map((img)=>(
            <div className="col-span-1">
            {/* Your Image Component Here */}
            <ImageModal image = {img.image} />
          </div>

          ))}


        </div>
      </div>
    </div>
  );
}

export default SingleProject;
