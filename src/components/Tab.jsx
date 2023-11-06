import React, { useContext, useState } from "react";
import "./Tab.css";
import Profile from "../../public/GroupPicture.png";
import Solana from "../../public/Solana.svg";
import Activity from "./Activity";
import Total from "./Total";
import Settle from "./Settle";
import GlobalContext from "../context/GlobalContext";
import Record from "./Record";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copy from "../../public/copy.png";

const Tab = () => {
  const { selectedTab, setSelectedTab, groups, activeGroup } =
    useContext(GlobalContext);

  const currentGroup = activeGroup ? groups.find((group) => group.code === activeGroup) : groups[0] ;

  function formatDateToCustomString(date) {
    const options = { month: "short" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const day = date.getDate();
    let dayString = day.toString();
    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = "st";
          break;
        case 2:
          daySuffix = "nd";
          break;
        case 3:
          daySuffix = "rd";
          break;
        default:
          daySuffix = "th";
          break;
      }
      dayString += daySuffix;
    }

    const year = date.getFullYear();
    const yearString = year.toString().padStart(4, "0");

    const customFormattedDate = `${dayString} ${formattedDate} ${yearString}`;

    return customFormattedDate;
  }

  const dateObject = formatDateToCustomString(
    new Date(currentGroup.created_at)
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tab">
      <div className="tab-header">
        <div className="tab-profile-picture">
          <img src={Profile} alt="" draggable={false} loading="lazy" />
        </div>
        <div className="tab-profile-data">
          <div className="tab-heading">{currentGroup.name}</div>
          <div className="tab-code">
            {currentGroup.code}
            <CopyToClipboard text={currentGroup.code}>
                <img src={Copy} alt="" />
            </CopyToClipboard>
          </div>
          <div className="tab-created">
            created by <span>{currentGroup.created_by}</span>
          </div>
          <div className="tab-last-bill">
            created on <span>{dateObject}</span>
          </div>
          <div className="tab-group-owed">
            You Owe :<span> 1.98 </span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="tab-buttons">
        <div
          className={`tab-button-item ${
            selectedTab === "activity" ||
            selectedTab === "settle" ||
            selectedTab === "record"
              ? "selected-button"
              : ""
          }`}
          onClick={() => handleTabClick("activity")}
        >
          Settle Up
        </div>
        <div
          className={`tab-button-item ${
            selectedTab === "totals" ? "selected-button" : ""
          }`}
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
      {selectedTab === "record" && <Record />}
    </div>
  );
};

export default Tab;
