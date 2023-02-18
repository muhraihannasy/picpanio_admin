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
import { Toaster, toast } from "react-hot-toast";
import Alert from "../../../components/alert/alert";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading";
import { GoTrashcan } from "react-icons/go";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    role: "read",
  });
  const [invitations, setInvitations] = useState([]);
  const [members, setMembers] = useState([]);
  const { spaceId } = useParams();
  const btnRole = "w-full h-[46px] text-center text-white px-4 transition-all";

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.email == "") {
      toast.custom(<Alert type="error" message="Email required " />);
      return;
    }

    const data = {
      spaceId,
      ...formData,
    };

    setIsLoading(true);

    apiRequest(`${BASEURL}/invitation`, requestSetting("POST", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(<Alert type="success" message="Successfuly Invited" />);
          setInvitations((prev) => [
            ...prev,
            {
              email: data.email,
              role: data.role,
            },
          ]);
          setIsLoading(false);
        }

        if (res.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          setIsLoading(false);
        }
      }
    );
  }

  function getInvitationBySpace() {
    apiRequest(
      `${BASEURL}/invitation?spaceId=${spaceId}`,
      requestSetting("GET")
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res !== []) {
        setIsLoading(false);
        setInvitations(res);
      }
    });
  }

  function getMembers() {
    apiRequest(
      `${BASEURL}/space/users?spaceId=${spaceId}`,
      requestSetting("GET")
    ).then((res) => {
      if (res.message == "The token is malformed.")
        navigate("/login", { replace: true });

      if (res.success) {
        setIsLoading(false);

        let tempUsers = res?.users.filter((user) => user.isOwner === false);
        setMembers(tempUsers);
      }
    });
  }

  function handleCancelInvitation(id) {
    setInvitations([]);
    return;
    const data = {
      spaceId: spaceId,
      userId: id,
    };

    apiRequest(`${BASEURL}/space/user`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          toast.custom(<Alert type="success" message="Successfuly Canceled" />);
          setIsLoading(false);
        }

        if (res.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          setIsLoading(false);
        }
      }
    );
  }

  function handleDeleteMember(id) {
    const data = {
      spaceId,
      userId: id,
    };

    setIsLoading(true);
    apiRequest(`${BASEURL}/space/user`, requestSetting("DELETE", data)).then(
      (res) => {
        if (res.message == "The token is malformed.")
          navigate("/login", { replace: true });

        if (res.success) {
          setIsLoading(false);
          toast.custom(
            <Alert type="success" message="Successfuly Deleted Member" />
          );

          setMembers([]);
        }

        if (res.error) {
          toast.custom(<Alert type="error" message={res.error} />);
          setIsLoading(false);
        }
      }
    );
  }

  useEffect(() => {
    getInvitationBySpace();
    getMembers();
  }, []);

  return (
    <>
      {/* Header */}
      <HeaderDashboardComponent />

      {/* Toast */}
      <Toaster />

      {/* Loading */}
      {isLoading && <Loading />}

      <main>
        <section>
          <div className="container">
            <h2 className="text-primary text-[20px] font-bold mt-[25px] mb-[37px] ">
              Users
            </h2>

            <div className="flex max-[836px]:flex-col gap-12 ">
              <div className="max-[836px]:w-full w-[400px] bg-ninety shadow rounded-[4px] px-5 py-6">
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

                  <div className="mt-[20px]">
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
                  <button
                    type="submit"
                    className="bg-secondary text-white w-full h-[42px] text-center px-8 rounded-md font-bold block mt-[2rem] mb-[2rem]"
                  >
                    Invite User
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-10">
                {invitations.length > 0 && (
                  <InvitationTable
                    items={invitations}
                    onCancel={(id) => handleCancelInvitation(id)}
                  />
                )}
                <MemberTable
                  items={members}
                  onDeleteMember={(id) => handleDeleteMember(id)}
                />
              </div>
            </div>
          </div>
        </section>

        <InvoiceScreen />
      </main>
    </>
  );
};

const InvoiceScreen = ({ items, innerWidth }) => {
  const styleTable = "w-full ";
  const styleTrHead = "pb-[20px]";
  const styleTh =
    "text-eighty text-[16px] text-left  text-eighty whitespace-nowrap pr-3";
  const styleTd = "whitespace-nowrap  py-[0.6rem]";

  return (
    <div className=" w-full mx-auto ">
      {innerWidth > 866 && (
        <table className={styleTable}>
          <thead className="py-[2rem]">
            <tr className={styleTrHead}>
              <th className={`${styleTh} w-[12rem] pb-[0.5rem]`}>
                Invoice number
              </th>
              <th className={`${styleTh} w-[10rem] pb-[0.5rem] pr-5`}>Date</th>
              <th
                className={`${styleTh} text-right md:w-[8rem] w-[12rem] pb-[0.5rem]`}
              >
                Amount billed
              </th>
              <th className={`${styleTh} text-center pb-[0.5rem] `}>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="pt-[2rem]">
            <tr>
              <td className={`${styleTd} text-primary font-semibold`}>#</td>
              <td className={`${styleTd} text-eighty pr-5 text-left`}>
                24/07/2022
              </td>
              <td className={`${styleTd} text-eighty text-right pr-3`}>$</td>
              <td className={` ${styleTd} text-center bg-gre `}></td>
              {/* <td>{checkButtonIsPay(item.status)} </td> */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const InvitationTable = ({ items, onCancel }) => {
  const styleParagraf = "font-regular text-[14px] text-eighty w-[90%]";
  const styleTable = "w-full ";
  const styleTrHead = "pb-[20px]";
  const styleTh =
    "text-eighty text-[16px] text-left  text-eighty whitespace-nowrap pr-3";
  const styleTd = "whitespace-nowrap  py-[0.6rem]";

  return (
    <div>
      <h2 className="text-primary text-[18px] font-bold mb-[1.2rem]">
        Pending invitation
      </h2>
      <table className={styleTable}>
        <thead className="py-[2rem]">
          <tr className={styleTrHead}>
            <th className={`${styleTh} w-[24rem] pb-[0.5rem]`}>Email</th>
            <th className={`${styleTh} w-[12rem] pb-[0.5rem] pr-5`}>Role</th>

            <th className="w-[12rem]"></th>
          </tr>
        </thead>
        <tbody className="pt-[2rem]">
          {items &&
            items.map((item, index) => (
              <tr key={index}>
                <td className={`${styleTd} text-eighty `}>{item.email}</td>
                <td className={`${styleTd} text-eighty pr-5 text-left`}>
                  {item.role}
                </td>

                <td className="text-primary">
                  {" "}
                  <button onClick={() => onCancel(item.id)}>
                    Cancel Invitation
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const MemberTable = ({ items, onDeleteMember }) => {
  const styleParagraf = "font-regular text-[14px] text-eighty w-[90%]";
  const styleTable = "max-[836px]:w-[60rem] relative";
  const styleTrHead = "pb-[20px]";
  const styleTh =
    "text-eighty text-[16px] text-left  text-eighty md:whitespace-normal whitespace-nowrap pr-3";
  const styleTd = "md:whitespace-normal whitespace-nowrap  py-[0.6rem]";

  return (
    <div>
      <h2 className="text-primary text-[18px] font-bold mb-[1rem]">Members</h2>
      <div className="overflow-x-auto">
        <table className={styleTable}>
          <thead className="py-[2rem] ">
            <tr className={styleTrHead}>
              <th className={`${styleTh} w-[8rem] pb-[0.5rem]`}>Name</th>
              <th className={`${styleTh} w-[16rem] pb-[0.5rem]`}>Email</th>
              <th className={`${styleTh} w-[6rem] pb-[0.5rem] pr-5`}>Role</th>
              <th className={`${styleTh} w-[6rem] pb-[0.5rem] pr-5`}>Status</th>

              <th className="w-[12rem]"></th>
            </tr>
          </thead>
          <tbody className="pt-[5rem]">
            {items &&
              items.map((item, index) => (
                <tr key={index}>
                  <td className={`${styleTd} text-eighty`}>
                    {item?.user?.name}
                  </td>
                  <td className={`${styleTd} text-eighty `}>
                    {item?.user?.email}
                  </td>
                  <td className={`${styleTd} text-eighty pr-5 text-left`}>
                    {item.role}
                  </td>
                  <td
                    className={`${styleTd}  pr-5 text-left ${
                      item.status == "Active" ? "text-ten" : "text-primary"
                    }`}
                  >
                    Active
                  </td>

                  <td className="text-primary">
                    {" "}
                    <button onClick={() => onDeleteMember(item?.user.id)}>
                      <GoTrashcan className="text-third text-[1.45rem]" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
