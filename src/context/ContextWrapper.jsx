import React, { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
  const [isConnected, setIsConnected] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [group, setGroup] = useState(false);
  const [selectedTab, setSelectedTab] = useState("activity");
  const [token, setToken] = useState("");
  const [create, setCreate] = useState(false);
  const [join, setJoin] = useState(false);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(1);
  const [settleAccount, setSettleAccount] = useState([]);
  const [history, setHistory] = useState([]);

  
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername === 'undefined' ? "" : storedUsername; 
  });

  // useEffect(() => {
  //   localStorage.setItem('username', username);
  // }, [username]);

  return (
    <GlobalContext.Provider
      value={{
        isConnected,
        setIsConnected,
        dashboard,
        setDashboard,
        group,
        setGroup,
        selectedTab,
        setSelectedTab,
        token,
        setToken,
        create,
        setCreate,
        join,
        setJoin,
        groups,
        setGroups,
        activeGroup,
        setActiveGroup,
        users,
        setUsers,
        username,
        setUsername,
        history,
        setHistory,
        userId,
        setUserId,
        settleAccount,
        setSettleAccount,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
