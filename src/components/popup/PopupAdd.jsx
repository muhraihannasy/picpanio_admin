import { useState } from "react";

// Icon
import { IoIosAddCircle } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";

// Util
import { BASEURL, requestSetting } from "../../util/Api";

const PopupAdd = ({ openModal, setOpenModal, field, url, setLastRefresh }) => {
  const [data, setData] = useState("");

  const handleAddData = async () => {
    setOpenModal(false);

    fetch(`${BASEURL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * (1000000000000 * 200)),
        name: data,
      }),
    }).then(() => {
      setLastRefresh(new Date());
      setData("");
    });
  };

  return (
    <div
      className={`w-[360px] h-[180px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
        openModal
          ? "visible opacity-100 translate-y-0"
          : "translate-y-[-2rem] invisible opacity-0"
      }`}
    >
      <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
        Add {field}
      </h2>

      <input
        type="text"
        placeholder="name..."
        className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
        onChange={(e) => setData(e.target.value)}
        value={data}
      />

      <div className="flex items-center gap-2 mt-[24px] ml-auto w-max font-maven  ">
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
          className="w-[76px] h-[36px] bg-fivety text-white rounded-[8px] font-bold flex items-center justify-center gap-2 text-[14px]"
          onClick={handleAddData}
        >
          Add
          <MdAddCircle />
        </button>
      </div>
    </div>
  );
};

export default PopupAdd;
