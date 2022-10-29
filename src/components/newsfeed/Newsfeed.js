import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import Posts from './Posts.js'
import CreatePost from '../post/CreatePost.js'
import './Newsfeed.css'
import Topbar from '../common/Topbar.js'
import RightSideBar from '../common/RightSideBar.js'
import { AuthContext } from '../../AuthProvider.js'
import SidebarMenu from '../common/SidebarMenu.js'
import { database } from '../../firebase.js'
import { onValue, ref } from 'firebase/database'



function Newsfeed ({test, theme}) {
 
  console.log("theme from app.js", localStorage.getItem("theme"))

  let change = test

  const  {currentUser}  = useContext(AuthContext)
  const user = JSON.parse(localStorage.getItem('user'))
  const [posts, setPost] = useState([])
  let userid;
  if(user !== null){
    userid = user.uid
  }else{
    if(currentUser !== null){
      userid = currentUser.uid
    }
  }
  const getUsername =(userId) =>{
    let userData;
    if (currentUser !== null) {
      //Current user reference
      const userRef = ref(database, 'users/' + userId);
      
      onValue(userRef, (snapshot) => {
        const name = snapshot.val();
        userData=name.firstname;
      });
      }

      return  userData;
  }

  const getProfilePictureUrl =(userId) =>{
    let profilePictureUrl;
    if (currentUser !== null) {
      //Current user reference
      const userRef = ref(database, 'users/' + userId);
      
      onValue(userRef, (snapshot) => {
        const name = snapshot.val();
        profilePictureUrl=name.profilePictureUrl;
      });
      }
      return  profilePictureUrl;
      
  }


  const PostsArr = useRef([]);
    //const PostsArr = useRef([]); // create an empty array to store the posts in
    const postRef = ref(database, 'posts/') 
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
            id: postdata.postid,
            profilePictureUrl : getProfilePictureUrl(postdata.userId),
            userid: postdata.userId
          }


          PostsArr.current.push(post)
        });
      });

      setPost(PostsArr.current.reverse());
      
    }

  },[currentUser,postRef,setPost]);

  

  return (
    <div className='app-container' >
      <Topbar className='navbar'  change={change} theme={theme}/>

      <div className='layout'>
          <SidebarMenu userid='kgotso' change={change}/>
        <div className='layout__main'>
          <CreatePost username={getUsername(userid)} profilePictureUrl={getProfilePictureUrl(userid)} />
          {posts.map(post => (
            <Posts
              key={post.id}
              username={post.username}
              name={post.name}
              caption={post.caption}
              imgUrl={post.imgUrl}
              time={post.time}
              postid={post.id}
              userid = {post.userid}
              profilePictureUrl={post.profilePictureUrl}
            />
          ))}
        </div>
          <RightSideBar />
      </div>
    </div>
  )
}

export default Newsfeed;