import React from "react";
import "./Expenses.css";
import Purple from "../../public/purple-square.png";
import Green from "../../public/green-square.png";
import Circle from "../../public/circle.png";
import Solana from "../../public/Solana.svg";
import Got from "../../public/GotBack.svg";
import Owned from "../../public/Owned.svg";
import TransactionProfile from '../../public/transaction-profile.png'

const Expenses = () => {
  return (
    <div className="expenses">
      <div className="expenses-header">
        <span>Expenses</span>
        <span></span>
      </div>
      <div className="expenses-data">
        <div className="expenses-asset">
          <img className="purple" src={Purple} alt="" />
          <img className="green" src={Green} alt="" />
          <img className="circle" src={Circle} alt="" />
          <div className="data">
            <span>1.98</span>
            <img src={Solana} alt="" />
          </div>
        </div>
      </div>
      <div className="expenses-balance">
        <div className="got-back">
          <div className="got-arrow">
            <img src={Got} alt="" />
          </div>
          <div className="got-data-section">
            <span>Got Back</span>
            <div className="got-data">
              <span>1.98</span>
              <img src={Solana} alt="" />
            </div>
          </div>
        </div>
        <div className="owned">
          <div className="got-arrow owned-arrow">
            <img src={Owned} alt="" />
          </div>
          <div className="got-data-section">
            <span>Totally Owed</span>
            <div className="got-data">
              <span>5.96</span>
              <img src={Solana} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="transaction">
        <div className="transaction-heading">Transactions</div>
        <ul className="spendings">
            <li className="spent-details">
                <div className="transaction-profile">
                    <img src={TransactionProfile} alt="" />
                </div>
                <div className="group-name">Very Long Group Name 1</div>
                <div className="spent-data">
                    <span>-200</span>
                    <img src={Solana} alt="" />
                </div>

            </li>
            <li className="spent-details">
                <div className="transaction-profile">
                    <img src={TransactionProfile} alt="" />
                </div>
                <div className="group-name">Very Long Group Name 1</div>
                <div className="spent-data">
                    <span>-200</span>
                    <img src={Solana} alt="" />
                </div>

            </li>
            <li className="spent-details">
                <div className="transaction-profile">
                    <img src={TransactionProfile} alt="" />
                </div>
                <div className="group-name">Very Long Group Name 1</div>
                <div className="spent-data">
                    <span>-200</span>
                    <img src={Solana} alt="" />
                </div>

            </li>
            <li className="spent-details">
                <div className="transaction-profile">
                    <img src={TransactionProfile} alt="" />
                </div>
                <div className="group-name">Very Long Group Name 1</div>
                <div className="spent-data">
                    <span>-200</span>
                    <img src={Solana} alt="" />
                </div>

            </li>
            <li className="spent-details">
                <div className="transaction-profile">
                    <img src={TransactionProfile} alt="" />
                </div>
                <div className="group-name">Very Long Group Name 1</div>
                <div className="spent-data">
                    <span>-200</span>
                    <img src={Solana} alt="" />
                </div>

            </li>
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
