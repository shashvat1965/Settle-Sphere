import React, { useState } from "react";
import "./Tab.css";
import Profile from "../../public/GroupPicture.png";
import Solana from "../../public/Solana.svg";
import Activity from "./Activity";
import Total from "./Total";

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState("activity");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tab">
      <div className="tab-header">
        <div className="tab-profile-picture">
          <img src={Profile} alt="" />
        </div>
        <div className="tab-profile-data">
          <div className="tab-heading">Very Long Group Name 2</div>
          <div className="tab-created">
            created by <span>Shivang Rai</span>
          </div>
          <div className="tab-last-bill">
            created on <span>31st Oct 2023</span>
          </div>
          <div className="tab-group-owed">
            You Owe :<span> 1.98 </span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="tab-buttons">
        <div
          className={`tab-button-item ${selectedTab === "activity" ? "selected-button" : ""}`}
          onClick={() => handleTabClick("activity")}
        >
          Activity
        </div>
        <div
          className={`tab-button-item ${selectedTab === "totals" ? "selected-button" : ""}`}
          onClick={() => handleTabClick("totals")}
        >
          Totals
        </div>
        {/* <div
          className={`tab-button-item ${selectedTab === "settle" ? "selected-button" : ""}`}
          onClick={() => handleTabClick("settle")}
        >
          Settle Up
        </div> */}
      </div>
      {selectedTab === "activity" && <Activity />}
      {selectedTab === "totals" && <Total />}
      {selectedTab === "settle" && <Settle />}
    </div>
  );
};

export default Tab;
