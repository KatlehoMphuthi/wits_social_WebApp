//import react and important libraries
import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

//import important components
import SidebarMenu from '../common/SidebarMenu'
import UserTopbar from '../common/UserTopbar'
import './UserProfile.css'
import EditProfileModal from './EditProfileModal'
import Post from '../newsfeed/Posts'
import Followers from './Followers'
import '../newsfeed/Newsfeed.css'

//import necessary functions from backend and firebase
import { database } from '../../firebase'
import { onValue, ref} from 'firebase/database'
import { AuthContext } from '../../AuthProvider'

//import icons for UIX 
import ActionButton from '../newsfeed/ActionButton'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Tabs, Tab } from '@mui/material'

function UserProfile () {

  //Global
  const { currentUser } = useContext(AuthContext) //get the current user.
  const [posts, setPost] = useState([]) // user's posts
  const [Final_Likedposts, setFinalLikedPost] = useState([]) // Liked posts of the user 
  const [followers, setFollowers] = useState([]) // followers
  const [following, setFollowing] = useState([]) // user following
  const [postUserId, setPostUserId] = useState('') // the user's id
  
  //Get clicked post id
  const location = useLocation()
  const postId = location.state.clickedpost
  const userPath = location.pathname
  let user = userPath.split('/')
  let userInfo = JSON.parse(localStorage.getItem('user'))


  //To get user id of the clicked post
  useEffect(() => {
    if (location.state.from === 'topbar' || location.state.from === 'menu') {
      setPostUserId(userInfo.uid)
    } else if (location.state.from === 'search') {
      setPostUserId(postId)
    } else {
      
      setPostUserId(user[1]);
    }
  }, [location.state.from,postId,user,userInfo.uid])
  
  /*
   *Edit Profile functionality
   */
  //Show and hide edit ptofile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  //Toggle edit profile modal
  const toggelEditProfile = () => {
    setShowEditProfileModal(prevState => !prevState)
  }

  //===============================================================
  //Find anither way to reoplace this code
  let userData

  const [profileInitals, setProfileInitals] = useState('')

  if (currentUser !== null) {
    //Current user reference
    const userRef = ref(database, 'users/' + postUserId)

    onValue(userRef, snapshot => {
      userData = snapshot.val()

      //console.log(userData.firstname, userData.lastName)

    })
  }
  //===============================================================
 

  const USER_POST_URL = `https://sdpwits-social-default-rtdb.firebaseio.com/users/${postUserId}.json`
  useEffect(()=>{
    //console.log("user posts")
    axios.get(USER_POST_URL).then((response)=>{
      setProfileInitals(response.data.firstname)
    }).catch(console.error)

    //console.log("hi")
  },[USER_POST_URL])

  // fetch users posts
  const POSTS_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts.json"
  useEffect(() =>{

    axios.get(POSTS_URL).then((response) =>{
      let postsA = Object.values(response.data)
      let postsB = []

      for(let i = 0; i < postsA.length; i++){
        if(postsA[i].userId === postUserId){
          postsB.push(postsA[i]);
        }
      }
      setPost(postsB.reverse())
    })
  },[postUserId])


  //-----  fetch posts liked by user 

 const LikedRef = ref(database, `userLikes/${postUserId}/posts`)
 //get the number of likes the user made 
 let numofLikes = 0
  onValue(LikedRef, snapshot => {
    numofLikes = snapshot.size
  })
 const LikeUrl = `https://sdpwits-social-default-rtdb.firebaseio.com/userLikes/${postUserId}/posts.json`
 

  useEffect(() => {
    axios.get(LikeUrl).then((response) =>{
      if(response.data !== null){
        let likes = Object.keys(response.data);
        let likes_arr = [];
        likes.forEach((key) =>{
          const singlePost = `https://sdpwits-social-default-rtdb.firebaseio.com/posts/${key}.json`
          axios.get(singlePost).then((res) =>{
            likes_arr.push(res.data);
          })
        })
        console.log(likes_arr);
        setFinalLikedPost(likes_arr)
        
      }
      else{
        console.log("User has no liked posts")
      }
      
    })


  }, [LikeUrl])

//====================================end of 

  //followers + following

  //get reference to users that the current user is following
  let numOfFollowers = 0
  let numOfFollowing = 0
  const followingRef = ref(database, 'follow/' + postUserId + '/following')
  const followersRef = ref(database, 'follow/' + postUserId + '/followers')

  //get the number of following
  onValue(followingRef, snapshot => {
    numOfFollowing = snapshot.size
  })

  // get the number of followers
  onValue(followersRef, snapshot => {
    numOfFollowers = snapshot.size
  })

  const followers_url = `https://sdpwits-social-default-rtdb.firebaseio.com/follow/${postUserId}.json`
  // fetcht the followers and following
   useEffect(() =>{
    const getFollowers = (data) =>{
      let followersA = data
      let followersB = []
      
      followersA.forEach((key) =>{
        const user = `https://sdpwits-social-default-rtdb.firebaseio.com/users/${key}.json`
        axios.get(user).then((res) =>{
          followersB.push(res.data)
        })
      })
  
      setFollowers(followersB)
    }

    const getFollowing = (data) =>{
      let followersA = data
      let followersB = []

      followersA.forEach((key) =>{
        const user = `https://sdpwits-social-default-rtdb.firebaseio.com/users/${key}.json`
        axios.get(user).then((res) =>{
          followersB.push(res.data)
        })
      })
  
      setFollowing(followersB)
    }
    
    
    axios.get(followers_url).then((response) =>{
      if(response.data !== null){
        const state = Object.keys(response.data)
        if(state.length === 1){
          if(state[0] === "followers"){
            getFollowers(Object.keys(response.data.following))
          }
          if (state[0] === "following"){
            getFollowing(Object.keys(response.data.following))
          }
        } else if(state.length === 2){
            
            getFollowers(Object.keys(response.data.followers))
            getFollowing(Object.keys(response.data.following))
        }else{
          console.log("An error has occurred")
        } 
      }else{
        console.log("This user has no followers or is not following anyone");
      }
      
    })

  },[followers_url]);
 
  

  /*
   *User Profile Tabs functionality
   */

  //for selected tabs
  const [value, setValue] = React.useState('Posts')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  //Add tabs code here

  return (
    <div className='app-container'>
      <UserTopbar className='navbar' />

      <div className='layout'>
        <SidebarMenu />
        <div className='layout__main'>
          <div className='userProfile__header'>
            <div className='user_details_wrapper'>
              <div className='userProfile__displayPicture'>
                <p className='displayPicture'>{profileInitals}</p>
              </div>

              <div className='userProfile__userDetails'>
                <h2>
                  {profileInitals}
                </h2>
                <p></p>
                <div className='userProfile__Stats'>
                  <div className='stats'>
                    <h4>{posts.length}</h4>
                    <p>Posts</p>
                  </div>

                  <div className='stats'>
                    <h4>{numofLikes}</h4>
                    <p>Likes</p>
                  </div>

                  <div className='stats'>
                    <h4>{numOfFollowers}</h4>
                    <p>Followers</p>
                  </div>

                  <div className='stats'>
                    <h4>{numOfFollowing}</h4>
                    <p>Following</p>
                  </div>
                </div>
              </div>
            </div>
            {/* If this is the current user logged in show the edit button */}

            <div className='userProfile__editButton'>
              { postUserId === userInfo.uid ? (
                <ActionButton
                  text='Edit'
                  Icon={EditRoundedIcon}
                  onClick={toggelEditProfile}
                />
              ) : null}
            </div>
          </div>

          {/*********Testing Tabs************* */}

          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='secondary tabs example'
          >
            <Tab value='Posts' label='Posts' />
            <Tab value='Likes' label='Likes' />
            <Tab value='Followers' label='Follow' />
            <Tab value='Following' label='Following' />
          </Tabs>

          {/*********Display Posts************ */}

          {/*********End of Testing Tabs************* */}

          <div className='userProfile__posts'>
            <div className='layout__main'>
              {value === 'Posts' && (posts.length !== 0 ?
                <>
                  {posts.map(post => (
                    <Post
                      key={post.postid}
                      username={post.username}
                      name={post.name}
                      caption={post.caption === '' ? post.text : post.caption }
                      imgUrl={post.imageUrl}
                      time={post.time}
                      postid={post.postid}
                      userid = {post.userId}
                    />
                  ))}
                </>: <p> User has no posts</p>
              )}



              {/**
               * NOTE
               * 
               * Replace the <p>Tab Name</p> with <>Your coe here </>
               * use post as a reference
               * 
               * This applies to all tabs below
               */}

              {/*********Display Linked Posts************ */}

               {value === 'Likes'  &&  ( numofLikes !== 0 ?
                <>
                  {Final_Likedposts.map(post => (
                    <Post
                      key={post.id}
                      username={post.username}
                      name={post.name}
                      caption={post.caption === '' ? post.text : post.caption }
                      imgUrl={post.imageUrl}
                      time={post.time}
                      postid={post.id}
                      userid = {post.userId}
                    />
                  ))}
                </>: <p> Users has no Likes </p>
              )}
              

              {/*********Display  Following************ */}
              { value === 'Following' && (numOfFollowing !== 0 ? 
                <>
                  {following.map(follow => (
                    <Followers
                      fname = {follow.firstname}
                      lname = {follow.lastName}
                      propic = {follow.profilePictureUrl === undefined ? "":follow.profilePictureUrl}
                    />
                  ))}
                </>: <p>User is currently following no one</p>) }
           



              {/*********Display  Followers************ */}
              {value === 'Followers' && ( numOfFollowers !== 0 ?
                <>
                  {followers.map(follow => (
                    <Followers
                      fname = {follow.firstname}
                      lname = {follow.lastName}
                      propic = {follow.profilePictureUrl === null ? "":follow.profilePictureUrl}
                    />
                  ))}
                </>: <p>User has no followers</p>
              )}


            </div>
          </div>
        </div>
        <EditProfileModal
          open={showEditProfileModal}
          onClose={toggelEditProfile}
          userId={postUserId}
          bio=""
        />
      </div>
    </div>
  )
}

export default UserProfile
