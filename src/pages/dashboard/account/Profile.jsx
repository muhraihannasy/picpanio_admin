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

const Account = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
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
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  function getInvoices() {
    apiRequest(`${BASEURL}/invoice`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setInvoices(res.invoices);

      console.log(res.invoices);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }

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

      if (res?.success) {
        setIsLoading(false);

        setFormProfile((prev) => ({
          ...prev,
          fullname: res?.user?.name,
          email: res?.user?.email,
        }));
      }
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

        if (res?.success) {
          setIsLoading(false);

          toast.custom(
            <Alert type="success" message="Success Changes Account" />
          );

          setLastRefresh(new Date());
        }
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

  useEffect(() => {
    getInvoices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

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
          <div
            className={`container flex  ${
              innerWidth < 866 ? "flex-col" : "flex-row"
            } gap-[2.5rem]`}
          >
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
                items={invoices}
                innerWidth={innerWidth}
                navigate={navigate}
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

const InvoiceScreen = ({ items, innerWidth, navigate }) => {
  const styleTable = "w-full ";
  const styleTrHead = "pb-[20px]";
  const styleTh =
    "text-eighty text-[16px] text-left  text-eighty whitespace-nowrap pr-3";
  const styleTd = "whitespace-nowrap  py-[0.6rem]";

  return (
    <div className=" w-full mx-auto ">
      {innerWidth > 866 ? (
        <table className={styleTable}>
          <thead className="py-[2rem]">
            <tr className={styleTrHead}>
              <th className={`${styleTh} w-[12rem] pb-[0.5rem]`}>
                Invoice number
              </th>
              <th className={`${styleTh} w-[10rem] pb-[0.5rem] pr-5`}>Date</th>
              <th
                className={`${styleTh} text-right md:w-[8rem] w-[12rem] pb-[0.5rem]`}
              >
                Amount billed
              </th>
              <th className={`${styleTh} text-center pb-[0.5rem] `}>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="pt-[2rem]">
            {items.map((item) => {
              const date = new Date(item?.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth();
              const day = date.getDay();
              return (
                <tr key={item.id}>
                  <td className={`${styleTd} text-primary font-semibold`}>
                    #{item?.number}
                  </td>
                  <td className={`${styleTd} text-eighty pr-5 text-left`}>
                    {`${day}/${month}/${year}`}
                  </td>
                  <td className={`${styleTd} text-eighty text-right pr-3`}>
                    ${item.billAmount}
                  </td>
                  <td
                    className={` ${styleTd} text-center bg-gre ${
                      item.status == "Paid" ? "text-green-500" : "text-primary"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td>{checkButtonIsPay(item.status, navigate, item?.id)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {items.map((item) => (
            <>
              <CardInvoice key={item.id} item={item} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

const CardInvoice = ({ item, key }) => {
  const date = new Date(item?.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return (
    <div className="bg-white shadow rounded-lg px-4 py-4 w-full" key={key}>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-primary">#{item?.number}</h2>
          <h2 className="text-eighty text-[0.8rem]">
            {`${day}/${month}/${year}`}
          </h2>
        </div>
        <div>{checkStatusInvoice(item.status)}</div>
      </div>
      <div className="flex items-center justify-between mt-[20px]">
        {checkButtonIsPay(item.status)}
        <div className="font-semibold">${item.billAmount}</div>
      </div>
    </div>
  );
};

function checkButtonIsPay(statusPaid, navigate, id) {
  let button = "";

  switch (statusPaid) {
    case "Paid":
      button = (
        <button
          className={`bg-ten w-[60px] h-[30px] text-center text-[12px] rounded-md px-2 font-bold block text-white ml-3 max-[866px]:ml-0`}
        >
          Receipt
        </button>
      );
      break;
    case "Unpaid":
      button = (
        <button
          className={`bg-eighty w-[60px] h-[30px] text-center text-[12px] px-3 rounded-md font-bold block text-white  ml-3 max-[866px]:ml-0`}
          onClick={() => navigate(`/invoice/${id}`)}
        >
          Pay
        </button>
      );

      break;
    default:
      break;
  }

  return button;
}

function checkStatusInvoice(statusPaid) {
  let status = "";

  switch (statusPaid) {
    case "Paid":
      status = (
        <h2 className="bg-green-500 px-2 py-1 rounded-[4px] text-xs text-white">
          Paid
        </h2>
      );
      break;
    case "Unpaid":
      status = (
        <h2 className="bg-secondary px-2 py-1 rounded-[4px] text-xs text-white">
          Unpaid
        </h2>
      );

      break;
    default:
      break;
  }

  return status;
}

export default Account;
