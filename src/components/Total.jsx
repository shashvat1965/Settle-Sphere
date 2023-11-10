import React, { useContext } from "react";
import "./Total.css";
import Solana from "../../public/Solana.svg";
import BackBtn from "../../public/back-arrow.svg";
import DownArrow from "../../public/down-arrow.svg";
import GlobalContext from "../context/GlobalContext";

const Total = () => {
  const { setSelectedTab, history, userId } = useContext(GlobalContext);

  const handleBack = () => {
    setSelectedTab("activity");
  };

  const totalAmount = history.reduce((sum, expense) => sum + expense.amount, 0);

  const totalShare = history.reduce((total, transaction) => {
    if (transaction.payerId === userId) {
      return total - transaction.amount;
    } else if (transaction.receiverId === userId) {
      return total + transaction.amount;
    } else {
      return total;
    }
  }, 0);

  const totalPaid = history.reduce((total, transaction) => {
     if (transaction.receiverId === userId) {
      return total + transaction.amount;
    } else {
      return total;
    }
  }, 0);
  
  
  return (
    <div className="total">
      <div className="total-heading">
        <div className="total-heading-content">
          <img src={BackBtn} alt="" onClick={handleBack} />
          <span>Totals</span>
        </div>
        {/* <div className="filter">
          <select className="time-filter">
            <option value="allTime">All Time</option>
            <option value="thisMonth">This Month</option>
            <option value="thisDay">This Day</option>
          </select>
        </div> */}
      </div>
      <div className="total-container">
        <div className="total-left">
          <div className="total-group">
            <div className="total-group-heading">Total Group Spending</div>
            <div className="total-group-data">
              <span>{totalAmount}</span>
              <img src={Solana} alt="" />
            </div>
          </div>
          <div className="total-group">
            <div className="total-group-heading">You Total Paid For</div>
            <div className="total-group-data">
              <span>{totalPaid}</span>
              <img src={Solana} alt="" />
            </div>
          </div>
          <div className="total-group">
            <div className="total-group-heading">Your Total Share</div>
            <div className="total-group-data">
              <span>{totalShare}</span>
              <img src={Solana} alt="" />
            </div>
          </div>
        </div>
        <div className="total-right"></div>
      </div>
    </div>
  );
};

export default Total;
