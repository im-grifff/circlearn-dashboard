import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import api from "../../../config/api";

/* dalam create ruang diskusi baru, jika user tidak mengupload image, maka akan mengambil
   random image dari unsplash stock image website sebagai image group */
export default function RoomEdit() {
  const [file, setFile] = useState(null);
  const [filesrc, setFileSrc] = useState(null);
  const [subjectform, setSubject] = useState("");
  const [deskripsiform, setDeskripsi] = useState("");
  const [jenisform, setJenis] = useState([]);
  const [topics, setTopics] = useState([]);

  const { id } = useParams();

  const ref = useRef();
  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.files);
    setFileSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const reset = () => {
    ref.current.value = "";
  };

  const CreateHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (subjectform === "" || deskripsiform === "" || jenisform === "") {
      // eslint-disable-next-line no-console
      console.log("Maaf, data kurang lengkap untuk membuat ruang diskusi baru");
      return;
    }

    if (file == null) {
      await fetch("https://source.unsplash.com/random/500x300?landscape")
        .then((res) => res.blob())
        .then((blob) => {
          const nowDate = Date.now().toString();
          const filerandom = new File([blob], `random-${nowDate}.png`, {
            type: "image/png",
          });
          formData.append("logo_form", filerandom);
        });
    } else {
      formData.append("logo_form", file);
    }

    formData.append("subject_form", subjectform);

    formData.append("deskripsi_form", deskripsiform);

    formData.append("jenis_form", jenisform);

    await api
      .put(`/runding/${id}`, formData, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        navigate("/admin/manage-room");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setJenis([...jenisform, e.target.value]);
    } else {
      const newJenis = jenisform.filter((jenis) => jenis !== e.target.value);
      setJenis(newJenis);
    }
  };

  useEffect(() => {
    // fetch topic from API
    fetch(process.env.REACT_APP_API_URL + "/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.data);
        // console.log(data.data);
      });

    // fetch room data from API
    api
      .get(`/runding/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSubject(res.data.data.subject);
        setDeskripsi(res.data.data.deskripsi);
        setFileSrc(res.data.data.logo_grup);
        setJenis(res.data.data.jenisRunding);
        console.log(res.data.data);
      });
  }, []);

  return (
    <>
      <div className="rounded-md bg-white p-3 shadow-sm ">
        <form action="#" onSubmit={CreateHandler}>
          <div className="mt-3 flex w-full flex-col items-center justify-center gap-3">
            <img
              src={filesrc}
              alt=""
              className="h-40 w-40 rounded-full bg-navy-800 object-cover"
            />
            <span>Select Image (Optional)</span>
            <div className="flex flex-col lg:flex-row">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="files"
                ref={ref}
                onChange={handleChangeImage}
                className="file:text-primary-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold hover:file:bg-blue-100"
              />
              <button
                onClick={() => {
                  reset();
                  setFile(null);
                }}
                type="button"
                className="shadow-primary-1 mt-3 rounded-lg bg-navy-800 px-10 py-2 font-bold text-white shadow-lg sm:mt-0 sm:ml-3"
              >
                X
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <label htmlFor="name" className="text-lg font-semibold">
              Room Name
              <span className="ml-1 text-sm font-normal text-red-500">
                *Make sure you write the group subject correctly, for example:
                Python Group Community
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setSubject(e.target.value)}
              className="bg-transparent border-primary-1 rounded-md border px-3 py-2 filter backdrop-blur-md"
              value={subjectform}
            />
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <label htmlFor="name" className="text-lg font-semibold">
              Room Description
              <span className="ml-1 text-sm font-normal text-red-500">
                *write clearly the purpose of the group you will create
              </span>
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              onChange={(e) => setDeskripsi(e.target.value)}
              cols="20"
              rows="10"
              className="bg-transparent border-primary-1 h-40 w-full resize-none rounded-lg border p-3 filter backdrop-blur-md"
              value={deskripsiform}
            />
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <label className="text-lg font-semibold">
              Subject
              <span className="ml-1 text-sm font-normal text-red-500">
                *Select discussion topics listed below
              </span>
            </label>
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <div
                  key={topic.topicId}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <input
                    type="checkbox"
                    name={topic.topicName}
                    id={topic.topicName}
                    value={topic.topicName}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4"
                    checked={jenisform.includes(topic.topicName)}
                  />
                  <label htmlFor={topic.topicName}>{topic.topicName}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-3">
            <button
              type="submit"
              className="bg-primary-1 shadow-primary-1 rounded-lg bg-navy-800 px-10 py-2 font-bold text-white shadow-lg"
            >
              CREATE NEW
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
