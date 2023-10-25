import { HomeownerAxiosInstant } from "../utils/AxiosUtils";

const HomeownerSignin = (values) => {
  return HomeownerAxiosInstant.post("homeowners/token/", values, {
    withCredentials: true,
  }).catch((error) => error.response);
};

const HomeownerSignup = (values) => {
  return HomeownerAxiosInstant.post("homeowners/register/", values, {
    withCredentials: true,
  });
};

const HomeownerGoogleSignup = (value) => {
  const values = {
    email: value.email,
    name: value.given_name,
    password: value.id,
  };
  return HomeownerAxiosInstant.post("/homeowners/googlehomeowner/", values, {
    withCredentials: true,
  });
};

const HomeownerGoogleSignin = (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  return HomeownerAxiosInstant.post("/homeowners/token/", values, {
    withCredentials: true,
  });
};

const GetUserInfo = (id) => {
  return HomeownerAxiosInstant.get("/homeowners/userinfo/" + id + "/", {
    withCredentials: true,
  });
};

const FirmList = () => {
  return HomeownerAxiosInstant.get("/homeowners/firmlist/", {
    withCredentials: true,
  });
};

const UpdateUser = (id, value) => {
  return HomeownerAxiosInstant.patch(
    "/homeowners/updateuser/" + id + "/",
    value,
    { withCredentials: true }
  );
};

const SearchFirms = (keyword) => {
  return HomeownerAxiosInstant.get(`/homeowners/firmlist/?search=${keyword}`, {
    withCredentials: true,
  });
};

const SingleFirmInfo = (id) => {
  return HomeownerAxiosInstant.get("homeowners/singlefirminfo/" + id + "/", {
    withCredentials: true,
  });
};

const AddUserAddress = (value) => {
  return HomeownerAxiosInstant.post("/homeowners/adduseraddress/", value, {
    withCredentials: true,
  });
};

const GetUserAddress = (id) => {
  return HomeownerAxiosInstant.get("/homeowners/useraddress/" + id + "/", {
    withCredentials: true,
  });
};

const EditUserAddress = (id,values) =>{
    return HomeownerAxiosInstant.patch("/homeowners/useraddress/" + id + "/", values, {withCredentials : true})
}

const GetProject = (id) =>{
    return HomeownerAxiosInstant.get("/homeowners/getproject/" +id+ "/" , {withCredentials:true})
}


const ListPosts = () =>{
  return HomeownerAxiosInstant.get("/homeowners/listpost/" ,{withCredentials:true})
} 

const SuggestionFirm = () =>{
  return HomeownerAxiosInstant.get("/homeowners/suggestionfirm/" , {withCredentials:true})
}

const CreatePosts = (value) =>{
  return HomeownerAxiosInstant.post("/homeowners/createpost/" , value, {withCredentials:true})
}

const GetUserPosts = (user_id) =>{
  return HomeownerAxiosInstant.get("/homeowners/getuserpost/" +user_id+ "/" ,{withCredentials:true})
}

const GetChatList = (sender_id , search) =>{
  return HomeownerAxiosInstant.get(`/chat/chatlist/${sender_id}/?search=${search}`, {withCredentials:true})
}

const AddtoChatList = (value) =>{
  return HomeownerAxiosInstant.post("/chat/addtochat/" , value , {withCredentials:true})
}

const DisLike = (user_id,post_id) =>{
  return HomeownerAxiosInstant.delete(`/homeowners/dislike/${user_id}/${post_id}/`,{withCredentials:true})

}

const Like = (value) =>{
  return HomeownerAxiosInstant.post("/homeowners/createlike/" , value, {withCredentials:true})
}

const AddComment = (value) =>{
  return HomeownerAxiosInstant.post("/homeowners/createcomment/" ,value, {withCredentials:true})
}


const DeleteComment = (id) =>{
  return HomeownerAxiosInstant.delete("/homeowners/deletecomment/" +id+ "/" , {withCredentials:true})
}

const DeletePost = (id) =>{
  return HomeownerAxiosInstant.delete("homeowners/editdelete/" +id+ "/" , {withCredentials:true})
}
const EditPost = (id,value) =>{
  return HomeownerAxiosInstant.patch("/homeowners/editdelete/" +id+ "/",value ,{withCredentials:true})
}

export {
  AddtoChatList,
  EditPost,
  DeletePost,
  DeleteComment,
  AddComment,
  DisLike,
  Like,
  GetChatList,
  GetUserPosts,
  ListPosts,
  CreatePosts,
  SuggestionFirm,
  HomeownerSignin,
  HomeownerSignup,
  HomeownerGoogleSignup,
  HomeownerGoogleSignin,
  GetUserInfo,
  FirmList,
  UpdateUser,
  SingleFirmInfo,
  SearchFirms,
  AddUserAddress,
  GetUserAddress,
  EditUserAddress,
  GetProject,
};
