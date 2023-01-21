import { useEffect } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Icon
import { SlArrowRight } from "react-icons/sl";
import ButtonComponent from "../../../components/ButtonComponent";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import InputComponent from "../../../components/InputComponent";
import Loading from "../../../components/loading";

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
  const [currentMenu, setCurrentMenu] = useState("");
  const [formProfile, setFormProfile] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isPaid, setIsPaid] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setCurrentMenu(menuTabs[1].id);
  }, []);

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
          <div className="container grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
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
  const styleUl = "flex flex-col gap-2 col-span-1 ";
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

const ProfileScreen = ({ formData, setFormData }) => {
  const styleForm = "lg:col-span-3 md:col-span-2 col-span-1 lg:w-[85%]";
  const styleWrapper = "grid grid-cols-2 gap-5 mb-[25px] ";
  const styleInputGroup = "";
  const styleButton = "";
  return (
    <form className={styleForm}>
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
          <label htmlFor="password">password (leave blank if no change)</label>
          <InputComponent
            field="password"
            type="password"
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
          <label htmlFor="password_confirmation">password confimation</label>
          <InputComponent
            field="password_confirmation"
            type="password_confirmation"
            require={true}
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
  const styleTable = "lg:col-span-3 md:col-span-2 col-span-1 lg:w-[85%]";
  const styleTrHead = "border-b-2";
  const styleTh = "text-eighty text-[16px] text-left w-[15rem] ";

  return (
    <table className={styleTable}>
      <thead>
        <tr className={styleTrHead}>
          <th className={styleTh}>Invoice number</th>
          <th className={`${styleTh} w-[9.9rem] `}>Date</th>
          <th className={`${styleTh} w-[8rem] text-right `}>Amount billed</th>
          <th className={`${styleTh} w-[10rem] text-center`}>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="">
        <tr>
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
          <td>{checkButtonIsPay(isPaid)}</td>
        </tr>
      </tbody>
    </table>
  );
};

function checkButtonIsPay(isPaid) {
  switch (isPaid) {
    case true:
      return (
        <ButtonComponent type="button" text="Receipt" bg="ten" color="white" />
      );
      break;
    case false:
      return (
        <ButtonComponent type="button" text="Paid" bg="eighty" color="white" />
      );
      break;
    default:
      break;
  }
}

export default Profile;
