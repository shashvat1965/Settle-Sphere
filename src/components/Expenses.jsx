import React, { useContext, useEffect, useState } from "react";
import "./Expenses.css";
import Purple from "../../public/purple-square.png";
import Green from "../../public/green-square.png";
import Circle from "../../public/circle.png";
import Solana from "../../public/Solana.svg";
import Got from "../../public/GotBack.svg";
import Owned from "../../public/Owned.svg";
import TransactionProfile from "../../public/transaction-profile.png";
import GlobalContext from "../context/GlobalContext";

const Expenses = () => {
  const { token } = useContext(GlobalContext);
  const [gotBack, setGotBack] = useState(0);
  const [totallyOwed, setTotallyOwed] = useState(0);
  const [sphere, setSphere] = useState(0);
  const [lentArray, setLentArray] = useState([]);
  const [owedArray, setOwedArray] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const res = await fetch(
          "https://bits-dvm.org/settlesphere/api/v1/groups/settled",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        // console.log(data.message);
        setLentArray(data.lent);
        setOwedArray(data.owed);
        const totalGotBack = data.lent?.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        setGotBack(totalGotBack);
        const totalOwed = data.owed?.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        setTotallyOwed(totalOwed);
        setSphere(totalGotBack - totalOwed);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    getExpenses();
  }, [token]);

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
            <span
              className={sphere > 0 ? "sphere-positive" : "sphere-negative"}
            >
              {sphere}
            </span>
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
              <span>{gotBack}</span>
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
              <span>{totallyOwed}</span>
              <img src={Solana} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="transaction">
        <div className="transaction-heading">Transactions</div>
        <ul className="spendings">
          {owedArray.map((item) => (
            <li className="spent-details">
              <div className="transaction-profile">
                <img src={TransactionProfile} alt="" />
              </div>
              <div className="group-name">{item.note}</div>
              <div className="spent-data">
                <span>-{item.amount}</span>
                <img src={Solana} alt="" />
              </div>
            </li>
          ))}
          {lentArray.map((item) => (
            <li className="spent-details">
              <div className="transaction-profile">
                <img src={TransactionProfile} alt="" />
              </div>
              <div className="group-name">{item.note}</div>
              <div className="spent-data">
                <span>{item.amount}</span>
                <img src={Solana} alt="" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
