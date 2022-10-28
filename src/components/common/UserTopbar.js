import "./topbar.css";
import {database, readData} from "../../firebase.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState, } from 'react';
import { AuthContext } from "../../AuthProvider.js";
import {onValue,ref, set } from "firebase/database";
import SidebarOption from './SidebarOption.js'
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded.js';

function UserTopbar({username}) {

  const navigate = useNavigate();

  return (
    <div className="topbarContainer">
        <div className="topbarLeft topbarleft--userprofile">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
      </div>

      <div className="topbarCenter topbarCenter--userprofile">
        <SidebarOption
          text='Back'
          isBackButton={true}
          Icon={ArrowBackRoundedIcon}
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  )
}

export default UserTopbar
