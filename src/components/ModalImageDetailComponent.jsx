import { useState, useEffect, useRef } from "react";

// Util
import CopyText from "../util/CopyText";

// Images
import images from "../assets/images/images-dummy2.png";
import { IoCopySharp } from "react-icons/io5";
import { BASEURL, apiRequest, requestSetting } from "../util/Api";
import { toast } from "react-hot-toast";
import Alert from "./alert/alert";

const ModalImageDetailComponent = ({
  currentFile,
  setOpenModal,
  openModal,
}) => {
  const [imageProperties, setImageProperties] = useState({
    width: "",
    height: "",
    crop: "",
    grayscale: "",
    fit: "",
    quality: "",
    rotate: "",
    flip: "",
    darken: "",
    blur: "",
  });
  const [image, setImage] = useState("");
  const [copyUrl, setCopyUrl] = useState("");
  const urlRef = useRef();

  let imageUrl = currentFile;

  function getFile(url) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function handleCopyText(url) {
    CopyText(url);
    toast.custom(<Alert type="success" message="Success Copied URL" />);
  }

  useEffect(() => {
    setCopyUrl(urlRef.current.textContent);
    getFile(urlRef.current.textContent);
  }, [imageProperties]);

  useEffect(() => {
    setImage(
      urlRef.current.textContent != "?" ? urlRef.current.textContent : imageUrl
    );
  }, [imageProperties, currentFile]);

  return (
    <aside
      className={`fixed top-0 h-full pb-[1rem] max-[603px]:w-[90%] w-[540px] bg-white shadow-lg z-[9999] px-[2rem] py-[2rem] transition-all max-[639px]:overflow-y-auto ${
        openModal ? "right-0" : "right-[-100rem]"
      }`}
    >
      <div className="flex max-[639px]:flex-col justify-between gap-4">
        <div>
          <h2 className="text-[14px] text-primary font-bold mb-[10px]">
            Sample image one
          </h2>
          <p className="text-[10px] text-eighty">{imageUrl}</p>

          <p
            className="text-primary text-[10px] cursor-pointer mt-[0.5rem]"
            onClick={() => handleCopyText(imageUrl)}
          >
            Copy URL
          </p>

          <div className="text-[11px] mt-[0.8rem]">
            <div className="flex items-center">
              <h4 className="w-[5rem]">Type</h4>
              <h4>: jpeg</h4>
            </div>
            <div className="flex items-center">
              <h4 className="w-[5rem]">Size</h4>
              <h4>: 2.3MB</h4>
            </div>
            <div className="flex items-center">
              <h4 className="w-[5rem]">Dimmension</h4>
              <h4>: 716x671 px</h4>
            </div>
            <div className="flex items-center">
              <h4 className="w-[5rem]">Upload date</h4>
              <h4>: 18/10/2022 11:20</h4>
            </div>
            <div className="flex items-center">
              <h4 className="w-[5rem]">Album</h4>
              <h4>: Project ABC</h4>
            </div>
          </div>
        </div>

        <div className="max-[603px]:w-full w-[35rem] h-[15rem] overflow-hidden bg-ninety rounded-[10px] flex items-center justify-center">
          <img src={image} alt="" className="" />
        </div>
      </div>

      <div className="mt-[1.6rem]">
        <h2 className="text-[12px] font-bold">Image processing</h2>

        <div className="grid sm:grid-cols-4 grid-cols-2 max-[639px]:gap-x-3">
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Width
            </label>
            <input
              type="text"
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  width: e.target.value,
                })
              }
              value={imageProperties.width}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Height
            </label>
            <input
              type="text"
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  height: e.target.value,
                })
              }
              value={imageProperties.height}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Rotate
            </label>
            <input
              type="text"
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  rotate: e.target.value,
                })
              }
              value={imageProperties.rotate}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Fit
            </label>
            <select
              name=""
              id=""
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  fit: e.target.value,
                })
              }
              value={imageProperties.fit}
            >
              <option value="">Choose...</option>
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
              <option value="inside">Inside</option>
              <option value="outside">Outside</option>
            </select>
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Grayscale
            </label>
            <select
              name=""
              id=""
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  grayscale: e.target.value,
                })
              }
              value={imageProperties.grayscale}
            >
              <option value="">Choose...</option>
              <option value="yes">Yes</option>
              <option value="">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Flip
            </label>

            <select
              name=""
              id=""
              className="max-[639px]:w-full w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  flip: e.target.value,
                })
              }
              value={imageProperties.flip}
            >
              <option value="">Choose...</option>
              <option value="vertical">Vertical</option>
              <option value="horizontal">horizontal</option>
              <option value="both">both</option>
            </select>
          </div>
          {/* <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Quality
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  quality: e.target.value,
                })
              }
              value={imageProperties.quality}
            />
          </div> */}
          {/* <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Darken
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  darken: e.target.value,
                })
              }
              value={imageProperties.darken}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Blur
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  blur: e.target.value,
                })
              }
              value={imageProperties.blur}
            />
          </div> */}
        </div>
      </div>

      <div className="mt-[1.5rem] bg-[#F5F5F5] border border-seventy rounded-[4px] py-3 px-3">
        <p className="text-[10px] text-eighty" ref={urlRef}>
          {imageUrl}?
          {imageProperties.width !== "" && (
            <>
              w=<span className="font-bold">{imageProperties.width}</span>&
            </>
          )}
          {imageProperties.height !== "" && (
            <>
              h=<span className="font-bold">{imageProperties.height}</span>&
            </>
          )}
          {imageProperties.fit !== "" && (
            <>
              fit=<span className="font-bold">{imageProperties.fit}</span>&
            </>
          )}
          {imageProperties.quality !== "" && (
            <>
              quality=
              <span className="font-bold">{imageProperties.quality}</span>&
            </>
          )}
          {imageProperties.rotate !== "" && (
            <>
              rotate=<span className="font-bold">{imageProperties.rotate}</span>
              &
            </>
          )}
          {imageProperties.grayscale !== "" && (
            <>
              grayscale=
              <span className="font-bold">{imageProperties.grayscale}</span>&
            </>
          )}
          {imageProperties.darken !== "" && (
            <>
              darken=<span className="font-bold">{imageProperties.darken}</span>
              &
            </>
          )}
          {imageProperties.flip !== "" && (
            <>
              vertical=<span className="font-bold">{imageProperties.flip}</span>
              &
            </>
          )}
          {imageProperties.blur !== "" && (
            <>
              blur=<span className="font-bold">{imageProperties.blur}</span>&
            </>
          )}
        </p>
      </div>

      <button
        className="flex items-center justify-center gap-2 bg-eighty text-white font-bold w-[96px] h-[36px] rounded-[8px] ml-auto mt-[1.5rem]"
        onClick={() => handleCopyText(copyUrl == "?" ? imageUrl : copyUrl)}
      >
        Copy
        <IoCopySharp />
      </button>
    </aside>
  );
};

export default ModalImageDetailComponent;
