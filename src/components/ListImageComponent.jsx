import { toast } from "react-hot-toast";

// Util
import CopyText from "../util/CopyText";

// Component
import Alert from "./alert/alert";

// Icon
import { BsFolder2Open } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { GoTrashcan } from "react-icons/go";

// Images
import image from "../assets/images/images.png";

const ListImageComponent = ({
  listFolders,
  listFiles,
  setCurrentFolder,
  setCurrentFile,
  setOpenModal,
  setFormFolder,
  setFormFile,
  path,
  changesPath,
  backToTopPath,
}) => {
  let currentPath = path;

  function handleCopyText(url) {
    CopyText(url);
    toast.custom(<Alert type="success" message="Success Copied URL" />);
  }
  return (
    <ul className="mt-[1.5rem] h-[39.7rem] overflow-y-scroll list-image">
      {console.log(currentPath, "THIS IS CURRENT PATH YA GeS YA")}
      {currentPath !== "root" && (
        <li className="px-6 py-2 cursor-pointer border-b">
          <div
            className="flex items-center gap-4 w-full"
            onClick={() => {
              backToTopPath(currentPath);
            }}
          >
            <BsFolder2Open className="text-primary text-[1.7rem]" />
            <p className="text-[14px] text-eighty">....</p>
          </div>
        </li>
      )}
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
                  setCurrentFolder(item.id);
                  changesPath(item.id);
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
                    }));
                    setCurrentFolder(item.id);
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
                      name: item.name,
                    }));
                    setCurrentFolder(item.id);
                  }}
                >
                  <GoTrashcan className="text-red-700" />
                </div>
              </div>
            </li>
          );
        })}

      {listFiles &&
        listFiles.map((item, index) => {
          return (
            <li
              className="border-b flex justify-between gap-4 px-6 py-2 cursor-pointer item-image"
              key={index}
            >
              <div
                className="flex items-center gap-3 item-image flex-1"
                onClick={() => {
                  setCurrentFile(item.url),
                    setOpenModal((prev) => ({
                      ...prev,
                      modalDetailImage: true,
                    }));
                }}
              >
                <img src={image} alt="" className="w-[30px] item-image" />
                <h3 className="text-[12px] item-image">{item.id}</h3>
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

                  <button onClick={() => handleCopyText(item.url)}>
                    <IoCopyOutline />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setOpenModal((prev) => ({
                      ...prev,
                      confirmDeleteFile: true,
                    }));
                    setFormFile((prev) => ({ ...prev, filename: item.id }));
                  }}
                >
                  <GoTrashcan className="text-third text-[1.45rem]" />
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ListImageComponent;
