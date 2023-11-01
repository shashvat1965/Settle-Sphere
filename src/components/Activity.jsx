import React from "react";
import "./Activity.css";
import ActivityItem from "./ActivityItem";

const Activity = () => {
  return (
    <div className="activity-container">
      <div className="activity-month">October 2023</div>
      <ActivityItem />
      <ActivityItem />
      <ActivityItem />
      <ActivityItem />
      <ActivityItem />
    
    </div>
  );
};

export default Activity;
