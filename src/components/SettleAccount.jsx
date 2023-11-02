import React, { useContext } from "react";
import "./SettleAccount.css";
import Picture from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg"
import GlobalContext from "../context/GlobalContext";

const SettleAccount = () => {
    const { setSelectedTab } = useContext(GlobalContext)
    const handleRecord = () => {
        setSelectedTab("record")
    }
  return (
    <div className="settle-account" onClick={handleRecord}>
      <div className="settle-profile">
        <img src={Picture} alt="" />
      </div>
      <div className="settle-name">Harsh Singh</div>
      <div className="settle-record">
        <div className="settle-activity">
            <span>You are owed</span>
        </div>
        <div className="settle-data">
          <span>200</span>
          <img src={Solana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SettleAccount;
