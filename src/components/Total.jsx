import React from "react";
import "./Total.css";
import Solana from "../../public/Solana.svg";
import DownArrow from "../../public/down-arrow.svg"

const Total = () => {
  return (
    <div className="total">
      <div className="total-left">
        <div className="total-group">
          <div className="total-group-heading">Total Group Spending</div>
          <div className="total-group-data">
            <span>5345.2</span>
            <img src={Solana} alt="" />
          </div>
        </div>
        <div className="total-group">
          <div className="total-group-heading">You Total Paid For</div>
          <div className="total-group-data">
            <span>2024.5</span>
            <img src={Solana} alt="" />
          </div>
        </div>
        <div className="total-group">
          <div className="total-group-heading">Your Total Share</div>
          <div className="total-group-data">
            <span>1254.25</span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="total-right">
        <div className="filter">
          <select className="time-filter">
            <option value="allTime">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="thisDay">This Day</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Total;
