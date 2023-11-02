import React, { useContext } from "react";
import "./GroupBox.css";
import Profile from "../../public/profile.png";
import Solana from '../../public/Solana.svg'
import GlobalContext from "../context/GlobalContext";

const GroupBox = () => {
  const {setGroup} = useContext(GlobalContext)
  const handleGroup = () => {
    setGroup(true)
  }
  return (
    <div onClick={handleGroup} className="group-box">
      <div className="box-picture">
        <img src={Profile} alt="" />
      </div>
      <div className="box-data">
        <div className="box-heading">Very Long Group Name 2</div>
        <div className="created">
          Created By <span>Shivang Rai</span>
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
