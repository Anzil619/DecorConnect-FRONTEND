import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { Input } from "@material-tailwind/react";
import { Progress, Textarea } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FirmVerificationUpdate,
  ProfileCompletion,
} from "../../../Services/ProfessionalApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UpdateUser } from "../../../Services/HomeownerApi";

function FirmVerification() {
  const { FirmInfo } = useSelector((state) => state.professional);
  const { address } = useSelector((state) => state.professional);
  const { userinfo } = useSelector((state) => state.professional);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner_pan: null,
    firm_liscense: null,
    gst_certificate: null,
    insurance: null,
  });

  const [name, setName] = useState({ owner_name: "" });

  const validation = () => {
    if (form.owner_name === "") {
      toast.error("owner name should not be empty");
      return true;
    } else if (form.owner_pan === null) {
      toast.error("pan card should not be empty");
      return false;
    } else if (form.firm_liscense === null) {
      toast.error("firm liscense should not be empty");
      return false;
    } else if (form.gst_certificate === null) {
      toast.error("gst certificate should not be empty");
      return false;
    } else if (form.insurance === null) {
      toast.error("insurance should not be empty");
      return false;
    }
    return true;
  };

  const FormSubmission = async (e) => {
    e.preventDefault();

    if (validation()) {
      handleLoading();
      const formData = new FormData();
      formData.append("owner_pan_card", form.owner_pan);
      formData.append("firm_liscense", form.firm_liscense);
      formData.append("gst_certificate", form.gst_certificate);
      formData.append("insurance", form.insurance);
      formData.append("owner_name", name.owner_name);

     
      try {
        const data = {
          owner_name1: name.owner_name,
        };

        const firm_id = FirmInfo.id;
        const res = await ProfileCompletion(firm_id, data);
        console.log(res, 1);
        console.log(res.data.verification.id), "daxoo";
        const res1 = await FirmVerificationUpdate(
          res.data.verification.id,
          formData
        );
        const data1 = {
          is_completed: true,
        };
        console.log(res1, 2);
        const res3 = await UpdateUser(userinfo.id, data1);
        console.log(res3);
        handleLoading();
        navigate("/professional/addproject/");
      } catch (error) {
        handleLoading();
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      {loading && <Loader />}
      <ToastContainer />
      <div className="flex justify-center my-12">
        <img src={Logo} className="w-20" alt="" />
      </div>
      <Progress
        value={99}
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
          <Input
            name="owner_name"
            value={name.owner_name}
            onChange={(e) => {
              setName({ ...name, [e.target.name]: e.target.value });
              console.log(name);
            }}
            color="teal"
            label="Owner's Name"
            className="w-96 "
          />
          <Input
            name="owner_pan"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setForm({ ...form, [e.target.name]: e.target.files[0] });
              } else {
                setForm({ ...form, [e.target.name]: null });
              }
            }}
            color="teal"
            label="Owner's PAN Card"
            className="w-96"
            type="file"
            accept="application/pdf"
          />
          <Input
            name="firm_liscense"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setForm({ ...form, [e.target.name]: e.target.files[0] });
              } else {
                setForm({ ...form, [e.target.name]: null });
              }
            }}
            color="teal"
            label="Firm Liscense"
            className="w-96 border-gray-300"
            type="file"
            accept="application/pdf"
          />
          <Input
            name="gst_certificate"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setForm({ ...form, [e.target.name]: e.target.files[0] });
              } else {
                setForm({ ...form, [e.target.name]: null });
              }
            }}
            color="teal"
            label="GST Certificate "
            className="w-96 border-gray-300"
            type="file"
            accept="application/pdf"
          />
          <Input
            name="insurance"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setForm({ ...form, [e.target.name]: e.target.files[0] });
              } else {
                setForm({ ...form, [e.target.name]: null });
              }
            }}
            color="teal"
            label="Insurance Copy"
            className="border-gray-300 w-96"
            type="file"
            accept="application/pdf"
          />
          <button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default FirmVerification;
