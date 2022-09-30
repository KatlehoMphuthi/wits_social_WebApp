import React, { useEffect } from 'react'
import  {useParams} from "react-router-dom";
import SidebarMenu from '../common/SidebarMenu';
import Topbar from '../common/Topbar';
import UserTopbar from '../common/UserTopbar';
import OtherUserProfile from './OtherUserProfile';
import CurrentUserProfile from './CurrentUserProfile';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function UserProfile() {
  const location = useLocation()
  const [postId, setPostId] = useState('')
  const [postUserid, setPostUserId] = useState('')

  useEffect(()=>{
    console.log(location.state.clickedpost)
    setPostId(location.state.clickedpost)
  },[])
  //Get userId from cliked profile on the ewsfeed
 // let {userid}  = useParams();

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
