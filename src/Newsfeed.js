import React from "react";
import { useState } from 'react';
import Header from "./Header";
import Post from './Posts';
import LeftSidebar from './LeftSidebar'
import './Newsfeed.css'

function Newsfeed(){
  const [posts,setPost] = useState([
    {
    username : "Michael",
     caption : "Welcome guys",
     imgUrl : "https://i.ytimg.com/vi/zeO1yrVeC0U/maxresdefault.jpg "
      

    },

    
    {
      username:"BMW Motors",
       caption:" The New BMW M3",
      imgUrl:"https://source.unsplash.com/random/300×300"
     
    },
    
    {
      username:"Boera",
       caption:"Heyyyy", 
       imgUrl:"https://source.unsplash.com/random/300×300"
       
    }
    
  ]);

  
  return (
    <div>
    <Header className="navbar"/>
    <div className="layout">
    
      <div className="layout__left--sidebar">
        <LeftSidebar />
      </div>

      <div className="layout__main">
      {
         posts.map(post=>(
          <Post username={post.username} 
          caption= {post.caption}
            imgUrl = {post.imgUrl}            
          />)) 
       }
       </div>

       <div className="layout__right-sidebar-container">
       
       </div>
    </div>
    </div>
  );

}

export default Newsfeed;