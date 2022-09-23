import React from "react";
import { useState,useContext,useEffect,useRef} from 'react';
import Post from './Posts';
import CreatePost from "../post/CreatePost";
import './Newsfeed.css';
import Topbar from '../common/Topbar';
import RightSideBar from "../common/RightSideBar";
import { AuthContext } from "../../AuthProvider";
import SidebarMenu from "../common/SidebarMenu";
import {database} from '../../firebase';
import {onValue,ref,query} from 'firebase/database';
import { async } from "@firebase/util";
 
function Newsfeed(){

  const {currentUser} = useContext(AuthContext);
  const [posts,setPost] = useState([
    {
    username : "Michael",
     caption : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
     imgUrl : "https://i.ytimg.com/vi/zeO1yrVeC0U/maxresdefault.jpg ",
     name:"@MichaelM",
     id: "12345"
    },
    {
      username:"BMW Motors",
       caption:" Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you",
      imgUrl:"https://source.unsplash.com/random/100*200",
      name:"@OfficialBMWMotors",
      id: "12346"
     
    },
    {
      username:"Boera",
       caption:"", 
       imgUrl:"https://source.unsplash.com/random/100*210",
       name:"@Human",
       id: "12347"
    }

    ,
    
    {
      username:"Lebohang",
       caption:"", 
       imgUrl:"https://source.unsplash.com/random/100*205",
       name:"@Human"
       ,
     id: "12348"
    }
    
  ]);
  //const PostsArr = useRef([]); // create an empty array to store the posts in
  const postRef = ref(database,'posts/'); 
  useEffect(()=>{
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
              name: childData.username,
              id : childData.id
            }
            
            imagePost.push(post);
            resolve(imagePost);
          } else{ 
            // for posts that consists of large texts
            const post = { 
              username: "",
              caption: childData.text,
              imgUrl: "",
              name: childData.username,
              id : childData.id
            }
            imagePost.push(post);
            resolve(imagePost);

    if(currentUser !== null){
    const PostsArr = [];
     
      
      onValue(postRef,(Datasnapshot) =>{
        Datasnapshot.forEach((child)=>{
          const postdata = child.val();
          const post = {
            username: "",
            caption: postdata.caption !== "" ? postdata.caption: postdata.text,
            imgUrl: postdata.imageUrl === "" ? "":postdata.imageUrl,
            name: postdata.username,
            time: postdata.time

          }

          
          PostsArr.push(post);
        });
        
      });
      
      
      setPost(PostsArr.reverse());
    }

  },[currentUser,postRef]);

  



  
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
          <Post 
          key={post.id}
          username={post.username} 
              name={post.name}
            caption= {post.caption}
            imgUrl = {post.imgUrl}
            time = {post.time} 
            postid = {post.id}         
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