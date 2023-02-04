import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL, apiRequest, requestSetting } from "../../util/Api";
import { Toaster, toast } from "react-hot-toast";
import Alert from "../../components/alert/alert";
import Loading from "../../components/loading";

const Invitation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { invitationId } = useParams();

  function acceptInvitation() {
    const data = {
      invitationId,
    };

    apiRequest(
      `${BASEURL}/invitation/accept`,
      requestSetting("POST", data)
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        toast.custom(<Alert type="success" message="Successfuly Invited" />);
        setIsLoading(false);
      }

      if (res.error) {
        toast.custom(<Alert type="error" message={res.error} />);
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    acceptInvitation();
  }, []);
  return (
    <div>
      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}
    </div>
  );
};

export default Invitation;
