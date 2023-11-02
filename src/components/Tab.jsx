import React from "react";
import "./Tab.css";
import Profile from "../../public/GroupPicture.png";
import Solana from '../../public/Solana.svg'
import Activity from "./Activity";
import Total from "./Total";

const Tab = () => {
  return (
    <div className="tab">
      <div className="tab-header">
        <div className="tab-profile-picture">
          <img src={Profile} alt="" />
        </div>
        <div className="tab-profile-data">
          <div className="tab-heading">Very Long Group Name 2</div>
          <div className="tab-created">
            created by <span>Shivang Rai</span>
          </div>
          <div className="tab-last-bill">
            created on <span>1st Nov 2023</span>
          </div>
          <div className="tab-group-owed">
            You Owe :<span> 1.98 </span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="tab-buttons">
        <div className="tab-button-item ">Activity</div>
        <div className="tab-button-item selected-button">Totals</div>
        <div className="tab-button-item">Settle Up</div>
      </div>
      {/* <Activity /> */}
      <Total />
    </div>
  );
};

export default Tab;
