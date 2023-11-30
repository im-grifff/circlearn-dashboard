/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionResponseCard from "./components/QuestionResponseCard";

import api from "../../../config/api";
import Popup from "reactjs-popup";
import RichTextEditor from "./components/RichTextEditor";

export default function QuestionDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createQuestionForm, setCreateQuestionForm] = useState({
    title: "",
    description: "",
    keyword: [],
  });

  const navigate = useNavigate();
  const param = useParams();

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
      .get(`/posts/comments/${param.questionId}`, {
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
      <span
        key={tag}
        className="rounded-md bg-navy-800 px-2 py-1 text-sm text-white"
      >
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
        `/admin/posts/comments/create/${param.questionId}`,
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

  const handleMarkAsSolved = () => {
    api
      .put(`/posts/solved/${param.questionId}`, {
        solved: true,
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

  const handleUnmarkAsSolved = () => {
    api
      .put(`/posts/solved/${param.questionId}`, {
        solved: false,
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

  // console.log(dataUser);
  console.log("post", data.post);
  console.log("user", dataUser.data);

  console.log("comments", data.comments);

  // sort comments by updatedAt
  data.comments?.sort((a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    return dateB - dateA;
  });

  const handleDeleteQuestion = () => {
    const token = localStorage.getItem("token");
    api
      .delete(`/admin/posts/${param.questionId}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleCreateQuestionForm = (e) => {
    if (e.target.name === "keyword") {
      const keyword = e.target.value.split(",");
      setCreateQuestionForm({
        ...createQuestionForm,
        [e.target.name]: keyword,
      });
      return;
    }
    setCreateQuestionForm({
      ...createQuestionForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    api
      .put(
        `/admin/posts/${param.questionId}`,
        {
          title_form: createQuestionForm.title,
          description_form: createQuestionForm.description,
          tags_form: createQuestionForm.keyword,
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

  console.log("data", data);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <>
      {loading ? (
        <div className="ml-auto flex items-center justify-center pt-20">
          <i className="fa-solid fa-circle-notch animate-spin text-3xl text-navy-800" />
        </div>
      ) : (
        <div className="container mx-auto mt-4 mb-10 px-2">
          <button type="button" onClick={() => navigate(-1)} className="py-3">
            {"< Kembali"}
          </button>
          <div className="mt-3 flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:items-start ">
            {/* <div className="flex items-center justify-center w-24">
              <img src={avatar} alt="" />
            </div> */}
            <div className="flex flex-grow flex-col items-center justify-center lg:block lg:items-start">
              <h3 className="mb-2 text-xl font-semibold">
                {data.post[0].username_author}
              </h3>
              <div className="mb-1 flex items-center">
                <i className="fa-solid fa-clock mr-3 flex h-5 w-5 items-center justify-center text-xl text-navy-800" />
                <span className="font-medium text-navy-800 ">
                  {renderTime()}
                </span>
              </div>
              <div className="mb-1 flex items-center">
                <i className="fa-solid fa-message mr-3 flex h-5 w-5 items-center justify-center text-xl text-navy-800" />
                {renderReply()}
              </div>
            </div>
            <div>
              <Popup
                trigger={
                  <button
                    type="button"
                    className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-lg shadow-navy-800"
                  >
                    Edit Question
                  </button>
                }
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                modal
                nested
              >
                {(close) => (
                  <form className="m-4 max-h-screen overflow-scroll rounded-lg bg-white p-4 pb-24 shadow-lg lg:overflow-auto">
                    <h2 className="mb-4 text-xl font-semibold">
                      Ask a question
                    </h2>
                    <div>
                      <p>Cara mengajukan pertanyaan:</p>
                      <ol className="list-inside list-decimal">
                        <li>
                          Pastikan pertanyaan Anda belum pernah di bahas pada
                          forum ini, Anda bisa melakukan searching terlebih
                          dahulu dengan memasukkan kata kunci.
                        </li>
                        <li>
                          Mulailah dengan menuliskan judul pertanyaan Anda
                          secara singkat dan jelas
                        </li>
                        <li>
                          Sampaikan kendala permasalahan Anda dengan tidak
                          berbelit-belit
                        </li>
                        <li>
                          Tambahkan tag yang membantu memunculkan pertanyaan
                          Anda kepada anggota komunitas yang lain.
                        </li>
                      </ol>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="title"
                        className="text-lg font-semibold text-navy-800"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full flex-grow rounded-lg border border-navy-800 px-2 py-1"
                        onChange={(e) => handleCreateQuestionForm(e)}
                        defaultValue={data.post[0].title}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="description"
                        className="text-lg font-semibold text-navy-800"
                      >
                        Write your question
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        className="h-40 w-full flex-grow rounded-lg border border-navy-800 px-2 py-1"
                        onChange={(e) => handleCreateQuestionForm(e)}
                        defaultValue={data.post[0].description}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="tags"
                        className="text-lg font-semibold text-navy-800"
                      >
                        Add Keywords
                      </label>
                      <span> *minimal 3 keywords. use ‘,’ to seprate</span>
                      <input
                        type="text"
                        id="tags"
                        name="keyword"
                        className="w-full flex-grow rounded-lg border border-navy-800 px-2 py-1"
                        onChange={(e) => handleCreateQuestionForm(e)}
                        defaultValue={data.post[0].tags.join(",")}
                      />
                    </div>
                    <div className="mt-3 text-end">
                      <button
                        type="button"
                        className="mt-2 mr-3 rounded-md border-2 border-navy-800 px-6 py-2 font-semibold text-navy-800 sm:px-10 lg:mt-0 lg:ml-2"
                        onClick={() => {
                          close();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="mt-2 rounded-md bg-navy-800 px-6 py-2 text-white shadow-lg shadow-navy-800 sm:px-10 lg:mt-0 lg:ml-2"
                        onClick={handleCreateQuestion}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                )}
              </Popup>

              <button
                type="button"
                className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500"
                onClick={handleDeleteQuestion}
              >
                Delete Question
              </button>
              {/* if owner add "mark as solved" button */}
              {data.post[0].solved === false ? (
                <button
                  type="button"
                  className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-navy-800 px-6 py-3 font-semibold text-white shadow-lg shadow-navy-800"
                  onClick={handleMarkAsSolved}
                >
                  Mark as Solved
                </button>
              ) : (
                <button
                  type="button"
                  className="mb-2 ml-2 mr-2 flex-grow rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white "
                  onClick={handleUnmarkAsSolved}
                >
                  Mark as Unsolved
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_MAIN_URL}/question/detail/${param.questionId}`
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
              {/* <img src={avatar} alt="" className="w-10 h-10" /> */}
              <span className="font-semibold">{dataUser.data.username}</span>
            </div>
            <div className="border-b border-navy-800 pb-3">
              <div className="mt-3">
                <RichTextEditor
                  content={commentForm}
                  setContent={setCommentForm}
                />
              </div>
              {/* <textarea
                name=''
                id=''
                cols='20'
                rows='10'
                className='w-full h-40 p-3 mt-3 border rounded-lg resize-none border-navy-800'
                placeholder='Tulis komentar kamu disini'
                onChange={handleComment}
              /> */}
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
                    Send
                  </button>
                )
              }
            </div>
          </div>
          <div className="mt-3 flex flex-col items-center justify-center">
            {data.comments.length === 0 ? (
              <span className="text-lg font-medium text-navy-800">
                No Discussion
              </span>
            ) : (
              <div className="flex w-full flex-col">
                {data.comments.map((comment) => (
                  <QuestionResponseCard
                    key={comment._id}
                    data={comment}
                    userData={dataUser.data}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
