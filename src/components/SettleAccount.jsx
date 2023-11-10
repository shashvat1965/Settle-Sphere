import React, { useContext } from "react";
import "./SettleAccount.css";
import Picture from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg";
import GlobalContext from "../context/GlobalContext";

const SettleAccount = ({ name, amount, type }) => {
  const { setSelectedTab } = useContext(GlobalContext);
  const handleRecord = () => {
    setSelectedTab("record");
  };
  return (
    <div className="settle-account" onClick={handleRecord}>
      <div className="settle-profile">
        <img src={Picture} alt="" />
      </div>
      <div className="settle-name">{name}</div>
      <div className="settle-record">
        <div className="settle-activity">
          {type === 'receives' ? <span className="settle-type-receive">You are owed</span> : <span className="settle-type-owe">You Owe</span>}
        </div>
        <div className="settle-data">
          <span>{amount}</span>
          <img src={Solana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SettleAccount;
