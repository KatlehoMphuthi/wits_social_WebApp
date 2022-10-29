import React from "react";
import "./About.css";
import Topbar from "../common/Topbar";
import SidebarMenu from "../common/SidebarMenu";
import RightSideBar from "../common/RightSideBar";


function About({switchTheme, theme}){

    return(<div className="app-container">
    <Topbar className="navbar" switchTheme={switchTheme} theme={theme}/>
    
    <div className="layout">

    <div className="layout__left-sidebar">
      <SidebarMenu />
      </div>

      <div className="layout__main">
        <section>
        <h1>WHO ARE WE</h1>
        <p>We are a group of final year  computer science students at Wits university.<br/>
       This project ought to help students communicate with each other. Current features are that you can : </p>
      
          <ul>
            <li>See other users post</li>
            <li>comment on post</li>
            <li>like post</li>
            <li>follow post</li>

          </ul>
        </section>

        <section>
        <h1> TEAM MEMBERS</h1>

        
        <ul>
            <li>Scrum Master: Katleho Mphuthi</li>
            <li>Database Designers: Katleho Mphuthi, Siyabonga Mathebula</li>
            <li> Back-end Developers: Katleho Mphuthi, Andile Mathe, Siyabonga Mathebula.</li>
            <li>Front-end Developers: Michael Malapane, Siyabonga Mathebula, Andile Mathe, Kgotso Phiri</li>
            <li>  UX Designers: Kgotso Phiri</li>

          </ul>
        </section>

        <section>
        <h1>CONTACT TEAM</h1>
        <a href ="https://wa.me/+27628948188">click here to whatsapp us</a>
        </section>
       </div>
    </div>
    </div>
        
    )
}

export default About;
