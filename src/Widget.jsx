import { useEffect, useRef } from "react";
import loadMayan from "../src/pages/loadMayan";
import { useLocation } from "react-router-dom";

export default function Widget() {
  const mayan = useRef();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const destParam = searchParams.get("dest");
    const amountParam = searchParams.get("amount");

    (async function () {
      const mayanInstance = await loadMayan();
      mayan.current = mayanInstance;
      const config = {
        appIdentity: {
          name: "Settle Sphere",
          icon: "./logo.png",
          uri: "https://myproject.io",
        },
        destinationChains: ["solana"],
        destinationWallets: { 
          solana: destParam,
      },
      };
      MayanSwap.init("mayanContainer", config);
    })();
    return () => {
      if (mayan.current && mayan.current.destroy) {
        mayan.current.destroy();
      }
    };
  }, [location.search]);

  return (
    <div>
      <div id="mayanContainer" />
    </div>
  );
}
