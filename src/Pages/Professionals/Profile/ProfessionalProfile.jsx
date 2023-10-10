import React from "react";
import { NavBar } from "../../../Components/NavBar/NavBar";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { FaCamera, FaPencilAlt, FaCheck, FaRegCheckCircle } from "react-icons/fa";
import PhotoUploadDrawer from "../../../Components/Drawer/PhotoUploadDrawer";
import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUserAddress,
  UpdateUser,
  EditUserAddress,
} from "../../../Services/HomeownerApi";
import {
  setUserAddress,
  setupdateInfo,
} from "../../../Redux/ProfessionalSlice";
import { InputModal } from "../../../Components/Modal/InputModal";



function ProfessionalProfile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [openProfilePhotoDrawer, setOpenProfilePhotoDrawer] = useState(false);
  const [openCoverPhotoDrawer, setOpenCoverPhotoDrawer] = useState(false);
  const { userinfo } = useSelector((state) => state.professional);
  const { user_address } = useSelector((state) => state.professional);
  const [address, setAddress] = useState({
    user: userinfo.id,
    district: Object.keys(user_address).length > 0 ? user_address.district : "",
    state: Object.keys(user_address).length > 0 ? user_address.state : "",
    country: Object.keys(user_address).length > 0 ? user_address.country : "",
    address_line: Object.keys(user_address).length > 0 ? user_address.address_line : "",
    phone: Object.keys(user_address).length > 0 ? user_address.phone : "",
  });

  const dispatch = useDispatch();
  const handleProfilePhotoUpload = async (file) => {
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("profile_photo", file);
      const res = await UpdateUser(id, formData);
      console.log(res.data);

      dispatch(
        setupdateInfo({
          updatedData: {
            userinfo: { profile_photo: res.data.profile_photo },
          },
        })
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverPhotoUpload = async (file) => {
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("cover_photo", file);
      const res = await UpdateUser(id, formData);
      console.log(res.data);

      dispatch(
        setupdateInfo({
          updatedData: {
            userinfo: { cover_photo: res.data.cover_photo },
          },
        })
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilEdit = async (data) => {
    try {
      const id = userinfo.id;
      console.log(data, "hajara");
      const res = await UpdateUser(id, data);

      dispatch(
        setupdateInfo({
          updatedData: {
            userinfo: { name: res.data.name },
          },
        })
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const AddAddress = async () => {
    try {
      const id = userinfo.id;
      const res = await AddUserAddress(address);
      console.log(res, "anzil");
      dispatch(
        setUserAddress({
          user_address: res.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const EditAddress = async () => {
    try {
      const id = userinfo.id;
      const res = await EditUserAddress(id,address);
      dispatch(
        setUserAddress({
          user_address: res.data,
        })
      );
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>
      <div
        className="w-full sticky top-0 z-50
       transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>

      <div className="profile-page">
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover bg-black"
            style={{ backgroundImage: `url(${userinfo.cover_photo})` }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
            <div className="flex justify-end p-3">
              <IconButton
                aria-label="Edit"
                onClick={() => setOpenCoverPhotoDrawer(true)}
              >
                <FaPencilAlt size={24} />
              </IconButton>
            </div>

            <PhotoUploadDrawer
              open={openCoverPhotoDrawer}
              onClose={() => setOpenCoverPhotoDrawer(false)}
              title="Upload Cover Photo"
              onUpload={handleCoverPhotoUpload}
            />
          </div>

          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-14">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="h-28 flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative h-44 w-44 -top-24">
                      <div className="group relative h-44 w-44">
                        <img
                          alt="..."
                          src={userinfo.profile_photo}
                          className="w-full h-full shadow-xl  object-center rounded-full border-none transition-opacity duration-300 group-hover:opacity-70"
                        />
                        <div
                          onClick={() => setOpenProfilePhotoDrawer(true)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <FaCamera size={40} color="#fff" />
                        </div>
                        <PhotoUploadDrawer
                          open={openProfilePhotoDrawer}
                          onClose={() => setOpenProfilePhotoDrawer(false)}
                          title="Upload Profile Photo"
                          onUpload={handleProfilePhotoUpload}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Message
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className=" flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                        <span className="text-sm text-blueGray-400">Posts</span> */}
                      </div>
                      <div className="mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                        <span className="text-sm text-blueGray-400">Posts</span> */}
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                        <span className="text-sm text-blueGray-400">Comments</span> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center ">
                  <div className="flex justify-center">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mr-2">
                      {userinfo.name}
                    </h3>
                    <InputModal
                      ModalHeader="ghk"
                      ModalContent="Name"
                      onOkClick={handleProfilEdit}
                    />
                  </div>
                  <div className="flex justify-center">

                  <h1 className="font-serif text-xs pr-2 text-indigo-500">PROFESSIONAL</h1><FaRegCheckCircle   color="indigo" size={15} />
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {Object.keys(user_address).length > 0 ? (
                      <>
                      <div>
                        {user_address.state},
                        {user_address.country}
                        
                        <button className="hover:opacity-25 ml-2" onClick={handleOpen}>
                        <FaPencilAlt size={17} />
                        </button>
                        </div>
                        <Dialog open={open} handler={handleOpen}>
                          <div className="flex items-center justify-between">
                            <DialogHeader>Update Address</DialogHeader>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="mr-3 h-5 w-5"
                              onClick={handleOpen}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <DialogBody divider>
                            <div className="grid gap-6">
                              <Input
                                label="District"
                                name="district"
                                value={address.district}
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="State"
                                name="state"
                                value={address.state}
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="Country"
                                name="country"
                                value={address.country}
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Textarea
                                label="Address Line"
                                name="address_line"
                                value={address.address_line}
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="Phone"
                                name="phone"
                                type="number"
                                value={address.phone}
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                            </div>
                          </DialogBody>
                          <DialogFooter className="space-x-2">
                            <Button
                              variant="outlined"
                              color="red"
                              onClick={handleOpen}
                            >
                              close
                            </Button>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={EditAddress}
                            >
                              Update Address
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </>
                    ) : (
                      <>
                        <Button variant="text" onClick={handleOpen}>
                          Add Address +
                        </Button>
                        <Dialog open={open} handler={handleOpen}>
                          <div className="flex items-center justify-between">
                            <DialogHeader>Add Address</DialogHeader>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="mr-3 h-5 w-5"
                              onClick={handleOpen}
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <DialogBody divider>
                            <div className="grid gap-6">
                              <Input
                                label="District"
                                name="district"
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="State"
                                name="state"
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="Country"
                                name="country"
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Textarea
                                label="Address Line"
                                name="address_line"
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                              <Input
                                label="Phone"
                                name="phone"
                                type="number"
                                onChange={(e) => {
                                  setAddress({
                                    ...address,
                                    [e.target.name]: e.target.value,
                                  });
                                  console.log(address, "anzik");
                                }}
                              />
                            </div>
                          </DialogBody>
                          <DialogFooter className="space-x-2">
                            <Button
                              variant="outlined"
                              color="red"
                              onClick={handleOpen}
                            >
                              close
                            </Button>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={AddAddress}
                            >
                              Add Address
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </>
                    )}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {userinfo.email}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    7989889898
                  </div>
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                        Hey, there im Looking for experienced professional who
                        can build my home like how i wnato
                      </p>

                      <a href="#pablo" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default ProfessionalProfile;
