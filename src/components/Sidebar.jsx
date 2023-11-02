import React, { useContext } from "react";
import "./Sidebar.css";
import SettleSphere from "../../public/SettleSphere.svg";
import ProfilePic from "../../public/profile.png";
import { useWallet } from "@solana/wallet-adapter-react";
import GlobalContext from "../context/GlobalContext";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

const Sidebar = () => {
  const { disconnect } = useWallet();

  const { setIsConnected } = useContext(GlobalContext);
  const handleSignOut = () => {
    setIsConnected(false);
    disconnect();
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
        <li className="selected-tab">
          <span>Home</span>
        </li>
        <li>
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
