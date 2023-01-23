// Component
import HeaderDashboardComponent from "../../components/HeaderDashboardComponent";
import ButtonComponent from "../../components/ButtonComponent";

// Images
import success from "../../assets/images/icon/success.png";

const SuccessPayment = () => {
  return (
    <>
      {/* Header */}
      <HeaderDashboardComponent />

      <main>
        <section>
          <div className="container pt-[3.5rem]">
            <div className="flex items-center justify-center flex-col gap-[1.5rem]">
              <h2 className="text-[20px] text-primary font-semibold">
                Your payment is successfull!
              </h2>
              <img src={success} alt="" className="w-[80px]" />
              <p className="font-regular text-[14px] text-eighty mb-[1.1rem]">
                Check your Space and let’s upload the images
              </p>
              <ButtonComponent
                bg="secondary"
                text="Go to Spaces"
                color="white"
                type="link"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SuccessPayment;
