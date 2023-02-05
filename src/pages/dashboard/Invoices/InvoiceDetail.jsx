import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// Component
import Alert from "../../../components/alert/alert";
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";
import Loading from "../../../components/loading";

// Image
import paypalLogo from "../../../assets/images/paypal_logo.png";
import { apiRequest, BASEURL, requestSetting } from "../../../util/Api";

// Style
const styleCard = `w-[480px] h-[218px] bg-ninety rounded-[4px] flex items-center justify-center mx-auto py-5`;
const styleLi = `flex items-center justify-between gap-20`;
const styleTitle = `font-semibold text-eighty text-[14px]`;
const styleSubTitle = `text-eighty text-[14px]`;
const styleWrapperSubtitle = `flex items-center gap-2 w-[5rem]`;

const InvoiceDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState({
    number: "",
    billAmount: "",
    billPeriod: "",
    plan: "",
    space: "",
  });
  const [paypalUrl, setPaypalUrl] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const { invoiceId } = useParams();

  function getDetailInvoice() {
    apiRequest(`${BASEURL}/invoice/${invoiceId}`, requestSetting("GET")).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);

          setInvoice({
            number: res?.invoice?.number,
            billAmount: res?.invoice?.billAmount,
            billPeriod: res?.invoice?.billPeriod,
            plan: res?.invoice?.plan,
            space: res?.invoice?.space?.name,
          });

          setPaypalUrl(res?.paypalUrl);

          setIsPaid(res?.invoice?.status == "Unpaid" ? false : true);
        }
      }
    );
  }

  useEffect(() => {
    getDetailInvoice();
  }, []);

  console.log(paypalUrl, "INVOICES DETAILS");

  return (
    <>
      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Header */}
      <HeaderDashboardComponent />

      <main>
        <section>
          <div className="container w-max">
            <h2 className="font-semibold text-primary text-[20px] mb-8 mt-5">
              Invoice #{invoice.number}
            </h2>
            <div className={`${styleCard}`}>
              <ul>
                <li className={`${styleLi}`}>
                  <span className={`${styleTitle}`}>Invoice Date</span>
                  <div className={`${styleWrapperSubtitle}`}>
                    <span>:</span>
                    <span className={`${styleSubTitle}`}> None</span>
                  </div>
                </li>
                <li className={`${styleLi}`}>
                  <span className={`${styleTitle}`}>Space</span>
                  <div className={`${styleWrapperSubtitle}`}>
                    <span>:</span>
                    <span className={`${styleSubTitle}`}> {invoice.space}</span>
                  </div>
                </li>
                <li className={`${styleLi}`}>
                  <span className={`${styleTitle}`}>Plan</span>
                  <div className={`${styleWrapperSubtitle}`}>
                    <span>:</span>
                    <span className={`${styleSubTitle}`}> {invoice.plan}</span>
                  </div>
                </li>
                <li className={`${styleLi}`}>
                  <span className={`${styleTitle}`}>Bill Period</span>
                  <div className={`${styleWrapperSubtitle}`}>
                    <span>:</span>
                    <span className={`${styleSubTitle}`}>
                      {" "}
                      {invoice.billPeriod}
                    </span>
                  </div>
                </li>
                <li className={`${styleLi}`}>
                  <span className={`${styleTitle}`}>Bill Amount</span>
                  <div className={`${styleWrapperSubtitle}`}>
                    <span>:</span>
                    <span className={`${styleSubTitle}`}>
                      {" "}
                      {invoice.billAmount}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {isPaid ? <Paid /> : <Unpaid paypalUrl={paypalUrl} />}
          </div>
        </section>
      </main>
    </>
  );
};

const Unpaid = ({ paypalUrl }) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <div>
        <h2 className="font-semibold text-third text-[18px]">Unpaid</h2>
        <p className="text-[12px]">You can paid the invoice via Paypal</p>
      </div>
      <a className="" href={paypalUrl} target="_blank">
        <div className="flex items-center justify-center px-5 w-[200px] h-[54px] rounded-[8px] border-2 mx-auto bg-ninety">
          <img src={paypalLogo} alt="" className="w-[67.33px]" />
        </div>
      </a>
    </div>
  );
};

const Paid = () => {
  return (
    <div className="text-center mt-8">
      <h2 className="font-semibold text-ten text-[18px]">Paid</h2>
      <p className="text-[12px]">Thanks you for your payment</p>
    </div>
  );
};
export default InvoiceDetail;
