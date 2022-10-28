import React from 'react'
import { NavLink } from 'react-router-dom';
import './SidebarOption.css'

function SidebarOption({ text, Icon, onClick, isBackButton }) {
    return (
        <div className={`sidebarOption ${isBackButton && 'sidebarOption--backButton'}`} onClick = {onClick}>
          <Icon />
          <h2>{text}</h2>
        </div>
      );
}

export default SidebarOption
