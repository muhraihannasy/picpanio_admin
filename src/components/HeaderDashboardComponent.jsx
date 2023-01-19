import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { VscListSelection } from "react-icons/vsc";

import Route from "../util/Route";
import PlanComponent from "./planComponent";
import { apiRequest, BASEURL, requestSetting } from "../util/Api";

const HeaderDashboardComponent = () => {
  const location = useLocation();
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [email, setEmail] = useState("");

  function getUserInfo() {
    apiRequest(`${BASEURL}/auth/account`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setEmail(res.user.email);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

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
                to={Route.DashboardSpaces}
                className={`
                ${location.pathname == Route.DashboardSpaces && "font-bold"}
                ${
                  location.pathname == Route.DashboardCreateSpace && "font-bold"
                }
                `}
              >
                Spaces
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
          <button
            className="text-sixty font-bold flex items-center gap-1 relative"
            type="button"
            onClick={() => setDropdownActive((prev) => !prev)}
          >
            {email} <IoIosArrowDown className="text-white" />
            <div
              className={`absolute right-0 bottom-[-6.6rem] w-[90%]  rounded-bl-[4px] rounded-br-[4px] py-[1rem]  bg-[#CE1261] text-white font-medium transition-all ${
                dropdownActive ? "visible opacity-100" : "opacity-0 invisible"
              }`}
            >
              <ul className="px-5">
                <li className="border-b border-b-[#A80D4E] pb-2 mb-1 text-right">
                  <Link to="/account">Account</Link>
                </li>
                <li className="text-right">
                  <button>Sign Out</button>
                </li>
              </ul>
            </div>
          </button>

          <PlanComponent
            text="Premium"
            bg="bg-secondary"
            color="white"
            styleFont="bold"
          />
        </div>

        {/* Mobile Button Menu */}
        <div
          className="hidden max-[816px]:block cursor-pointer"
          onClick={() => setMobileNavbar(true)}
        >
          <VscListSelection className="text-[1.7rem]" />
        </div>

        {/* Mobile Menu */}
        <ul
          className={`fixed z-[9999] top-0 right-0 w-[20rem] h-full bg-white  text-primary flex flex-col gap-4 p-10 shadow-lg transition-all ${
            mobileNavbar ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <li
            className="cursor-pointer translate-y-[-1rem] translate-x-[13rem]"
            onClick={() => setMobileNavbar(false)}
          >
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
