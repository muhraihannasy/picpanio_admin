import { Link } from "react-router-dom";

// Icon
import { BsFolder2Open } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { GoTrashcan } from "react-icons/go";

// Images
import image from "../assets/images/images.png";
import CopyText from "../util/CopyText";

const ListImageComponent = ({
  listFolders,
  setOpenModal,
  setFormFolder,
  setPath,
  setCurrentFolder,
  onDeleteFolder,
  path,
  currentFolder,
}) => {
  let parentChildArr = [];
  return (
    <ul className="mt-[1.5rem] h-[39.7rem] overflow-y-scroll list-image">
      {listFolders &&
        listFolders.map((item) => {
          return (
            <li
              className="flex items-center justify-between border-b px-6 py-2 cursor-pointer"
              key={item.id}
            >
              <div
                className="flex items-center gap-4 w-full"
                onClick={() => {
                  currentFolder == "root"
                    ? parentChildArr.push("root")
                    : parentChildArr.push(currentFolder);

                  setPath({
                    previousPath: path.path,
                    path:
                      parentChildArr.length == 0
                        ? "root"
                        : parentChildArr.join("/"),
                  });
                  setCurrentFolder(item.id);
                }}
              >
                <BsFolder2Open className="text-primary text-[1.7rem]" />
                <p className="text-[14px] text-eighty">{item.name}</p>
              </div>

              <div className="flex items-center gap-2 text-[1.36rem]">
                <div
                  onClick={() => {
                    setOpenModal((prev) => ({ ...prev, editFolder: true }));
                    setFormFolder((prev) => ({
                      ...prev,
                      name: item.name,
                      folderId: item.id,
                    }));
                  }}
                >
                  <RiEditBoxFill className=" text-primary" />
                </div>
                <div
                  onClick={() => {
                    setOpenModal((prev) => ({
                      ...prev,
                      confirmDeleteFolder: true,
                    }));
                    setFormFolder((prev) => ({
                      ...prev,
                      folderId: item.id,
                      name: item.name,
                    }));
                  }}
                >
                  <GoTrashcan className="text-red-700" />
                </div>
              </div>
            </li>
          );
        })}
      {/* {listFolders &&
        listFolders.map((item, index) => {
          return (
            <li
              className="border-b flex justify-between gap-4 px-6 py-2 cursor-pointer item-image"
              key={index}
      
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
        })} */}
    </ul>
  );
};

export default ListImageComponent;
