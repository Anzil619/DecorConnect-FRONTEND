import React from 'react'

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Rating,
  } from "@material-tailwind/react";
import Ratings from '../Rating/Ratings';

function ReviewModal({onOkclick, buttonName , id}) {

    const [rated, setRated] = React.useState(4);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const [comment, setComment] = React.useState("")

    const handleclick = () =>{
        
        {id ? onOkclick(rated , comment, id) : onOkclick(rated , comment)  }
        handleOpen();

    }

  return (
    <div>
        {id ? <button
    onClick={handleOpen}
    className="flex justify-center items-center  m-4 px-4 h-9 py-2"
  >
    {buttonName}
  </button> :      <Button
    onClick={handleOpen}
    className="flex justify-center items-center  m-4 px-4 h-9 py-2"
  >
    {buttonName}
  </Button>}
   
  <Dialog open={open} handler={handleOpen}>
    <div className="flex items-center justify-between">
      <DialogHeader>Add Your Review</DialogHeader>
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
        <Textarea
        onChange={(e)=>{
            setComment(e.target.value)
            console.log(comment,"anzil");
        }} 
        label="Message" />
        <div className='flex justify-center'>
          <Ratings rated={rated} setRated={setRated} /> {/* Pass the rated value and setter as props */}
        </div>
      </div>

    </DialogBody>
    
    <DialogFooter className="space-x-2">
      <Button variant="outlined" color="red" onClick={handleOpen}>
        close
      </Button>
      <Button variant="gradient" color="green" onClick={handleclick}>
        add review
      </Button>
    </DialogFooter>
  </Dialog>
</div>
  )
}

export default ReviewModal