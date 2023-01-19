import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

// Icon
import { IoSave } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

// Util
import { BASEURL, requestSetting } from "../../util/Api";

const PopupEdit = ({ openModal, onCancel, onAdd, onDelete, children }) => {
  // const handleDeleteData = async () => {
  //   setOpenModal(false);

  //   fetch(`${BASEURL}/${popup.url}/${popup.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then(() => {
  //     setLastRefresh(new Date());
  //     setData("");
  //   });
  // };

  return (
    <div
      className={`w-[360px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
        openModal
          ? "visible opacity-100 translate-y-0"
          : "translate-y-[-2rem] invisible opacity-0"
      }`}
    >
      {children}

      <div className="flex justify-between items-center mt-[24px]">
        <button
          className="h-[36px] text-red-700 rounded-[8px] font-bold text-[14px] flex items-center gap-2"
          onClick={onDelete}
        >
          <BsTrash className="text-[18px]" />
          Delete Album
        </button>

        <div className="flex items-center gap-2 ml-auto w-max font-maven  ">
          <button
            className="w-[76px] h-[36px] bg-primary text-white rounded-[8px] font-bold text-[14px]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-[80px] h-[36px] bg-fivety text-white rounded-[8px] font-bold flex items-center justify-center gap-2 text-[14px]"
            onClick={onAdd}
          >
            Save
            <IoSave />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupEdit;
