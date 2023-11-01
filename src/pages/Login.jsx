import React from "react";
import "./Login.css";
import SettleSphere from "../../public/SettleSphere.svg";
import LoginAsset from "../../public/LoginAsset.png";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useEffect } from "react";
const Login = () => {
  const { publicKey, connect, disconnect } = useWallet();


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
    if (wallet.publicKey) {
        console.log(wallet.publicKey)
    }
  }, [wallet.connected])


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
            <button onClick={handleSignIn} className="desc-btn">Login Through Wallet</button>
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
