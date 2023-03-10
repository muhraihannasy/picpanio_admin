import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, BASEURL, requestSetting } from "../../../util/Api";

// Icon
import { GoTrashcan } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { IoCloudUpload, IoConstructOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoIosAlbums } from "react-icons/io";
import { BsFillFolderFill, BsFillPeopleFill } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import PlanComponent from "../../../components/planComponent";
import ListAlbumComponent from "../../../components/ListAlbumComponent";
import ListImageComponent from "../../../components/ListImageComponent";
import ModalImageDetailComponent from "../../../components/ModalImageDetailComponent";
import PopupAdd from "../../../components/popup/PopupAdd";
import PopupEdit from "../../../components/popup/PopupEdit";
import PopupDelete from "../../../components/popup/PopupDelete";
import Loading from "../../../components/loading";
import Alert from "../../../components/alert/alert";

// images
import repeatIcon from "../../../assets/images/repeat-icon.png";
import galeryIcon from "../../../assets/images/icon/gallery.png";
import { formatBytes, MODE } from "../../../util/config";
import { toast, Toaster } from "react-hot-toast";

// Util

const SpaceDetail = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState("");

  const [openModal, setOpenModal] = useState({
    addAlbum: false,
    addFolder: false,
    editFolder: false,
    editAlbum: false,
    confirmDeleteFolder: false,
    confirmDeleteFile: false,
    confirmDeleteSpace: false,
    modalDetailImage: false,
    showAlbum: false,
  });
  const [path, setPath] = useState("root");
  const [formAlbum, setFormAlbum] = useState({
    name: "",
    description: "",
  });
  const [formFolder, setFormFolder] = useState({
    id: "",
    path: "",
    name: "",
  });
  const [formFile, setFormFile] = useState({
    filename: "",
  });

  const [isOpenModalImage, setIsOpenModalImage] = useState(false);
  const [space, setSpace] = useState({});
  const [imagesLength, setImagesLength] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [currentFolder, setCurrentFolder] = useState("");
  const [currentFile, setCurrentFile] = useState("");

  const [copyUrl, setCopyUrl] = useState("");

  const [albums, setAlbums] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [lastChangedAlbum, setLastChangedAlbum] = useState(new Date());

  const { spaceId } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();
  const areaCloseRef = useRef();

  // Render Count images has Upload
  let loadingImages = [];
  for (let i = 0; i < imagesLength; i++) {
    loadingImages.push(
      <div
        className="w-[30px] h-[30px] flex items-center justify-center bg-seventy rounded-[4px] relative"
        key={i}
      >
        <img
          src={repeatIcon}
          alt=""
          className="w-[16px] object-cover loading-images"
        />
      </div>
    );
  }

  function handleUpload(files) {
    setImagesLength(files.length);
    setIsUploading(true);

    const token = localStorage.getItem("acctkn");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    for (var i = 0; i < files.length; i++) {
      formdata.append("file", files[i], files[i].name);
    }
    formdata.append("spaceId", spaceId);
    formdata.append("albumId", currentAlbum);
    formdata.append("path", path);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${BASEURL}/file`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsUploading(false);
          toast.custom(
            <Alert type="success" message="Success uploaded files" />
          );

          let tempFile = [];

          for (let i = 0; i < res?.data.length; i++) {
            const file = {
              id: res?.data[i]?.file,
              url: res?.data[i]?.url,
            };

            tempFile.push(file);
          }

          setFiles((prev) => [...prev, ...tempFile]);
        }
      })
      .catch((error) => console.log("error", error));
  }

  const filteredFolders = folders.filter((folder) => {
    if (folder.name.toLowerCase().includes(filter.toLowerCase())) return folder;
  });

  const filteredFiles = files.filter((file) => {
    if (file.id.toLowerCase().includes(filter.toLowerCase())) return file;
  });

  function getSpaces() {
    apiRequest(`${BASEURL}/space`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      const space = res.spaces.filter((space) => space?.space?.id === spaceId);
      const firstSpaceId = space[0].space?.id;

      setSpace(space[0]);
      setFormAlbum((prev) => ({ ...prev, spaceId: firstSpaceId }));
      setFormFolder((prev) => ({ ...prev, spaceId: firstSpaceId }));

      if (res.success) {
        console.log(res);
        setIsLoading(false);
      }
    });
  }

  function getAlbums() {
    apiRequest(
      `${BASEURL}/album?spaceId=${spaceId}`,
      requestSetting("GET")
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setCurrentAlbum(res?.album[0]?.id);
      setAlbums(res.album);
    });
  }

  function getAlbumUpdated() {
    apiRequest(
      `${BASEURL}/album?spaceId=${spaceId}`,
      requestSetting("GET")
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setAlbums(res.album);
    });
  }

  function getFolders() {
    setFolders([]);
    setFiles([]);
    setIsLoading(true);

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      path: path,
    };

    apiRequest(`${BASEURL}/folder/show`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.statusCode == 500) {
          setFolders([]);
          setFiles([]);
          return;
        }

        if (res.success) {
          setIsLoading(false);
        }

        setFolders(res?.folderList);
        setFiles(res?.fileList);
      }
    );
  }

  function handleOnAddAlbum() {
    if (formAlbum.name == "" || formAlbum.description == "") {
      toast.custom(
        <Alert type="error" message="name or description cannot be empty" />
      );
      return;
    }

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      name: formAlbum.name,
      description: formAlbum.description,
    };

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, addAlbum: false }));
    apiRequest(`${BASEURL}/album`, requestSetting("POST", data)).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        setIsLoading(false);

        toast.custom(<Alert type="success" message="Success Create Album" />);

        setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
        setLastRefresh(new Date());
        setOpenModal((prev) => ({ ...prev, showAlbum: true }));
        setCurrentAlbum(res?.album?.id);
      }
    });
  }

  function handleOnEditAlbum() {
    if (formAlbum.name == "" || formAlbum.description == "") {
      toast.custom(
        <Alert type="error" message="name or description cannot be empty" />
      );
      return;
    }

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      name: formAlbum.name,
      description: formAlbum.description,
    };

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, editAlbum: false }));
    apiRequest(`${BASEURL}/album`, requestSetting("PUT", data)).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        setIsLoading(false);

        toast.custom(<Alert type="success" message="Success Change Album" />);

        setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
        setLastRefresh(new Date());
      }
    });
  }

  function handleDeleteAlbum() {
    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, editAlbum: false }));

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
    };

    apiRequest(`${BASEURL}/album`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);

          toast.custom(
            <Alert type="success" message="Success Delete Album" />,
            {
              duration: 1000,
            }
          );
          setFolders([]);
          setFiles([]);
          setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
          setLastRefresh(new Date());
        }
      }
    );
  }

  function handleOnAddFolder() {
    if (formFolder.name == "") {
      toast.custom(<Alert type="error" message="name cannot be empty" />);
      return;
    }

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      path: path,
      name: formFolder.name,
    };

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, addFolder: false }));
    apiRequest(`${BASEURL}/folder`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);

          toast.custom(
            <Alert type="success" message="Success Create Folder" />
          );

          setFormFolder((prev) => ({ ...prev, name: "" }));
          setFolders((prev) => [...prev, res.folder]);
        }
      }
    );
  }

  function handleOnEditFolder() {
    if (formFolder.name == "") {
      toast.custom(<Alert type="error" message="name cannot be empty" />);
      return;
    }

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      folderId: formFolder.id,
      path: path,
      name: formFolder.name,
    };

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, editFolder: false }));
    apiRequest(`${BASEURL}/folder/rename`, requestSetting("PUT", data)).then(
      (res) => {
        let tempFolders = [...folders];

        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);

          toast.custom(
            <Alert type="success" message="Success Change Folder" />
          );

          for (let i = 0; i < tempFolders.length; i++) {
            if (tempFolders[i].id === res?.folder?.id) {
              tempFolders[i].name = res?.folder?.name;
            }
          }

          setFormFolder((prev) => ({ ...prev, name: "" }));

          setLastRefresh(new Date());
        }
      }
    );
  }

  function handleDeleteFolder() {
    const data = {
      albumId: currentAlbum,
      spaceId: spaceId,
      folderId: formFolder.folderId,
      path: path,
    };

    setOpenModal((prev) => ({
      ...prev,
      confirmDeleteFolder: false,
      editFolder: false,
    }));
    setIsLoading(true);
    apiRequest(`${BASEURL}/folder`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);
          toast.custom(
            <Alert type="success" message="Success Delete Folder" />
          );

          setFormFolder((prev) => ({ ...prev, name: "" }));
        }
      }
    );
  }

  function handleDeleteFile() {
    const data = {
      albumId: currentAlbum,
      spaceId: spaceId,
      path: path,
      filename: formFile.filename,
    };

    setIsLoading(true);
    setOpenModal((prev) => ({
      ...prev,
      confirmDeleteFile: false,
    }));
    apiRequest(`${BASEURL}/file`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          let tempFiles = files.filter((file) => file.id !== formFile.filename);
          setFiles(tempFiles);
          setIsLoading(false);

          toast.custom(<Alert type="success" message="Success Delete File" />);

          setFormFile((prev) => ({ ...prev, filename: "" }));
          setLastRefresh(new Date());
        }
      }
    );
  }

  function handleDeleteSpace() {
    const data = {
      spaceId: spaceId,
    };

    setIsLoading(true);
    apiRequest(`${BASEURL}/space`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(
            <Alert type="success" message="Successfuly Deleted Space" />
          );
          navigate("/spaces", { replace: true });
          setIsLoading(false);
        }

        if (res.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          setIsLoading(false);
        }
      }
    );
  }

  function handleCancel(type) {
    switch (type) {
      case "add_album":
        setOpenModal((prev) => ({ ...prev, addAlbum: false }));
        setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
        break;
      case "add_folder":
        setOpenModal((prev) => ({ ...prev, addFolder: false }));
        setFormFolder((prev) => ({ ...prev, name: "" }));
        break;
      case "edit_album":
        setOpenModal((prev) => ({ ...prev, editAlbum: false }));
        setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
        break;
      case "edit_folder":
        setOpenModal((prev) => ({ ...prev, editFolder: false }));
        setFormFolder((prev) => ({ ...prev, name: "" }));
        break;
      case "delete_space":
        setOpenModal((prev) => ({ ...prev, confirmDeleteSpace: false }));
        break;
      case "delete_file":
        setOpenModal((prev) => ({ ...prev, confirmDeleteFile: false }));
        setFormFile((prev) => ({ ...prev, filename: "" }));
        break;
      case "delete_folder":
        setOpenModal((prev) => ({ ...prev, confirmDeleteFolder: false }));
        break;
      default:
        break;
    }
  }

  function changesPath(newPath) {
    setFolders([]);
    setFiles([]);
    const pathString = String(path);

    if (path !== "root") {
      var pathArr = pathString.split("/");

      pathArr.push(newPath);
      var pathJoin = pathArr.join("/");
    } else {
      setPath(newPath);
      var pathJoin = String(newPath);
    }

    setPath(pathJoin);

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      path: pathJoin,
    };

    apiRequest(`${BASEURL}/folder/show`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.statusCode == 500) {
          setFolders([]);
          setFiles([]);
          return;
        }

        setFolders(res?.folderList);
        setFiles(res?.fileList);
      }
    );
  }

  function backToTopPath(currentPath) {
    setFolders([]);
    setFiles([]);
    const pathArr = currentPath.split("/");
    pathArr.pop();
    let pathJoin = pathArr.join("/");

    if (pathJoin == "") pathJoin = "root";

    setPath(pathJoin);

    const data = {
      spaceId: spaceId,
      albumId: currentAlbum,
      path: pathJoin,
    };

    apiRequest(`${BASEURL}/folder/show`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.statusCode == 500) {
          setFolders([]);
          setFiles([]);
          return;
        }

        setFolders(res?.folderList);
        setFiles(res?.fileList);
      }
    );
  }

  useEffect(() => {
    getSpaces();
    (async () => {
      getAlbumUpdated();
    })();
  }, [lastRefresh]);

  useEffect(() => {
    (async () => {
      getAlbums();
    })();
  }, []);

  useEffect(() => {
    getFolders();
  }, [lastChangedAlbum]);

  useEffect(() => {
    getFolders();
  }, [currentFolder, currentAlbum]);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.target == areaCloseRef.current) {
        setOpenModal((prev) => ({ ...prev, modalDetailImage: false }));
      }
    };
    document.body.addEventListener("click", closeModal);

    return () => {
      document.body.removeEventListener("click", closeModal);
    };
  }, [isOpenModalImage]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div>
      {/* Header */}
      <HeaderDashboardComponent />

      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Modal Add Album */}
      <PopupAdd
        onAdd={handleOnAddAlbum}
        onCancel={() => handleCancel("add_album")}
        openModal={openModal.addAlbum}
        setLastRefresh={setLastRefresh}
      >
        <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
          Add Album
        </h2>
        <div className="mb-[0.5rem]">
          <label htmlFor="name" className="block mb-[5px]">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="name..."
            className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, name: e.target.value }))
            }
            value={formAlbum.name}
          />
        </div>
        <div className="mb-[1rem]">
          <label htmlFor="description" className="block mb-[5px]">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="name..."
            className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, description: e.target.value }))
            }
            value={formAlbum.description}
          />
        </div>
      </PopupAdd>

      {/* Modal Add Folder */}
      <PopupAdd
        onAdd={handleOnAddFolder}
        onCancel={() => handleCancel("add_folder")}
        openModal={openModal.addFolder}
        setLastRefresh={setLastRefresh}
      >
        <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
          Add Folder
        </h2>
        <div className="mb-[0.5rem]">
          <label htmlFor="name" className="block mb-[5px]">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="name..."
            className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormFolder((prev) => ({ ...prev, name: e.target.value }))
            }
            value={formFolder.name}
          />
        </div>
      </PopupAdd>

      {/* Modal Edit Album */}
      <PopupEdit
        onAdd={handleOnEditAlbum}
        onDelete={() => handleDeleteAlbum()}
        onCancel={() => handleCancel("edit_album")}
        openModal={openModal.editAlbum}
        setLastRefresh={setLastRefresh}
      >
        <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
          Edit Album
        </h2>

        <div className="mb-[0.5rem]">
          <label htmlFor="name" className="block mb-[5px]">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="name..."
            className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, name: e.target.value }))
            }
            value={formAlbum.name}
          />
        </div>
        <div className="mb-[1rem]">
          <label htmlFor="description" className="block mb-[5px]">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="name..."
            className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, description: e.target.value }))
            }
            value={formAlbum.description}
          />
        </div>
      </PopupEdit>

      {/* Modal Edit Folder */}
      <PopupEdit
        onAdd={handleOnEditFolder}
        onDelete={() => handleDeleteFolder()}
        onCancel={() => handleCancel("edit_folder")}
        openModal={openModal.editFolder}
        setLastRefresh={setLastRefresh}
      >
        <h2 className="font-bold text-[14px] text-fivety mb-[7px]">
          Edit Folder
        </h2>

        <label htmlFor="name" className="block mb-[5px]">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="name..."
          className="w-full h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
          onChange={(e) =>
            setFormFolder((prev) => ({ ...prev, name: e.target.value }))
          }
          value={formFolder.name}
        />
      </PopupEdit>

      {/* Modal Delete Space */}
      <PopupDelete
        onDelete={handleDeleteSpace}
        openModal={openModal.confirmDeleteSpace}
        onCancel={() => handleCancel("delete_space")}
        title="You cannot restore any files regarding the Space after deleted the Space???"
      />
      {/* Modal Delete Folder */}
      <PopupDelete
        onDelete={handleDeleteFolder}
        openModal={openModal.confirmDeleteFolder}
        onCancel={() => handleCancel("delete_folder")}
        title={formFolder.name}
      />
      {/* Modal Delete Folder */}
      <PopupDelete
        onDelete={handleDeleteFile}
        openModal={openModal.confirmDeleteFile}
        onCancel={() => handleCancel("delete_file")}
        // title={formFolder.key}
      />

      <ModalImageDetailComponent
        currentFile={currentFile}
        setOpenModal={setOpenModal}
        openModal={openModal.modalDetailImage}
      />
      {openModal.modalDetailImage && (
        <div
          className={`${
            openModal.modalDetailImage ? "area-close-modal-image" : ""
          } fixed h-full w-[100%] bg-orange-300 opacity-[0%] left-0 top-0 z-[1]`}
          ref={areaCloseRef}
        ></div>
      )}

      {/* Main Content */}
      <main>
        <section className="mt-[37px]">
          <div className="container  flex flex-wrap items-center lg:justify-between justify-center gap-[2rem] max-[836px]:gap-x-[1.2rem] max-[836px]:gap-y-[1.5rem]  text-fivety ">
            <div>
              <h2 className="font-bold text-[18px] mb-[5px]">
                {space.space?.name}
              </h2>
              <p>
                {space.space?.region}.picpan.
                {MODE == "Development" ? "dev" : "io"}/{space.space?.slug}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-[14px] mb-[5px] ">Plan</h2>
              <PlanComponent
                text={space.space?.plan}
                bg="bg-fourty"
                color="fivety"
                styleFont="regular"
              />
            </div>
            <div>
              <h2 className="font-bold text-[14px] mb-[5px]">
                {space.space?.name}
              </h2>
              <p className="text-[14px]">
                {space.space?.region == "ap1" && "Asia - Singapore"}
                {space.space?.region == "us1" && "US Dallas, TX"}
                {space.space?.region == "eu1" && "Europa Germany"}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-[14px] mb-[5px]">Storage usage</h2>
              <p className="text-[14px]">
                ({formatBytes(space.space?.currentSize)} of{" "}
                {formatBytes(space.space?.limitSize)})
              </p>
              {/* 32% (31 GB of 100 GB) */}
            </div>

            <div className="text-[14px] text-third ">
              <div
                className="flex items-center  justify-end gap-2 mb-1 cursor-pointer"
                onClick={() => navigate("members")}
              >
                <h2>Team members</h2>
                <BsFillPeopleFill className="text-[1.2rem]" />
              </div>
              <div
                className="flex items-center justify-end gap-2 cursor-pointer"
                onClick={() =>
                  setOpenModal((prev) => ({
                    ...prev,
                    confirmDeleteSpace: true,
                  }))
                }
              >
                <h2>Delete space</h2>
                <GoTrashcan className="text-[1.2rem]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-[48px]">
          {/* button add Album & Folder,  On Screen less than 415px */}

          {innerWidth < 415 && (
            <div className="container text-white flex justify-end gap-3 mb-[1.5rem]">
              <button
                className="flex items-center justify-between px-4 bg-eighty w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
                onClick={() => {
                  setOpenModal((prev) => ({
                    ...prev,
                    addFolder: true,
                  }));
                }}
              >
                {innerWidth >= 798 && (
                  <h3 className="font-semibold">Add Folder</h3>
                )}

                <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                  <MdAddCircle className="text-[1.2rem]" />
                </div>

                <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                  <BsFillFolderFill className="text-[1.2rem]" />
                </div>
              </button>

              <button
                className="flex items-center justify-between px-4 bg-primary w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2 mb-[1rem]"
                onClick={() => {
                  setOpenModal((prev) => ({
                    ...prev,
                    addAlbum: true,
                  }));
                }}
              >
                {innerWidth >= 798 && (
                  <h3 className="font-semibold">Add Album</h3>
                )}

                <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                  <MdAddCircle className="text-[1.2rem]" />
                </div>

                <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                  <IoIosAlbums className="text-[1.2rem]" />
                </div>
              </button>
            </div>
          )}

          <div className="container flex items-center justify-between text-white gap-10 max-[798px]:gap-3">
            {innerWidth > 415 && (
              <button
                className="flex items-center justify-between px-4 bg-primary w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
                onClick={() => {
                  setOpenModal((prev) => ({
                    ...prev,
                    addAlbum: true,
                  }));
                }}
              >
                {innerWidth >= 798 && (
                  <h3 className="font-semibold">Add Album</h3>
                )}

                <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                  <MdAddCircle className="text-[1.2rem]" />
                </div>

                <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                  <IoIosAlbums className="text-[1.2rem]" />
                </div>
              </button>
            )}

            <div className="flex items-center flex-1 gap-3">
              {innerWidth > 415 && (
                <button
                  className="flex items-center justify-between px-4 bg-eighty w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
                  onClick={() => {
                    setOpenModal((prev) => ({
                      ...prev,
                      addFolder: true,
                    }));
                  }}
                >
                  {innerWidth >= 798 && (
                    <h3 className="font-semibold">Add Folder</h3>
                  )}

                  <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                    <MdAddCircle className="text-[1.2rem]" />
                  </div>

                  <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                    <BsFillFolderFill className="text-[1.2rem]" />
                  </div>
                </button>
              )}

              <div className="w-full h-[38px] flex items-center justify-between flex-1 border-2 px-3 border-seventy rounded-[8px]">
                <input
                  type="text"
                  placeholder="Search title or tags"
                  className="outline-none flex-1 text-fivety"
                  onChange={(e) => setFilter(e.target.value)}
                />
                <FiSearch className="text-eighty text-[1.3rem] flex-2" />
              </div>
            </div>
          </div>

          <div className="container pt-[18px]">
            <div className="border-t-2 border-r-2 flex rounded-tl-[6px] rounded-bl-[4px]">
              <div
                className={`max-[836px]:block hidden fixed top-[24rem] z-[999] bg-primary text-white text-[1.5rem] p-2 rounded-[8px] cursor-pointer shadow-md transition-all ${
                  openModal.showAlbum ? "left-[320px]" : "left-[1rem]"
                }`}
                onClick={() =>
                  setOpenModal((prev) => ({
                    ...prev,
                    showAlbum: !prev.showAlbum,
                  }))
                }
              >
                <BiPhotoAlbum />
              </div>

              <ListAlbumComponent
                listItem={albums}
                setLastChangedAlbum={setLastChangedAlbum}
                setPath={setPath}
                path={path}
                setCurrentAlbum={setCurrentAlbum}
                currentAlbum={currentAlbum}
                setFormAlbum={setFormAlbum}
                setFormFolder={setFormFolder}
                setOpenModal={setOpenModal}
                openModal={openModal}
              />

              <div className="w-full flex-1">
                {!isUploading && (
                  <div className="bg-[#F5F5F5] w-[95%] mx-auto relative h-[62px] rounded-[4px] mt-[20px] border-dotted border-[2px] border-eighty ">
                    <div className="flex items-center gap-4 h-full text-primary justify-center">
                      <IoCloudUpload className="text-[1.5rem] translate-y-[2px]" />
                      <h2 className="text-[14px]">Upload your images here</h2>
                    </div>
                    <input
                      type="file"
                      className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                      multiple={true}
                      onChange={(e) => handleUpload(e.target.files)}
                    />
                  </div>
                )}
                {isUploading && (
                  <div className="container flex flex-wrap items-center lg:justify-between justify-center gap-[2rem]text-fivety">
                    <div className="bg-[#F5F5F5] w-full mx-auto relative h-[62px] rounded-[4px] border-dotted border-[2px] border-eighty flex items-center justify-between px-[1rem] mt-[20px]">
                      <div className="flex items-center gap-2">
                        {loadingImages}
                      </div>
                      <h2 className="text-[14px]">uploading your images....</h2>
                    </div>
                  </div>
                )}

                <ListImageComponent
                  listFolders={filteredFolders}
                  listFiles={filteredFiles}
                  setCurrentFolder={setCurrentFolder}
                  setCurrentFile={setCurrentFile}
                  setOpenModal={setOpenModal}
                  setFormFolder={setFormFolder}
                  setFormFile={setFormFile}
                  changesPath={changesPath}
                  backToTopPath={backToTopPath}
                  path={path}
                />
                {currentAlbum == "" && (
                  <h2 className="text-center pt-[1rem] translate-y-[-34rem]">
                    No Album Selected{" "}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpaceDetail;
