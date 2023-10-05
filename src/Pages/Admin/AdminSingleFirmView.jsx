import React from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import Logo from "../../assets/logos/dc-black-transparent.png";
import dummy from "../../assets/dummy.pdf";
import { SingleFirmInfo } from "../../Services/HomeownerApi";
import PdfModal from "../../Components/Modal/PdfModal";
import NotificationModal from "../../Components/Modal/NotificationModal";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PDFViewer from "../../Components/Pdf/PDFViewer";
import { useParams } from "react-router-dom";
import { ApproveFirm } from "../../Services/AdminApi";
import buttonText from "@material-tailwind/react/theme/components/button/buttonText";

function AdminSingleFirmView() {
  const { firmId } = useParams();
  const [firminfo, setfirminfo] = useState(null);

  useEffect(() => {
    FetchFirmInfo();
  }, []);

  const FetchFirmInfo = async (e) => {
    try {
      const res = await SingleFirmInfo(firmId);
      const data = res.data;
      console.log(data);
      setfirminfo(data);
    } catch {
      console.log("error trying fetch");
    }
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <img src={Logo} className="w-20" alt="" />
      </div>
      <div
        className="w-full sticky top-0
        transition-all duration-300 ease-in-out"
      >
        <NavBar />
      </div>
      <div className=" flex justify-center items-center m-16">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Address
            </Typography>
            <Typography>
              {firminfo?.address.address_line}
              <br />
              {firminfo?.address.city},{firminfo?.address.state}
              <br />
              {firminfo?.address.country}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button>Read More</Button>
          </CardFooter>
        </Card>
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Verification Cerificates
            </Typography>
            <div className="flex flex-col gap-2">
              <ul>
                <li className="flex justify-between">
                  <h1>GST certificate</h1>

                  <PdfModal
                    buttonText="View"
                    modalTitle="GST certificate"
                    // modalHeading="Do you want to block this user ?"
                    buttonColor="Black"
                    modalContent={
                      <PDFViewer
                        pdfUrl={firminfo?.verification.owner_pan_card}
                      />
                    }
                    onOkClick=""
                  />
                </li>
                <li className="flex justify-between">
                  <h1>Pan Card</h1>
                  <PdfModal
                    buttonText="View"
                    modalTitle="Pan Card"
                    // modalHeading="Do you want to block this user ?"
                    buttonColor="Black"
                    modalContent={
                      <PDFViewer
                        pdfUrl={firminfo?.verification.firm_liscense}
                      />
                    }
                    onOkClick=""
                  />
                </li>
                <li className="flex justify-between">
                  <h1>Firm Liscense</h1>
                  <PdfModal
                    buttonText="View"
                    modalTitle="Firm Liscense"
                    // modalHeading="Do you want to block this user ?"
                    buttonColor="Black"
                    modalContent={
                      <PDFViewer
                        pdfUrl={firminfo?.verification.firm_liscense}
                      />
                    }
                    onOkClick=""
                  />
                </li>

                <li className="flex justify-between">
                  <h1>insurance</h1>
                  <PdfModal
                    buttonText="View"
                    modalTitle="insurance"
                    // modalHeading="Do you want to block this user ?"
                    buttonColor="Black"
                    modalContent={
                      <PDFViewer pdfUrl={firminfo?.verification.insurance} />
                    }
                    onOkClick=""
                  />
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-between items-center p-4    ">
        {/* First grid */}
        <div className="flex-1 text-center p-2"></div>
        {/* Second grid */}
        <div className="flex-1 text-center p-2"></div>
        {/* Third grid with a button */}
        <div className="flex-1 text-center p-2">
          {/* Button element */}
          {firminfo?.status === "approved" ? (
            <NotificationModal
              buttonText="Block"
              modalTitle="Confirmation"
              modalHeading="Do you want to block this user ?"
              buttonColor="red"
              modalContent="Note : Firm will be removed from the userside "
              onOkClick={async () => {
                const data = { status: "rejected" };
                await ApproveFirm(firmId, data);
                await FetchFirmInfo();
              }}
            />
          ) : (
            <NotificationModal
              buttonText="Approve"
              modalTitle="Confirmation"
              modalHeading="Do you want to Approve this user ?"
              buttonColor="red"
              modalContent="Note :Firm will be visible for the users from now on"
              onOkClick={async () => {
                const data = { status: "approved" };
                await ApproveFirm(firmId, data);
                await FetchFirmInfo();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSingleFirmView;
