import React, { useState } from "react";
import "./Login.css";
import SettleSphere from "../../public/SettleSphere.svg";
import LoginAsset from "../../public/LoginAsset.png";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Lion from '../../public/GroupPicture.png'
const Login = () => {
  const {
    setIsConnected,
    setDashboard,
    setToken,
    username,
    setUsername,
    setUserId,
  } = useContext(GlobalContext);

  const [ emptyUsername, setEmptyUsername] = useState(false)
  const [ loginUser, setLoginUser ] = useState(username)


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
        setDashboard(true);
        localStorage.setItem("username", username);
        localStorage.setItem(
          "pubKey",
          bs58.encode(wallet.publicKey.toBuffer())
        );
        async function connectToWallet() {
          try {
            const res = await fetch(
              "https://bits-dvm.org/settlesphere/api/v1/auth/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: `${username}`,
                  pubKey: bs58.encode(wallet.publicKey.toBuffer()),
                }),
              }
            );

            const data = await res.json();
            // console.log(data.message);
            localStorage.setItem("token", data.token);
            setIsConnected(true);
            setToken(data.token);
            setUserId(data.user["id"]);
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
    setLoginUser(e.target.value.trim());
    setEmptyUsername(false)
  };
  const handleEmptyUsername = () => {
    setEmptyUsername(true)
  };
  localStorage.setItem("username", username)
  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <div className="heading">
            <img src={SettleSphere} alt="" />
          </div>
          <div className={emptyUsername ? "login-desc-error" : "login-desc"}>
            <div className="desc-heading">
              Connect Your <span>Wallet</span> to get Started
            </div>
            <input
              className="login-username"
              type="text"
              placeholder="Enter a Username"
              value={loginUser}
              onChange={handleUsername}
            />
            <button onClick={username.length > 0  ? handleSignIn : handleEmptyUsername} className="desc-btn">
              Login Through Wallet
            </button>
          </div>
        </div>
        <div className="login-right">
          <div className="mayan">
            <span>Powered by Mayan</span>
          </div>
          <div className="login-asset">
            <img src={LoginAsset} alt="" />
          </div>
          <div className="opaque-image" style={{opacity: 0, position: "absolute", top: '50%', left: '30%', zIndex: -1}}>
            <img src={Lion} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
