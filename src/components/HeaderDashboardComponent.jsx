import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import Route from "../util/Route";
import PlanComponent from "./planComponent";

const HeaderDashboardComponent = () => {
  const location = useLocation();

  const route = {};
  return (
    <header className="bg-primary h-[60px] flex items-center">
      <nav className="container text-white flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h2 className="font-bold text-[24px]">picpan.io</h2>

          <ul className="flex items-center gap-4">
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

        <div className="flex items-center gap-5">
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
      </nav>
    </header>
  );
};

export default HeaderDashboardComponent;
