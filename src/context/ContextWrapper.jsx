import React, {useState} from "react";
import GlobalContext from "./GlobalContext";

export default function ContextWrapper(props) {
    const [isConnected, setIsConnected] = useState(false)
    const [dashboard, setDashboard] = useState(true)
    const [group, setGroup] = useState(false)
    const [selectedTab, setSelectedTab] = useState("activity");
    const [token, setToken] = useState("");
    const [create, setCreate] = useState(false)
    const [join, setJoin] = useState(false)
    const [groups, setGroups] = useState([]);
    const [activeGroup, setActiveGroup] = useState("");
    const [users, setUsers] = useState("");

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
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  }