import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import Post from './Posts'
import CreatePost from '../post/CreatePost'
import './Newsfeed.css'
import Topbar from '../common/Topbar'
import RightSideBar from '../common/RightSideBar'
import { AuthContext } from '../../AuthProvider'
import SidebarMenu from '../common/SidebarMenu'
import { database } from '../../firebase'
import { onValue, ref, query } from 'firebase/database'
import { async } from '@firebase/util'
import Posts from './Posts'
import { useMemo } from 'react'

function Newsfeed () {
  const  {currentUser}  = useContext(AuthContext)
  const [posts, setPost] = useState([])

  function getUsername(userId){
    let userData;
    if (currentUser !== null) {
      //Current user reference
      const userRef = ref(database, 'users/' + userId);
      
      onValue(userRef, (snapshot) => {
        userData = snapshot.val();
        
      });
      }

      return userData.firstname
  }

  //const PostsArr = useRef([]); // create an empty array to store the posts in
  const postRef = ref(database, 'posts/')
  const PostsArr = useRef([]);
  useEffect(() => {
    if (currentUser !== null) {
      PostsArr.current = [];

      onValue(postRef, Datasnapshot => {
        Datasnapshot.forEach(child => {
          const postdata = child.val()
          const post = {
            username: '',
            caption: postdata.caption !== '' ? postdata.caption : postdata.text,
            imgUrl: postdata.imageUrl === '' ? '' : postdata.imageUrl,
            name: getUsername(postdata.userId),
            time: postdata.time,
            id: postdata.postid
          }

          console.log('username :', getUsername(postdata.userId))

          PostsArr.current.push(post)
        });
      });
      setPost(PostsArr.current.reverse());
     
    }
  },[currentUser,postRef,setPost]);

  

  return (
    <div className='app-container'>
      <Topbar className='navbar' />

      <div className='layout'>
          <SidebarMenu userid='kgotso'/>
        <div className='layout__main'>
          <CreatePost />
          {posts.map(post => (
            <Post
              key={post.id}
              username={post.username}
              name={post.name}
              caption={post.caption}
              imgUrl={post.imgUrl}
              time={post.time}
              postid={post.id}
            />
          ))}
        </div>
          <RightSideBar />
      </div>
    </div>
  )
}

export default Newsfeed
