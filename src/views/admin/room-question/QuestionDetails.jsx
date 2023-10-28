/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionResponseCard from "./components/QuestionResponseCard";

import api from "../../../config/api";

export default function QuestionDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { questionId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/user/data", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setDataUser(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/posts/comments/${questionId}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setData(response.data.data);
        // eslint-disable-next-line no-console
        // console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const renderTime = () => {
    const date = new Date(data.post[0].createdAt);
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

  const renderReply = () => {
    if (data.post[0].replies.length === 0) {
      return (
        <span className="text-sm font-medium text-navy-800">
          Belum ada Pembahasan
        </span>
      );
    }
    if (data.post[0].replies.length === 1) {
      return (
        <span className="text-sm font-medium text-navy-800">
          {` ${data.post[0].replies.length}`}
          Pembahasan
        </span>
      );
    }
    return (
      <span className="text-sm font-medium text-navy-800">
        {` ${data.post[0].replies.length}`}
        Pembahasan
      </span>
    );
  };

  const renderTags = () => {
    if (data.post[0].tags.length === 0) {
      return (
        <span className="rounded-md bg-navy-800 px-2 py-1 text-sm text-white">
          Belum ada Tag
        </span>
      );
    }
    const tags = data.post[0].tags.map((tag) => (
      <span className="rounded-md bg-navy-800 px-2 py-1 text-sm text-white">
        {tag}
      </span>
    ));
    return tags;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    api
      .post(
        `/posts/comments/create/${questionId}`,
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

  const handleComment = (e) => {
    setCommentForm(e.target.value);
  };

  return (
    <>
      {loading ? (
        <div className="ml-auto flex items-center justify-center pt-20">
          <i className="fa-solid fa-circle-notch animate-spin text-3xl text-navy-800" />
        </div>
      ) : (
        <div className="container mx-auto mt-4 mb-10 px-2">
          <div className="mt-3 flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:items-start ">
            <div className="flex flex-grow flex-col items-center justify-center lg:block lg:items-start">
              <h3 className="mb-2 text-xl font-semibold">
                {data.post[0].username_author}
              </h3>
              <div className="mb-1 flex items-center">
                <i className="fa-solid fa-clock mr-3 flex h-5 w-5 items-center justify-center text-xl text-navy-800" />
                <span className="font-medium text-gray-500 ">
                  {renderTime()}
                </span>
              </div>
              <div className="mb-1 flex items-center">
                <i className="fa-solid fa-message mr-3 flex h-5 w-5 items-center justify-center text-xl text-navy-800" />
                {renderReply()}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `localhost:3000/question/detail/${questionId}`
                  );

                  // eslint-disable-next-line no-alert
                  alert("Link Copied");
                }}
                className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-lg shadow-navy-800"
              >
                Share
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-col items-center justify-between gap-3 border-b border-navy-800 pb-3 lg:items-start ">
            <div className="mt-3 text-center lg:mt-0 lg:text-start">
              <h3 className="mb-3 text-xl font-semibold">
                {data.post[0].title}
              </h3>
              <p>{data.post[0].description}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <i className="fa-solid fa-tag flex items-center justify-center text-xl text-navy-800" />
                {renderTags()}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold">{dataUser.data.username}</span>
            </div>
            <div className="border-b border-navy-800 pb-3">
              <textarea
                name=""
                id=""
                cols="20"
                rows="10"
                className="mt-3 h-40 w-full resize-none rounded-lg border border-navy-800 p-3"
                placeholder="Tulis komentar kamu disini"
                onChange={handleComment}
              />
              {
                // eslint-disable-next-line react/jsx-wrap-multilines
                isSubmitting ? (
                  <button
                    type="button"
                    className="mt-3 w-40 rounded-lg bg-navy-800 py-2 text-white shadow-lg shadow-navy-800"
                    disabled
                  >
                    <i className="fa-solid fa-circle-notch animate-spin text-white" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-3 w-40 rounded-lg bg-navy-800 py-2 text-white shadow-lg shadow-navy-800"
                    onClick={handleCommentSubmit}
                  >
                    Kirim
                  </button>
                )
              }
            </div>
          </div>
          <div className="mt-3 flex flex-col items-center justify-center">
            {data.comments.length === 0 ? (
              <span className="text-lg font-medium text-navy-800">
                Belum ada Pembahasan
              </span>
            ) : (
              <div className="flex w-full flex-col">
                {data.comments.map((comment) => (
                  <QuestionResponseCard key={comment.id} data={comment} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
