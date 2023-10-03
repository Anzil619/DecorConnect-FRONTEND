import { HomeownerAxiosInstant } from "../utils/AxiosUtils"



const HomeownerSignin = (values) =>{
    return HomeownerAxiosInstant.post("homeowners/token/", values, {withCredentials:true})
        .catch((error) => error.response);

}




const HomeownerSignup = (values) =>{
    return HomeownerAxiosInstant.post("homeowners/register/", values, {withCredentials:true})
}


const HomeownerGoogleSignup = (value) => {

    const values = {
        email : value.email,
        name  : value.given_name,
        password : value.id
    };
    return HomeownerAxiosInstant.post("/homeowners/googlehomeowner/", values ,{withCredentials:true})
}

const HomeownerGoogleSignin = (value) =>{
    const values = {
        email : value.email,
        password : value.id
    };
    return HomeownerAxiosInstant.post("/homeowners/token/", values , {withCredentials: true})
}


const GetUserInfo = (id) =>{
    return HomeownerAxiosInstant.get("/homeowners/userinfo/" +id+ "/", {withCredentials : true})
}

const FirmList = () =>{
    return HomeownerAxiosInstant.get("/homeowners/firmlist/" ,{withCredentials:true})

}

const UpdateUser = (id ,value) =>{
    return HomeownerAxiosInstant.patch("/homeowners/updateuser/" +id+ "/", value, {withCredentials:true} )

}

const SearchFirms = (keyword) =>{
    return HomeownerAxiosInstant.get(`/homeowners/firmlist/?search=${keyword}`, {withCredentials:true});
}

const SingleFirmInfo = (id) =>{
    return HomeownerAxiosInstant.get('homeowners/singlefirminfo/' +id+ '/' , {withCredentials:true})
}



export {HomeownerSignin,HomeownerSignup,HomeownerGoogleSignup,HomeownerGoogleSignin,GetUserInfo,FirmList,UpdateUser,SingleFirmInfo,SearchFirms} ;

