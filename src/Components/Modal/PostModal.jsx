import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";


export function PostModal({cardImage, profile_photo,name,contentImage}) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  return (
    <>
      <Card
        className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <img
          alt="nature"
          className="h-full w-full object-cover object-center"
          src={cardImage}
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src={profile_photo}
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
               {name}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @canwu
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              variant="text"
              size="sm"
              color={isFavorite ? "red" : "blue-gray"}
              onClick={handleIsFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
            <h1 className="text-sm">17 Likes</h1>
          </div>
        </DialogHeader>
        <div className="flex">
          <DialogBody
            divider={true}
            className="w-1/2 p-0"
            style={{ overflow: "hidden" }}
          >
            {/* Image portion */}
            <img
              alt="nature"
              className="h-[41rem] w-full object-cover object-center"
              src={contentImage}
            />
          </DialogBody>
          <div className="w-1/2 p-0">
          <div className="h-[37rem] p-4 border-t border-gray-200 overflow-y-auto">
    {/* Multiple Comments */}
    <div className="flex space-x-2">
      {/* User Logo */}
      <Avatar
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        alt="User Avatar"
        variant="circular"
        size="sm"
      />
      <div className="flex-1">
        {/* Comment Text */}
        <p className="text-sm">This is a sample comment.</p>
      </div>
    </div>
    {/* Timestamp */}
    <p className="text-xs text-gray-500 mb-4">2 hours ago</p>
    <div className="flex space-x-2">
      {/* User Logo */}
      <Avatar
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        alt="User Avatar"
        variant="circular"
        size="sm"
      />
      <div className="flex-1">
        {/* Comment Text */}
        <p className="text-sm">This is a sample comment.</p>
      </div>
    </div>
    {/* Timestamp */}
    <p className="text-xs text-gray-500 mb-4">2 hours ago</p>
    <div className="flex space-x-2">
      {/* User Logo */}
      <Avatar
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        alt="User Avatar"
        variant="circular"
        size="sm"
      />
      <div className="flex-1">
        {/* Comment Text */}
        <p className="text-sm">This is a sample comment.</p>
      </div>
    </div>
    {/* Timestamp */}
    <p className="text-xs text-gray-500 mb-4">2 hours ago</p>
   
    {/* Repeat this structure for multiple comments */}
  </div>
  
  
  
  
  {/* Fixed Input Field */}
  <div className="p-4 border-t border-gray-200 ">
    <div className="flex space-x-2">
      <Avatar
        src="user-avatar-image-url.jpg"
        alt="User Avatar"
        variant="circular"
        size="sm"
      />
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 border-none focus:outline-none"
      />
      <Button>Send</Button>
      
    </div>
  </div>       
    </div>
    </div>
      </Dialog>
    </>
  );
}
