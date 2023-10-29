import api from "config/api";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditUser() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirm] = React.useState("");

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/admin/users/" + id, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data.data);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [id]);

  const putUser = () => {
    console.log("masuk");
    const token = localStorage.getItem("token");
    if (password !== confirmPassword) {
      alert("Password tidak sama");
    } else {
      api
        .put(
          "/admin/users/" + id,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "auth-token": token, // the token is a variable which holds the token
            },
          }
        )
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response.data);
          alert("Berhasil mengubah data");
          window.location.href = "/admin/manage-users";
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          alert("Gagal mengubah data");
        });
    }
  };
  return (
    <div>
      <div className="rounded-[14px] bg-white p-8">
        <div className="mb-4 flex items-center gap-3">
          <button
            className="text-xl font-semibold  text-navy-800 hover:text-navy-500"
            onClick={() => (window.location.href = `/admin/manage-users`)}
          >
            {"<"}
          </button>

          <h2 className="text-2xl font-semibold text-navy-800">Edit user</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-semibold text-navy-800">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-[14px] border border-navy-800 p-2"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-navy-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-[14px] border border-navy-800 p-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-navy-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded-[14px] border border-navy-800 p-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-navy-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="rounded-[14px] border border-navy-800 p-2"
              placeholder="Confirm Password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                putUser();
              }}
              className="rounded-[14px] bg-navy-800 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
