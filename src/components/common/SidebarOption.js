import React from 'react'
import './SidebarOption.css'

function SidebarOption({ active, text, Icon, onClick, isBackButton }) {
    return (
        <div className={`sidebarOption ${active && "sidebarOption--active"} ${isBackButton && 'sidebarOption--backButton'}`} onClick = {onClick}>
          <Icon />
          <h2>{text}</h2>
        </div>
      );
}

export default SidebarOption
