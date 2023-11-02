import React, { useContext } from "react";
import './ActivityItem.css'
import ActivityIcon from "../../public/Activity.png";
import Solana from "../../public/Solana.svg";
import GlobalContext from "../context/GlobalContext";


const ActivityItem = () => {

  const { setSelectedTab } = useContext(GlobalContext)

  const handleActivity = () => {
    setSelectedTab("settle")
  }

  return (
    <div className="activity-item" onClick={handleActivity}>
      <div className="activity-item-month">
        <div className="month">Oct</div>
        <div className="year">23</div>
      </div>
      <div className="activity-icon">
        <img src={ActivityIcon} alt="" />
      </div>
      <div className="activity-details">
        <div className="activity-title">Singapore Trip</div>
        <div className="activity-data">
          <span className="activity-data-name">Shivang</span>
          <span className="activity-data-logic">Paid</span>
          <span className="activity-data-amount">1</span>
          <span className="activity-data-currency">
            <img src={Solana} alt="" />
          </span>
        </div>
      </div>
      <div className="activity-type">
        <span>You borrowed</span>
        <div className="activity-type-data">
          <span>200.88</span>
          <img src={Solana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
