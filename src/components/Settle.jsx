import React, { useContext, useEffect, useState } from "react";
import "./Settle.css";
import BackBtn from "../../public/back-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import SettleAccount from "./SettleAccount";

const Settle = () => {
  const { setSelectedTab, token, activeGroup, users, username } =
    useContext(GlobalContext);
  const [owes, setOwes] = useState([]);
  const [receives, setReceives] = useState([]);

  useEffect(() => {
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
        // console.log(data)
        setOwes(data.txns?.owes);
        setReceives(data.txns?.receives);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getBalance();
  }, [activeGroup, token]);

  const owesArray = users.map((user) => {
    const matchingTxn = owes.find((txn) => txn.edges.destination.id === user.id);
    return matchingTxn ? { ...user, ...matchingTxn } : null;
  });

  const receivesArray = users.map((user) => {
    const matchingTxn = receives.find((txn) => txn.edges.source.id === user.id);
    return matchingTxn ? { ...user, ...matchingTxn } : null;
  });

  const filteredOwesArray = owesArray.filter((item) => item !== null);
  const filteredReceivesArray = receivesArray.filter((item) => item !== null);


  const handleBack = () => {
    setSelectedTab("activity");
  };

  return (
    <div className="settle">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Select a Balance to Settle</span>
      </div>
      <div className="settle-container">
        {filteredReceivesArray.length > 0
          ? filteredReceivesArray.map((item) => (
              <SettleAccount
                key={item.id}
                name={item.username}
                amount={item.amount}
                type="receives"
              />
            ))
          : ""}

        {filteredOwesArray.length > 0
          ? filteredOwesArray.map((item) => (
              <SettleAccount
                key={item.id}
                name={item.username}
                amount={item.amount}
                type="owe"
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Settle;
