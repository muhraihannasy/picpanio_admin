import Loader from "../assets/svg/Loader.svg";

const Loading = () => {
  return (
    <div className="fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999] flex items-center justify-center bg-transparent">
      <img src={Loader} alt="" className="animate-spin" />
    </div>
  );
};

export default Loading;
