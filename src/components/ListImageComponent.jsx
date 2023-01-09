import { Link } from "react-router-dom";

// Icon
import { IoCopyOutline } from "react-icons/io5";
import { GoTrashcan } from "react-icons/go";

// Images
import image from "../assets/images/images.png";
import CopyText from "../util/CopyText";

const ListImageComponent = ({ listItem, onClick, ref }) => {
  return (
    <ul className="mt-[1.5rem] h-[39.7rem] overflow-y-scroll list-image">
      {listItem &&
        listItem.map((item, index) => {
          return (
            <li
              className="border-b flex justify-between gap-4 px-6 py-2 cursor-pointer item-image"
              key={index}
              ref={ref}
            >
              <div
                className="flex items-center gap-3 item-image flex-1"
                onClick={() => {
                  onClick();
                }}
              >
                <img src={image} alt="" className="w-[30px] item-image" />
                <h3 className="text-[12px] item-image">
                  Sample image one asdiashdihas ihasd ihas diash diasd iasd
                  hasid
                </h3>
              </div>

              <div className="flex items-center gap-[2rem] item-image">
                <h3 className="text-eighty text-[12px] item-image">
                  18/10/22 22:10
                </h3>

                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    className="text-[12px] text-primary"
                    target="_blank"
                  >
                    View URL
                  </a>

                  <button onClick={() => CopyText(item.url)}>
                    <IoCopyOutline />
                  </button>
                </div>

                <button>
                  <GoTrashcan className="text-third" />
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ListImageComponent;
