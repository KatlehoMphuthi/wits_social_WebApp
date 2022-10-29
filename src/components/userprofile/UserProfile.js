import React, { useEffect, useContext } from 'react'
import SidebarMenu from '../common/SidebarMenu.js'
import UserTopbar from '../common/UserTopbar.js'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { database } from '../../firebase.js'
import { onValue, ref, query, update } from 'firebase/database'
import { AuthContext } from '../../AuthProvider.js'
import ActionButton from '../newsfeed/ActionButton.js'
import EditRoundedIcon from '@mui/icons-material/EditRounded.js'
import './UserProfile.css'
import EditProfileModal from './EditProfileModal.js'
import Posts from '../newsfeed/Posts.js'
import { Tabs, Tab } from '@mui/material'
import axios from 'axios'
import ProfilePicture from './ProfilePicture.js'
import Followers from './Followers.js'
import '../newsfeed/Newsfeed.css'

function UserProfile ({theme}) {

  const POSTS_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts.json"
  


  //Global
  const { currentUser } = useContext(AuthContext) //get the current user.
  const [posts, setPost] = useState([])
  const [postsTest, setPostTest] = useState([])
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
      if(currentUser){
        setPostUserId(currentUser.uid)
      }
    } else if (location.state.from === 'search') {
      setPostUserId(postId)
    } else {
      setPostUserId(user[1])
    }
  }, [location.state.from,postId,user,currentUser])

  const USER_POST_URL = `https://sdpwits-social-default-rtdb.firebaseio.com/users/${postUserId}.json`;

  //Profile picture
  const [hasProfilePicture, setHasProfilePicture] = useState(false);

  /*
   *Edit Profile functionality
   */
  //Show and hide edit ptofile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  //Toggle edit profile modal
  const toggelEditProfile = () => {
    axios.get(USER_POST_URL).then((response)=>{
      setProfileImage(response.data.profilePictureUrl)
    }).catch(console.error)
    setShowEditProfileModal(prevState => !prevState)
  }

  //===============================================================
  //Find anither way to reoplace this code
  let userData

  const [userDetails, setUserDetails] = useState({ firstname: "", lastname: "", profilePicture: ""})
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [initals, setInitals] = useState('')
  const [id, setId]= useState('')

  if (currentUser !== null) {
    //Current user reference
    const userRef = ref(database, 'users/' + postUserId)

    onValue(userRef, snapshot => {
      userData = snapshot.val()
    })
  }
  //===============================================================

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



  useEffect(()=>{
    console.log("user posts start")
    axios.get(USER_POST_URL).then((response)=>{
     
      setFirstname(response.data.firstname)
      setLastname(response.data.lastName)
      setProfileImage(response.data.profilePictureUrl)
      setBio(response.data.bio)
      setId(response.data.userid)

    console.log("from actual : " ,profileImage)
    }).catch(console.error)


    
    //console.log("profile pic",userDetails.profilePicture, "Has Profile Picture ",hasProfilePicture )
  },[firstname,lastname, profileImage, showEditProfileModal,USER_POST_URL])





  useEffect(() =>{
    /* console.log("axios start")
    async function getPosts() {
      try {
        const response = await axios.get(POSTS_URL);
        
        let data = Object.values(response.data)
        data.forEach(d=>{
          if(d.userId === postUserId){
            d.name = getUsername(postUserId)
            d.profilePictureUrl = getProfilePictureUrl(postUserId)
            console.log( d.profilePictureUrl);
            setPostTest(prevArray => [...prevArray, d])
          }
        
     })
      } catch (error) {
        console.error(error);
      }
    }

    getPosts();
    
    console.log("axios done") */
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


/*
  if(!(userDetails.profilePicture === "")){
    setHasProfilePicture(prevState => !prevState)
  }
 */

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
      if(response.data !== null || response.data !== undefined){
        console.log(response)
        let likes = Object.keys(response.data);
        let likes_arr = [];
        likes.forEach((key) =>{
          const singlePost = `https://sdpwits-social-default-rtdb.firebaseio.com/posts/${key}.json`
          axios.get(singlePost).then((res) =>{
            likes_arr.push(res.data);
          })
        })
        console.log(likes_arr);
        setFinalLikedPost(likes_arr.reverse())
        
      }
      else{
        console.log("User has no liked posts")
      }
      
    })


  }, [LikeUrl])
  //followers + following
  //get reference to users that the current user is following
  let numOfFollowers = 0
  let numOfFollowing = 0
  const followingRef = ref(database, 'follow/' + postUserId + '/following')
  const followersRef = ref(database, 'follow/' + postUserId + '/followers')

  onValue(followingRef, snapshot => {
    numOfFollowing = snapshot.size
  //  console.log(numOfFollowing)
  })

  //followers
  onValue(followersRef, snapshot => {
    numOfFollowers = snapshot.size
   // console.log(numOfFollowers)
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
              <div className='userProfile__displayPicture' data-testid= "proPic">
                {console.log("inside render :" , profileImage)}
                {!(profileImage == null) ? <img  alt='' src={profileImage} className="displayPicture__image"/> : <p>{!(firstname == null) ? firstname.charAt(0) : null}</p> }
              </div>

              <div className='userProfile__userDetails'>
                <h2>
                  {firstname} {lastname}
                </h2>
                <p>{bio}</p>
                <div className='userProfile__Stats'>
                  <div className='stats'>
                    <h4>{posts.length}</h4>
                    <p>Posts</p>
                  </div>

                  <div className='stats'>
                    <h4>{Final_Likedposts.length}</h4>
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

            <div className='userProfile__editButton' data-testid ="edit" id="editButton">
              {id === postUserId ? (
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
            textColor= {theme === 'light' ? '#ffffff'  : '#000000'}
            indicatorColor='secondary'
            aria-label='secondary tabs example'
          >
            <Tab value='Posts' label='Posts' />
            <Tab value='Likes' label='Likes' />
            <Tab value='Followers' label='Followers' />
            <Tab value='Following' label='Following' />
          </Tabs>

          {/*********Display Posts************ */}

          {/*********End of Testing Tabs************* */}

          <div className='userProfile__posts'>
            <div className='layout__main' id = 'userposts' data-testid = 'user'>
              {value === 'Posts' && (
                <>
                  {
                  posts.slice(0)
                  .reverse()
                  .map(post => (
                    <Posts
                      name={post.name}
                      caption={post.caption === '' ? post.text : post.caption }
                      imgUrl={post.imageUrl}
                      time={post.time}
                      postid={post.postid}
                      profilePictureUrl={post.profilePictureUrl}
                    />
))}   
                </>
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
              {value === 'Likes' && ( numofLikes !== 0 ?
                <>
                  {Final_Likedposts.map(post => (
                    <Posts
                      key={post.id}
                      username={post.username}
                      name={post.name}
                      caption={post.caption === '' ? post.text : post.caption }
                      imgUrl={post.imageUrl}
                      time={post.time}
                      postid={post.id}
                      userid = {post.userId}
                      profilePictureUrl = {profileImage}
                    />
                  ))}
                </>: <p> Users has no Likes </p>
              )}





              {/*********Display  Followers************ */}
              {value === 'Followers' && ( numOfFollowers !== 0 ?
                <>
                  {followers.map(follow => (
                    <Followers
                      fname = {follow.firstname}
                      lname = {follow.lastName}
                      propic = {follow.profilePictureUrl === undefined ? "":follow.profilePictureUrl}
                    />
                  ))}
                </>: <p>User has no followers</p>)
              }







              {/*********Display  Following************ */}
              {value === 'Following' && (numOfFollowing !== 0 ? 
                <>
                  {following.map(follow => (
                    <Followers
                      fname = {follow.firstname}
                      lname = {follow.lastName}
                      propic = {follow.profilePictureUrl === undefined ? "":follow.profilePictureUrl}
                    />
                  ))}
                </>: <p>User is currently following no one</p>) }


            </div>
          </div>
        </div>
        <EditProfileModal
          open={showEditProfileModal}
          onClose={toggelEditProfile}
          userId={postUserId}
          firstname={firstname}
          lastname={lastname}
          profilePictureUrl={profileImage}
          bio={bio}
        />
      </div>
    </div>
  )
}

export default UserProfile