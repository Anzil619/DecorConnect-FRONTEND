import jwtDecode from "jwt-decode"
import HomeownerHomepage from "../Pages/Homeowners/Homepage/HomeownerHomepage"
import { Outlet } from "react-router-dom"
import AdminHomePage from "../Pages/Admin/AdminHomePage"
import UnknownUser from "../Pages/UnknownUser/UnknownUser"


function ProfessionalProtected(){
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)

        if (decoded.role === 'homeowner'){
            return <HomeownerHomepage/>
        }else if (decoded.role === 'professional'){
            return <Outlet/>
        }else if (decoded.role === 'admin' && decoded.is_admin){
            return <AdminHomePage/>
        }
    }else{
        return <UnknownUser/>
    }
}

export default ProfessionalProtected;
