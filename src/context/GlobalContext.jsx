import React from "react";

const GlobalContext = React.createContext({
    isConnected: false,
    setIsConnected: () => {},
    dashboard: false,
    setDashboard: () => {},
});

export default GlobalContext