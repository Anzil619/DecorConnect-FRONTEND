import { AdminAxiosInstant } from "../utils/AxiosUtils";


const AdminSignIn = (values) =>{
    return AdminAxiosInstant.post("/token/", values, {withCredentials:true})
        .catch((error) => error.response);

}

export {AdminSignIn}

