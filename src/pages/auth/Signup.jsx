import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icon
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

// Component
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { BASEURL, requestSetting } from "../../util/Api";
import { toast, Toaster } from "react-hot-toast";
import Alert from "../../components/alert/alert";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      toast.custom(<Alert type="error" message="Password doesn't match" />);
      return;
    }

    fetch(`${BASEURL}/auth/register`, requestSetting("POST", formData))
      .then((res) => res.json())
      .then((res) => {
        const { statusCode, error, message } = res;
        if (statusCode === 400 || statusCode === 500) {
          toast.custom(<Alert type="error" message={message} />);
          return;
        }

        toast.custom(
          <Alert type="success" message="Successfully created Account" />
        );
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  useEffect(() => {
    document.body.style.background = "#ffff";
  });
  return (
    <div className="pb-[2rem]">
      {/* Toast */}
      <Toaster />

      <header className="container">
        <nav className="flex justify-between items-center text-[14px] text-fivety pt-[1rem]">
          <Link to="/signup" className="font-bold">
            Sign Up
          </Link>

          <p>
            Don't have an account?
            <Link to="/login" className="ml-2 text-primary">
              Sign In
            </Link>
          </p>
        </nav>
      </header>
      <main>
        <section>
          <div className="container pt-[54px]">
            <h2 className="font-bold text-[32px] text-primary text-center">
              picpan.io
            </h2>

            <div className="w-[300px] mx-auto mt-[2.5rem]">
              <div className="flex items-center w-full gap-2 mb-[1.5rem]">
                <button className="flex items-center justify-evenly w-full bg-third text-white font-bold rounded-lg px-2 py-2">
                  <AiOutlineGoogle className="text-[1.5rem]" />
                  Google
                </button>
                <button className="flex items-center justify-evenly w-full bg-eighty text-white font-bold rounded-lg px-2 py-2">
                  <AiOutlineGithub className="text-[1.5rem]" />
                  Github
                </button>
              </div>

              <h3 className="text-fivety text-center font-bold">
                or, sign up manually
              </h3>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="w-[300px] mx-auto mt-[20px] flex flex-col gap-5"
            >
              <InputComponent
                field="name"
                label="Fullname"
                type="text"
                require={true}
                style="outline"
                value={formData}
                setValue={setFormData}
              />
              <InputComponent
                field="email"
                label="Email"
                type="email"
                placeHolder="novan@nstek.co.id"
                require={true}
                style="outline"
                value={formData}
                setValue={setFormData}
              />
              <InputComponent
                field="password"
                label="Password"
                type="password"
                require={true}
                style="outline"
                value={formData}
                setValue={setFormData}
              />
              <InputComponent
                field="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                require={true}
                style="outline"
                value={formData}
                setValue={setFormData}
              />

              <div className="flex items-center justify-between mt-[15px]">
                <Link className="text-white text-[14px]">forgot password?</Link>
                <ButtonComponent
                  type="button"
                  text="Sign Up"
                  bg="secondary"
                  color="white"
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
