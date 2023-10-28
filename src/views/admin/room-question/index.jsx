/* eslint-disable comma-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useParams, Link } from "react-router-dom";
import QuestionCard from "./components/QuestionCard";

import api from "../../../config/api";

export default function RoomQuestions() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [createQuestionForm, setCreateQuestionForm] = useState({
    title: "",
    description: "",
    keyword: [],
  });

  const param = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`/runding/posts/${param.id}`, {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setData(response.data.data);
        setSearchData(response.data.data);
        // eslint-disable-next-line no-console
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [param.id]);

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    api
      .post(
        `/runding/posts/create/${param.id}`,
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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchData(data);
      // eslint-disable-next-line array-callback-return, max-len
      const newResults = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchData(newResults);

      setSearchTerm("");
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="flex flex-col lg:flex-row">
          <input
            type="text"
            placeholder="Cari pertanyaan"
            className="w-full rounded-lg border border-gray-400 px-4 py-2"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </div>
        <div>
          <h2 className="mt-2 mb-3 font-semibold">All Question</h2>
          <Popup
            trigger={
              <button
                type="button"
                className="rounded-md bg-navy-800 px-6 py-1 font-bold text-white"
              >
                NEW
              </button>
            }
            modal
            nested
            overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
          >
            {(close) => (
              <form className="m-4 max-h-screen overflow-scroll rounded-lg bg-white p-4 shadow-lg lg:overflow-auto">
                <h2 className="mb-4 text-xl font-semibold">Ask a question</h2>
                <div>
                  <p>Cara mengajukan pertanyaan:</p>
                  <ol className="list-inside list-decimal">
                    <li>
                      Pastikan pertanyaan Anda belum pernah di bahas pada forum
                      ini, Anda bisa melakukan searching terlebih dahulu dengan
                      memasukkan kata kunci.
                    </li>
                    <li>
                      Mulailah dengan menuliskan judul pertanyaan Anda secara
                      singkat dan jelas
                    </li>
                    <li>
                      Sampaikan kendala permasalahan Anda dengan tidak
                      berbelit-belit
                    </li>
                    <li>
                      Tambahkan tag yang membantu memunculkan pertanyaan Anda
                      kepada anggota komunitas yang lain.
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
                    className="mt-2 rounded-md bg-navy-800 px-6 py-2 text-white shadow-lg sm:px-10 lg:mt-0 lg:ml-2"
                    onClick={handleCreateQuestion}
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </Popup>
          {loading ?? (
            <div className="ml-auto flex items-center justify-center pt-20">
              <i className="fa-solid fa-circle-notch animate-spin text-3xl text-navy-800" />
            </div>
          )}
          {data.length > 0 ? (
            <div className="flex flex-col gap-4">
              {searchData.map((item) => (
                <QuestionCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            data.length === 0 ?? (
              <div className="flex items-center justify-center pt-20">
                <p className="text-center text-navy-800">No question yet</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
