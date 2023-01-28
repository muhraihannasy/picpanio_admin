import { useEffect, useState } from "react";

// Util
import { BASEURL, apiRequest, requestSetting } from "../../../util/Api";

// Icon
import { BsArrowRepeat } from "react-icons/bs";

// Component
import HeaderDashboardComponent from "../../../components/HeaderDashboardComponent";

// Image
import postmanBtn from "../../../assets/images/icon/postman_btn.png";
import apiaryBtn from "../../../assets/images/icon/apiary_btn.png";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { IoIosCloseCircle } from "react-icons/io";

const Users = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "read",
    space: [],
  });
  const styleParagraf = "font-regular text-[14px] text-eighty w-[90%]";
  const styleTable = "w-full ";
  const styleTrHead = "pb-[20px]";
  const styleTh =
    "text-eighty text-[16px] text-left  text-eighty whitespace-nowrap pr-3";
  const styleTd = "whitespace-nowrap  py-[0.6rem]";
  const btnRole = "w-full h-[37px] text-center text-white px-4  transition-all";

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {}, []);

  return (
    <>
      {/* Header */}
      <HeaderDashboardComponent />

      <main>
        <section>
          {/* <div className="container pt-[29px] grid md:grid-cols-2 gap-5 grid-cols-1">
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
              <input
                type="text"
                className="w-full bg-ninety border border-seventy rounded-[8px] h-[52px] focus:outline-none text-center font-bold text-eighty text-[18px]"
                readOnly
              />

              <div className="flex items-center justify-center gap-2 mt-[13px] cursor-pointer">
                <BsArrowRepeat className="text-[20px] text-eighty" />
                <p className="text-ten text-[14px]">Regenerate Token</p>
              </div>
            </div>
          </div> */}
          <div className="container">
            <h2 className="text-primary text-[20px] font-bold mt-[25px] mb-[37px] ">
              Users
            </h2>

            <div className="flex gap-5">
              <div className="w-[400px] bg-ninety shadow rounded-[4px] px-5 py-6">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <InputComponent
                      field="email"
                      type="email"
                      style="outline"
                      value={formData}
                      setValue={setFormData}
                    />
                  </div>

                  <div className="my-[20px]">
                    <label htmlFor="*" className="block mb-[14px]">
                      Access role
                    </label>
                    <div className="grid grid-cols-2 gap-0">
                      <button
                        type="button"
                        className={`${btnRole} ${
                          formData.role == "read" ? "bg-primary" : "bg-seventy"
                        } rounded-tl-[8px] rounded-bl-[8px]`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "read" }))
                        }
                      >
                        Read
                      </button>
                      <button
                        type="button"
                        className={`${btnRole}  ${
                          formData.role == "write" ? "bg-primary" : "bg-seventy"
                        } rounded-tr-[8px] rounded-br-[8px]`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "write" }))
                        }
                      >
                        Write
                      </button>
                    </div>
                  </div>
                  <div className="my-[20px]">
                    <label htmlFor="*" className="block mb-[14px]">
                      Space
                    </label>
                    <ul className="flex flex-wrap bg-white rounded-[4px] h-[102px] overflow-y-auto px-4 py-4 gap-2 ">
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        Novatama SG
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        Novatama US
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        NSTEK US
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        NSTEK AFRICE
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        NSTEK AFRICE
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                      <li className="rounded-[4px] bg-fourty  h-max px-4 py-1   flex items-center justify-between gap-2 text-[14px] flex-1">
                        NSTEK AFRICE
                        <IoIosCloseCircle className="text-xl" />
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="bg-secondary text-white w-full h-[42px] text-center px-8 rounded-md font-bold block mt-[5rem] mb-[2rem]"
                  >
                    Invite User
                  </button>
                </form>
              </div>
              <div>
                <table className={styleTable}>
                  <thead className="py-[2rem]">
                    <tr className={styleTrHead}>
                      <th className={`${styleTh} w-[12rem] pb-[0.5rem]`}>
                        Invoice number
                      </th>
                      <th className={`${styleTh} w-[10rem] pb-[0.5rem] pr-5`}>
                        Date
                      </th>
                      <th
                        className={`${styleTh} text-right md:w-[8rem] w-[12rem] pb-[0.5rem]`}
                      >
                        Amount billed
                      </th>
                      <th className={`${styleTh} text-center pb-[0.5rem] `}>
                        Status
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="pt-[2rem]">
                    <tr>
                      <td className={`${styleTd} text-primary font-semibold`}>
                        #123
                      </td>
                      <td className={`${styleTd} text-eighty pr-5 text-left`}>
                        24/07/2022
                      </td>
                      <td className={`${styleTd} text-eighty text-right pr-3`}>
                        $123
                      </td>
                      <td
                        className={` ${styleTd} text-center bg-gre ${
                          true == "Paid" ? "text-green-500" : "text-primary"
                        }`}
                      >
                        Invited
                      </td>
                      <td> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Users;
