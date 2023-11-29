import React, { useContext, useState } from "react";
import Select from "react-select";
import "./Make.css";
import BackBtn from "../../public/back-arrow.svg";
import GlobalContext from "../context/GlobalContext";
import ProfileOne from "../../public/GroupPicture.png";
import ProfileTwo from "../../public/friend-profile.png";
import Solana from "../../public/Solana.svg";
import Bitcoin from "../../public/Bitcoin.svg";
import Picture from "../../public/friend-profile.png";
import CustomStyles from "./CustomStyles";

const Make = () => {
  const { setSelectedTab, users, activeGroup, token, username, userId } =
    useContext(GlobalContext);
  const splitOptions = [
    { value: "equally", label: "equally" },
    { value: "unequally", label: "unequally" },
  ];
  const transformedArray = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));
  // console.log(users);

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedPayer, setSelectedPayer] = useState(transformedArray[0]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [amount, setAmount] = useState("");
  const [split, setSplit] = useState(splitOptions[0]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [activeUserId, setActiveUserId] = useState(userId);
  const [selectedUsers, setSelectedUsers] = useState({});
  // console.log(selectedUsers);

  const handleCryptoChange = (selectedOption) => {
    setSelectedCrypto(selectedOption);
    // console.log(selectedCrypto.label);
  };
  const handlePayerChange = (selectedOption) => {
    if (selectedOption.value === userId) {
      setSelectedPayer(selectedOption);
      setSelectedReceiver(null);
      setActiveUserId(selectedOption.value);
      setUserInputs({});
      setSelectedUsers({});
    } else {
      setSelectedPayer(selectedOption);
      setSelectedReceiver(
        transformedArray.find((option) => option.value === userId)
      );
      setActiveUserId(selectedOption.value);
      setUserInputs({});
      setSelectedUsers({});
    }
  };
  // const handleReceiverChange = (selectedOption) => {
  //   if (selectedOption.value === userId) {
  //     setSelectedReceiver(selectedOption);
  //     setSelectedPayer(null);
  //   } else {
  //     setSelectedReceiver(selectedOption);
  //     setSelectedPayer(
  //       transformedArray.find((option) => option.value === userId)
  //     );
  //   }
  // };
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) => ({
      ...prevSelected,
      [userId]: !prevSelected[userId], // Toggle the checkbox status
    }));
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleSplitChange = (selectedSplit) => {
    setSplit(selectedSplit);
  };

  const handleBack = () => {
    setSelectedTab("activity");
  };

  const [userInputs, setUserInputs] = useState({});

  const handleInputChange = (userId, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [userId]: value,
    }));
  };
  // console.log(userInputs)

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

  const handleMake = async () => {
    try {
      if (selectedPayer && note) {
        if (split.value === "equally") {
          if (amount && Object.keys(selectedUsers).length > 0) {
            const trueSelectedUsers = Object.keys(selectedUsers).filter(
              (userId) => selectedUsers[userId]
            );

            if (trueSelectedUsers.length > 0) {
              const totalSelectedUsers = trueSelectedUsers.length;
              const amountPerUser = (parseFloat(amount) / totalSelectedUsers).toFixed(2);

              const transactionsPromises = users.map(async (user) => {
                if (selectedUsers[user.id]) {
                  const payerId = selectedPayer.value;
                  const transactionAmount = amountPerUser;
                  const receiverId = user.id;
                  const transactionData = {
                    lender: receiverId,
                    receiver: payerId,
                    amount: transactionAmount,
                    note: note,
                  };

                  try {
                    console.log(transactionData);
                    const res = await fetch(
                      `https://bits-dvm.org/settlesphere/api/v1/txn/group/${activeGroup}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(transactionData),
                      }
                    );

                    const data = await res.json();
                    console.log(data.message);

                    // Check if the fetch was successful before setting the tab
                    if (res.ok) {
                      setNote("");
                      setAmount("");
                      setSelectedPayer(null);
                      setSelectedReceiver(null);
                      setSelectedTab("activity");
                    } else {
                      setError("Transaction failed. Please try again.");
                    }
                  } catch (error) {
                    console.error(error.message);
                    setError("Transaction failed. Please try again.");
                  }
                }
              });

              await Promise.all(transactionsPromises);
            } else {
              setError("Please select users and enter an amount");
            }
          } else {
            setError("Please select users and enter an amount");
          }
        } else if (split.value === "unequally") {
          const allTransactions = [];
          const transactionsPromises = users.map(async (user) => {
            const payerId = selectedPayer.value;
            const currentUserId = user.id;

            if (currentUserId !== activeUserId) {
              const transactionAmount = parseFloat(userInputs[user.id]).toFixed(2);
              const receiverId = user.id;
              const transactionData = {
                lender: receiverId,
                receiver: payerId,
                amount: transactionAmount,
                note: note,
              };

              try {
                console.log(transactionData);
                const res = await fetch(
                  `https://bits-dvm.org/settlesphere/api/v1/txn/group/${activeGroup}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(transactionData),
                  }
                );

                const data = await res.json();
                console.log(data.message);

                // Check if the fetch was successful before setting the tab
                if (res.ok) {
                  setNote("");
                  setUserInputs({});
                  setSelectedPayer(null);
                  setSelectedReceiver(null);
                  setSelectedTab("activity");
                } else {
                  setError("Transaction failed. Please try again.");
                }
              } catch (error) {
                console.error(error.message);
                setError("Transaction failed. Please try again.");
              }
            }
          });

          await Promise.all(transactionsPromises);
        }
      } else {
        setError("Please select payer and add a note");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="make">
      <div className="settle-heading">
        <img src={BackBtn} alt="" onClick={handleBack} />
        <span>Create Transaction</span>
      </div>
      <div className="make-container">
        <div className="make-data">
          <div className="make-profiles">
            <div className="profile-one">
              <div className="make-detail">Paid By</div>

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
            {/* <img src={ProfileTwo} alt="" />
              <div className="make-profile-name">
                <Select
                  styles={customStyleArray[1]}
                  options={transformedArray}
                  onChange={handleReceiverChange}
                  value={selectedReceiver}
                  isSearchable={false}
                />
              </div> */}
            <div className="make-amount-section">
              <div className="make-note">
                <input
                  type="text"
                  placeholder="Add a note..."
                  value={note}
                  onChange={handleNoteChange}
                />
              </div>
              <div className="make-amount">
                {split.value === "equally" && (
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
                )}
                <div className="make-amount-number">
                  {split.value === "equally" && (
                    <input
                      id="amount"
                      type="text"
                      placeholder="Enter amount..."
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="make-split">
            <div className="make-split-header">
              <span>Split among</span>
              <div className="split-select">
                <Select
                  styles={customStyleArray[1]}
                  options={splitOptions}
                  onChange={handleSplitChange}
                  value={split}
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="make-split-container">
              {users.length > 0 &&
                users.map((user) => {
                  if (user.id === activeUserId) {
                    return null;
                  }

                  return (
                    <div key={user.id} className="settle-account">
                      <div className="settle-profile">
                        <img src={Picture} alt="" />
                      </div>
                      <div className="settle-name">{user.username}</div>
                      <div className="make-record">
                        <div className="settle-data">
                          <img src={Solana} alt="" />
                        </div>
                        <div className="make-split-amount">
                          {split.value === "equally" && (
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedUsers[user.id] || false}
                                onChange={() => handleCheckboxChange(user.id)}
                              />
                              <span className="checkmark"></span>
                            </label>
                          )}
                          {split.value !== "equally" && (
                            <input
                              type="text"
                              value={userInputs[user.id] || ""}
                              onChange={(e) =>
                                handleInputChange(user.id, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {error ? <div className="make-error">{error}</div> : ""}
          <div className="make-button-container">
            <button className="make-button" onClick={handleMake}>
              Create Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Make;
