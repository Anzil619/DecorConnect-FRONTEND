import { Carousel, IconButton } from "@material-tailwind/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { InputModal } from "../Modal/InputModal";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { EditProject } from "../../Services/ProfessionalApi";

export function ProjectCarousal({ projectName, address, images, fetch ,project_id}) {
  

  const text1 = projectName;
  const text2 = address;
  const text3 = "Az creattion";
  console.log(images, "aaaaaaaaaaaaaaa");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  

  const handleprojectname = async (data) => {
    try {
      const id = project_id;
      console.log(id,"hajaea");
      const res = await EditProject(id, data);
      fetch();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddress = async(data) =>{
    try{
      const id = project_id;
      console.log(id,"hajaea");
      const res = await EditProject(id, data);
      fetch();
      console.log(res.data);
    }catch (error) {
      console.log(error);
    }
  }


  // Define fixed width and height for the images
  const imageWidth = "100rem"; // Adjust to your desired width
  const imageHeight = "50rem"; // Adjust to your desired height

  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images.map((image, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={image.image} // Assuming you have a field called "imageSrc" in your image object
            alt={`image ${index + 1}`}
            style={{ width: imageWidth, height: imageHeight,filter: "brightness(90%)" }} // Set fixed width and height here
            className="object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            {decoded.role === "professional" ? (
              <>
                <div className="flex flex-row ml-10">
                  <p className="text-5xl font-bold pr-2">{text1}</p>
                  <InputModal
                    onOkClick={handleprojectname}
                    ModalHeader="Edit Project Name"
                    ModalContent="Project Name"
                    inputname="project_name"
                    buttonsize="20"
                  />
                </div>
                <div className="flex flex-row ml-12 mt-2 items-center">
                  <p className="text-2xl pr-2">{text2}</p>
                  <InputModal
                    onOkClick={handleAddress}
                    ModalHeader="Edit Address"
                    ModalContent="= Address"
                    inputname="project_address"
                    buttonsize="20"
                  />
                </div>
                <p className="text-xl mt-2">{text3}</p>
              </>
            ) : (
              <>
                <p className="text-5xl font-bold ">{text1}</p>
                <p className="text-2xl ">{text2}</p>
                <p className="text-xl">{text3}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
