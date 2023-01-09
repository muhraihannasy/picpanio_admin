import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";

// Icon
import { IoSave } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

// Util
import { BASEURL, requestSetting } from "../../util/Api";

const PopupEdit = ({ openModal, setOpenModal, popup, setLastRefresh }) => {
  const [data, setData] = useState("");

  const handleEditData = async () => {
    setOpenModal(false);

    fetch(`${BASEURL}/${popup.url}/${popup.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data,
      }),
    }).then(() => {
      setLastRefresh(new Date());
      setData("");
    });
  };

  const handleDeleteData = async () => {
    setOpenModal(false);

    fetch(`${BASEURL}/${popup.url}/${popup.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setLastRefresh(new Date());
      setData("");
    });
  };

  useEffect(() => {
    setData(popup.value);
  }, [popup]);

  return (
    <div
      className={`w-[360px] h-[180px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
        openModal
          ? "visible opacity-100 translate-y-0"
          : "translate-y-[-2rem] invisible opacity-0"
      }`}
    >
      <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
        Edit {popup.field}
      </h2>

      <input
        type="text"
        placeholder="name..."
        className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px]"
        onChange={(e) => setData(e.target.value)}
        value={data}
      />

      <div className="flex justify-between items-center mt-[24px]">
        <button
          className="h-[36px] text-red-700 rounded-[8px] font-bold text-[14px] flex items-center gap-2"
          onClick={() => {
            setOpenModal(false);
            setData("");
            handleDeleteData();
          }}
        >
          <BsTrash className="text-[18px]" />
          Delete Album
        </button>

        <div className="flex items-center gap-2 ml-auto w-max font-maven  ">
          <button
            className="w-[76px] h-[36px] bg-primary text-white rounded-[8px] font-bold text-[14px]"
            onClick={() => {
              setOpenModal(false);
              setData("");
            }}
          >
            Cancel
          </button>
          <button
            className="w-[80px] h-[36px] bg-fivety text-white rounded-[8px] font-bold flex items-center justify-center gap-2 text-[14px]"
            onClick={handleEditData}
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
