import React from 'react'
import { useState,useContext} from 'react';
import { AuthContext } from "../../AuthProvider";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';

function SidebarMenu() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
  
  const submit = () =>{
    if(currentUser){
      alert("Are you sure want to logout?");
      signOut(auth);
      navigate('/',{replace: true});
    }else{
      alert("An error has occured");
    }
    
  };


  return (
    <div className="sidebar-menu">
    <div className="sidebar-menu__item sidebar-menu__item--active">
      <img src="./svg/home.svg" className="sidebar-menu__item-icon" />
      Home
    </div>

    <div className="sidebar-menu__item">
      <img src="./svg/explore.svg" className="sidebar-menu__item-icon" />
      Explore
    </div>

    <div className="sidebar-menu__item">
      <img src="./svg/explore.svg" className="sidebar-menu__item-icon" />
      <Button onClick={submit}>Logout</Button>
    </div>
  </div>
  )
}

export default SidebarMenu
