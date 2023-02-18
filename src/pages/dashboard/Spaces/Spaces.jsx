import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { apiRequest, BASEURL, requestSetting } from "../../../util/Api";
import Route from "../../../util/Route";

// Icon
import { IoMailOpenOutline, IoNavigateCircleOutline } from "react-icons/io5";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import Loading from "../../../components/loading";
import Alert from "../../../components/alert/alert";

const Spaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isUnverified, setIsUnverified] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [invitation, setInvitation] = useState();
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
    setIsLoading(true);
    apiRequest(`${BASEURL}/space`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      let spacesArr = [];

      res.spaces.map((space) => {
        spacesArr.push(space.space);
      });

      setSpaces(spacesArr);

      if (res.success) {
        setIsLoading(false);
      }
    });
  }

  function getMyInvitation() {
    apiRequest(`${BASEURL}/invitation/me`, requestSetting("GET")).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);

          console.log(res);

          setInvitation(res?.invitations[res?.invitations?.length - 1]);
        }
      }
    );
  }

  function handleAcceptInvitation() {
    const data = {
      invitationId: invitation.id,
    };

    setIsLoading(true);
    apiRequest(
      `${BASEURL}/invitation/accept`,
      requestSetting("POST", data)
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        setIsLoading(false);
        toast.custom(<Alert type="success" message="Successfuly Invited" />);
        setInvitation("");
        setLastRefresh(new Date());
      }

      if (res.statusCode !== 500 && res.error) {
        toast.custom(<Alert type="error" message={res.error} />);
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    getUserInfo();
    getMyInvitation();
  }, []);

  useEffect(() => {
    getSpaces();
  }, [lastRefresh]);

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
            {invitation && <Invitation onSubmit={handleAcceptInvitation} />}

            <div>
              {spaces.length !== 0 && (
                <>
                  <h2 className="text-secondary text-[1.4rem] font-semibold my-[1.2rem]">
                    Spaces
                  </h2>
                  <SpaceItems items={spaces} navigate={navigate} />
                </>
              )}

              {spaces.length == 0 && !isLoading ? (
                <NotHaveSpace isUnverified={isUnverified} />
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const Invitation = ({ onSubmit }) => {
  return (
    <div className="w-full bg-fourty rounded-[8px] mt-[2rem] flex items-center  px-5 py-4 md:flex-row flex-col gap-3">
      <h2 className=" flex-1 lg:text-center max-[339px]:text-center text-primary lg:pl-24">
        Your have invited to <span className="font-bold">NSTEK</span> space
      </h2>

      <button
        className="bg-secondary px-6 py-2 rounded-[8px] font-bold text-white"
        onClick={onSubmit}
      >
        Accept Invitation
      </button>
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
  function handleClickSpace(id, statusSpace) {
    if (statusSpace === "Pending") {
      toast.custom(
        <Alert
          type="error"
          message="You must finished your payment to unclock this space"
        />
      );

      return;
    }
    navigate(`/spaces/${id}`);
  }

  return (
    <>
      <Link
        className={` text-white text-center rounded-[8px] px-6 py-2 w-max font-bold bg-secondary block mb-[1rem]`}
        to={Route.DashboardCreateSpace}
      >
        Create Space
      </Link>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[1rem]">
        {items.map((item, index) => {
          const url = `${item?.region}.picpan.io/${item?.slug}`;

          return (
            <div
              className="bg-ninety rounded-[8px] px-6 py-4 cursor-pointer"
              key={index}
              onClick={() => handleClickSpace(item?.id, item.status)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-primary">
                  {item?.name}
                </h3>
                <p
                  className={`font-bold text-[14px] ${statusColor(
                    item?.status
                  )}`}
                >
                  {item?.status}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-eighty text-[14px]">{url}</p>
                  <p className="text-[12px] text-eighty">
                    {item?.region == "ap1" && "Asia Pacific (Singapore)"}
                    {item?.region == "us1" && "US (Dallas, TX)"}
                    {item?.region == "eu1" && "Europa (Germany)"}
                  </p>
                </div>

                <p
                  className={`text-[14px] flex items-center font-regular text-14 px-3 h-[30px] rounded-[10px] ${
                    item?.plan == "Enterprise" ? "text-white" : "text-eighty"
                  } ${planColor(item?.plan)} `}
                >
                  {item?.plan}
                </p>
              </div>
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

function planColor(plan) {
  let color = "";
  switch (plan) {
    case "Free":
      color = "bg-seventy";
      break;
    case "Premium":
      color = "bg-sixty";
      break;
    default:
      color = "bg-primary";
      break;
  }

  return color;
}

export default Spaces;
