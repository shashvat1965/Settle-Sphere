import React, { useContext } from "react";
import "./Create.css";
import profile from "../../public/profile.png";
import GlobalContext from "../context/GlobalContext";

const Create = () => {
    const {setCreate} = useContext(GlobalContext)
    const handleCreate = () => {
        setCreate(false)
    }
  return (
    <div className="create-group">
      <div className="create-container">
        <div className="create-inputs">
          <div className="create-photo">
            <img src={profile} alt="" />
            <div className="create-photo-text">Select Group Picture</div>
          </div>
          <div className="create-name">
            <input type="text" placeholder="Enter Group Name" />
          </div>
        </div>
        <div className="create-group-btn">
            <button onClick={handleCreate}>Create Group</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
