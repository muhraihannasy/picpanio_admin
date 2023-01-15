import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/alert/alert";
import { apiRequest, BASEURL, requestSetting } from "../../util/Api";

const Verified = () => {
  const { userid, token } = useParams();
  const navigate = useNavigate();

  function getVerified() {
    const body = {
      type: "register",
      userId: userid,
      verificationToken: token,
    };

    apiRequest(`${BASEURL}/auth/verify`, requestSetting("POST", body)).then(
      (res) => {
        const { success } = res;

        if (success) {
          toast.custom(
            <Alert
              type="success"
              message="Your account has been activated. Now you can create Space and start to upload you images!"
            />
          );

          navigate("/spaces", { replace: true });
        }
      }
    );
  }

  useEffect(() => {
    getVerified();
  }, []);

  return (
    <>
      {/* Toast */}
      <Toaster />
    </>
  );
};

export default Verified;
