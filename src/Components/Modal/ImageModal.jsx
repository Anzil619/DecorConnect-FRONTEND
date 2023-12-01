import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { FaEdit,FaTrash } from "react-icons/fa";
import NotificationModal from "./NotificationModal";
import { DeleteProjectImages, EditProjectImages } from "../../Services/ProfessionalApi";
import PhotoUploadDrawer from "../Drawer/PhotoUploadDrawer";
import jwtDecode from "jwt-decode";

 
export function ImageModal({image, imageId,fetch}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const token = localStorage.getItem("token")
  const decoded = jwtDecode(token)

 
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
 
  const handleDeleteImage = async() =>{
      try{

        const res = await DeleteProjectImages(imageId)
        fetch();
        handleOpen();
        console.log(res.data);
        

      }catch(error){
        console.log(error);
      }
  }

  const handleEditImage = async(file) =>{
    try{
      const formData = new FormData();
      formData.append("image" , file)
      const res = await EditProjectImages(imageId,formData)
      fetch();
      console.log(res.data);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <Card
        className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <img
          alt="nature"
          className="h-full w-full object-cover object-center"
          src={image}
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
           
            <div className="-mt-px flex flex-col">
              
            </div>
          </div>
          {decoded.role === "professional" ?<><div className="flex items-center gap-2">
            <div>
            <IconButton
              variant="text"
              size="sm"
              color={isFavorite ? "red" : "blue-gray"}
              onClick={() => setOpenDrawer(true)}
            >
              <FaEdit size={20}/>
              
            </IconButton>
            </div>
            <PhotoUploadDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          title="Add Project Images"
          onUpload={handleEditImage}
        />
            
            <NotificationModal
            buttonText = {<FaTrash/>}
            modalTitle = "Delete Image"
            modalContent = "Are you sure you want to delete the image ?"
            onOkClick={handleDeleteImage}
            buttonColor = "red"

            />
          </div>
</> : "" }
                  </DialogHeader>
        <DialogBody divider={true} className="p-0">
          <img
            alt="nature"
            className="h-[48rem] w-full object-cover object-center"
            src={image}
          />
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                553,031
              </Typography>
            </div>
          </div>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                clipRule="evenodd"
              />
            </svg>
            Share
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}