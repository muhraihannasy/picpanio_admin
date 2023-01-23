import paypalLogo from "../../assets/images/paypal_logo.png";

const PopupPay = ({ openModal, to }) => {
  return (
    <div
      className={`w-[360px] rounded-[4px] bg-white shadow-lg fixed left-[50%] top-[10rem] right-[50%] translate-x-[-50%] py-[1.5rem] px-[1.5rem] z-[999] transition-all ${
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
        className="w-full h-[74px] bg-ninety rounded-[8px] block mx-auto"
        href={to}
        target="_blank"
      >
        <div className="flex items-center justify-center">
          <img src={paypalLogo} alt="" className="w-[100px]" />
        </div>
      </a>
    </div>
  );
};

export default PopupPay;
