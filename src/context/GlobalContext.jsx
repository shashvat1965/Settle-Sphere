import React from "react";

const GlobalContext = React.createContext({
    isConnected: false,
    setIsConnected: () => {},
    dashboard: true,
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
    groups: [],
    setGroups: () => {},
    activeGroup: "",
    setActiveGroup: () => {},
    users: [],
    setUsers: () => {},
    username: "",
    setUsername: () => {},
    history: [],
    setHistory: () => {},
    userId: 1,
    setUserId: () => {},
});

export default GlobalContext