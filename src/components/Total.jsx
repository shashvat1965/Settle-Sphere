import React, { useContext, useEffect, useState } from "react";
import "./Total.css";
import Solana from "../../public/Solana.svg";
import BackBtn from "../../public/back-arrow.svg";
import DownArrow from "../../public/down-arrow.svg";
import GlobalContext from "../context/GlobalContext";

const Total = () => {
  const { setSelectedTab, history, userId, activeGroup } =
    useContext(GlobalContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalShare, setTotalShare] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  // console.log(history);

  const handleBack = () => {
    setSelectedTab("activity");
  };

  useEffect(() => {
    const totalAmount = history?.reduce(
      (sum, expense) => (!expense.settled ? sum + expense.amount : sum),
      0
    );
    setTotalAmount(totalAmount);

    const totalPaid = history?.reduce((total, transaction) => {
      if (transaction.payerId === userId && !transaction.settled) {
        return total + transaction.amount;
      } else {
        return total;
      }
    }, 0);
    setTotalPaid(totalPaid);

    const totalShare = history?.reduce((total, transaction) => {
      if (transaction.receiverId === userId && !transaction.settled) {
        return total + transaction.amount;
      } else {
        return total;
      }
    }, 0);
    setTotalShare(totalShare);
  }, [activeGroup]);

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
