import React, { useContext, useEffect, useState } from "react";
import "./Activity.css";
import ActivityItem from "./ActivityItem";
import GlobalContext from "../context/GlobalContext";

const Activity = () => {
  const { activeGroup, token, username, users, setUsers, history, setHistory, setUserId } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/groups/members/${activeGroup}`,
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
        const userObject = users.find(user => user.username === username);
        setUserId(userObject.id)
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getUsers();
  }, [activeGroup, token]);

  useEffect(() => {
    async function getBalance() {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/txn/group/${activeGroup}/history`,
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
    };
  });
  const reversedArray = mergedArray.slice().reverse();

  return (
    <div className="activity-container">
      {/* <div className="activity-month">October 2023</div> */}
      {history
        ? reversedArray.map((item) => (
            <ActivityItem
              note={item.note}
              payer={item.payerName === username ? "You" : item.payerName}
              receiver={
                item.receiverName === username ? "You" : item.receiverName
              }
              amount={item.amount}
            />
          ))
        : ""}
    </div>
  );
};

export default Activity;
