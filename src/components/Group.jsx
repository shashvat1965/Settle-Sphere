import React, { useContext, useEffect, useState } from "react";
import "./Group.css";
import GroupBox from "./GroupBox";
import GlobalContext from "../context/GlobalContext";
import Create from "./Create";
import Join from "./Join";
const Group = () => {
  const { token, create, setCreate, join, setJoin, groups, setGroups } =
    useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getGroups() {
      try {
        const res = await fetch("https://bits-dvm.org/settlesphere/api/v1/groups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // console.log(data.message);
        setGroups(data.groups)
        // console.log(groups);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    setTimeout(() => {
      getGroups();
    }, 1000);
  }, [token, create, join]);

  const handleCreate = () => {
    setCreate(true);
  };
  const handleJoin = () => {
    setJoin(true);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="group">
      {create ? <Create /> : ""}
      {join ? <Join /> : ""}
      <div className="group-container">
        <div className="group-heading">My Groups</div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Groups"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="group-box-container">
          {groups?.length > 0
            ? groups
                .filter((grp) =>
                  grp.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((grp) => (
                  <GroupBox
                    key={grp.id}
                    groupName={grp.name}
                    groupCode={grp.code}
                    createdBy={grp.created_by}
                  />
                ))
            : ""}
        </div>{" "}
        <div className="create-join-container">
          <button onClick={handleCreate} className="create">
            Create Group
          </button>
          <button onClick={handleJoin} className="join">
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;
