import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import React, { useMemo, useContext, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import GlobalContext from "./context/GlobalContext";
import * as buffer from "buffer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Widget from "./Widget.jsx";

function App() {
  const { isConnected, dashboard } = useContext(GlobalContext);
  window.Buffer = buffer.Buffer;
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    isConnected && token ? (
                      dashboard ? (
                        <Dashboard />
                      ) : (
                        <Home />
                      )
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route path="/widget" element={<Widget />} />
              </Routes>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </Router>
    </>
  );
}

export default App;
