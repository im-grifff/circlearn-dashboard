import React from "react";

// card untuk tiap jawaban/balasan dalam page detail pertanyaan
export default function QuestionResponseCard(props) {
  const { data } = props;

  const renderTime = () => {
    const date = new Date(data.createdAt);
    const now = new Date();
    const diff = now - date;
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    }
    if (diffInDays < 30) {
      return `${diffInDays} hari yang lalu`;
    }
    if (diffInMonths < 12) {
      return `${diffInMonths} bulan yang lalu`;
    }
    return `${diffInYears} tahun yang lalu`;
  };

  return (
    <div className="mt-3 flex flex-col items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-sm lg:items-start">
      <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:items-start ">
        <div className="flex flex-grow flex-col items-center justify-center lg:block lg:items-start">
          <h3 className="text-xl font-semibold">{data.author_username}</h3>
          <div className="flex items-center">
            <i className="fa-solid fa-clock mr-3 flex h-5 w-5 items-center justify-center text-xl text-navy-800" />
            <span className="font-medium text-gray-500 ">{renderTime()}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <p>{data.content}</p>
      </div>
    </div>
  );
}
