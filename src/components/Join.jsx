import React, { useContext } from "react";
import "./Join.css";
import GlobalContext from "../context/GlobalContext";

const Join = () => {
  const { setJoin } = useContext(GlobalContext);
  const handleJoin = () => {
    setJoin(false);
  };
  const showJoin = (e) => {
    if (e.target === e.currentTarget) {
      setJoin(false);
    }
  };
  return (
    <div className="Join-group" onClick={showJoin}>
      <div className="Join-container">
        <div className="Join-inputs">
            <div className="Join-detail">Enter Group ID</div>
          <div className="Join-name">
            <input type="text" />
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
