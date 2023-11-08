import React, { useContext, useState } from "react";
import "./Join.css";
import GlobalContext from "../context/GlobalContext";

const Join = () => {
  const { setJoin, token } = useContext(GlobalContext);
  const [groupCode, setGroupCode] = useState("");

  async function joinGroup() {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/v1/groups/join/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_code: groupCode,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleJoin = () => {
    if (groupCode.length > 0) {
      setJoin(false);
      joinGroup();
    }
  };
  const showJoin = (e) => {
    if (e.target === e.currentTarget) {
      setJoin(false);
    }
  };
  const handleGroupCode = (e) => {
    setGroupCode(e.target.value);
  };
  return (
    <div className="Join-group" onClick={showJoin}>
      <div className="Join-container">
        <div className="Join-inputs">
          <div className="Join-detail">Enter Group ID</div>
          <div className="Join-name">
            <input type="text" value={groupCode} onChange={handleGroupCode} />
          </div>
        </div>
        <div className="Join-group-btn">
          <button onClick={handleJoin}>Join Group</button>
        </div>
      </div>
    </div>
  );
};

export default Join;
