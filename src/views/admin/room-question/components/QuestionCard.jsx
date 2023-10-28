/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
import React from "react";
import { Link, useParams } from "react-router-dom";

/* Card untuk tiap pertanyaan, akan menampilkan author question, judul dan pertanyaan,
   kapan question dibuat, dan jumlah balasan tiap question */
export default function QuestionCard({ item }) {
  const { id } = useParams();

  const renderTag = () => {
    if (item.tags.length === 0) {
      return (
        <span className="rounded-md bg-navy-800 px-2 py-1 text-sm text-white">
          No Tag
        </span>
      );
    }
    const tags = item.tags.map((tag) => (
      <span className="rounded-md bg-navy-800 px-2 py-1 text-sm text-white">
        {tag}
      </span>
    ));
    return tags;
  };

  const renderTime = () => {
    const date = new Date(item.createdAt);
    const now = new Date();
    const diff = now - date;
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} Minute ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} Hour ago`;
    }
    if (diffInDays < 30) {
      return `${diffInDays} Day ago`;
    }
    if (diffInMonths < 12) {
      return `${diffInMonths} Month ago`;
    }
    return `${diffInYears} Year ago`;
  };

  const renderReply = () => {
    if (item.replies.length === 0) {
      return (
        <span className="text-sm font-medium text-navy-800">No Discussion</span>
      );
    }
    if (item.replies.length === 1) {
      return (
        <span className="text-sm font-medium text-navy-800">
          {item.replies.length}
          Discussion
        </span>
      );
    }
    return (
      <span className="text-sm font-medium text-navy-800">
        {`${item.replies.length} `}
        Discussion
      </span>
    );
  };

  return (
    <Link
      to={`/admin/manage-room/${id}/questions/${item._id}`}
      className="mt-3 flex flex-col-reverse items-center justify-between rounded-lg bg-white p-3 shadow-sm hover:bg-navy-50 lg:flex-row lg:items-start"
    >
      <div className="mt-3 text-center lg:mt-0 lg:w-3/4 lg:text-start">
        <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
        <p className="lg:w-3/4">
          {item.description.length > 100
            ? item.description.substring(0, 100) + "..."
            : item.description}
          {item.description.length > 100 && (
            <span
              href={`/question/detail/${item._id}`}
              className="font-semibold text-navy-800"
            >
              Read more..
            </span>
          )}
        </p>
        <p className="mt-2 text-sm text-navy-600">
          {` ${item.username_author}`}
        </p>
      </div>
      <div>
        <div className="mb-1 flex items-center">
          {/* <img src={avatar} alt="" className="w-12 h-12" /> */}
          <div className="flex flex-col">
            {/* <span className="font-semibold">John Doe</span> */}
            <div className="flex items-center">
              <i className="fa-solid fa-clock mr-2 text-navy-800" />
              <span className="text-sm">{renderTime()}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-1">
            <i className="fa-solid fa-message mr-2 text-navy-800" />
            {renderReply()}
          </div>
          <div className="flex w-52">
            <i className="fa-solid fa-tag mr-2 text-navy-800" />
            <div className="flex flex-wrap gap-2">{renderTag()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
