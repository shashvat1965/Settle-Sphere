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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";

const Record = () => {
  const { setSelectedTab, settleAccount, activeGroup, token } =
    useContext(GlobalContext);
  const options = [
    { value: "solana", label: "Solana", image: Solana },
    { value: "bitcoin", label: "Bitcoin", image: Bitcoin },
  ];
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState(settleAccount[0].amount);

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
  const { publicKey, sendTransaction } = useWallet();

  const { connection } = useConnection();
  async function settleBalance() {
    try {
      const res = await fetch(
        `https://bits-dvm.org/settlesphere/api/v1/txn/group/${activeGroup}/settle/${settleAccount[0].ownerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // console.log(settleAccount)

  const handleSettle = (e) => {
    event.preventDefault();
    const transaction = new web3.Transaction();
    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,

      toPubkey: settleAccount[0].pubKey,

      lamports: LAMPORTS_PER_SOL * settleAccount[0].amount,
    });

    transaction.add(sendSolInstruction);

    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
      setSelectedTab("activity");
      settleBalance();
    });
  };

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
            <div className="record-profile-name">{settleAccount[0].name}</div>
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
              {settleAccount[0].amount}
            </div>
          </div>
        </div>
        <div className="record-button-container">
          <button onClick={handleSettle} className="record-button">
            Settle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Record;
