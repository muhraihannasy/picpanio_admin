import { MdArrowForwardIos } from "react-icons/md";

const ListAlbumComponent = ({ listItem, setCurrentAlbum }) => {
  return (
    <div className="w-[240px] h-[591px] bg-[#F5F5F5] py-[5px] rounded-tl-[6px] rounded-bl-[6px] rounded-tr-[6px] border-l-2 border-b-2 overflow-auto list-album">
      <ul>
        {listItem &&
          listItem.map((item, index) => {
            return (
              <li
                className="flex items-center justify-between border-b border-seventy pb-1 px-4 text-[12px] text-primary h-[37px] cursor-pointer"
                key={index}
                onClick={() => setCurrentAlbum(item.id)}
              >
                {item.name} <MdArrowForwardIos />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ListAlbumComponent;
