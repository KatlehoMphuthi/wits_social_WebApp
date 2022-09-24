import React from "react";
import Topbar from "../common/Topbar";
import SidebarMenu from "../common/SidebarMenu";
import RightSideBar from "../common/RightSideBar";


function About(){

    return(<div className="app-container">
    <Topbar className="navbar"/>
    
    <div className="layout">

    <div className="layout__left-sidebar">
      <SidebarMenu />
      </div>

      <div className="layout__main">
        About Wits Social
      
       </div>
    </div>
    </div>
        
    )
}

export default About;