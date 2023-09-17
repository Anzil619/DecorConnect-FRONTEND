import NotificationModal from "../Components/Modal/NotificationModal";
import { useNavigate } from "react-router-dom";
import logo_black from "../assets/logos/dc-black-transparent.png";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <>
      <div className="maindiv h-screen w-full flex items-center justify-center">
        <div className="h-3/4 w-2/3 bg-black bg-opacity-20 flex flex-col items-center justify-center">
          {/* First Div */}
          <div className="flex items-center justify-center h-1/3">
            <img className="h-20" src={logo_black} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center h-1/3">
            <h1 className="text-white text-3xl font-bold mb-6">
              Choose Your Role
            </h1>
            <div className="flex space-x-4">
              <NotificationModal
                buttonText="Homeowner"
                modalTitle="Confirmation"
                modalHeading="hi, Homeowner"
                buttonColor="gray"
                modalContent="Join our vibrant interior design community as a homeowner, where you can explore a world of top-notch design firms and their stunning projects. Your dream home is just a click away"
                onOkClick={() => navigate("/signup/")}
              />
              <NotificationModal
                buttonText="Professional"
                modalTitle="Attention!"
                modalContent="Gain Exposure: Get noticed by homeowners seeking your unique skills and creative vision. Our platform is your stage to reach a broader clientele."
                onOkClick={() => navigate("/professional/signup/")}
              />
            </div>
          </div>


          {/* Third Div */}
          <div className="h-1/3 "></div>
        </div>
      </div>
    </>
  );
}

export default RoleSelection;
