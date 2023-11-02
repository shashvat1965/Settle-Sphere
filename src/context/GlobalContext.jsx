import React from "react";

const GlobalContext = React.createContext({
    isConnected: false,
    setIsConnected: () => {},
    dashboard: false,
    setDashboard: () => {},
    group: false,
    setGroup: () => {},
});

export default GlobalContext