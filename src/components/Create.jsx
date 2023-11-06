import React, { useContext, useState, useEffect } from "react";
import "./Create.css";
import profile from "../../public/profile.png";
import GlobalContext from "../context/GlobalContext";

const Create = () => {
  const { setCreate, token, groups } = useContext(GlobalContext);
  const [createName, setCreateName] = useState("");

  async function createGroup() {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/v1/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: createName
        })
      });

      const data = await res.json();
      console.log(groups.push(data));
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleCreate = () => {
    setCreate(false);
    createGroup();
  };
  const showCreate = (e) => {
    if (e.target === e.currentTarget) {
      setCreate(false);
    }
  };
  const handleCreateChange = (e) => {
    setCreateName(e.target.value);
  };
  return (
    <div className="create-group" onClick={showCreate}>
      <div className="create-container">
        <div className="create-inputs">
          <div className="create-photo">
            <img src={profile} alt="" />
            <div className="create-photo-text">Select Group Picture</div>
          </div>
          <div className="create-name">
            <input
              type="text"
              placeholder="Enter Group Name"
              value={createName}
              onChange={handleCreateChange}
            />
          </div>
        </div>
        <div className="create-group-btn">
          <button onClick={handleCreate}>Create Group</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
