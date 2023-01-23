import { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// Utils
import { apiRequest, BASEURL, requestSetting } from "../../util/Api";
import Route from "../../util/Route";

// Component
import Alert from "../../components/alert/alert";
import HeaderDashboardComponent from "../../components/HeaderDashboardComponent";
import Loading from "../../components/loading";
import PopupPay from "../../components/popup/PopupPay";

const CreateSpace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModalPay, setOpenModalPay] = useState(false);
  const [terms, setTerms] = useState(false);

  const [space, setSpace] = useState({
    name: "",
    slug: "",
    description: "",
    plan: "",
    region: "",
    billPeriod: "",
  });
  const [paypalLink, setPaypalLink] = useState("");
  const btnCreateSpaceRef = useRef();

  function handleChangeTerm() {
    setTerms((prev) => !prev);
    btnCreateSpaceRef.current.disabled = terms ? true : false;
  }

  function checkForm() {
    let error = false;
    const data = { ...space };

    for (const spaceProp in space) {
      if (data[spaceProp] == "") error = true;
      if (data.plan == "Free" && data.billPeriod == "") error = false;
    }

    return error;
  }

  function handleSubmit() {
    const data = { ...space };

    if (space.plan == "Free") data.billPeriod = "";
    if (checkForm()) {
      toast.custom(<Alert type="error" message="Your space is incomplete" />);
      return;
    }

    apiRequest(`${BASEURL}/space/order`, requestSetting("POST", space)).then(
      (res) => {
        "";
        if (res.success) {
          toast.custom(
            <Alert type="success" message="Successfuly Created Space" />
          );
          setOpenModalPay(true);
          setPaypalLink(res?.paypal?.links[1]?.href);
          console.log(res?.paypal?.links[1]?.href);
        }

        setOpenModalPay(true);
      }
    );

    // fetch(`${BASEURL}/space/order`, requestSetting("POST", space))
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setIsLoading(false);
    //     if (res.error) {
    //       toast.custom(<Alert type="error" message={res.error} />);
    //       return;
    //     }

    //     if (res.success) {
    //       toast.custom(
    //         <Alert type="success" message="Successfuly Created Space" />
    //       );
    //     }

    //     setTimeout(() => {
    //       navigate(Route.DashboardSpaces, { replace: true });
    //     }, 1000);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }
  return (
    <>
      {/* Toast */}
      <Toaster />
      {/* Popup Pay */}
      <PopupPay openModal={openModalPay} to={paypalLink} />
      {console.log(paypalLink)}
      {/* Loading */}
      {isLoading && <Loading />}
      {/* Header */}
      <HeaderDashboardComponent />
      {/* Main Content */}
      <main>
        <section>
          <div className="container mt-[25px]">
            <h2 className="text-secondary text-[1.4rem] font-semibold my-[1.2rem]">
              Create Space
            </h2>

            <SpaceInformation space={space} setSpace={setSpace} />
            <ChoosePlan space={space} setSpace={setSpace} />
            <ChooseRegion space={space} setSpace={setSpace} />
            <SettingSpace space={space} setSpace={setSpace} />

            <div className="mt-[4rem] md:ml-auto md:mx-0 mx-auto md:text-right text-center w-max">
              <h3 className="font-semibold text-eighty">Total Invoiice</h3>
              <p className="font-semibold text-[18px] text-primary">USD $12</p>
            </div>
            <div className="w-max mt-[1.5rem] md:ml-auto md:mx-0 mx-auto flex items-center md:flex-row flex-col gap-10">
              <div>
                <input
                  type="checkbox"
                  className="mr-[10px]"
                  id="terms"
                  onChange={() => handleChangeTerm()}
                />
                <label htmlFor="terms">
                  I Accept{" "}
                  <span className="text-primary">terms and agreement</span> of
                  Picpan service
                </label>
              </div>
              <button
                className={`text-white text-center rounded-[8px] px-6 py-2 md:w-[194px] w-full font-bold transition-all ${
                  terms ? "bg-secondary" : "bg-seventy"
                }`}
                ref={btnCreateSpaceRef}
                onClick={handleSubmit}
              >
                Create Space
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const SpaceInformation = ({ space, setSpace }) => {
  return (
    <div className="mb-[30px]">
      <h3 className=" text-primary mb-[10px]">Space information</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-[18px]">
        <div className="flex flex-col w-full">
          <label
            htmlFor="space_name"
            className="text-[15px] text-eighty mb-[5px]"
          >
            Space name
          </label>
          <input
            type="text"
            placeholder="Only alphanumeric and dash"
            id="space_name"
            className="rounded-[8px] px-3 border border-seventy focus:outline-none h-[38px]"
            onChange={(e) =>
              setSpace({
                ...space,
                name: e.target.value.replace(/[^0-9a-zA-Z- ]+/gi, " "),
                slug: e.target.value
                  .replace(/[^0-9a-zA-Z_-]+/gi, "-")
                  .toLowerCase(),
              })
            }
            value={space.name}
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="space_description"
            className="text-[15px] text-eighty mb-[5px]"
          >
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            id="space_description"
            className="rounded-[8px] px-3 w-full border border-seventy focus:outline-none h-[38px]"
            onChange={(e) => {
              setSpace((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ChoosePlan = ({ space, setSpace }) => {
  return (
    <div className="mb-[20px]">
      <h3 className="text-primary mb-[20px]">Choose your space plan</h3>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.plan === "Free" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, plan: "Free" }))}
        >
          <div className="mb-[3rem]">
            <h3
              className={`font-semibold text-[20px] mb-[10px] ${
                space.plan === "Free" && "text-primary"
              }`}
            >
              Free
            </h3>
            <ul className="text-[14px]">
              <li>Upload jpg & png</li>
              <li>Maximum file size 2Mb</li>
              <li>1 GB Space</li>
              <li>Basic Image processing</li>
            </ul>
          </div>
          <p
            className={`font-semibold ${
              space.plan === "Free" && "text-primary"
            }`}
          >
            USD $0 Forever
          </p>
        </div>
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.plan === "Premium" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, plan: "Premium" }))}
        >
          <div className="mb-[3rem]">
            <h3
              className={`font-semibold text-[20px] mb-[10px] ${
                space.plan === "Premium" && "text-primary"
              }`}
            >
              Premium
            </h3>
            <ul className="text-[14px]">
              <li>Upload jpg & png</li>
              <li>Maximum file size 10Mb</li>
              <li>
                <span className="font-semibold">100 GB</span> Space
              </li>
              <li>Advance Image processing </li>
              <li>REST API </li>
            </ul>
          </div>
          <p
            className={`font-semibold ${
              space.plan === "Premium" && "text-primary"
            }`}
          >
            USD $0 Forever
          </p>
        </div>
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.plan === "Enterprise"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, plan: "Enterprise" }))}
        >
          <div className="mb-[3rem]">
            <h3
              className={`font-semibold text-[20px] mb-[10px] ${
                space.plan === "Enterprise" && "text-primary"
              }`}
            >
              Enterprise
            </h3>
            <ul className="text-[14px]">
              <li>Maximum file size 20Mb</li>
              <li>Upload jpg, png & gif</li>
              <li>
                <span className="font-semibold">1 TB </span> Space
              </li>
              <li>REST API</li>
              <li>
                <span className="font-semibold">Custom Image URL</span>
              </li>
            </ul>
          </div>
          <p
            className={`font-semibold ${
              space.plan === "Enterprise" && "text-primary"
            }`}
          >
            USD $35 / month
          </p>
        </div>
      </div>
    </div>
  );
};

const ChooseRegion = ({ space, setSpace }) => {
  return (
    <div className="mb-[20px]">
      <h3 className="text-primary mb-[20px]">Choose space region</h3>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.region == "ap1" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, region: "ap1" }))}
        >
          <h3
            className={`font-semibold text-[20px] mb-[4px] ${
              space.region == "ap1" && "text-primary"
            }`}
          >
            Asia Pacific
          </h3>
          <p>Singapore</p>
        </div>
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.region == "us1" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, region: "us1" }))}
        >
          <h3
            className={`font-semibold text-[20px] mb-[4px] ${
              space.region == "us1" && "text-primary"
            }`}
          >
            US
          </h3>
          <p>Dallas, TX</p>
        </div>
        <div
          className={`bg-ninety rounded-[0.5rem] px-[4rem] py-[2rem] text-eighty cursor-pointer transition-all border  ${
            space.region == "eu1" ? "border-primary" : "border-transparent"
          }`}
          onClick={() => setSpace((prev) => ({ ...prev, region: "eu1" }))}
        >
          <h3
            className={`font-semibold text-[20px] mb-[4px] ${
              space.region == "eu1" && "text-primary"
            }`}
          >
            Europe
          </h3>
          <p>Germany</p>
        </div>
      </div>
    </div>
  );
};

const SettingSpace = ({ space, setSpace }) => {
  return (
    <div className="mb-[20px] grid md:grid-cols-2 grid-cols-1 gap-4">
      <div className="w-full md:mb-[0] mb-[1.5rem] ">
        <h3 className="text-primary mb-[20px]">Your space address</h3>
        <div className="flex items-center gap-[0.7rem]">
          <label htmlFor="space_address" className="font-semibold text-eighty">
            sg.picpan.io/
          </label>
          <input
            type="text"
            placeholder="yourspace"
            className="rounded-[8px] px-3 border border-seventy focus:outline-none h-[38px] font-semibold text-primary placeholder:text-primary w-[70%]"
            onChange={(e) =>
              setSpace({
                ...space,
                slug: e.target.value
                  .replace(/[^0-9a-zA-Z-]+/gi, "-")
                  .toLowerCase(),
              })
            }
            value={space.slug}
          />
        </div>
      </div>
      <div className={`${space.plan === "Free" && "hidden"}`}>
        <h3 className="text-primary mb-[20px]">Bill period</h3>

        <div className="flex items-center gap-[0.5rem]">
          <button
            className={`h-[38px] px-6 bg-ninety transition-all rounded-[8px] border   ${
              space.billPeriod == "Monthly"
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() =>
              setSpace((prev) => ({ ...prev, billPeriod: "Monthly" }))
            }
          >
            Monthly
          </button>
          <button
            className={`h-[38px] px-6 bg-ninety transition-all rounded-[8px] border ${
              space.billPeriod == "Annually"
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() =>
              setSpace((prev) => ({ ...prev, billPeriod: "Annually" }))
            }
          >
            Annually <span className="text-ten">(save 18%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpace;
