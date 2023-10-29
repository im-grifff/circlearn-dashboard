/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React from "react";
import { useNavigate } from "react-router-dom";

/* card untuk menampilkan data grup ruang diskusi meliputi
   nama ruang diskusi, jumlah anggota, dan tema ruang diskusi */
export default function DiscussionRoomCard({ discussionRoom }) {
  const navigate = useNavigate();

  const { _id, logo_grup, subject, peserta, jenisRunding } = discussionRoom;

  return (
    <div
      id={`${_id}`}
      className="flex w-full flex-col items-center justify-between gap-3 rounded-lg border-2 bg-white p-3 shadow-lg lg:flex-row"
    >
      <div className="flex w-24 items-center justify-start">
        <img src={logo_grup} alt="group logo" className="img-cover h-[100px]" />
      </div>
      <div className="flex flex-grow flex-col items-center justify-center lg:block">
        <h3 className="mb-2 font-semibold">{subject}</h3>
        <div className="mb-1 flex items-center">
          <i className="fa-solid fa-user mr-3 flex h-5 w-5 items-center justify-center text-xl" />
          <span className="font-medium text-navy-800">
            {peserta.length <= 0 ? "0 " : `${peserta.length} `}
            Member
          </span>
        </div>
        <div className="mb-1 flex items-center">
          <i className="fa-solid fa-users mr-3 flex h-5 w-5 items-center justify-center text-xl" />
          <span className="font-medium">
            Subject :<span className="text-navy-800">{` ${jenisRunding}`}</span>
          </span>
        </div>
      </div>
      <div className="flex w-full lg:block lg:w-auto">
        <button
          type="button"
          className="flex-grow rounded-lg bg-navy-800 px-8 py-8 text-3xl font-semibold text-white"
          onClick={() => navigate(`/admin/manage-room/${_id}`)}
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}
