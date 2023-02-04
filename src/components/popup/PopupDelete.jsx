import { GoTrashcan } from "react-icons/go";
import { RiEditBoxFill } from "react-icons/ri";

const PopupDelete = ({ openModal, onCancel, onDelete, title }) => {
  return (
    <>
      <div
        className={`w-full h-full bg-[#000000] bg-opacity-[0.3] fixed left-0 top-0 z-10 transition-all ${
          openModal ? "visible " : "invisible"
        }`}
      ></div>
      <div
        className={`w-[240px] h-[180px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all flex items-center justify-between flex-col ${
          openModal
            ? "visible opacity-100 translate-y-0"
            : "translate-y-[-2rem] invisible opacity-0"
        }`}
      >
        <div className="text-center pt-[0.8rem]">
          <h2 className="text-[14px] font-bold">Are you sure to delete it</h2>
          <p className="text-[14px] ">"{title}"</p>
        </div>

        <div className="flex items-center gap-2 text-[1.36rem]">
          <button
            className="w-[76px] h-[36px] bg-primary text-white rounded-[8px] font-bold text-[14px]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-[105px] h-[36px] bg-red-700 text-white rounded-[8px] font-bold text-[14px] flex items-center justify-between px-3"
            onClick={onDelete}
          >
            Delete
            <GoTrashcan className="text-[1.1rem]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupDelete;
