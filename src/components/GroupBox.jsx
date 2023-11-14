import React, { useContext, useEffect, useState } from "react";
import "./GroupBox.css";
import Profile from "../../public/profile.png";
import Solana from "../../public/Solana.svg";
import GlobalContext from "../context/GlobalContext";

const GroupBox = ({ groupName, groupCode, createdBy }) => {
  const { setGroup, setActiveGroup, token, setUsers, history } =
    useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleGroup = async () => {
    setGroup(true);
    setActiveGroup(groupCode);

    try {
      const res = await fetch(
        `https://bits-dvm.org/settlesphere/api/v1/groups/members/${groupCode}`,
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
  };

  useEffect(() => {
    async function getBalance() {
      try {
        const res = await fetch(
          `https://bits-dvm.org/settlesphere/api/v1/txn/group/${groupCode}`,
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

        if (data.txns?.owes.length > 0) {
          owes = data.txns.owes.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          }, 0);
        }

        if (data.txns?.receives.length > 0) {
          receives = data.txns.receives.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.amount;
          }, 0);
        }

        const amount = receives - owes;
        setTotalAmount(amount);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    getBalance();
  }, [groupCode, token, history]);
  return (
    <div onClick={handleGroup} className="group-box">
      <div className="box-picture">
        <img src={Profile} alt="" />
      </div>
      <div className="box-data">
        <div className="box-heading">{groupName}</div>
        <div className="created">
          Created By <span>{createdBy}</span>
        </div>
        {/* <div className="last-bill">
          Last Bill Paid by <span>Shivang Rai</span>
        </div> */}
        <div className="group-owed">
          You {totalAmount > 0 ? "are Owed" : "Owe"} :
          <span> {Math.abs(totalAmount)} </span>
          <img src={Solana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GroupBox;
