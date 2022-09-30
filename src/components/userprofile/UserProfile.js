import React, { useEffect, useContext } from 'react'
import  {useParams} from "react-router-dom";
import SidebarMenu from '../common/SidebarMenu';
import Topbar from '../common/Topbar';
import UserTopbar from '../common/UserTopbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { database } from '../../firebase'
import { onValue, ref, query } from 'firebase/database'
import { AuthContext } from '../../AuthProvider'
import ActionButton from '../newsfeed/ActionButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './UserProfile.css'

function UserProfile() {
  const { currentUser } = useContext(AuthContext)

  let { name } = useParams();
  const location = useLocation()
  const postId = location.state.clickedpost


  const [postUserId, setPostUserId] = useState('')
  const [postData, setPostData] = useState([])

  //To get user id of the clicked post
  useEffect(()=>{
    let data;

    //Clicked post reference
    const postRef = ref(database, `posts/${postId}/userId`);

    //get clicked post data -> userid
    onValue(postRef, (snapshot) => {
      data = snapshot.val();

      //Update user id variable to be used to get user details
      setPostUserId(data)
    });
  },[])

    //Get user details and update the ui
    //Go to this user datatbase collection and render the details
    console.log('user id is :' , postUserId)
 
 const editProfile =() =>{
    alert('Got to edit profile page')
 }
  
  //
  let isCurrentUserProfile = false;

  return (
    <div className='app-container'>
      <UserTopbar className='navbar'/>

      <div className='layout'>
          <SidebarMenu />
        <div className='layout__main'>

          <div className='userProfile__header'>
            
            <div className='userProfile__displayPicture'>
             <p className='displayPicture'>dp</p>
            </div>

            <div className='userProfile__userDetails'>
              <h2>username</h2>
              <p>This is a very short bio of a user</p>
              <div className='userProfile__Stats'>
                <div className='stats'>
                  <h4>0</h4>
                  <p>Posts</p>
                </div>

                <div className='stats'>
                  <h4>0</h4>
                  <p>Followers</p>
                </div>

                <div className='stats'>
                  <h4>0</h4>
                  <p>Following</p>
                </div>
              </div>
            
            
            </div>
           
           {/* If this is the current user logged in show the edit button */}

           {isCurrentUserProfile ?
            
            <ActionButton
            text='Edit Profile'
            Icon = {EditRoundedIcon}
            onClick={editProfile}/>
            : null}
          </div>

          <div className='userProfile__posts'>
            <h4>Show user posts herer</h4>
            <p>Post 1</p>
            <p>Post 2</p>
            <p>Post 3</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile