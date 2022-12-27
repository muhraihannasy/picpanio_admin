import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {IoCloseCircleSharp} from "react-icons/io5"
import {VscListSelection} from "react-icons/vsc"

import Route from "../util/Route";
import PlanComponent from "./planComponent";

const HeaderDashboardComponent = () => {
  const location = useLocation();
  const [mobileNavbar, setMobileNavbar] = useState(false);

  return (
    <header className="bg-primary h-[60px] flex items-center">
      <nav className="container text-white flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-[24px]">picpan.io</h2>

          {/* Dekstop, Tablet Menu */}
          <ul className="flex items-center gap-4 max-[816px]:hidden">
            <li>
              <Link
                to={Route.DashboardImages}
                className={`${
                  location.pathname == Route.DashboardImages && "font-bold"
                }`}
              >
                Images
              </Link>
            </li>
            <li>
              <Link
                to={Route.DashboardIntegration}
                className={`${
                  location.pathname == Route.DashboardIntegration && "font-bold"
                }`}
              >
                API Integration
              </Link>
            </li>
          </ul>
        </div>

          
        {/* User Setting */}
        <div className="flex items-center gap-5 max-[816px]:hidden">
          <h2 className="text-sixty font-bold flex items-center gap-1">
            novanweb@gmail.com <IoIosArrowDown className="text-white" />
          </h2>

          <PlanComponent
            text="Premium"
            bg="bg-secondary"
            color="white"
            styleFont="bold"
          />
        </div>

        {/* Mobile Button Menu */}
        <div className="hidden max-[816px]:block cursor-pointer" onClick={() => setMobileNavbar(true)}>
          <VscListSelection className="text-[1.7rem]" />
        </div>

        {/* Mobile Menu */}
         <ul className={`fixed z-[9999] top-0 right-0 w-[20rem] h-full bg-white  text-primary flex flex-col gap-4 p-10 shadow-lg transition-all ${mobileNavbar ? "visible opacity-100" : "invisible opacity-0"}`}>
          <li className="cursor-pointer translate-y-[-1rem] translate-x-[13rem]" onClick={() => setMobileNavbar(false)}>
            <IoCloseCircleSharp className="text-[2.5rem]" />
          </li>
            <li>
              <Link
                to={Route.DashboardImages}
                className={`${
                  location.pathname == Route.DashboardImages && "font-bold"
                }`}
              >
                Images
              </Link>
            </li>
            <li>
              <Link
                to={Route.DashboardIntegration}
                className={`${
                  location.pathname == Route.DashboardIntegration && "font-bold"
                }`}
              >
                API Integration
              </Link>
            </li>
          </ul>
      </nav>

    </header>
  );
};

export default HeaderDashboardComponent;
