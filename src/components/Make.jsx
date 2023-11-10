import React, { useContext, useState } from "react";
import Select from "react-select";
import "./Make.css";
import BackBtn from "../../public/back-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import ProfileOne from "../../public/GroupPicture.png";
import ProfileTwo from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg";
import Bitcoin from "../../public/Bitcoin.svg";
import CustomStyles from "./CustomStyles";

const Make = () => {
  const { setSelectedTab, users, activeGroup, token } = useContext(GlobalContext);
  const options = [
    { value: "solana", label: "Solana", image: Solana },
    { value: "bitcoin", label: "Bitcoin", image: Bitcoin },
  ];
  const transformedArray = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleCryptoChange = (selectedOption) => {
    setSelectedCrypto(selectedOption);
    console.log(selectedCrypto.label);
  };
  const handlePayerChange = (selectedOption) => {
    setSelectedPayer(selectedOption);
    console.log(selectedPayer.label);
  };
  const handleReceiverChange = (selectedOption) => {
    setSelectedReceiver(selectedOption);
    console.log(selectedReceiver.label);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  }; 

  const handleBack = () => {
    setSelectedTab("activity");
  };

  const customStyleArray = [
    {
      ...CustomStyles(),
      menu: (provided) => ({
        ...provided,
        zIndex: 10000,
      }),
    },
    {
      ...CustomStyles(),
      controls: (provided, state) => ({
        ...provided,
        borderBottom: state.isFocused ? "2px solid white" : "2px solid white",
        "&:hover": {
          borderColor: "white",
        },
      }),
    },
  ];

  async function makeTransaction() {
    try {
      const res = await fetch(`http://127.0.0.1:3000/api/v1/txn/group/${activeGroup}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            lender: selectedReceiver.value,
            receiver: selectedPayer.value,
            amount: parseInt(amount),
            note: note
        }),
      });

      const data = await res.json();
      console.log(data.message)
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleMake = () => {
    if (selectedPayer && selectedReceiver && amount && note) {
        makeTransaction()
        setNote("")
        setAmount("")
        setSelectedPayer(null)
        setSelectedReceiver(null)
    }
  }


  return (
    <div className="make">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Create Transaction</span>
      </div>
      <div className="make-conatiner">
        <div className="make-data">
          <div className="make-profiles">
            <div className="profile-one">
              <img src={ProfileOne} alt="" />
              <div className="make-profile-name">
                <Select
                  styles={customStyleArray[1]}
                  options={transformedArray}
                  onChange={handlePayerChange}
                  value={selectedPayer}
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="make-detail">Paying</div>
            <div className="profile-two">
              <img src={ProfileTwo} alt="" />
              <div className="make-profile-name">
                <Select
                  styles={customStyleArray[1]}
                  options={transformedArray}
                  onChange={handleReceiverChange}
                  value={selectedReceiver}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
          <div className="make-transaction">
            <div className="make-amount">
              <div className="make-amount-currency">
                {/* <Select
                  styles={customStyleArray[0]}
                  options={options}
                  onChange={handleCryptoChange}
                  value={selectedCrypto}
                  isSearchable={false}
                /> */}
                <img src={Solana} alt="" />
              </div>
              <div className="make-amount-number">
                <input type="text" value={amount} onChange={handleAmountChange} />
              </div>
            </div>
          </div>
          <div className="make-note">
            <input type="text" placeholder="Add a note..." value={note} onChange={handleNoteChange} />
          </div>
          <div className="make-button-container">
            <button className="make-button" onClick={handleMake}>Create Transaction</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Make;
