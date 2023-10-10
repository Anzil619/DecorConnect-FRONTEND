import { ProfessionalAxiosInstant } from "../utils/AxiosUtils";

const ProfessionalGoogleSignup = (value) => {
  const values = {
    email: value.email,
    name: value.given_name,
    password: value.id,
  };
  return ProfessionalAxiosInstant.post("/googleprofessional/", values, {
    withCredentials: true,
  });
};

const ProfileCompletion = (id, value) => {
  console.log(value, "aaaaaaaaaaaa");

  return ProfessionalAxiosInstant.patch("/firmcompletion/" + id + "/", value, {
    withCredentials: true,
  }).catch((error) => error.response);
};

const GetFirmInfo = (id) => {
  return ProfessionalAxiosInstant.get("/fetchfirminfo/" + id + "/", {
    withCredentials: true,
  }).catch((error) => error.response);
};

const FirmVerificationUpdate = (id, value) => {
  return ProfessionalAxiosInstant.put(
    "/firmverificationupdate/" + id + "/",
    value,
    { withCredentials: true }
  ).catch((error) => error.response);
};

const CreateProject = (value) => {
  return ProfessionalAxiosInstant.post("/createproject/", value, {
    withCredentials: true,
  }).catch((error) => error.response);
};

const CreateProjectImages = (value) => {
  return ProfessionalAxiosInstant.post("/createprojectimages/", value, {
    withCredentials: true,
  }).catch((error) => error.response);
};

const EditFirmInfo = (id, value) => {
  return ProfessionalAxiosInstant.patch("/editfirminfo/" + id + "/", value, {
    withCredentials: true,
  });
};

export {
  ProfessionalGoogleSignup,
  ProfileCompletion,
  GetFirmInfo,
  FirmVerificationUpdate,
  CreateProject,
  CreateProjectImages,
  EditFirmInfo,
};
