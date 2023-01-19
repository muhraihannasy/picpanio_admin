import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, BASEURL, requestSetting } from "../../util/Api";

// Icon
import { GoTrashcan } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoIosAlbums } from "react-icons/io";
import { BsFillFolderFill } from "react-icons/bs";

// Component
import HeaderDashboardComponent from "../../components/HeaderDashboardComponent";
import PlanComponent from "../../components/planComponent";
import ListAlbumComponent from "../../components/ListAlbumComponent";
import ListImageComponent from "../../components/ListImageComponent";
import ModalAddAlbumComponent from "../../components/ModalAddAlbumComponent";
import ModalImageDetailComponent from "../../components/ModalImageDetailComponent";
import PopupAdd from "../../components/popup/PopupAdd";
import PopupEdit from "../../components/popup/PopupEdit";

// images
import repeatIcon from "../../assets/images/repeat-icon.png";
import galeryIcon from "../../assets/images/icon/gallery.png";
import { formatBytes } from "../../util/config";
import { toast, Toaster } from "react-hot-toast";
import Alert from "../../components/alert/alert";
import Loading from "../../components/loading";

// Util

const Images = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState({
    addAlbum: false,
    addFolder: false,
    editFolder: false,
    editAlbum: false,
  });
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModalImage, setIsOpenModalImage] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [popup, setPopup] = useState({ field: "", url: "", value: "" });
  const [space, setSpace] = useState({});
  const [imagesLength, setImagesLength] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [copyUrl, setCopyUrl] = useState("");
  const [albums, setAlbums] = useState([]);
  const [formAlbum, setFormAlbum] = useState({
    spaceId: "",
    name: "",
    description: "",
  });
  const [formFolder, setFormFolder] = useState({ name: "" });
  const [images, setImages] = useState([]);
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

  // When Upload Images
  function handleUpload(e) {
    setImagesLength(e.length);
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  }

  function getSpaces() {
    apiRequest(`${BASEURL}/space`, requestSetting("GET")).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      const space = res.spaces.filter((space) => space.space.id === spaceId);

      setSpace(space[0]);
      setFormAlbum((prev) => ({ ...prev, spaceId: space[0].space?.id }));

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }

  function getAlbums() {
    apiRequest(
      `${BASEURL}/album?spaceId=${spaceId}`,
      requestSetting("GET")
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      setAlbums(res.album);
    });
  }

  console.log(space);

  function handleOnAddAlbum() {
    if (formAlbum.name == "" || formAlbum.description == "") {
      toast.custom(
        <Alert type="error" message="name or description cannot be empty" />
      );
      return;
    }

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, addAlbum: false }));
    apiRequest(`${BASEURL}/album`, requestSetting("POST", formAlbum)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(<Alert type="success" message="Success Create Album" />);

          setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
          setLastRefresh(new Date());
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    );
  }

  function handleOnEditAlbum() {
    if (formAlbum.name == "" || formAlbum.description == "") {
      toast.custom(
        <Alert type="error" message="name or description cannot be empty" />
      );
      return;
    }

    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, editAlbum: false }));
    apiRequest(`${BASEURL}/album`, requestSetting("PUT", formAlbum)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(<Alert type="success" message="Success Change Album" />);

          setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
          setLastRefresh(new Date());
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    );
  }

  function handleDeleteAlbum() {
    setIsLoading(true);
    setOpenModal((prev) => ({ ...prev, editAlbum: false }));

    const data = {
      albumId: formAlbum.albumId,
      spaceId: formAlbum.spaceId,
    };

    apiRequest(`${BASEURL}/album`, requestSetting("DETELE", data)).then(
      (res) => {
        console.log(res);
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(<Alert type="success" message="Success Delete Album" />);

          setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
          setLastRefresh(new Date());
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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
        break;
      case "edit_album":
        setOpenModal((prev) => ({ ...prev, editAlbum: false }));
        setFormAlbum((prev) => ({ ...prev, name: "", description: "" }));
        break;
      default:
        break;
    }
  }
  // useEffect(() => {

  //   (async () => {
  //     getAlbums();
  //   })();
  // }, [lastRefresh]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getImages = async () => {
  //     const req = await fetch(`${BASEURL}/images`, requestSetting("GET"));
  //     const res = await req.json();

  //     setTimeout(() => {
  //       // setImages(res.filter((item) => item.album_id == currentAlbum));
  //       setIsLoading(false);
  //     }, 500);
  //   };

  //   (async () => {
  //     getImages();
  //   })();

  //   console.log(currentAlbum);
  // }, [currentAlbum]);

  useEffect(() => {
    getSpaces();
    getAlbums();
  }, [lastRefresh]);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.target == areaCloseRef.current) {
        setIsOpenModalImage(false);
      }
    };
    document.body.addEventListener("click", closeModal);
    // console.log(isOpenModalImage);

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
            className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
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
            className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, description: e.target.value }))
            }
            value={formAlbum.description}
          />
        </div>
      </PopupAdd>

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
            className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
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
            className="w-[316px] h-[38px] outline-none border-seventy border rounded-[8px] px-[20px] "
            onChange={(e) =>
              setFormAlbum((prev) => ({ ...prev, description: e.target.value }))
            }
            value={formAlbum.description}
          />
        </div>
      </PopupEdit>
      <ModalImageDetailComponent
        setIsOpenModalImage={setIsOpenModalImage}
        isOpenModalImage={isOpenModalImage}
      />
      {isOpenModalImage == true && (
        <div
          className={`${
            isOpenModalImage ? "area-close-modal-image" : ""
          } fixed h-full w-[100%] bg-orange-300 opacity-[0%] left-0 top-0 z-[1]`}
          ref={areaCloseRef}
        ></div>
      )}

      {/* Main Content */}
      <main>
        <section className="mt-[37px]">
          <div className="container flex flex-wrap items-center lg:justify-between justify-center gap-[2rem]  text-fivety ">
            <div>
              <h2 className="font-bold text-[18px] mb-[5px]">
                {space.space?.name}
              </h2>
              <p>
                {space.space?.region}.picpan.io/{space.space?.slug}
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
                {space.space?.region == "us1" && "Asia Dallas, TX"}
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

            <div className="flex items-center text-[14px] gap-1 text-third cursor-pointer">
              <h2>Delete space</h2>
              <GoTrashcan className="text-[1.2rem]" />
            </div>
          </div>
        </section>

        <section className="mt-[48px]">
          <div className="container flex items-center justify-between text-white gap-10 max-[798px]:gap-3">
            <button
              className="flex items-center justify-between px-4 bg-primary w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
              onClick={() => {
                setPopup({
                  field: "Album",
                  url: "albums",
                });
                setOpenModal({ addAlbum: true });
              }}
            >
              {innerWidth >= 798 && <h3>Add Album</h3>}

              <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                <MdAddCircle className="text-[1.2rem]" />
              </div>

              <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                <IoIosAlbums className="text-[1.2rem]" />
              </div>
            </button>

            <div className="flex items-center flex-1 gap-3">
              <button
                className="flex items-center justify-between px-4 bg-eighty w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
                onClick={() => {
                  setPopup({
                    field: "Folder",
                    url: "folders",
                  });
                  setOpenModal({ addFolder: true });
                }}
              >
                {innerWidth >= 798 && <h3>Add Folder</h3>}

                <div className={`${innerWidth <= 798 ? "hidden" : "block"}`}>
                  <MdAddCircle className="text-[1.2rem]" />
                </div>

                <div className={`${innerWidth >= 798 ? "hidden" : "block"}`}>
                  <BsFillFolderFill className="text-[1.2rem]" />
                </div>
              </button>

              <div className="h-[38px] flex items-center justify-between flex-1 border-2 px-3 border-seventy rounded-[8px]">
                <input
                  type="text"
                  placeholder="Search title or tags"
                  className="outline-none flex-1 text-fivety"
                />
                <FiSearch className="text-eighty text-[1.3rem] flex-2" />
              </div>
            </div>
            {/* <div className="w-[2.5rem] h-[2.5rem] bg-primary shadow-sm rounded-xl py-2  flex items-center justify-center">
              <img src={galeryIcon} alt="" className="object-cover w-[45%]" />
            </div> */}
          </div>

          <div className="container pt-[18px]">
            <div className="border-t-2 border-r-2 flex rounded-tl-[6px] rounded-bl-[4px]">
              <ListAlbumComponent
                listItem={albums}
                setCurrentAlbum={setCurrentAlbum}
                ref={imageRef}
                setFormAlbum={setFormAlbum}
                setOpenModal={setOpenModal}
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

                {isLoading && <h2 className="text-center">Loading ...</h2>}
                {!isLoading && images.length > 1 && (
                  // <ListImageComponent
                  //   listItem={images}
                  //   onClick={() => setIsOpenModalImage((prev) => !prev)}
                  // />
                  <></>
                )}
                {images.length < 1 && !isLoading && (
                  <h2 className="text-center pt-[5rem]">No Images </h2>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Images;
