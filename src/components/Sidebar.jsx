import React, { useContext, useRef, useState } from "react";
import "./Sidebar.css";
import SettleSphere from "../../public/SettleSphere.svg";
import ProfilePic from "../../public/profile.png";
import { useWallet } from "@solana/wallet-adapter-react";
import GlobalContext from "../context/GlobalContext";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

const Sidebar = () => {
  const { disconnect } = useWallet();

  const { setIsConnected, setGroup } = useContext(GlobalContext);
  const homeRef = useRef(null);
  const groupRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("home");

  const handleSignOut = () => {
    setIsConnected(false);
    disconnect();
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleHome = () => {
    setGroup(false);
    handleTabClick("home"); 
  };

  const handleGroup = () => {
    setGroup(true);
    handleTabClick("group"); 
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
          ref={homeRef}
          className={selectedTab === "home" ? "selected-tab" : ""}
        >
          <span>Home</span>
        </li>
        <li
          onClick={handleGroup}
          ref={groupRef}
          className={selectedTab === "group" ? "selected-tab" : ""}
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
