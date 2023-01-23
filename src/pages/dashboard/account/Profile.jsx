import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// Util
import { BASEURL, apiRequest, requestSetting } from "../../../util/Api";

// Icon
import { SlArrowRight } from "react-icons/sl";
import ButtonComponent from "../../../components/ButtonComponent";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import InputComponent from "../../../components/InputComponent";
import Loading from "../../../components/loading";
import Alert from "../../../components/alert/alert";

const menuTabs = [
  {
    id: "profile",
    name: "Profile",
  },
  {
    id: "invoices",
    name: "Invoices",
  },
];

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [currentMenu, setCurrentMenu] = useState("");
  const [formProfile, setFormProfile] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isPaid, setIsPaid] = useState(true);
  const navigate = useNavigate();

  // function getListOrder() {
  //   apiRequest(`${BASEURL}/space`, requestSetting("GET")).then((res) => {
  //     if (res.message == "The token is malformed.")
  //       navigate("/login", { replace: true });

  //     res.spaces.forEach((space) => {
  //       spacesArr.push(space.space);
  //     });

  //     setSpaces(spacesArr);

  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //   });
  // }

  function checkFormSaveProfile(data) {
    let error = false;
    if (formProfile.password !== "" && formProfile.passwordConfirmation == "") {
      toast.custom(
        <Alert type="error" message="Password Confirmation must be filled" />
      );

      error = true;
    }

    if (formProfile.password !== formProfile.passwordConfirmation) {
      toast.custom(
        <Alert
          type="error"
          message="Password & Password Confirmation must be same"
        />
      );
      error = true;
    }

    if (
      formProfile.password !== "" ||
      formProfile.passwordConfirmation !== ""
    ) {
      data.password = formProfile.password;
    }

    return error;
  }

  function getUserInfo() {
    apiRequest(`${BASEURL}/auth/account`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setFormProfile((prev) => ({
        ...prev,
        fullname: res?.user?.name,
        email: res?.user?.email,
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }

  function handleSaveProfile(e) {
    e.preventDefault();

    const data = {
      name: formProfile.fullname,
      email: formProfile.email,
    };

    if (checkFormSaveProfile(data)) return;

    setIsLoading(true);
    apiRequest(`${BASEURL}/account/change`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(
            <Alert type="success" message="Success Changes Account" />
          );

          setLastRefresh(new Date());
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    );
  }

  useEffect(() => {
    getUserInfo();
    setCurrentMenu(menuTabs[0].id);
  }, [lastRefresh]);

  useEffect(() => {
    console.log(currentMenu);
  }, [currentMenu]);

  return (
    <div>
      {/* Header */}
      <HeaderDashboardComponent />

      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      <main>
        <section className="mt-[37px]">
          <div className="container flex md:flex-row flex-col gap-[2.5rem]">
            {/* Tabs */}
            <Tabs
              menu={menuTabs}
              setCurrentMenu={setCurrentMenu}
              currentMenu={currentMenu}
              handleOnClick={(menuId) => setCurrentMenu(menuId)}
            />

            {currentMenu == menuTabs[0].id && (
              <ProfileScreen
                setFormData={setFormProfile}
                formData={formProfile}
                onSubmit={(e) => handleSaveProfile(e)}
              />
            )}
            {currentMenu == menuTabs[1].id && (
              <InvoiceScreen
                isPaid={isPaid}
                // setFormData={setFormProfile}
                // formData={formProfile}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const Tabs = ({ menu, handleOnClick, currentMenu }) => {
  const styleUl = "flex flex-col gap-2";
  const styleLi =
    "w-[240px] h-[43px] flex items-center justify-between px-4 rounded-[4px] cursor-pointer text-[14px] transition-all";
  const activeMenu = "bg-secondary text-white";
  const nonActiveMenu = "bg-ninety text-eighty";

  return (
    <ul className={styleUl}>
      {menu.map((item) => (
        <li
          key={item.id}
          className={`${styleLi} ${
            currentMenu == item.id ? activeMenu : nonActiveMenu
          }`}
          onClick={() => handleOnClick(item.id)}
        >
          {item.name}
          <SlArrowRight />
        </li>
      ))}
    </ul>
  );
};

const ProfileScreen = ({ formData, setFormData, onSubmit }) => {
  const styleForm = "w-full";
  const styleWrapper = "grid md:grid-cols-2 grid-cols-1 gap-5 mb-[25px] ";
  const styleInputGroup = "";
  const styleButton = "";

  return (
    <form className={styleForm} onSubmit={onSubmit}>
      <div className={styleWrapper}>
        <div className={styleInputGroup}>
          <label htmlFor="fullname">full name</label>
          <InputComponent
            field="fullname"
            type="text"
            require={true}
            style="outline"
            value={formData}
            setValue={setFormData}
          />
        </div>
        <div className={styleInputGroup}>
          <label htmlFor="password">
            password{" "}
            <span className="text-[12px]"> (*leave blank if no change)</span>
          </label>
          <InputComponent
            field="password"
            type="password"
            style="outline"
            value={formData}
            setValue={setFormData}
          />
        </div>
        <div className={styleInputGroup}>
          <label htmlFor="email">email</label>
          <InputComponent
            field="email"
            type="email"
            require={true}
            style="outline"
            value={formData}
            setValue={setFormData}
          />
        </div>
        <div className={styleInputGroup}>
          <label htmlFor="password_confirmation">password confimation</label>
          <InputComponent
            field="passwordConfirmation"
            type="password_confirmation"
            style="outline"
            value={formData}
            setValue={setFormData}
          />
        </div>
      </div>

      <ButtonComponent
        type="button"
        text=" Save Profile"
        bg="secondary"
        color="white"
        position="ml-auto"
      />
    </form>
  );
};

const InvoiceScreen = ({ isPaid }) => {
  const styleTable = "lg:w-full w-[40rem]";
  const styleTrHead = "border-b-2";
  const styleTh = "text-eighty text-[16px] text-left w-[15rem] text-eighty  ";

  return (
    <div className="overflow-x-auto w-full mx-auto">
      <table className={styleTable}>
        <thead>
          <tr className={styleTrHead}>
            <th className={styleTh}>Invoice number</th>
            <th className={`${styleTh}  `}>Date</th>
            <th className={`${styleTh}  text-right `}>Amount billed</th>
            <th className={`${styleTh}  text-center`}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="pt-[1rem]">
            <td className="text-primary font-semibold">#0001</td>
            <td className="text-eighty ">24/07/2022</td>
            <td className="text-eighty text-right">$9</td>
            <td
              className={`text-center bg-gre ${
                isPaid ? "text-green-500" : "text-primary"
              }`}
            >
              {isPaid ? "Paid" : "Unpaid"}
            </td>
            <td>{checkButtonIsPay(isPaid)} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function checkButtonIsPay(isPaid) {
  let button = "";

  switch (false) {
    case true:
      button = (
        <button className="bg-ten w-[86px] h-[36px] text-center text-[14px] rounded-md font-bold block text-white">
          Receipt
        </button>
      );
      break;
    case false:
      button = (
        <button className="bg-eighty w-[86px] h-[36px] text-center text-[14px] px-8 rounded-md font-bold block text-white">
          Pay
        </button>
      );

      break;
    default:
      break;
  }

  return button;
}

export default Profile;
