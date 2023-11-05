import React from "react";

const GlobalContext = React.createContext({
    isConnected: false,
    setIsConnected: () => {},
    dashboard: false,
    setDashboard: () => {},
    group: false,
    setGroup: () => {},
    selectedTab: "activity",
    setSelectedTab: () => {},
    token: "",
    setToken: () => {},
    create: false,
    setCreate: () => {},
    join: false,
    setJoin: () => {},
});

export default GlobalContext