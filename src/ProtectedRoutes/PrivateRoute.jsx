import jwtDecode from "jwt-decode"
import HomeownerHomepage from "../Pages/Homeowners/Homepage/HomeownerHomepage"
import ProfessionalHomePage from "../Pages/Professionals/ProfessionalHomePage"
import AdminHomePage from "../Pages/Admin/AdminHomePage"
import { Outlet } from "react-router-dom"


function PrivateRoute() {
    const token = localStorage.getItem('token')

    if (token){
        const decode = jwtDecode(token)
        if (decode.role === 'homeowner'){
            return <HomeownerHomepage/>
        }else if (decode.role === 'professional'){
            return <ProfessionalHomePage/>
        }else if (decode.role === 'admin'){
            return <AdminHomePage/>
        }
    }
    else{

  return <Outlet/>
  
    }
}

export default PrivateRoute