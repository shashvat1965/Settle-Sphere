import React, { useContext, useState, useEffect } from "react";
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
import Make from "./Make";

const Tab = () => {
  const {
    selectedTab,
    setSelectedTab,
    groups,
    activeGroup,
    setActiveGroup,
    token,
    history,
  } = useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);

  if (!activeGroup.length > 0) {
    setActiveGroup(groups[0].code);
  }

  useEffect(() => {
    let isMounted = true;

    async function getBalance() {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/txn/group/${activeGroup}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        let owes = 0;
        let receives = 0;

        if (data.txns.owes.length > 0) {
          owes = data.txns.owes.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          }, 0);
        }

        if (data.txns.receives.length > 0) {
          receives = data.txns.receives.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          }, 0);
        }

        const amount = receives - owes;

        if (isMounted) {
          setTotalAmount(amount);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getBalance();

    return () => {
      isMounted = false;
    };
  }, [activeGroup, token, history]);

  var currentGroup = groups.find((group) => group.code === activeGroup);

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
    new Date(currentGroup?.created_at)
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
            You {totalAmount > 0 ? "are Owed" : "Owe"} :
            <span> {Math.abs(totalAmount)} </span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="tab-buttons">
        <div
          className={`tab-button-item ${
            selectedTab === "settle" ||
            selectedTab === "record"
              ? "selected-button"
              : ""
          }`}
          onClick={() => handleTabClick("settle")}
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
        <div
          className={`tab-button-item ${selectedTab === "make" ? "selected-button" : ""}`}
          onClick={() => handleTabClick("make")}
        >
          Create Transaction
        </div>
      </div>
      {selectedTab === "activity" && <Activity />}
      {selectedTab === "totals" && <Total />}
      {selectedTab === "settle" && <Settle />}
      {selectedTab === "record" && <Record />}
      {selectedTab === "make" && <Make />}
    </div>
  );
};

export default Tab;
