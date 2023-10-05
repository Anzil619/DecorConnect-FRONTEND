import React, { useEffect, useState } from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import Logo from "../../assets/logos/dc-black-transparent.png";

import { BlockUser, ListUser } from "../../Services/AdminApi";
import NotificationModal from "../../Components/Modal/NotificationModal";
import "../../Components/NavBar/NavBar.css";
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { FirmList } from "../../Services/HomeownerApi";

function ListFirms() {
  const TABS = [
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  const [firm, setFirm] = useState([]);
  const [selectedTab, setSelectedTab] = useState("approved");

  const TABLE_HEAD = ["Id", "Firm Name", "Owner Name", "Status", ""];

  useEffect(() => {
    FetchFirmInfo();
  }, []);

  const FetchFirmInfo = async (e) => {
    try {
      const res = await FirmList();
      const data = res.data;
      console.log(data, "anzil");
      setFirm(data);
    } catch (error) {
      console.log("error trying fetch");
    }
  };

  const filteredFirmData = firm.filter((individualFirm) => {
    if (selectedTab === "approved") {
      return individualFirm.status === "approved"; // Display all data
    } else if (selectedTab === "pending") {
      return individualFirm.status === "pending"; // Adjust this condition based on your data structure
    } else if (selectedTab === "rejected") {
      return individualFirm.status === "rejected"; // Adjust this condition based on your data structure
    }
    return individualFirm.status === "approved";
  });

  console.log(filteredFirmData, "amalll");

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

      <div className="mx-20 my-10">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                  member
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="approved" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setSelectedTab(value)}
                    >
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFirmData.map((individualFirm, index) => {
                  const isLast = index === individualFirm.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={individualFirm.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {individualFirm.id}
                          <div className="flex flex-col"></div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {individualFirm.firm_name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {individualFirm.verification.owner_name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={individualFirm.status}
                            color={
                              individualFirm.firm_name ? "green" : "blue-gray"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                      <Link to={`/admin/adminsinglefirmview/${individualFirm.id}`}>
  

                          <button
                            class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-dark="true"
                            
                          >
                            View More
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              aria-hidden="true"
                              class="h-5 w-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              ></path>
                            </svg>
                          </button>
                          </Link>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ListFirms;
