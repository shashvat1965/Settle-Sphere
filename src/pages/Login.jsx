import React, { useState } from "react";
import "./Login.css";
import SettleSphere from "../../public/SettleSphere.svg";
import LoginAsset from "../../public/LoginAsset.png";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Login = () => {
  const { setIsConnected, setDashboard, setToken, username, setUsername } =
    useContext(GlobalContext);

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }
      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (wallet.connected && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected]);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      if (!wallet.disconnecting) {
        setIsConnected(true);
        setDashboard(true);
        localStorage.setItem("username", username);
        localStorage.setItem(
          "pubKey",
          bs58.encode(wallet.publicKey.toBuffer())
        );
        async function connectToWallet() {
          try {
            const res = await fetch("https://bits-dvm.org/settlesphere/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: `${username}@gmail.com`,
                pubKey: bs58.encode(wallet.publicKey.toBuffer()),
              }),
            });

            const data = await res.json();
            // console.log(data.message);
            // console.log(data)
            localStorage.setItem("token", data.token)
            setToken(data.token);
          } catch (error) {
            console.error("Error:", error.message);
          }
        }

        connectToWallet();
      }
    }
  }, [wallet.connected]);

  const handleUsername = (e) => {
    setUsername(e.target.value.trim());
  };
  const handleEmptyUsername = () => {
    alert("Please Enter a Username!");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <div className="heading">
            <img src={SettleSphere} alt="" />
          </div>
          <div className="login-desc">
            <div className="desc-heading">
              Connect Your <span>Wallet</span> to get Started
            </div>
            <input
              className="login-username"
              type="text"
              placeholder="Enter a Username"
              value={username}
              onChange={handleUsername}
            />
            <button onClick={handleSignIn} className="desc-btn">
              Login Through Wallet
            </button>
          </div>
        </div>
        <div className="login-right">
          <div className="login-asset">
            <img src={LoginAsset} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
