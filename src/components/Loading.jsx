import Loader from "../assets/images/Loader.png";

const Loading = () => {
  return (
    <div className="fixed bg-white h-[4rem] rounded-[6px] top-[6.5rem] right-[-4rem] translate-x-[-50%] translate-y-[-50%] z-[999] flex items-center justify-center gap-6 px-6 shadow">
      <p>Please wait...</p>
      <img src={Loader} alt="" className="animate-spin w-[1.8rem]" />
    </div>
  );
};

export default Loading;
