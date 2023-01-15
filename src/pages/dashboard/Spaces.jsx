import { useEffect, useState } from "react";
import { apiRequest, BASEURL, requestSetting } from "../../util/Api";
import { Link } from "react-router-dom";

// Component
import HeaderDashboardComponent from "../../components/HeaderDashboardComponent";
import Route from "../../util/Route";
import { IoMailOpenOutline } from "react-icons/io5";
import { Toaster } from "react-hot-toast";
import Loading from "../../components/loading";

const Spaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);
  const [isUnverified, setIsUnverified] = useState(false);

  function getUserInfo() {
    apiRequest(`${BASEURL}/auth/account`, requestSetting("GET")).then((res) => {
      const { user } = res;
      if (user.status === "Pending") setIsUnverified(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log(res);
    });
  }
  useEffect(() => {
    getUserInfo();
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
              {spaces.length !== 0 ? (
                <>
                  <h2 className="text-secondary text-[1.4rem] font-semibold my-[1.2rem]">
                    Spaces
                  </h2>
                  <SpaceItems items={spaces} />
                </>
              ) : (
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

const SpaceItems = ({ items }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem]">
      {items.map((item) => {
        return (
          <div className="bg-ninety rounded-[8px] px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[1.2rem] font-semibold text-primary">
                {item.name}
              </h3>
              <p
                className={`font-bold text-[0.9rem] ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </p>
            </div>
            <p className="text-eighty text-[14px]">{item.url}</p>
            <p className="text-[12px] text-eighty">{item.location}</p>
          </div>
        );
      })}
    </div>
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
