import { useEffect, useState } from "react";

// Util
import { BASEURL, apiRequest, requestSetting } from "../../../util/Api";

// Icon
import { BsArrowRepeat } from "react-icons/bs";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import Loading from "../../../components/loading";

// Image
import postmanBtn from "../../../assets/images/icon/postman_btn.png";
import apiaryBtn from "../../../assets/images/icon/apiary_btn.png";

const ApiIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiToken, setApiToken] = useState("");
  const styleParagraf = "font-regular text-[14px] text-eighty w-[90%]";

  function generateApiToken() {
    setIsLoading(true);
    apiRequest(
      `${BASEURL}/account/generatetoken`,
      requestSetting("POST", {})
    ).then((res) => {
      if (res?.success) {
        setIsLoading(false);
        setApiToken(res?.apiToken);
      }
    });
  }

  useEffect(() => {}, [apiToken]);

  return (
    <>
      {/* Header */}
      <HeaderDashboardComponent />

      {/* Loading */}
      {isLoading && <Loading />}

      <main>
        <section>
          <div className="container pt-[29px] grid md:grid-cols-2 gap-5 grid-cols-1">
            <div>
              <h2 className="text-primary font-bold mb-[25px]">
                API Documentation
              </h2>
              <p className={styleParagraf}>
                You can integrate Picpan with your apps with our API, please
                read API documentation below.
              </p>
              <div className="flex items-center my-[15px] gap-5">
                <img
                  src={postmanBtn}
                  alt=""
                  className="w-[136px] cursor-pointer"
                />
                <img
                  src={apiaryBtn}
                  alt=""
                  className="w-[112px] cursor-pointer"
                />
              </div>
              <p className={styleParagraf}>
                Use the API Token for authentication every you make request, we
                suggest for re-generate your API Token periodically for security
                reason
              </p>
            </div>
            <div>
              <h2 className="text-primary font-bold mb-[25px]">API Token</h2>
              <p className={`${styleParagraf} mb-[25px]`}>
                We don’t show your API token, please re-generate token and save
                your token in the safe place
              </p>
              <input
                type="text"
                className="w-full bg-ninety border border-seventy rounded-[8px] h-[52px] focus:outline-none text-center font-bold text-eighty text-[18px]"
                readOnly
                value={apiToken}
              />

              <div
                className="flex items-center justify-center gap-2 mt-[13px] cursor-pointer"
                onClick={generateApiToken}
              >
                <BsArrowRepeat className="text-[20px] text-eighty" />
                <p className="text-ten text-[14px]">Regenerate Token</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ApiIntegration;
