import React from 'react'
import './LeftSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LeftSidebar() {
    return (
        <div className="layout__left-sidebar">
        <div className="sidebar-menu">
          <div className="sidebar-menu__item sidebar-menu__item--active">
          
            <img src={require('./svg/home.svg')} className="sidebar-menu__item-icon" />
            Home
          </div>
         
        </div>
      </div>
    )
}