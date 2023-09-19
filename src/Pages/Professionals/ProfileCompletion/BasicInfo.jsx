import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input, Textarea, tab } from "@material-tailwind/react";
import { Progress, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAddress, setFirmInfo } from "../../../Redux/ProfessionalSlice";
import { useNavigate } from "react-router-dom";
import {
  GetFirmInfo,
  ProfileCompletion,
} from "../../../Services/ProfessionalApi";

function BasicInfo() {
  const { address } = useSelector((state) => state.professional);
  const { FirmInfo } = useSelector((state) => state.professional);

  const [form, setForm] = useState({
    state: "",
    city: "",
    country: "",
    address_line: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setForm({
      id: address.id,
      state: address.state,
      city: address.city,
      country: address.country,
      address_line: address.address,
      phone: address.phone,
    });
  }, []);

  const validation = () => {
    if (!form.state ||form.state.trim() === "") {
      toast.error("state should not be empty");
      return false;
    } else if (!form.city || form.city.trim() === "") {
      toast.error("city name should not be empty");
      return false;
    } else if (!form.country || form.country.trim() === "") {
      toast.error("country name should not be empty");
      return false;
    } else if (!form.phone || form.phone.trim() === "") {
      toast.error("phone number should not be empty");
      return false;
    } else if (!/^\d{10}$/.test(!form.phone || form.phone.trim())) {
      toast.error("Phone number should be exactly 10 digits");
      return false;
    }
    return true;
  };
  
  const FormSubmission = async (e) => {
    e.preventDefault();
    if (validation()) {
      dispatch(
        setAddress({
          address: form,
        })
      );

      const firm_id = FirmInfo.id;
      console.log(FirmInfo.id, "vjc");
      const data = {
        user: FirmInfo.user,
        address: form,
      };
      try {
        const res = await ProfileCompletion(firm_id, data);
        console.log(res, "aaaaa");

        dispatch(
          setAddress({
            address: res.data.address,
          })
        );
        navigate("/professional/businessdetails/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex justify-center my-12">
        <img src={Logo} className="w-20" alt="" />
      </div>

      <Progress
        value={33}
        size="lg"
        className="border border-gray-900/10 bg-gray-900/5 p-1 my-12"
      />

      <div className="flex justify-center my-20">
        <h1 className="text-2xl font-bold text-blue-gray-400">
          COMPLETE YOUR PROFILE
        </h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={FormSubmission}
          action=""
          className="grid grid-cols-2 gap-x-20 gap-y-8"
        >
          <div className="w-96">
            <Input
              name="state"
              value={form.state}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
              color="teal"
              label="State"
              className=""
            />
          </div>
          <Input
            name="city"
            value={form.city}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="City"
            className=""
          />
          <Input
            name="country"
            value={form.country}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Country"
            className=""
          />

          <Input
            name="phone"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Phone"
            type="number"
            className=""
          />
          <Textarea
            name="address_line"
            value={form.address_line}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            color="teal"
            label="Address"
            className=""
          />
          <button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasicInfo;
