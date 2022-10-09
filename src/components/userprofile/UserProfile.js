import React, { useEffect, useContext } from 'react'
import  {useParams} from "react-router-dom";
import SidebarMenu from '../common/SidebarMenu';
import Topbar from '../common/Topbar';
import UserTopbar from '../common/UserTopbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { database } from '../../firebase'
import { onValue, ref, query, update } from 'firebase/database'
import { AuthContext } from '../../AuthProvider'
import ActionButton from '../newsfeed/ActionButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './UserProfile.css'
import EditProfileModal from './EditProfileModal';

function UserProfile() {
  //Show and hide edit ptofile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const {currentUser} = useContext(AuthContext); //get the current user.

  let { name } = useParams();
  const location = useLocation()
  const postId = location.state.clickedpost

 

  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false)
  const [postUserId, setPostUserId] = useState('')
  const [postData, setPostData] = useState([])

  //Toggle edit profile modal
  const toggelEditProfile = () =>{
    setShowEditProfileModal(prevState => !prevState)
  }

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

   


  //===============================================================
  //Find anither way to reoplace this code
  let userData ;
    if (currentUser !== null) {
    //Current user reference
    const userRef = ref(database, 'users/' + postUserId);
    
    onValue(userRef, (snapshot) => {
      userData = snapshot.val();

      console.log(userData.firstname,userData.lastName )
    });
    }

     //===============================================================


    
 
 const editProfile =() =>{
    alert('Got to edit profile page')
 }
  
 
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
              <h2>{userData.firstname} {userData.lastName}</h2>
              <p>{userData.bio}</p>
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

           {currentUser.uid === postUserId ?
            
            <ActionButton
            text='Edit Profile'
            Icon = {EditRoundedIcon}
            onClick={toggelEditProfile}/>
            : null}
          </div>

          <div className='userProfile__posts'>
            <h4>Show user posts herer</h4>
            <p>Post 1</p>
            <p>Post 2</p>
            <p>Post 3</p>
          </div>
        </div>  
        <EditProfileModal open={showEditProfileModal} onClose={toggelEditProfile} firstname={userData.firstname} lasttname={userData.lastName} userId={postUserId}/>
      </div>

      
    </div>
  )
}

export default UserProfile
