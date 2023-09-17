import { ProfessionalAxiosInstant } from "../utils/AxiosUtils"



const ProfessionalGoogleSignup = (value) => {

    const values = {
        email : value.email,
        name  : value.given_name,
        password : value.id
    };
    return ProfessionalAxiosInstant.post("/googleprofessional/", values ,{withCredentials:true})
}

const ProfileCompletion = (value) =>{
    
    return ProfessionalAxiosInstant.post("/profilecompletion/", value , {withCredentials : true})
    .catch((error) => error.response);

} 

export {ProfessionalGoogleSignup,ProfileCompletion}