import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Homeowners/SignUp/Signup";
import UnknownUser from "./Pages/UnknownUser/UnknownUser";
import LoginPage from "./Pages/Homeowners/LoginPage";

import PrivateRoute from "./ProtectedRoutes/PrivateRoute";

import HomeownerRoutes from "./Routes/HomeownerRoutes";
import ProfessionalRoutes from "./Routes/ProfessionalRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import RoleSelection from "./Pages/RoleSelection";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";



function App() {
  return (
    <>
      <Router>
        <Routes>

          
          <Route element={<PrivateRoute />}>
            
            <Route path="/" exact element={<UnknownUser/>} />
            <Route path="/login/" exact element={<LoginPage />} />
            <Route path="/signup/" exact element={<Signup/>} />
            <Route path="/roleselection/" exact element={<RoleSelection/>} />
            <Route path="/forgotpassword/" exact element={<ForgotPassword/>} />
            <Route path="/resetpassword/" exact element={<ResetPassword/>} />
            
          </Route>

          <Route path="/homeowner/*" element={<HomeownerRoutes/>}/>
          <Route path="/professional/*" element={<ProfessionalRoutes/>}/>
          <Route path="/admin/*" element={<AdminRoutes/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
