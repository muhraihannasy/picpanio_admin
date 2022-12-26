import React from "react";

const PlanComponent = ({ text, bg, color, styleFont }) => {
  return (
    <h3
      className={`${bg} text-${color} w-max px-4 py-1 rounded-md font-${styleFont} text-[12px]`}
    >
      {text}
    </h3>
  );
};

export default PlanComponent;
