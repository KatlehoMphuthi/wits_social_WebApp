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
import { onValue, ref } from 'firebase/database'


function Newsfeed ({test, theme}) {
 

  let change = test

  const  {currentUser}  = useContext(AuthContext)
  const [posts, setPost] = useState([])

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

      console.log(profilePictureUrl)
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
            profilePictureUrl : getProfilePictureUrl(postdata.userId)
          }

          console.log('url :', post.profilePictureUrl)

          PostsArr.current.push(post)
        });
      });

      setPost(PostsArr.current.reverse());
      
    }

  },[currentUser,postRef,setPost]);

  

  return (
    <div className='app-container' >
      <Topbar className='navbar'  change={change}/>

      <div className='layout'>
          <SidebarMenu userid='kgotso' change={change}/>
        <div className='layout__main'>
          <CreatePost username={getUsername(currentUser.uid)} profilePictureUrl={getProfilePictureUrl(currentUser.uid)} />
          {posts.map(post => (
            <Post
              key={post.id}
              username={post.username}
              name={post.name}
              caption={post.caption}
              imgUrl={post.imgUrl}
              time={post.time}
              postid={post.id}
              profilePictureUrl={post.profilePictureUrl}
            />
          ))}
        </div>
          <RightSideBar />
      </div>
    </div>
  )
}

export default Newsfeed
