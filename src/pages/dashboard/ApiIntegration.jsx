import React from "react";
import { MdAddCircle } from "react-icons/md";
import HeaderDashboardComponent from "../../components/HeaderDashboardComponent";

const ApiIntegration = () => {
  return (
    <>
      {/* Header */}
      <HeaderDashboardComponent />

      <section>
        <div className="container pt-[2rem]">
          <button className="flex items-center justify-between px-4 bg-primary w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2 font-semibold text-white text-[16px] ml-auto">
            Create API Token
            <MdAddCircle className="text-[1.2rem] text-white" />
          </button>
        </div>
      </section>
    </>
  );
};

export default ApiIntegration;
