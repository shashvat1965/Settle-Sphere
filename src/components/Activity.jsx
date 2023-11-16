import React, { useContext, useEffect, useState } from "react";
import "./Activity.css";
import ActivityItem from "./ActivityItem";
import GlobalContext from "../context/GlobalContext";

const Activity = () => {
  const {
    activeGroup,
    token,
    username,
    users,
    setUsers,
    history,
    setHistory,
    setUserId,
    setActiveGroup,
    userId,
    groups,
    setUsername,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getUsers() {
      if (activeGroup.length < 0) {
        setActiveGroup(groups[0].code);
      }
      try {
        const res = await fetch(
          `https://bits-dvm.org/settlesphere/api/v1/groups/members/${activeGroup}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setUsers(data.users);
        const userObject = users?.find((user) => user.id === userId);
        setUsername(userObject?.username);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getUsers();
  }, [activeGroup, token]);

  useEffect(() => {
    async function getBalance() {
      if (activeGroup.length < 0) {
        setActiveGroup(groups[0].code);
      }
      try {
        const res = await fetch(
          `https://bits-dvm.org/settlesphere/api/v1/txn/group/${activeGroup}/history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        // console.log(users);
        // console.log(data.txn_history);
        setHistory(data.txn_history);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getBalance();
  }, [token, users]);
  const mergedArray = history?.map((transaction) => {
    const payer = users?.find((user) => user.id === transaction.payerId);
    const receiver = users?.find((user) => user.id === transaction.receiverId);

    return {
      payerName: payer ? payer.username : "Unknown",
      receiverName: receiver ? receiver.username : "Unknown",
      amount: transaction.amount,
      note: transaction.note,
      settled: transaction.settled,
      id: transaction.id,
      payerId: transaction.payerId,
      receiverId: transaction.receiverId,
    };
  });
  const reversedArray = mergedArray?.slice().reverse();
  // console.log(reversedArray)

  return (
    <div className="activity-container">
      {/* <div className="activity-month">October 2023</div> */}
      {history ? (
        reversedArray.map((item) => (
          <ActivityItem
            key={item.id}
            note={item.note}
            payer={item.payerId === userId ? "You" : item.payerName}
            receiver={item.receiverId === userId ? "You" : item.receiverName}
            amount={item.amount}
            settled={item.settled}
          />
        ))
      ) : (
        <div className="no-activity"><span>No transaction history to display.</span></div>
      )}
    </div>
  );
};

export default Activity;
