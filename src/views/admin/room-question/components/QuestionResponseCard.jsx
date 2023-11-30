import api from "config/api";
import parse from "html-react-parser";
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

// card untuk tiap jawaban/balasan dalam page detail pertanyaan
export default function QuestionResponseCard(props) {
  const { data, userData } = props;
  const [commentForm, setCommentForm] = useState(data.content);
  const [isEdit, setIsEdit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  console.log("data", data);
  console.log("userData", userData);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    api
      .put(
        `/comments/${data._id}`,
        {
          content_form: commentForm,
        },
        {
          headers: {
            "auth-token": token, // the token is a variable which holds the token
          },
        }
      )
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleDeleteComment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    api
      .delete(`/comments/${data._id}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <div className="mt-3 flex flex-col items-center justify-between gap-3 rounded-lg border-2 bg-white p-3 shadow-lg lg:items-start">
      <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:items-start ">
        <div className="flex items-center justify-center">
          {/* <img src={avatar} alt="" className="h-14 w-14" /> */}
        </div>
        <div className="flex flex-grow flex-col items-center justify-center lg:block lg:items-start">
          <h3 className="text-xl font-semibold">{data.author_username}</h3>
          <div className="flex items-center">
            <i className="fa-solid fa-clock text-primary-1 mr-3 flex h-5 w-5 items-center justify-center text-xl" />
            <span className="font-medium text-gray-500 ">{renderTime()}</span>
          </div>
        </div>
        <div>
          {userData._id === data.author_id[0] && (
            <button
              type="button"
              className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white shadow-lg shadow-gray-500"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit Answer
            </button>
          )}
          {userData._id === data.author_id[0] && (
            <button
              type="button"
              className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500"
              onClick={handleDeleteComment}
            >
              Delete Answer
            </button>
          )}
        </div>
      </div>
      {isEdit && (
        <div className="text-black mt-3 w-full">
          <RichTextEditor content={commentForm} setContent={setCommentForm} />
          {
            // eslint-disable-next-line react/jsx-wrap-multilines
            isSubmitting ? (
              <button
                type="button"
                className="bg-primary-1 shadow-primary-1 mt-3 w-40 rounded-lg py-2 text-white shadow-lg"
                disabled
              >
                <i className="fa-solid fa-circle-notch animate-spin text-white" />
              </button>
            ) : (
              <button
                type="button"
                className="bg-primary-1 shadow-primary-1 mt-3 w-40 rounded-lg py-2 text-white shadow-lg"
                onClick={handleCommentSubmit}
              >
                Send
              </button>
            )
          }
        </div>
      )}
      <div className="mt-3" data-remove-styles>
        {parse(data.content)}
      </div>
    </div>
  );
}
