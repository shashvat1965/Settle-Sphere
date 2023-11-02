import React, {useState} from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
    const [isConnected, setIsConnected] = useState(false)
    const [dashboard, setDashboard] = useState(false)
    const [group, setGroup] = useState(false)
    return (
        <GlobalContext.Provider
        value={{
            isConnected,
            setIsConnected,
            dashboard,
            setDashboard,
            group,
            setGroup,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  }