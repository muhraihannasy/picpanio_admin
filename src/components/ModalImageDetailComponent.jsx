import { useState, useEffect, useRef } from "react";

// Util
import CopyText from "../util/CopyText";

// Images
import images from "../assets/images/images-dummy2.png";
import { IoCopySharp } from "react-icons/io5";

const ModalImageDetailComponent = ({ isOpenModalImage }) => {
  const [imageProperties, setImageProperties] = useState({
    width: "",
    height: "",
    crop: "",
    quality: "",
    rotate: "",
    flip: "",
    darken: "",
    blur: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [copyUrl, setCopyUrl] = useState("");
  const urlRef = useRef();

  useEffect(() => {
    setImageUrl(
      `https://img.picpan.io/tyuiwncgvbnmskbnv-ghjkdbqo/ghudlkjbyvybundhycvbnmfihj-bnd-bndfu.jpg`
    );
  }, []);
  useEffect(() => {
    setCopyUrl(urlRef.current.textContent);
  }, [imageProperties]);

  return (
    <aside
      className={`fixed top-0 h-full w-[540px] bg-white shadow-lg z-[999] px-[2rem] py-[2rem] transition-all ${
        isOpenModalImage ? "right-0" : "right-[-100rem]"
      }`}
    >
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="text-[14px] text-primary font-bold mb-[10px]">
            Sample image one
          </h2>
          <p className="text-[10px] text-eighty">{imageUrl}</p>

          <p className="text-primary text-[10px] cursor-pointer mt-[0.5rem]">
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

        <div>
          <img src={images} alt="" className="w-[90%]" />
        </div>
      </div>

      <div className="mt-[1.6rem]">
        <h2 className="text-[12px] font-bold">Image processing</h2>

        <div className="grid sm:grid-cols-4 grid-cols-2">
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Width
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
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
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
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
              Crop
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  crop: e.target.value,
                })
              }
              value={imageProperties.crop}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
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
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
            <label htmlFor="" className="text-[11px]">
              Rotate
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
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
              Flip
            </label>
            <input
              type="text"
              className="w-[100px] h-[24px] rounded-[4px] outline-none border border-seventy text-[11px] text-center px-2"
              onChange={(e) =>
                setImageProperties({
                  ...imageProperties,
                  flip: e.target.value,
                })
              }
              value={imageProperties.flip}
            />
          </div>
          <div className="flex flex-col gap-[4px] mt-[0.5rem]">
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
          </div>
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
          {imageProperties.crop !== "" && (
            <>
              crop=<span className="font-bold">{imageProperties.crop}</span>&
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
          {imageProperties.flip !== "" && (
            <>
              flip=<span className="font-bold">{imageProperties.flip}</span>&
            </>
          )}
          {imageProperties.darken !== "" && (
            <>
              darken=<span className="font-bold">{imageProperties.darken}</span>
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
        onClick={() => CopyText(copyUrl == "?" ? imageUrl : copyUrl)}
      >
        Copy
        <IoCopySharp />
      </button>
    </aside>
  );
};

export default ModalImageDetailComponent;
