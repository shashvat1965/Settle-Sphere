import React, { useContext } from "react";
import "./SettleAccount.css";
import Picture from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg";
import GlobalContext from "../context/GlobalContext";

const SettleAccount = ({ id, name, amount, type, ownerId }) => {
  const { setSelectedTab, setSettleAccount, settleAccount } = useContext(GlobalContext);
  const handleRecord = () => {
    setSelectedTab("record");
    setSettleAccount([
      {
        id: id,
        name: name,
        amount: amount,
        ownerId: ownerId,
      }
    ]);
  };
  return (
    <div className="settle-account" onClick={ type === "owe" ? handleRecord : null}>
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
