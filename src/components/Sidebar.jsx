import React, { useContext, useRef, useState } from "react";
import "./Sidebar.css";
import SettleSphere from "../../public/SettleSphere.svg";
import ProfilePic from "../../public/profile.png";
import { useWallet } from "@solana/wallet-adapter-react";
import GlobalContext from "../context/GlobalContext";

const Sidebar = () => {
  const { disconnect } = useWallet();

  const { setIsConnected, setGroup, group } = useContext(GlobalContext);

  const handleSignOut = () => {
    setIsConnected(false);
    disconnect();
  };


  const handleHome = () => {
    setGroup(false);
  };

  const handleGroup = () => {
    setGroup(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-heading">
        <img src={SettleSphere} alt="" />
      </div>
      <div className="profile-pic">
        <img src={ProfilePic} alt="" />
      </div>
      <div className="profile-name">Shivang Rai</div>
      <ul className="sidebar-tabs">
        <li
          onClick={handleHome}
          className={group ? "" : "selected-tab"}
        >
          <span>Home</span>
        </li>
        <li
          onClick={handleGroup}
          className={!group ? "" : "selected-tab"}
        >
          <span>Group</span>
        </li>
      </ul>
      <div className="logout-btn">
        <span onClick={handleSignOut}>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
