import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logos/dc-black-transparent.png";
import { NavBar } from "../../../Components/NavBar/NavBar";
import studio from "../../../assets/Free_Sample_By_Wix.png";
import { Rating } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";

import { SingleFirmInfo } from "../../../Services/HomeownerApi";
import { Loader } from "../../../Components/Loading/Loader";
import ReviewModal from "../../../Components/Modal/ReviewModal";
import { useSelector } from "react-redux";
import {
  AddReview,
  DeleteReview,
  EditReview,
} from "../../../Services/ProfessionalApi";
import { ConfirmationModal } from "../../../Components/Modal/ConfirmationModal";


function SingleFirm() {
  const { firmId } = useParams();
  const { userinfo } = useSelector((state) => state.professional);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const [firminfo, setfirminfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    FetchFirmInfo();
  }, []);

  const FetchFirmInfo = async (e) => {
    handleLoading();
    try {
      const res = await SingleFirmInfo(firmId);
      const data = res.data;
      console.log(data);

      data.reviews.sort((reviewA, reviewB) => {
        if (reviewA.user.id === userinfo.id) return -1;
        if (reviewB.user.id === userinfo.id) return 1;
        return new Date(reviewB.created_at) - new Date(reviewA.created_at);
      });

      const fetchedReviews = data.reviews;
      setReviews(fetchedReviews);

      // Calculate the average rating
      if (fetchedReviews.length > 0) {
        const sumOfRatings = fetchedReviews.reduce(
          (total, review) => total + review.rating,
          0
        );
        const avgRating = sumOfRatings / fetchedReviews.length;
        setAverageRating(avgRating.toFixed(1));
      }

      setfirminfo(data);
      handleLoading();
    } catch {
      handleLoading();
      console.log("error trying fetch");
    }
  };

  const handleAddReview = async (rating, comment) => {
    try {
      const data = {
        user: userinfo.id,
        firm: firmId,
        rating: rating,
        comment: comment,
      };
      const res = await AddReview(data);
      FetchFirmInfo();
      console.log(res.data, "anzilleee");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const res = await DeleteReview(id);
      console.log(res.data, "abhi");
      FetchFirmInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditReview = async (rating, comment, id) => {
    try {
      const data = {
        rating: rating,
        comment: comment,
      };

      const res = await EditReview(id, data);
      FetchFirmInfo();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>

      <div
        className="w-full sticky top-0 z-50
       transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>

      <div className="flex flex-col items-center m-5">
        <div className="flex justify-end w-full mr-48">
          {userinfo.role === "professional" ? (
            <Link to={`/professional/userprofile/${firminfo?.user}`}>
              <button class="m-4 w-44 h-10 px-4 py-2 text-black border border-gray-400 shadow-md search-input">
                View Owner Profile <FaArrowRight />
              </button>
            </Link>
          ) : (
            <Link to={`/homeowner/userprofile/${firminfo?.user}`}>
              <button class="m-4 w-40h-10 px-4 py-2 text-black border border-gray-400 shadow-md search-input flex">
                Owner Profile
                <FaArrowRight className="ml-4 mt-1" />
              </button>
            </Link>
          )}
        </div>
        <img
          className="w-36 m-5"
          src={firminfo?.logo ? firminfo?.logo : studio}
          alt=""
        />
        <h1 className="text-xl font-bold m-2">{firminfo?.firm_name}</h1>

        <div className="flex items-center gap-2 m-2">
          <Rating value={4} readonly />
          <Typography color="blue-gray" className="font-medium">
            {averageRating} Rated
          </Typography>
        </div>
        <h1 className="text-2xl font-serif text-blue-gray-700 m-2">
          Architecture & Interior Designs{" "}
        </h1>
        <h1 className="m-2">{firminfo?.address.phone} </h1>
        <a href="" className="text-indigo-800 m-2">
          {firminfo?.website}
        </a>
      </div>
      <div className="m-10 h-1/3">
        <img
          className="w-full object-cover object-center"
          src={firminfo?.cover_photo}
          alt=""
        />
      </div>

      <div className="flex items-center flex-col m-16 ml-44 mr-44">
        <h1 className="text-3xl font-serif font-bold ">About US</h1>
        <p className="mt-3 text-center"> {firminfo?.about}</p>
      </div>

      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-serif font-bold">Projects</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2">
          {firminfo?.project.map((project) => (
            <Card className="w-80 h-96">
              <CardHeader floated={false} className="h-80">
                {console.log(project.images[0]?.image)}
                <Link to={`/homeowner/singleproject/${project.id}`}>
                  <img
                    className="w-full object-cover object-center h-full"
                    src={`${import.meta.env.VITE_HOMEOWNER_URL}${
                      project.images[0]?.image
                    }`}
                    alt="profile-picture"
                  />
                </Link>
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {project.project_name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {project.project_description}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                  <Typography
                    as="a"
                    href="#facebook"
                    variant="lead"
                    color="blue"
                    textGradient
                  >
                    <i className="fab fa-facebook" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#twitter"
                    variant="lead"
                    color="light-blue"
                    textGradient
                  >
                    <i className="fab fa-twitter" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography
                    as="a"
                    href="#instagram"
                    variant="lead"
                    color="purple"
                    textGradient
                  >
                    <i className="fab fa-instagram" />
                  </Typography>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}

          {/* Add more cards as needed */}
        </div>
      </div>

      <div className="flex justify-end ">
        <div className="grid grid-cols-3 mt-28">
          <div></div>

          <div className="grid-cols-2">
            <h1 className=" w-96 text-3xl font-serif font-bold mr-6">
              Reviews
            </h1>
            {/* Add content for the 2nd column here */}
          </div>
          <div className="grid-cols-3 w-96 ">
            <ReviewModal buttonName="Add Review" onOkclick={handleAddReview} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex flex-col gap-8 w-2/3">
          {firminfo?.reviews.map((review) => (
            <Card
              color="transparent"
              shadow={false}
              className="w-full max-w-[61rem]"
            >
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src={`${import.meta.env.VITE_HOMEOWNER_URL}${
                    review.user.profile_photo
                  }`}
                  alt="Unavailable"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                      {review.user.name}
                    </Typography>
                    <div className="5 flex items-center gap-0">
                      <Rating value={review.rating} readonly />
                    </div>
                  </div>
                </div>
                {review.user.id === userinfo.id ? (
                  <>
                    <ReviewModal
                      buttonName={<FaEdit />}
                      onOkclick={handleEditReview}
                      id={review.id}
                    />
                    <ConfirmationModal
                      buttonName={<FaTrash />}
                      modalHeader="Delete Comment"
                      modalContent="Are you sure you want to delete your review"
                      onOkclick={handleDeleteReview}
                      id={review.id}
                    />
                  </>
                ) : (
                  ""
                )}
              </CardHeader>
              <div className="flex justify-center">
                <CardBody className="mb-6 p-0 w-11/12">
                  <Typography style={{ wordWrap: "break-word" }}>
                    {review.comment}
                  </Typography>
                </CardBody>
              </div>
              <hr />
            </Card>
          ))}
        </div>
      </div>

      <div className="h-50">adsfsf</div>
    </div>
  );
}

export default SingleFirm;
