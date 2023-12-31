import React, { useContext } from "react";
import "./Home.css";
import HomeAsset from "../../public/home.svg";
import SettleSphere from "../../public/SettleSphere.svg";
import GlobalContext from "../context/GlobalContext";

const Dashboard = () => {
  const { dashboard, setDashboard } = useContext(GlobalContext)

  const goToDashboard = () => {
    setDashboard(true)
    console.log(dashboard)
  }
  return (
    <>
      <div className="home-container">
        <div className="home-left">
          <div className="heading">
            <img src={SettleSphere} alt="" />
          </div>
          <div className="home-desc">
            <div className="desc-heading">Stress Less when sharing money.</div>
            <div className="desc-para">
              Keep Track of your shared expenses and settle group payments
              across multiple chains without any hassle, Start{" "}
              <span>settling</span> today.
            </div>
            <button onClick={goToDashboard} className="desc-btn">Go to Dashboard</button>
          </div>
        </div>
        <div className="home-right">
          <div className="home-asset">
            <img src={HomeAsset} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
