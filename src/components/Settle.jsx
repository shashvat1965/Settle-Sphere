import React, { useContext } from "react";
import "./Settle.css";
import BackBtn from "../../public/back-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import SettleAccount from "./SettleAccount";

const Settle = () => {
  const { setSelectedTab } = useContext(GlobalContext);

  const handleBack = () => {
    setSelectedTab("activity");
  };
  return (
    <div className="settle">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Select a Balance to Settle</span>
      </div>
      <SettleAccount />
      <SettleAccount />
      <SettleAccount />
      <SettleAccount />

    </div>
  );
};

export default Settle;
