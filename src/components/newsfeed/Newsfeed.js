import React from "react";
import { useState,useContext,useEffect} from 'react';
import Post from './Posts';
import CreatePost from "../post/CreatePost";
import './Newsfeed.css';
import Topbar from '../common/Topbar';
import RightSideBar from "../common/RightSideBar";
import { AuthContext } from "../../AuthProvider";
import Button from "@mui/material/Button";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../common/SidebarMenu";
import {database} from '../../firebase';
import {onValue,ref} from 'firebase/database';
 
function Newsfeed(){

  const {currentUser} = useContext(AuthContext);
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

  useEffect(() =>{
    if(currentUser){
      //create ref to the posts 
      const postRef = ref(database,'posts/');
      const imagePost = [] // create an empty array to store the posts in
      //create a promise 

      let p = new Promise(resolve =>{
              //loop through all posts
      onValue(postRef,(snapshot) =>{
        snapshot.forEach((child) =>{
          const childData = child.val(); // data of each post 
          if(childData.imageUrl){ // for post with that contain images 
            
            const post = { 
              username: "",
              caption: childData.caption !== "" ? childData.caption: "",
              imgUrl: childData.imageUrl,
              name: childData.username

            }
            
            imagePost.push(post);
            resolve(imagePost);
          } else{ 
            // for posts that consists of large texts
            const post = { 
              username: "",
              caption: childData.text,
              imgUrl: "",
              name: childData.username

            }
            imagePost.push(post);
            resolve(imagePost);
          }
        });
      });

      });

      p.then(imagePost => setPost(imagePost) ).catch(error => console.log(error));

      
     
    }
    
  },[currentUser])



  
  return (
    <div className="app-container">
    <Topbar className="navbar"/>
    
    <div className="layout">

    <div className="layout__left-sidebar">
      <SidebarMenu />
      </div>

      <div className="layout__main">
        <CreatePost />
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