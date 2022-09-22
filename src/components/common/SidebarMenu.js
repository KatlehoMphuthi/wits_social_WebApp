import React from 'react'
import { useState,useContext} from 'react';
import { AuthContext } from "../../AuthProvider";
import Button from "@mui/material/Button";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SidebarMenu() {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
  
  const submit = () =>{
    if(currentUser){
      logout();
      navigate('/',{replace: true});
    }else{
      alert("An error has occured");
    }
    
  };


  return (
    <div class="sidebar-menu">
    <div class="sidebar-menu__item sidebar-menu__item--active">
      <img src="./svg/home.svg" class="sidebar-menu__item-icon" />
      Home
    </div>

    <div class="sidebar-menu__item">
      <img src="./svg/explore.svg" class="sidebar-menu__item-icon" />
      Explore
    </div>

    <div class="sidebar-menu__item">
      <img src="./svg/explore.svg" class="sidebar-menu__item-icon" />
      <Button onClick={submit}>Logout</Button>
    </div>
  </div>
  )
}

export default SidebarMenu
