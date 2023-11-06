import React, { useContext, useEffect } from "react";
import "./Settle.css";
import BackBtn from "../../public/back-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import SettleAccount from "./SettleAccount";

const Settle = () => {
  const { setSelectedTab, token, activeGroup, users, setUsers } =
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
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    setTimeout(() => {
      getUsers();
    }, 100);
  }, [users]);

  const handleBack = () => {
    setSelectedTab("activity");
  };
  return (
    <div className="settle">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Select a Balance to Settle</span>
      </div>
      {users.length > 0
        ? users.map((item) => (
            <SettleAccount key={item.id} name={item.username} />
          ))
        : ""}
    </div>
  );
};

export default Settle;
