import React from "react";
import Logo from "../../assets/logos/dc-black-transparent.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button, 
  IconButton,
} from "@material-tailwind/react";
 import './NavBar.css'
 import {
    UserCircleIcon,
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";





export function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate()
  const SignOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login/')
  } 

  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

    const handleScroll = () => {
      // Define the scroll position at which you want to change the state
      const scrollThreshold = 100; // Change this value to your desired threshold
  
      // Check if the current scroll position is greater than the threshold
      if (window.scrollY > scrollThreshold) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
  
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };




  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 mr-9 space-x-6 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="md:p-2 p- font-normal"
      >
        <a onClick={()=>(navigate("/homeowner/homeownerhomepage/"))} href="#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="md:p-2 p- font-normal"
      >
        <a href="#" className="flex items-center">
          About
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="md:p-2 p- font-normal"
      >
        <a onClick={()=>(navigate("/homeowner/explore/"))} href="#" className="flex items-center">
          Explore
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="md:p-2 p- font-normal"
      >
        <a onClick={()=>(navigate("/homeowner/findprofessionals/"))} href="#" className="flex items-center">
          Professionals
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="md:p-2 p- font-normal"
      >
        <a href="#" className="flex items-center">
          Contact us
        </a>
      </Typography>
      <Typography as="div" className="relative group">
    
  <Menu>
    <MenuHandler>
    <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >Account</Button>
    </MenuHandler>
    <MenuList>
      <MenuItem>Profile</MenuItem>
      <hr className="my-3" />
      <MenuItem onClick={SignOut}>Sign Out</MenuItem>
    </MenuList>
  </Menu>
</Typography>
  

    </ul>
  );
 
  return (
    <Navbar className="custom-navbar-width py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium  -me-11"
        >
          {show ? (
    <img src={Logo} className="w-12" alt="" />
  ) : (
    <img src={Logo} className="w-12 invisible" alt="" />
  )}
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <button className="hidden lg:inline-block px-3 rounded-sm invisible">
        <span>{React.createElement(UserCircleIcon, { className: "w-7 h-7" })}</span>

        </button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}