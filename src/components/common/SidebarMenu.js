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

  const goToAbout = () => {
    if(currentUser){
      navigate('/about',{replace:true});
    }
  }

  const goToHome = () =>{
    if(currentUser){
      navigate('/newsfeed',{replace:true});
    }
  }


  return (
    <div className="sidebar-menu">
      <div className='top-menu'>
    <div className="sidebar-menu__item sidebar-menu__item--active" onClick={goToHome}>
      <img src="./svg/home.svg" className="sidebar-menu__item-icon" />
      Home
    </div>

    <div className="sidebar-menu__item" onClick={goToAbout}>
      <img src="./svg/about.svg" className="sidebar-menu__item-icon" />
      About
    </div>
</div>
   
    <div className="sidebar-menu__item">
      <img src="./svg/logout.svg" className="sidebar-menu__item-icon" />
      <Button onClick={submit}>Logout</Button>

    </div>
  </div>
  )
}

export default SidebarMenu
