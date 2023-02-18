import paypalLogo from "../../assets/images/paypal_logo.png";

const PopupPay = ({ openModal, to }) => {
  return (
    <>
      <div
        className={`w-full h-full bg-[#000000] bg-opacity-[0.3] fixed left-0 top-0 z-10 transition-all ${
          openModal ? "visible " : "invisible"
        }`}
      ></div>
      <div
        className={`w-[80%] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
          openModal
            ? "visible opacity-100 translate-y-0"
            : "translate-y-[-2rem] invisible opacity-0"
        }`}
      >
        <h2 className="font-bold text-secondary">Checkout</h2>

        <p className="flex items-center justify-between mb-[20px] mt-[25px]">
          <span>Invoice amount</span>
          <span>USD $12</span>
        </p>

        <a
          className="w-full h-[60px] transition-all bg-secondary hover:bg-primary text-white rounded-[8px] block mx-auto mt-8"
          href={`/invoice/`}
          target="_blank"
        >
          <div className="flex items-center justify-center h-full">
            <h2 className="font-semibold text-[1.2rem]">Checkout</h2>
          </div>
        </a>
      </div>
    </>
  );
};

export default PopupPay;
