import React, { useContext, useEffect } from "react";
import { useState } from 'react';
import Post from './Posts';
import './Newsfeed.css'
import Topbar from '../common/Topbar';
import CreatePost from "../post/CreatePost";
import {AuthContext} from '../../AuthProvider';
import {database} from '../../firebase';
import {onValue,ref} from 'firebase/database';


function Newsfeed(){
  const {currentUser} = useContext(AuthContext);
  const [posts,setPost] = useState([]);

  useEffect(() =>{
    if(currentUser){
      //create ref to the posts 
      const postRef = ref(database,'posts/');
      const imagePost = [] // create an empty array to store the posts in 
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
            console.log('data successfully sent')
          } else{ 
            // for posts that consists of large texts
            const post = { 
              username: "",
              caption: childData.text,
              imgUrl: "",
              name: childData.username

            }
            imagePost.push(post);
          }
        });
      },{onlyOnce: true});
      setPost(imagePost); 
    }
    
  },[currentUser])



  
  return (
    <div>
    <Topbar className="navbar"/>
    <div className="layout">

      <div className="layout__left--sidebar">
      </div>

      <div className="layout__main">
        <div><CreatePost /></div>
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
       
       </div>
    </div>
    </div>
  );

}

export default Newsfeed;