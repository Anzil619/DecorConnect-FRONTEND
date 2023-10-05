import { AdminAxiosInstant } from "../utils/AxiosUtils";


const AdminSignIn = (values) =>{
    return AdminAxiosInstant.post("/token/", values, {withCredentials:true})
        .catch((error) => error.response);

}

const ListUser = (values) =>{
    return AdminAxiosInstant.get("/listuser/", values, {withCredentials : true})
    .catch((error) => error.response);
}

const BlockUser = (id,values) =>{

    return AdminAxiosInstant.patch("/editdeleteuser/" +id+ "/", values , {withCredentials : true})
    .catch((error) => error.response);
}

const ApproveFirm= (id,values) =>{
    return AdminAxiosInstant.patch("/approvefirm/" +id+ "/", values , {withCredentials:true})
    .catch((error)=> error.response);
}

export {AdminSignIn,ListUser,BlockUser,ApproveFirm}

