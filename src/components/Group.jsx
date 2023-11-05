import React, { useContext, useEffect } from "react";
import "./Group.css";
import GroupBox from "./GroupBox";
import GlobalContext from "../context/GlobalContext";
import Create from "./Create";
import Join from "./Join";
const Group = () => {
  const { token, create, setCreate, join, setJoin } = useContext(GlobalContext);

  useEffect(() => {
    async function getGroups() {
      try {
        const res = await fetch(
          "http://127.0.0.1:3000/api/v1/txn/group/75d4f46d-d141-4099-a28a-bcdae7cc6252",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    getGroups();
  }, []);

  const handleCreate = () => {
    setCreate(true);
  };
  const handleJoin = () => {
    setJoin(true);
  };

  return (
    <div className="group">
      {create ? <Create /> : ""}
      {join ? <Join /> : ""}
      <div className="group-container">
        <div className="group-heading">My Groups</div>
        <div className="search-box">
          <input type="text" placeholder="Search for Groups" />
        </div>
        <div className="group-box-container">
          <GroupBox />
          <GroupBox />
          <GroupBox />
          <GroupBox />
        </div>
        <div className="create-join-container">
          <button onClick={handleCreate} className="create">
            Create Group
          </button>
          <button onClick={handleJoin} className="join">Join Group</button>
        </div>
      </div>
    </div>
  );
};

export default Group;
