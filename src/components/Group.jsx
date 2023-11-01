import React from "react";
import "./Group.css";
import GroupBox from "./GroupBox";
const Group = () => {
  return (
    <div className="group">
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
    </div>
  );
};

export default Group;
