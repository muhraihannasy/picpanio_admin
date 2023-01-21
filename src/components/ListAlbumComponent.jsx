import { SlArrowRight } from "react-icons/sl";
import { RiEditBoxFill } from "react-icons/ri";

const ListAlbumComponent = ({
  listItem,
  setLastChangedAlbum,
  setFormAlbum,
  setFormFolder,
  setOpenModal,
  setCurrentAlbum,
  setPath,
}) => {
  return (
    <div className="w-[240px] h-[591px] bg-[#F5F5F5] pb-[5px] rounded-tl-[6px] rounded-bl-[6px] border-l-2 border-b-2 overflow-y-auto overflow-x-hidden list-album ">
      {/* absolute opacity-0 */}
      <ul>
        {listItem.length === 0 && (
          <h2 className="text-center mt-[5rem]">No Albums</h2>
        )}
        {listItem &&
          listItem.map((item, index) => {
            return (
              <li
                className="flex items-center justify-between border-b border-seventy text-[12px] text-primary h-[37px] cursor-pointer pl-3 w-[240px]"
                key={index}
              >
                <div
                  className="flex items-center justify-between w-full text-[0.9rem] gap-[0.5rem] pr-2"
                  onClick={() => {
                    setLastChangedAlbum(new Date());
                    setCurrentAlbum(item.id);
                    setPath("root");
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
