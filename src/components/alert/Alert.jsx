import { useEffect, useState } from "react";

const Alert = ({ type, show, message }) => {
  const [properties, setProperties] = useState({
    title: "",
    color: "",
    bg: "",
    border: "",
  });

  useEffect(() => {
    checkPropertiesAlert(type, setProperties);
  }, [type, show]);
  return (
    <aside
      className={`md:w-[420px] w-[80%] fixed top-[1rem]  h-[80px] right-[1.2rem] border-[0.5px] rounded-[4px] px-[19px] py-[12px] transition-all ${properties.bg} ${properties.border} `}
    >
      <h2 className={`text-[14px] font-bold ${properties.color}`}>
        {properties.title}
      </h2>
      <p className="text-[12px] text-eighty">{message}</p>
    </aside>
  );
};

function checkPropertiesAlert(type = "info", setProperties) {
  switch (type) {
    case "info":
      setProperties((prev) => ({ ...prev, title: "Info" }));
      setProperties((prev) => ({ ...prev, color: "text-secondary" }));
      setProperties((prev) => ({ ...prev, bg: "bg-fourty" }));
      setProperties((prev) => ({
        ...prev,
        border: "border-primary border-opacity-[92%]",
      }));
      console.log("asasdsad");
      break;
    case "success":
      setProperties((prev) => ({ ...prev, title: "Success" }));
      setProperties((prev) => ({ ...prev, color: "text-ten" }));
      setProperties((prev) => ({ ...prev, bg: "bg-[#DDEBE7]" }));
      setProperties((prev) => ({
        ...prev,
        border: "border-[#27584C]",
      }));
      break;
    default:
      setProperties((prev) => ({ ...prev, title: "Error" }));
      setProperties((prev) => ({ ...prev, color: "text-secondary" }));
      setProperties((prev) => ({ ...prev, bg: "bg-[#FFCBCB]" }));
      setProperties((prev) => ({
        ...prev,
        border: "border-[#C3184B]",
      }));
      break;
  }
}

export default Alert;
