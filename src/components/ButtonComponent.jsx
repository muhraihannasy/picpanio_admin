import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent = ({ type = "button", text, to = "", bg, color }) => {
  const styleButton = `bg-${bg} text-${color} h-[42px] text-center px-8 rounded-md font-bold`;
  const styleLink = `bg-${bg} text-${color} h-[42px] text-center px-8 py-3 rounded-md font-bold`;

  return (
    <div>
      {type == "button" && <button className={styleButton}>{text}</button>}
      {type == "link" && (
        <Link to={to} className={styleLink}>
          {text}
        </Link>
      )}
    </div>
  );
};

export default ButtonComponent;
