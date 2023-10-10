import React, { useState } from 'react';
import { Button, Drawer, Typography, IconButton, button }  from '@material-tailwind/react';
import { useRef } from 'react';


function PhotoUploadDrawer({ open, onClose, title, onUpload }) {
    
      const [selectedImage, setSelectedImage] = useState(null);
      const [file,setFile] = useState(null)
      const fileInputRef = useRef(null);

      const handleButtonClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // You can handle the selected file here
        

        // Display the selected image
        if (selectedFile) {
          setFile(selectedFile)
          const reader = new FileReader();
          reader.onload = () => {   
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

      const handleUpload = () => {
        if (onUpload) {
          onUpload(file);
        }
        setSelectedImage(null)
        onClose();
      };

  return (
   <Drawer anchor="bottom" placement='bottom' open={open} onClose={onClose} className="p-4 overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <Typography >
          {title}
        </Typography>
        <IconButton variant="text" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>
      
      <div className='flex justify-between'>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button onClick={handleButtonClick}>choose image</Button>

      {selectedImage &&  <Button color='red' onClick={handleUpload}>Upload</Button>
}
      
      </div>
      <div className='flex justify-center'>
      {selectedImage && <img className='w-40' src={selectedImage} alt="Selected"  />}
      
      </div>
    </Drawer>

  )
}

export default PhotoUploadDrawer