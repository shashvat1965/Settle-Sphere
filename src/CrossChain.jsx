import React from "react";
import WormholeBridge from "@wormhole-foundation/wormhole-connect";

const CrossChain = () => {
  return (
    <WormholeBridge
      config={{
        env: "testnet",
        mode: "dark",
        bridgeDefaults: {
          toNetwork: "solana",
        //   token: "SOL",
          
        },
      }}
      versionOrTag="latest"
    />
  );
};

export default CrossChain;
