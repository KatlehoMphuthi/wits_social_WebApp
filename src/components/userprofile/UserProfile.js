import React, { useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
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
import EditProfileModal from './EditProfileModal';
import styled from "styled-components";
import otheruser from "./otherUser.js"
import Post from '../newsfeed/Posts'



function UserProfile() {
  //---------------------------fetch user post------------------------------


  //Show and hide edit ptofile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const { currentUser } = useContext(AuthContext); //get the current user.

  let { name } = useParams();
  const location = useLocation()
  const postId = location.state.clickedpost

  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false)
  const [postUserId, setPostUserId] = useState('')
  const [postData, setPostData] = useState([])
  const [posts, setPosts] = useState([]);

  //Toggle edit profile modal
  const toggelEditProfile = () => {
    setShowEditProfileModal(prevState => !prevState)
  }

  //To get user id of the clicked post
  useEffect(() => {
    let data;
    fetchUser()
    //Clicked post reference
    const postRef = ref(database, `posts/${postId}/userId`);

    //get clicked post data -> userid
    onValue(postRef, (snapshot) => {
      data = snapshot.val();

      //Update user id variable to be used to get user details
      setPostUserId(data)
    });
  }, [])

  const fetchUser = () => {
    const arr = [];
    const userRef = ref(database, 'posts/')
    let ID;
 

    onValue(userRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log("here postUserID is my ID: ",postUserId)
        console.log("current.uid: ", currentUser.uid)
        if (childSnapshot.val().userId == currentUser.uid) { // here since I used the currently logged in user it will show the posts of the cureent user in every user profile
          const user_data = {
            // get the post object
            caption: childSnapshot.val().caption,
            imageUrl: childSnapshot.val().imageUrl,
            postid: childSnapshot.val().postid,
            text: childSnapshot.val().text,
            time: childSnapshot.val().time,
            userId: childSnapshot.val().userId,
            username: childSnapshot.val().username,
          }
          // console.log("user date: ", user_data);

          arr.push(user_data);
        }
      });
      setPosts(arr);
      console.log('user Posts: ', arr)
    })
  }

  //===============================================================
  
  //Find anither way to reoplace this code
  let userData;
  if (currentUser !== null) {

    //Current user reference
console.log("here postUserId clicked on, user Id : ",postUserId)
    const userRef = ref(database, 'users/' + postUserId);
    onValue(userRef, (snapshot) => {
      userData = snapshot.val();

      console.log(userData.firstname, userData.lastName)
    });
  }

  //===============================================================



  const editProfile = () => {
    alert('Got to edit profile page')
  }


  return (
    <div className='app-container'>
      <UserTopbar className='navbar' />

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
                  <p>
                    0
                  </p>
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
                Icon={EditRoundedIcon}
                onClick={toggelEditProfile} />
              : null}
          </div>

          <div className='userProfile__posts' style={{marginBottom: 50}}>
            <h4>Show user posts herer</h4>
            {posts.map((userPost, idx) => (
                <div key={idx} style={{marginBottom: 50}}> 
                <Post
                    key={idx}
                    username={userPost.username}
                    name={userPost.text}
                    caption={userPost.caption}
                    imgUrl={userPost.imageUrl}
                    time={userPost.time}
                    postid={userPost.postid}
                  />
                </div>
              ))
            }

          </div>
        </div>
        <EditProfileModal open={showEditProfileModal} onClose={toggelEditProfile} firstname={userData.firstname} lasttname={userData.lastName} />
      </div>


    </div>
  )
}
export default UserProfile
