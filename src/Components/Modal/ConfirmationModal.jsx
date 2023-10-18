import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function ConfirmationModal( {buttonName, modalHeader, modalContent, onOkclick ,id} ) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handleSubmit = () =>{
    onOkclick(id);
    handleOpen();
  }
 
  return (
    <>
      <button onClick={handleOpen} variant="gradient">
        {buttonName}
      </button>
    
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{modalHeader}</DialogHeader>
        <DialogBody divider>
          {modalContent}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}