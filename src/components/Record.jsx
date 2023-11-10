import React, { useContext, useState } from "react";
import Select from "react-select";
import "./Record.css";
import BackBtn from "../../public/back-arrow.svg";
import DownArrow from "../../public/down-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import ProfileOne from "../../public/GroupPicture.png";
import ProfileTwo from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg";
import Bitcoin from "../../public/Bitcoin.svg";
import CustomStyles from "./CustomStyles";

const Record = () => {
  const { setSelectedTab } = useContext(GlobalContext);
  const options = [
    { value: "solana", label: "Solana", image: Solana },
    { value: "bitcoin", label: "Bitcoin", image: Bitcoin },
  ];
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState("");

  const handleCryptoChange = (selectedOption) => {
    setSelectedCrypto(selectedOption);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const customStyleArray = [
    {
      ...CustomStyles(),
      menu: (provided) => ({
        ...provided,
        zIndex: 10000,
      }),
    },
  ];

  const handleBack = () => {
    setSelectedTab("settle");
  };
  return (
    <div className="record">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Record Payment</span>
      </div>
      <div className="record-data">
        <div className="record-profiles">
          <div className="profile-one">
            <img src={ProfileOne} alt="" />
            <div className="record-profile-name">You</div>
          </div>
          <div className="record-detail">Paying</div>
          <div className="profile-two">
            <img src={ProfileTwo} alt="" />
            <div className="record-profile-name">Shashvat</div>
          </div>
        </div>
        <div className="record-transaction">
          <div className="record-amount">
            <div className="record-amount-currency">
              {/* <Select
                styles={customStyleArray[0]}
                options={options}
                onChange={handleCryptoChange}
                value={selectedCrypto}
                isSearchable={false}
              /> */}
              <img src={Solana} alt="" />
            </div>
            <div className="record-amount-number">
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="record-button-container">
          <button className="record-button">Settle</button>
        </div>
      </div>
    </div>
  );
};

export default Record;
