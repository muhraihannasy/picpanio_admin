import { SlArrowRight } from "react-icons/sl";
import { RiEditBoxFill } from "react-icons/ri";

const ListAlbumComponent = ({
  listItem,
  setLastChangedAlbum,
  setFormAlbum,
  setFormFolder,
  setOpenModal,
  setCurrentAlbum,
  currentAlbum,
  setPath,
  openModal,
}) => {
  return (
    <div
      className={`max-[836px]:w-[300px] max-[836px]:h-full w-[240px] h-[591px] bg-[#F5F5F5] pb-[5px] rounded-tl-[6px] rounded-bl-[6px] border-l-2 border-b-2 overflow-y-auto overflow-x-hidden list-album max-[836px]:fixed max-[836px]:z-[99] max-[836px]:top-0 transition-all ${
        openModal.showAlbum
          ? "max-[836px]:visible max-[836px]:left-0"
          : "max-[836px]:invisible max-[836px]:left-[-10rem]"
      }`}
    >
      {/* absolute opacity-0 */}
      <ul>
        {listItem.length === 0 && (
          <h2 className="text-center mt-[5rem]">No Albums</h2>
        )}
        {listItem &&
          listItem.map((item, index) => {
            return (
              <li
                className={`flex items-center justify-between border-b border-seventy text-[12px] text-primary h-[37px] cursor-pointer pl-3 max-[836px]:w-full w-[240px] ${
                  currentAlbum == item.id && "bg-white"
                }`}
                key={index}
              >
                <div
                  className="flex items-center justify-between w-full text-[0.9rem] gap-[0.5rem] pr-2"
                  onClick={() => {
                    setLastChangedAlbum(new Date());
                    setCurrentAlbum(item.id);
                    setPath("root");
                    setOpenModal((prev) => ({
                      ...prev,
                      showAlbum: false,
                    }));
                  }}
                >
                  <p className="w-[160px] overflow-hidden">
                    {item.name.split("").length >= 15
                      ? `${item.name.slice(0, 18)}...`
                      : item.name}
                  </p>
                  <SlArrowRight />
                </div>
                <div
                  className="bg-fourty h-[37px] w-[45px] flex items-center justify-center"
                  onClick={() => {
                    setOpenModal((prev) => ({
                      ...prev,
                      editAlbum: true,
                    }));
                    setFormAlbum({
                      name: item.name,
                      description: item.description,
                    });
                    setCurrentAlbum(item.id);
                  }}
                >
                  <RiEditBoxFill className="text-[1rem]" />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ListAlbumComponent;
