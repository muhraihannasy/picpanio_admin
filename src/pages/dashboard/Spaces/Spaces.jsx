import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { apiRequest, BASEURL, requestSetting } from "../../../util/Api";
import Route from "../../../util/Route";

// Icon
import { IoMailOpenOutline, IoNavigateCircleOutline } from "react-icons/io5";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import Loading from "../../../components/loading";

const Spaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);
  const [isUnverified, setIsUnverified] = useState(false);
  const navigate = useNavigate();

  function getUserInfo() {
    apiRequest(`${BASEURL}/auth/account`, requestSetting("GET")).then((res) => {
      if (res.user?.status === "Pending") setIsUnverified(true);
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        setIsLoading(false);
      }
    });
  }

  function getSpaces() {
    let spacesArr = [];

    apiRequest(`${BASEURL}/space`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      res.spaces.forEach((space) => {
        spacesArr.push(space.space);
      });

      setSpaces(spacesArr);

      if (res.success) {
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    getUserInfo();
    getSpaces();
  }, []);

  useEffect(() => {
    document.body.style.background = "#ffffff";
  });

  return (
    <div>
      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Header */}
      <HeaderDashboardComponent />

      {/* Main Content */}
      <main>
        <section>
          <div className="container">
            {isUnverified && <Unverified />}
            <div>
              {spaces.length !== 0 && (
                <>
                  <h2 className="text-secondary text-[1.4rem] font-semibold my-[1.2rem]">
                    Spaces
                  </h2>
                  <SpaceItems items={spaces} navigate={navigate} />
                </>
              )}

              {spaces.length == 0 && !isLoading && (
                <NotHaveSpace isUnverified={isUnverified} />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const Unverified = () => {
  return (
    <div className="flex items-center justify-center gap-[1rem] bg-sixty text-eighty rounded-[8px] py-4 mt-[30px]">
      <div className="text-[2rem]">
        <IoMailOpenOutline />
      </div>
      <p>
        Please confirm your email before create a Space. If you not receive
        email yet, click <span className="text-third">resend email</span>
      </p>
    </div>
  );
};

const NotHaveSpace = ({ isUnverified }) => {
  return (
    <div className=" h-[100vh] flex item-center justify-center">
      <div className="mx-auto mt-[180px] flex items-center flex-col gap-4  text-[14px]">
        <h2 className="text-eighty">You don't have any Space yet</h2>
        <Link
          className={` text-white text-center rounded-[8px] px-6 py-2 w-full font-bold ${
            isUnverified ? "bg-seventy cursor-default" : "bg-secondary"
          }`}
          to={isUnverified ? "" : Route.DashboardCreateSpace}
        >
          Create Space
        </Link>
      </div>
    </div>
  );
};

const SpaceItems = ({ items, navigate }) => {
  return (
    <>
      <Link
        className={` text-white text-center rounded-[8px] px-6 py-2 w-max font-bold bg-secondary block mb-[1rem]`}
        to={Route.DashboardCreateSpace}
      >
        Create Space
      </Link>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem]">
        {items.map((item) => {
          const { id, name, region, slug, status } = item;
          const url = `${region}.picpan.io/${slug}`;
          return (
            <div
              className="bg-ninety rounded-[8px] px-6 py-4 cursor-pointer"
              key={id}
              onClick={() => navigate(`/spaces/${id}`)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-primary">
                  {name}
                </h3>
                <p className={`font-bold text-[14px] ${statusColor(status)}`}>
                  {status}
                </p>
              </div>
              <p className="text-eighty text-[14px]">{url}</p>
              <p className="text-[12px] text-eighty">
                {region == "ap1" && "Asia Pacific (Singapore)"}
                {region == "us1" && "Asia Pacific (Dallas, TX)"}
                {region == "eu1" && "Europa (Germany)"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

function statusColor(status) {
  let color = "";
  switch (status) {
    case "Active":
      color = "text-ten";
      break;
    case "Expired":
      color = "text-third";
      break;
    default:
      color = "text-eighty";
      break;
  }

  return color;
}

export default Spaces;
