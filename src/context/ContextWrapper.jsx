import React, {useState} from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
    const [isConnected, setIsConnected] = useState(false)
    const [dashboard, setDashboard] = useState(false)
    return (
        <GlobalContext.Provider
        value={{
            isConnected,
            setIsConnected,
            dashboard,
            setDashboard
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  }