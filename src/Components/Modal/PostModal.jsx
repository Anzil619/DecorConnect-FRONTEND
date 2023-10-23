import React, { useState } from "react";
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
import {
  AddComment,
  DeleteComment,
  DeletePost,
  DisLike,
  EditPost,
  Like,
} from "../../Services/HomeownerApi";
import { FaEdit, FaRegComment, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { InputModal } from "./InputModal";

export function PostModal({
  cardImage,
  profile_photo,
  name,
  contentImage,
  like_counts,
  userId,
  postId,
  fetch,
  like,
  caption,
  comment,
  sender_profile,
  path,
  comment_count,
}) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  const [comments, setComments] = useState({
    user: userId,
    post: postId,
    text: "",
  });

  const SetLike = async (postId) => {
    handleIsFavorite();
    try {
      const data = {
        user: userId,
        post: postId,
      };

      const res = await Like(data);
      console.log(res.data);
      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  const disLike = async (post_id) => {
    console.log(post_id, "anzill");
    try {
      const res = await DisLike(userId, post_id);
      console.log(res.data);

      fetch();
      handleIsFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async () => {
    try {
      const data = comments ? comments : null;
      const res = await AddComment(data);
      fetch();
      setComments({ ...comments, text: "" });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteComments = async (id) => {
    try {
      const res = await DeleteComment(id);
      fetch();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeletePosts = async(id) =>{
    try{
      const res = await DeletePost(id)
      console.log(res.data);
      fetch();

    }catch(error){
      console.log(error);
    }
  }
  const EditPosts = async(id,value) =>{
    try{
      const res = await EditPost(id,value)
      console.log(res.data);
    }catch(error){
      console.log(error);

    }
  }



  return (
    <>
      {path === "comment_icon" ? (
        <button onClick={handleOpen} className="flex items-center ml-4">
          <FaRegComment className="text-gray-800" size={19} />
        </button>
      ) : path === "view_comments" ? (
        comment_count > 0 ? (
          <div
            onClick={handleOpen}
            className="text-sm mt-2 cursor-pointer"
          >{`View all ${comment_count} Comments`}</div>
        ) : (
          ""
        )
      ) : (
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
      )}

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
            {

            like.some((like) => like.user === userId) ? (
              <IconButton
                variant="text"
                size="sm"
                color="red"
                onClick={() => disLike(postId)}
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
            ) : (
              <IconButton
                variant="text"
                size="sm"
                color="blue-gray"
                onClick={() => SetLike(postId)}
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
            )}

            <h1 className="text-sm">
              {like_counts > 0 ? `${like_counts} likes` : ""}</h1>

            {path === "myuserprofile" ? (
              <>
                 <InputModal
                      buttonsize="18"
                      inputname="caption"
                      ModalHeader="Update Content"
                      ModalContent="Content"
            
                      onOkClick={(value)=>{
                        EditPosts(postId,value)
                      }}
                    />
                <button onClick={()=>{
                  DeletePosts(postId)
                }}><FaTrash size={18} color="Red"/></button>
              </>
            ) : (
              ""
            )}
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
              <div className="flex justify-between">
                        <div className="flex space-x-2 ">
                          <Avatar
                            src={
                              profile_photo
                           }
                            alt="User Avatar"
                            variant="circular"
                            size="sm"
                          />

                          <div className="flex-1">
                            <h1 className="text-sm text-black">
                              {name}
                            </h1>
                            <p className="text-xs">{caption}</p>
                          </div>
                        </div>
                        
                      </div>
                      


              
              { comment.length > 0 ? (
              comment?.map((comments) => (
                <>
                  {comments.user === userId ? (
                    <>
                      <div className="flex justify-between">
                        <div className="flex space-x-2 ">
                          <Avatar
                            src={`${import.meta.env.VITE_HOMEOWNER_URL}${
                              comments.user_profile_photo
                            }`}
                            alt="User Avatar"
                            variant="circular"
                            size="sm"
                          />

                          <div className="flex-1">
                            <h1 className="text-sm text-black">
                              {comments.user_name}
                            </h1>
                            <p className="text-xs">{comments.text}</p>
                          </div>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            DeleteComments(comments.id);
                          }}
                        >
                          <FaTrash color="Red" size={15} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">2 hours ago</p>{" "}
                    </>
                  ) : (
                    <>
                      <div className="flex space-x-2">
                        <Avatar
                          src={`${import.meta.env.VITE_HOMEOWNER_URL}${
                            comments.user_profile_photo
                          }`}
                          alt="User Avatar"
                          variant="circular"
                          size="sm"
                        />

                        <div className="flex-1">
                          <h1 className="text-sm text-black">
                            {comments.user_name}
                          </h1>

                          <p className="text-xs">{comments.text}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">2 hours ago</p>{" "}
                    </>
                  )}
                </>
              )) ) : <>
              <div className="flex justify-center">
                <p className="font-serif">No comments Yet</p>
              </div>
              </>} 
            </div>

            {/* Fixed Input Field */}
            <div className="p-4 border-t border-gray-200 ">
              <div className="flex space-x-2">
                <Avatar
                  src={sender_profile}
                  alt="User Avatar"
                  variant="circular"
                  size="sm"
                />

                <input
                  type="text"
                  name="text"
                  value={comments.text}
                  onChange={(e) => {
                    setComments({
                      ...comments,
                      [e.target.name]: e.target.value,
                    });
                    console.log(comments);
                  }}
                  placeholder="Write a comment..."
                  className="flex-1 border-none focus:outline-none"
                />

                <Button onClick={createComment}>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
