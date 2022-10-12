import React, { useEffect, useContext } from 'react'
import  {useParams} from "react-router-dom";
import SidebarMenu from '../common/SidebarMenu';
import Topbar from '../common/Topbar';
import UserTopbar from '../common/UserTopbar';
import { useLocation } from 'react-router-dom';
import {getUsername} from '../../firebase'
import {getUserId} from '../../firebase'
import { useState } from 'react';
import { database } from '../../firebase'
import { onValue, ref, query, update } from 'firebase/database'
import { AuthContext } from '../../AuthProvider'
import ActionButton from '../newsfeed/ActionButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './UserProfile.css'
import EditProfileModal from './EditProfileModal';
import Post from '../newsfeed/Posts'


function UserProfile() {
  //Show and hide edit ptofile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const {currentUser} = useContext(AuthContext); //get the current user.

  let { name } = useParams();
  const location = useLocation()
  const postId = location.state.clickedpost

  console.log('current user id : ', currentUser.uid )

  const [posts, setPost] = useState([])

  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false)
  const [postUserId, setPostUserId] = useState('')
  const [postData, setPostData] = useState([])

  //Toggle edit profile modal
  const toggelEditProfile = () =>{
    setShowEditProfileModal(prevState => !prevState)
  }

  

  //if clicled post id = ' ' 
  //run use effect
  //else set post to current user id


  //To get user id of the clicked post
  useEffect(()=>{

    if(location.state.from === 'topbar' || location.state.from === 'menu'){
      setPostUserId(currentUser.uid )
    }else if(location.state.from === 'search'){
      setPostUserId(postId)
    }else{
      let data;

      //Clicked post reference
      const postRef = ref(database, `posts/${postId}/userId`);
  
      //get clicked post data -> userid
      onValue(postRef, (snapshot) => {
        data = snapshot.val();
  
        //Update user id variable to be used to get user details
        setPostUserId(data)
      });
    }

   
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

    
     //Get user Posts
     
     const postRef = ref(database, 'posts/')
     
     useEffect(() => {
      let postInfo;
       if (currentUser !== null) {
         const PostsArr = []
   
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
             
             if(postdata.userId === postUserId){
              PostsArr.push(post)
            }
           })
         })
   
         setPost(PostsArr.reverse())
       }
     },[currentUser,postRef,setPost])
 
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
                  <h4>{posts.length}</h4>
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
          <div className='layout__main'>
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
          </div>
        </div>  
        <EditProfileModal open={showEditProfileModal} onClose={toggelEditProfile} firstname={userData.firstname} lasttname={userData.lastName} userId={postUserId}/>
      </div>

      
    </div>
  )
}

export default UserProfile
