import { useState, useEffect, useRef } from "react";

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

// images
import repeatIcon from "../../assets/images/repeat-icon.png";
import galeryIcon from "../../assets/images/icon/gallery.png";

// Util
import { BASEURL, requestSetting } from "../../util/Api";

const Images = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModalImage, setIsOpenModalImage] = useState(false);
  const [imagesLength, setImagesLength] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const imageRef = useRef();

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

  const areaCloseRef = useRef();

  // When Upload Images
  const handleUpload = (e) => {
    setImagesLength(e.length);
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  useEffect(() => {
    const getAlbums = async () => {
      const req = await fetch(`${BASEURL}/albums`, requestSetting("GET"));
      const res = await req.json();

      setAlbums(res);
      setCurrentAlbum(res[0].id);
    };

    (async () => {
      getAlbums();
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getImages = async () => {
      const req = await fetch(`${BASEURL}/images`, requestSetting("GET"));
      const res = await req.json();

      setTimeout(() => {
        setImages(res.filter((item) => item.album_id == currentAlbum));
        setIsLoading(false);
      }, 500);
    };

    (async () => {
      getImages();
    })();

    console.log(currentAlbum);
  }, [currentAlbum]);

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
      {/* Modal */}
      <ModalAddAlbumComponent
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
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
          {!isUploading && (
            <div className="container flex flex-wrap items-center lg:justify-between justify-center gap-[2rem]  text-fivety ">
              <div>
                <h2 className="font-bold text-[18px] mb-[5px]">NSTEK</h2>
                <p>nstek.sg.picpan.io</p>
              </div>
              <div>
                <h2 className="font-bold text-[14px] mb-[5px] ">Plan</h2>
                <PlanComponent
                  text="Premium"
                  bg="bg-fourty"
                  color="fivety"
                  styleFont="regular"
                />
              </div>
              <div>
                <h2 className="font-bold text-[14px] mb-[5px]">NSTEK</h2>
                <p className="text-[14px]">Asia - Singapore</p>
              </div>
              <div>
                <h2 className="font-bold text-[14px] mb-[5px]">
                  Storage usage
                </h2>
                <p className="text-[14px]">32% (31 GB of 100 GB)</p>
              </div>

              <div className="flex items-center text-[14px] gap-1 text-third cursor-pointer">
                <h2>Delete space</h2>
                <GoTrashcan className="text-[1.2rem]" />
              </div>
            </div>
          )}
          {isUploading && (
            <div className="container flex flex-wrap items-center lg:justify-between justify-center gap-[2rem] text-fivety ">
              <div className="bg-[#F5F5F5] w-full mx-auto relative h-[62px] rounded-[4px] border-dotted border-[2px] border-eighty flex items-center justify-between px-[1rem] ">
                <div className="flex items-center gap-2">{loadingImages}</div>
                <h2 className="text-[14px]">uploading your images....</h2>
              </div>
            </div>
          )}
        </section>

        <section className="mt-[48px]">
          <div className="container flex items-center justify-between text-white gap-10 max-[798px]:gap-3">
            <button
              className="flex items-center justify-between px-4 bg-primary w-[194px] max-[798px]:w-max rounded-[8px] h-[36px] flex-2"
              onClick={() => setOpenModal(true)}
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
                onClick={() => setOpenModal(true)}
              >
                {innerWidth >= 798 && <h3>Add Album</h3>}

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
            <div className="w-[2.5rem] h-[2.5rem] bg-primary shadow-sm rounded-xl py-2  flex items-center justify-center">
              <img src={galeryIcon} alt="" className="object-cover w-[45%]" />
            </div>
          </div>

          <div className="container pt-[18px]">
            <div className="border-t-2 border-r-2 flex rounded-tl-[6px] rounded-bl-[4px]">
              <ListAlbumComponent
                listItem={albums}
                setCurrentAlbum={setCurrentAlbum}
                ref={imageRef}
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

                {isLoading && <h2 className="text-center">Loading ...</h2>}
                {!isLoading && images.length > 1 && (
                  <ListImageComponent
                    listItem={images}
                    onClick={() => setIsOpenModalImage((prev) => !prev)}
                  />
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
