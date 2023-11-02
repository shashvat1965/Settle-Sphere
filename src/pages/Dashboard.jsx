import React, { useContext } from 'react'
import './Dashboard.css'
import Sidebar from '../components/Sidebar'
import Expenses from '../components/Expenses'
import Group from '../components/Group'
import Tab from '../components/Tab'
import GlobalContext from '../context/GlobalContext'


const Dashboard = () => {
  const { group } = useContext(GlobalContext)
  return (
    <>
    <div className="dashboard-container">
        <Sidebar />
        {group ? (<Tab />) : (<Expenses />)}
        <Group />
    </div>
    </>
  )
}

export default Dashboard