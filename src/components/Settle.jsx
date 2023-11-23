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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBalance() {
      try {
        const res = await fetch(
          `https://bits-dvm.org/settlesphere/api/v1/txn/group/${activeGroup}`,
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getBalance();
  }, [activeGroup, token]);

  const owesArray = users.map((user) => {
    const matchingTxn = owes.find(
      (txn) => txn.edges.destination.id === user.id
    );
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
  // console.log(filteredOwesArray);

  return (
    <div className="settle">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Select a Balance to Settle</span>
      </div>
      {isLoading ? (
        <div className="loader-container-settle">
          <span class="loader"></span>
        </div>
      ) : filteredOwesArray && filteredReceivesArray ? (
        <div className="settle-container">
          {filteredOwesArray.length > 0
            ? filteredOwesArray.map((item) => (
                <SettleAccount
                  id={item.id}
                  key={item.id}
                  name={item.username}
                  amount={item.amount}
                  ownerId={item.edges["destination"].id}
                  pubKey={item.pubKey}
                  type="owe"
                />
              ))
            : filteredReceivesArray.length === 0 && (
                <div className="no-settlements">
                  <span>No outstanding settlements available.</span>
                </div>
              )}
          {filteredReceivesArray.length > 0 &&
            filteredReceivesArray.map((item) => (
              <SettleAccount
                id={item.id}
                key={item.id}
                name={item.username}
                amount={item.amount}
                type="receives"
              />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Settle;
