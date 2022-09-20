import "./topbar.css";
import {getUserinfo, getUserObject, getCurrentUser, database, readData} from "../../firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../AuthProvider";
import {onValue,ref } from "firebase/database";

export default function Topbar() {
const [fname, setfname] = useState("")

useEffect(()=>{
  setfname(readData())
}, [fname])

return fname === "" ? 
  (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
            <input
            
              placeholder="Search for friend, post or video coming Soon"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
          <span> <p>Loading ... </p></span>
          </div>
        </div>
      </div>
  )
  :
  (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
          <input
          
            placeholder="Search for friend, post or video coming Soon"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <span><p>{fname}</p></span>
        </div>
      </div>
    </div>
  )
 ;
}