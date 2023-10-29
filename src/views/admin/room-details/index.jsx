/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/img/avatars/avatar1.png";
import api from "config/api";

export default function RoomDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/runding/${params.id}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setData(response.data);
        // eslint-disable-next-line no-console
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const userJoin = () => {
    const token = localStorage.getItem("token");
    api
      .put(`/runding/join/${params.id}`, "mytoken", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then(() => {
        // eslint-disable-next-line no-console
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const userLeave = () => {
    const token = localStorage.getItem("token");
    api
      .put(`/runding/leave/${params.id}`, "mytoken", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then(() => {
        // eslint-disable-next-line no-console
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <>
      <div className="mt-3">
        <Link to="/admin/default" className="py-3">
          {"< Back"}
        </Link>
        {loading ? (
          <div className="flex items-center justify-center pt-20">
            <i className="fa-solid fa-circle-notch animate-spin text-3xl text-navy-800" />
          </div>
        ) : (
          <div className="mt-3 rounded-lg border-2 bg-white p-3 ">
            <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:items-start ">
              <div className="flex w-24 items-center justify-center">
                <img
                  src={
                    data.data.logo_grup !== undefined
                      ? data.data.logo_grup
                      : avatar
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-grow flex-col items-center justify-center lg:block lg:items-start">
                <h3 className="mb-2 font-semibold">{data.data.subject}</h3>
                <div className="mb-1 flex items-center">
                  <i className="fa-solid fa-user mr-3 flex h-5 w-5 items-center justify-center text-xl" />
                  <span className="font-medium text-navy-800">
                    {`${
                      data.data.peserta !== undefined
                        ? data.data.peserta.length
                        : "0"
                    } Member`}
                  </span>
                </div>
                <div className="mb-1 flex items-center">
                  <i className="fa-solid fa-users mr-3 flex h-5 w-5 items-center justify-center text-xl" />
                  <span className="font-medium">
                    Made by
                    <span className="text-navy-800">
                      {" "}
                      {data.data.admin_username}
                    </span>
                  </span>
                </div>
              </div>
              {data.member || data.author ? (
                <div className="flex w-full justify-center lg:block lg:w-auto">
                  <span>
                    <i className="fa-solid fa-calendar mr-2" />
                    {data.data.createdAt.slice(0, 10)}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-5">
              <p>{data.data.deskripsi || ""}</p>
            </div>
            <div className="mt-5">
              {(() => {
                if (data.member || data.author) {
                  return (
                    <p>{`Meeting : ${data.data.meetTime || "Coming Soon"}`}</p>
                  );
                }

                return <div />;
              })()}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-end">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_MAIN_URL}/ruang/${params.id}`
                  );

                  // eslint-disable-next-line no-alert
                  alert("Link Copied");
                }}
                className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-navy-800"
              >
                Share
              </button>
              <button
                type="button"
                onClick={() => navigate(`/ruang/admininfo/${params.id}`)}
                className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-navy-800"
              >
                Contact Admin
              </button>
              {(() => {
                if (data.member || data.author) {
                  if (data.data.meetLink) {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          window.open(
                            `${data.data.meetLink}`,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-navy-800"
                      >
                        Open Meeting
                      </button>
                    );
                  }
                  if (!data.data.meetLink) {
                    return (
                      <button
                        disabled
                        type="button"
                        className="flex-grow rounded-lg border-2 border-navy-800 px-6 py-3 font-semibold text-navy-800"
                      >
                        No Meeting
                      </button>
                    );
                  }

                  return <div />;
                }

                return <div />;
              })()}
              {data.member || data.author ? (
                <Link
                  to={`/admin/manage-room/${params.id}/questions`}
                  className="flex-grow rounded-lg bg-navy-800 px-6 py-3 text-center font-semibold text-white"
                >
                  Questions
                </Link>
              ) : (
                <button
                  disabled
                  type="button"
                  className="text-black mr-3 flex-grow rounded-lg bg-white px-6 py-3 font-semibold "
                >
                  Not a Member
                </button>
              )}
              {(() => {
                if (data.author) {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/ruang/administrator/${params.id}`);
                      }}
                      className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-green-400 shadow-navy-800"
                    >
                      Admin
                    </button>
                  );
                }
                if (!data.member) {
                  return (
                    <button
                      type="button"
                      className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-navy-800"
                      onClick={userJoin}
                    >
                      Join
                    </button>
                  );
                }
                if (data.member) {
                  return (
                    <button
                      type="button"
                      className="flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-navy-800"
                      onClick={userLeave}
                    >
                      Exit
                    </button>
                  );
                }

                return <div />;
              })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
