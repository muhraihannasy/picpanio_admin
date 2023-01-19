import { useState } from "react";

// Icon
import { IoIosAddCircle } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";

// Util
import { BASEURL, requestSetting } from "../../util/Api";

const PopupAdd = ({ openModal, onCancel, onAdd, children }) => {
  return (
    <div
      className={`w-[360px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
        openModal
          ? "visible opacity-100 translate-y-0"
          : "translate-y-[-2rem] invisible opacity-0"
      }`}
    >
      {children}

      <div className="flex items-center gap-2 mt-[24px] ml-auto w-max font-maven  ">
        <button
          className="w-[76px] h-[36px] bg-primary text-white rounded-[8px] font-bold text-[14px]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="w-[76px] h-[36px] bg-fivety text-white rounded-[8px] font-bold flex items-center justify-center gap-2 text-[14px]"
          onClick={onAdd}
        >
          Add
          <MdAddCircle />
        </button>
      </div>
    </div>
  );
};

export default PopupAdd;
