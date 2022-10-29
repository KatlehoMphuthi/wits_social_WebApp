import React from "react";
import "./About.css";
import Topbar from "../common/Topbar";
import SidebarMenu from "../common/SidebarMenu";
import RightSideBar from "../common/RightSideBar";


function About({test, theme}){

    return(<div className="app-container">
    <Topbar className="navbar" change={test} theme={theme}/>
    
    <div className="layout">

    <div className="layout__left-sidebar">
      <SidebarMenu />
      </div>

      <div className="layout__main">
        <h1>WHO ARE WE</h1>
        
      <text>
       We are a group of final year  computer science students at Wits university.<br/>
       This project ought to help students communicate with each other. <br/>
       Current features are that you can :<br/>
       -See other users post<br/>
       -comment on post<br/>
       -like post<br/>
       -follow post<br/>
       </text>
        <h1 style= {{color: 'blue'}}> TEAM MEMBERS</h1>
        Scrum Master: Katleho Mphuthi<br/>
        Database Designers: Katleho Mphuthi, Siyabonga Mathebula<br/>
        Back-end Developers: Katleho Mphuthi, Andile Mathe, Siyabonga Mathebula.<br/>
        Front-end Developers: Michael Malapane, Siyabonga Mathebula, Andile Mathe, Kgotso Phiri<br/>
        UX Designers: Kgotso Phiri<br/>
        <h1 style= {{color: 'blue'}}>CONTACT TEAM</h1>
      
        <a href ="https://wa.me/+27628948188">click here to whatsapp us</a>
        
       </div>
    </div>
    </div>
        
    )
}

export default About;
