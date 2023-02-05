import { useEffect, useState } from "react";
import { json, Link, useLocation, useNavigate } from "react-router-dom";
import toast, { ToastBar, Toaster } from "react-hot-toast";

// Icon
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

// Component
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { apiRequest, BASEURL, requestSetting } from "../../util/Api";
import Alert from "../../components/alert/alert";
import Route from "../../util/Route";
import Loading from "../../components/loading";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setIsLoading(true);

    const body = {
      email: formData.email,
    };

    apiRequest(
      `${BASEURL}/auth/forgotpassword`,
      requestSetting("POST", body)
    ).then((res) => {
      setIsLoading(false);
      if (res?.success) {
        toast.custom(<Alert type="success" message="Check your email inbox" />);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${BASEURL}/auth/login`, requestSetting("POST", formData))
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        if (res?.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          return;
        }

        toast.custom(<Alert type="success" message="Successfuly Login" />);
        localStorage.setItem("acctkn", res.token);

        setTimeout(() => {
          navigate(Route.DashboardSpaces, { replace: true });
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (location.pathname.includes("/login")) {
      document.body.style.background = "#CE1261";
    }
  });

  return (
    <div className="pb-[2rem]">
      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      <header className="container">
        <nav className="flex justify-between items-center text-[14px] text-white pt-[1rem]">
          <Link to="/login">Login</Link>

          <p>
            Don't have an account?
            <Link to="/signup" className="ml-2 text-sixty">
              Sign Up
            </Link>
          </p>
        </nav>
      </header>

      <main>
        <section>
          <div className="container pt-[54px]">
            <h2 className="font-bold text-[32px] text-white text-center">
              picpan.io
            </h2>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="w-[300px] mx-auto mt-[45px] flex flex-col gap-5"
            >
              <InputComponent
                field="email"
                label="Email"
                type="email"
                placeHolder="novan@nstek.co.id"
                require={true}
                style="background"
                value={formData}
                setValue={setFormData}
              />
              <InputComponent
                field="password"
                label="Password"
                type="password"
                require={true}
                style="background"
                value={formData}
                setValue={setFormData}
              />

              <div className="flex items-center justify-between mt-[15px]">
                <button
                  className="text-white text-[14px]"
                  onClick={() => handleForgotPassword()}
                  type="button"
                >
                  forgot password?
                </button>
                <ButtonComponent
                  type="button"
                  text="Login"
                  bg="secondary"
                  color="white"
                />
              </div>
            </form>

            <div className="w-[300px] mx-auto mt-[2.5rem]">
              <h3 className="text-white text-center font-bold">
                or, sign in with
              </h3>

              <div className="flex items-center w-full gap-2 mt-[1.5rem]">
                <button className="flex items-center justify-evenly w-full bg-third text-white font-bold rounded-lg px-2 py-2">
                  <AiOutlineGoogle className="text-[1.5rem]" />
                  Google
                </button>
                <button className="flex items-center justify-evenly w-full bg-eighty text-white font-bold rounded-lg px-2 py-2">
                  <AiOutlineGithub className="text-[1.5rem]" />
                  Github
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
