import React, { useContext } from "react";
import "./GroupBox.css";
import Profile from "../../public/profile.png";
import Solana from '../../public/Solana.svg'
import GlobalContext from "../context/GlobalContext";

const GroupBox = ({groupName, groupCode, createdBy}) => {
  const {setGroup, setActiveGroup} = useContext(GlobalContext)
  const handleGroup = () => {
    setGroup(true)
    setActiveGroup(groupCode)
  }
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
        <div className="last-bill">
          Last Bill Paid by <span>Shivang Rai</span>
        </div>
        <div className="group-owed">
          You Owe : 
            <span> 1.98 </span>
            <img src={Solana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GroupBox;
