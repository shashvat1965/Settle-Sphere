import React from 'react'
import './sidebar.css'
import SettleSphere from '../../public/SettleSphere.svg'
import ProfilePic from '../../public/profile.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-heading">
            <img src={SettleSphere} alt="" />
        </div>
        <div className="profile-pic">
            <img src={ProfilePic} alt="" />
        </div>
        <div className="profile-name">
            Shivang Rai
        </div>
        <ul className="sidebar-tabs">
            <li className='selected-tab' ><span>Home</span></li>
            <li><span>Group</span></li>
        </ul>
        <div className="logout-btn"><span>Log Out</span></div>
    </div>
  )
}

export default Sidebar