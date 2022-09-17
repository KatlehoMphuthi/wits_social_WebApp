import React from "react";
import { useState,useContext} from 'react';
import Post from './Posts';
import './Newsfeed.css'
import Topbar from '../common/Topbar';
import RightSideBar from "../common/RightSideBar";
import { AuthContext } from "../../AuthProvider";

function Newsfeed(){
  
  const { currentUser } = useContext(AuthContext);
  
 
  
  const [posts,setPost] = useState([
    {
    username : "Michael",
     caption : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
     imgUrl : "https://i.ytimg.com/vi/zeO1yrVeC0U/maxresdefault.jpg ",
     name:"@MichaelM"
    },
    {
      username:"BMW Motors",
       caption:" Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you",
      imgUrl:"https://source.unsplash.com/random/100*200",
      name:"@OfficialBMWMotors"
     
    },
    {
      username:"Boera",
       caption:"", 
       imgUrl:"https://source.unsplash.com/random/100*210",
       name:"@Human"
    }

    ,
    
    {
      username:"Lebohang",
       caption:"", 
       imgUrl:"https://source.unsplash.com/random/100*205",
       name:"@Human"
    }
    
  ]);

  
  return (
    <div>
    <Topbar className="navbar"/>
    <div className="layout">

      <div className="layout__left--sidebar">
      </div>

      <div className="layout__main">
      {
         posts.map(post=>(
          <Post username={post.username} 
              name={post.name}
            caption= {post.caption}
            imgUrl = {post.imgUrl}
            time = {post.time}          
          />)) 
       }
       </div>

       <div className="layout__right-sidebar-container">
          <RightSideBar />
       </div>
    </div>
    </div>
  );

}

export default Newsfeed;