import React from 'react'
import './Dashboard.css'
import Sidebar from '../components/Sidebar'
import Expenses from '../components/Expenses'
import Group from '../components/Group'
import Tab from '../components/Tab'


const Dashboard = () => {
  return (
    <>
    <div className="dashboard-container">
        <Sidebar />
        {/* <Expenses /> */}
        <Tab />
        <Group />
    </div>
    </>
  )
}

export default Dashboard