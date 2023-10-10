import React, { useState } from "react";
import {
  Button,
  Dialog,
  Textarea,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
 

export function ProjectModal({ onOkClick, ModalHeader }) {
    const navigate = useNavigate();
    const { FirmInfo } = useSelector((state) => state.professional);

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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const handleOkClick = () =>{
        
        onOkClick(form,imageFormData);
        handleOpen();
    }
    
  return (
    <>
    
    <Button onClick={handleOpen} variant="outlined" className="flex items-center gap-3 hover:bg-black hover:text-white mb-3">
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
        Upload Projects
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>{ModalHeader}</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
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
            name="project_description"
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

            
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleOkClick}>
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}