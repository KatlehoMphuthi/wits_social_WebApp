import React from "react";
import "../common/topbar.css"

function SharedTopBar(){
    return(
        <div className="topbarContainer">
          <div className="topbarLeft">
            <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
          </div>
          <div className="topbarCenter">
            Content
          </div>
          <div className="topbarRight">
            <div className="topbarLinks">
            <span><p>Loading...</p></span>
            </div>
          </div>
        </div>
      )
}

export default SharedTopBar;