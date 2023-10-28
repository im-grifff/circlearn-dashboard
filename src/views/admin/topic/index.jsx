import React, { useEffect, useState } from "react";

export default function Topic() {
  const [topic, setTopic] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(false);

  useEffect(() => {
    fetch("https://circlearn-back-end.up.railway.app/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopic(data.data);
        console.log(data.data);
      });
  }, [reloadAPI]);

  const addTopic = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    fetch("https://circlearn-back-end.up.railway.app/topics/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicName: e.target[0].value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setTopic([...topic, data]);
        setReloadAPI(!reloadAPI);

        if (res.status === "ok") {
          alert("Topic added successfully");
        }
        if (res.status === "error") {
          alert(res.message);
        }
      });
  };

  const deleteTopic = (topicId) => {
    console.log(topicId);
    fetch(`https://circlearn-back-end.up.railway.app/topics/${topicId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setReloadAPI(!reloadAPI);
      });
  };

  return (
    <div className="text-navy-700">
      <div className="mt-2">
        <h1 className="mb-3 text-3xl font-bold">Topics</h1>
        <div className="mb-2">
          <form onSubmit={(e) => addTopic(e)} className="flex gap-3">
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2"
              type="text"
              placeholder="Add a topic"
              name="topicName"
              id="topicName"
            />
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              htmlFor="topicName"
            >
              Add
            </button>
          </form>
        </div>
        <div className="flex flex-wrap">
          {topic.map((topic) => (
            <div
              key={topic.topicId}
              className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {topic.topicName}

              <button
                className="ml-2 text-sm font-semibold hover:text-gray-400"
                onClick={() => deleteTopic(topic.topicId)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
