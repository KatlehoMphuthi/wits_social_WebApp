import React, { useEffect, useContext } from 'react'
import  {useParams} from "react-router-dom";
import SidebarMenu from '../common/SidebarMenu';
import Topbar from '../common/Topbar';
import UserTopbar from '../common/UserTopbar';
import OtherUserProfile from './OtherUserProfile';
import CurrentUserProfile from './CurrentUserProfile';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { database } from '../../firebase'
import { onValue, ref, query } from 'firebase/database'
import { AuthContext } from '../../AuthProvider'

function UserProfile() {
  const { currentUser } = useContext(AuthContext)

  const location = useLocation()
  const postId = location.state.clickedpost


  const [postUserId, setPostUserId] = useState('')
  const [postData, setPostData] = useState([])

  console.log('Post Id', postId)

  //To get user id of the clicked post
  useEffect(()=>{
    let data;

    //Clicked post reference
    const postRef = ref(database, `posts/${postId}/username`);

    //get clicked post data -> userid
    onValue(postRef, (snapshot) => {
      data = snapshot.val();

      //Update user id variable to be used to get user details
      setPostData(data)
    });
  },[])

  //Get user details and update the ui

 console.log(postData)

  
  //
  let isCurrentUserProfile = false;



  return (
    <div className='app-container'>
      <UserTopbar className='navbar'/>

      <div className='layout'>
          <SidebarMenu />
        <div className='layout__main'>

          <div className='userProfile__header'>
            
            {/* CurrentUserProfile -> Logged in user, otherUserprofile -> Profile of other users */}
            {isCurrentUserProfile ? <CurrentUserProfile /> : <OtherUserProfile />}
          </div>


          {/* Add user Posts here */}
          <h1>Users post, postID</h1>
          <ul>
            <ol>Remove the section 1 & 2, they are just guiudes</ol>
            <ol>User posts will show here</ol>
            <ol>Reuse components from Newsfeed</ol>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
