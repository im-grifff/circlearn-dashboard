import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import DiscussionRoomCard from "./components/DiscussionRoomCard";

import api from "config/api";

export default function Default() {
  const [discussionRooms, setDiscussionRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    // get param query "token" from url and save to localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    token && localStorage.setItem("token", token);

    if (localStorage.getItem("token") === null) {
      window.location.href = `${process.env.REACT_APP_MAIN_URL}/login`;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/runding", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        setDiscussionRooms(response.data.data);
        setSearchResults(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  // search function for discussion rooms

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchResults(discussionRooms);
    const newResults = discussionRooms.filter((discussion) =>
      discussion.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(newResults);

    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // filter is sains,teknologi,other separated by comma (,) in the database

    if (filter === "all") {
      setSearchResults(discussionRooms);
    } else {
      const newResults = discussionRooms.filter((discussion) =>
        discussion.jenisRunding.toLowerCase().includes(filter.toLowerCase())
      );
      setSearchResults(newResults);
    }
  }, [discussionRooms, filter]);

  console.log(discussionRooms);

  useEffect(() => {
    // get topics
    const token = localStorage.getItem("token");
    api
      .get("/topics", {
        headers: {
          "auth-token": token, // the token is a variable which holds the token
        },
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data.data);
        setTopics(response.data.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="mb-4 flex flex-col lg:flex-row">
          <form
            onSubmit={handleSubmit}
            className="flex flex-grow flex-col sm:flex-row"
          >
            <input
              type="text"
              placeholder="Search Rooms"
              className="ml-1 flex-grow rounded-lg border-2 border-navy-800 px-2 py-1 sm:ml-auto"
              value={searchTerm}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mt-2 ml-2 rounded-md bg-navy-800 px-6 py-2 text-white shadow-lg hover:shadow-navy-800 sm:mt-auto sm:px-10"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="mb-3 flex justify-between">
          <h2 className="mt-auto mb-auto font-semibold text-navy-200">
            List
            <span className="text-navy-800"> My Rooms</span>
          </h2>
          <div className="flex flex-row-reverse">
            <button
              onClick={() => {
                navigate("/create");
              }}
              type="button"
              className="ml-[7px] flex h-[40px] w-[120px] items-center justify-center rounded-lg bg-navy-800 p-0 text-center text-[15px] font-medium text-white shadow-lg hover:shadow-navy-800"
            >
              NEW
            </button>
            <Popup
              trigger={
                <button
                  type="button"
                  className="ml-[7px] flex h-[40px] w-[120px] items-center justify-center rounded-lg bg-navy-800 p-0 text-center text-[15px] font-medium text-white shadow-lg hover:shadow-navy-800"
                >
                  FILTER
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="w-full max-w-[300px] rounded-lg bg-white p-4 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">Filter by Tags</h2>
                    <button
                      type="button"
                      className="text-navy-800"
                      onClick={() => {
                        close();
                      }}
                    >
                      <i className="fa-solid fa-times" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="tags" className="font-semibold">
                      Tags
                    </label>
                    <select
                      name="tags"
                      id="tags"
                      onChange={(e) => {
                        setFilter(e.target.value);
                      }}
                      value={filter}
                      className="rounded-lg border-2 border-navy-800 px-2 py-1"
                    >
                      <option value="all">All</option>
                      {topics.map((topic) => (
                        <option key={topic._id} value={topic.topicName}>
                          {topic.topicName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="text-navy-800"
                      onClick={() => {
                        close();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {loading ? (
            <div className="ml-auto flex items-center justify-center pt-20">
              <i className="fa-solid fa-circle-notch animate-spin text-3xl text-navy-800" />
            </div>
          ) : (
            searchResults.map((discussionRoom) => (
              <DiscussionRoomCard
                key={discussionRoom._id}
                discussionRoom={discussionRoom}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
