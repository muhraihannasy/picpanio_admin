import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/alert/alert";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import Loading from "../../components/loading";
import { BASEURL, requestSetting } from "../../util/Api";
import Route from "../../util/Route";

const ForgotPassword = () => {
  const { userid, token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    formData.userId = userid;
    formData.verificationToken = token;

    fetch(`${BASEURL}/auth/resetpassword`, requestSetting("POST", formData))
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          return;
        }

        setIsLoading(false);
        toast.custom(
          <Alert type="success" message="Successfuly Reset Password" />
        );

        setTimeout(() => {
          navigate(Route.DashboardSpaces, { replace: true });
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(userid, token);
  }, []);

  return (
    <div>
      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      <main>
        <section className="container">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col  gap-[20px] sm:w-[20rem] mx-auto mt-[3.5rem] "
          >
            <InputComponent
              field="password"
              label="Password"
              type="password"
              require={true}
              style="outline"
              value={formData}
              setValue={setFormData}
            />
            <ButtonComponent
              type="button"
              text="Reset Password"
              bg="secondary"
              color="white"
              position="mx-auto"
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default ForgotPassword;
