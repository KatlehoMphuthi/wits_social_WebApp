import "./topbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getUserObject, logout } from "../../firebase";
import { AuthContext } from "../../AuthProvider";
import {getUserinfo, getCurrentUser} from "../../firebase"

export default function Topbar() {
  let user;
const [fname, setfname] = useState("")

 

 // console.log(getCurrentUser())
 console.log(user.firstname, user.lastName)

  return (
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
        <span> <p>{user.firstname}</p></span>
        </div>
        
      </div>
    </div>
  );
}