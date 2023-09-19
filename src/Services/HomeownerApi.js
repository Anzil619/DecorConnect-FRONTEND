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

export {HomeownerSignin,HomeownerSignup,HomeownerGoogleSignup,HomeownerGoogleSignin,GetUserInfo,FirmList} ;

