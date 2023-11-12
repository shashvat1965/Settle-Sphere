import React from "react";
import "./ActivityItem.css";
import ActivityIcon from "../../public/Activity.png";
import Solana from "../../public/Solana.svg";

const ActivityItem = ({ note, payer, receiver, amount, settled }) => {
  return (
    <div className="activity-item">
      {/* <div className="activity-item-month">
        <div className="month">Oct</div>
        <div className="year">23</div>
      </div> */}
      <div className="activity-icon">
        <img src={ActivityIcon} alt="" />
      </div>
      {settled ? (
        <div className="activity-settled">
          <span className="settled-payer">{payer}</span> Paid{" "}
          <span className="settled-amount">
            {amount} <img src={Solana} alt="" />
          </span>{" "}
          To <span className="settled-receiver">{receiver}</span>
        </div>
      ) : (
        <div className="activity-details">
          <div className="activity-title">{note}</div>
          {payer === "You" ? (
            <div className="activity-data">
              <span className="activity-data-name">{receiver}</span>
              <span className="activity-data-logic">Borrowed</span>
              <span className="activity-data-amount">{amount}</span>
              <span className="activity-data-currency">
                <img src={Solana} alt="" />
              </span>
            </div>
          ) : (
            <div className="activity-data">
              <span className="activity-data-name">{payer}</span>
              <span className="activity-data-logic">Paid</span>
              <span className="activity-data-amount">{amount}</span>
              <span className="activity-data-currency">
                <img src={Solana} alt="" />
              </span>
            </div>
          )}
        </div>
      )}
      {settled ? (
        ""
      ) : (
        <div className="activity-type">
          {payer === "You" ? (
            <span className="act-type-lent">You Lent</span>
          ) : receiver === "You" ? (
            <span className="act-type-borrow">You borrowed</span>
          ) : (
            <span className="act-type-none">Not Involved</span>
          )}
          {payer === "You" || receiver === "You" ? (
            <div className="activity-type-data">
              <span>{amount}</span>
              <img src={Solana} alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
