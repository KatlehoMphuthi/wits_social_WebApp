import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import SidebarMenu from '../common/SidebarMenu'
import Topbar from '../common/Topbar'
import UserTopbar from '../common/UserTopbar'
import { useLocation } from 'react-router-dom'
import { getUsername } from '../../firebase'
import { getUserId } from '../../firebase'
import { useState } from 'react'
import { database } from '../../firebase'
import { onValue, ref, query, update } from 'firebase/database'
import { AuthContext } from '../../AuthProvider'
import ActionButton from '../newsfeed/ActionButton'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import './UserProfile.css'
import EditProfileModal from './EditProfileModal'
import Post from '../newsfeed/Posts'
import { Tabs, Tab } from '@mui/material'
import axios from 'axios'
import ProfilePicture from './ProfilePicture'

function UserProfile () {

  const POSTS_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts.json"
  


  //Global
  const { currentUser } = useContext(AuthContext) //get the current user.
  const [posts, setPost] = useState([])
  const [postsTest, setPostTest] = useState([])
  

  //Get clicked post id
  const location = useLocation()
  const postId = location.state.clickedpost
  const [postUserId, setPostUserId] = useState('')

  //To get user id of the clicked post
  useEffect(() => {
    if (location.state.from === 'topbar' || location.state.from === 'menu') {
      setPostUserId(currentUser.uid)
    } else if (location.state.from === 'search') {
      setPostUserId(postId)
    } else {
      let data

      //Clicked post reference
      const postRef = ref(database, `posts/${postId}/userId`)

      //get clicked post data -> userid
      onValue(postRef, snapshot => {
        data = snapshot.val()

        //Update user id variable to be used to get user details
        setPostUserId(data)
      })
    }
  }, [])

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

    console.log("from actual : " ,profileImage)
    }).catch(console.error)


    
    //console.log("profile pic",userDetails.profilePicture, "Has Profile Picture ",hasProfilePicture )
  },[firstname,lastname, profileImage, showEditProfileModal])





  useEffect(() =>{
    console.log("axios start")
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
    
    console.log("axios done")
  },[postUserId])


/*
  if(!(userDetails.profilePicture === "")){
    setHasProfilePicture(prevState => !prevState)
  }
 */
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
                {console.log("inside render :" , profileImage)}
                {!(profileImage == null) ? <img alt='' src={profileImage} className="displayPicture__image"/> : <p>{!(firstname == null) ? firstname.charAt(0) : null}</p> }
              </div>

              <div className='userProfile__userDetails'>
                <h2>
                  {firstname} {lastname}
                </h2>
                <p>{bio}</p>
                <div className='userProfile__Stats'>
                  <div className='stats'>
                    <h4>{postsTest.length}</h4>
                    <p>Posts</p>
                  </div>

                  <div className='stats'>
                    <h4>{posts.length}</h4>
                    <p>Likes</p>
                  </div>

                  <div className='stats'>
                    <h4>{numOfFollowers}</h4>
                    <p>Followers</p>
                  </div>

                  <div className='stats'>
                    <h4>{numOfFollowers}</h4>
                    <p>Following</p>
                  </div>
                </div>
              </div>
            </div>
            {/* If this is the current user logged in show the edit button */}

            <div className='userProfile__editButton'>
              {currentUser.uid === postUserId ? (
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
            <Tab value='Followers' label='Followers' />
            <Tab value='Following' label='Following' />
          </Tabs>

          {/*********Display Posts************ */}

          {/*********End of Testing Tabs************* */}

          <div className='userProfile__posts'>
            <div className='layout__main'>
              {value === 'Posts' && (
                <>
                  {
                  postsTest.slice(0)
                  .reverse()
                  .map(post => (
                    <Post
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
              {value === 'Likes' && <p>Likes tab</p>}





              {/*********Display  Followers************ */}
              {value === 'Followers' && <p>Followers tab</p>}







              {/*********Display  Following************ */}
              {value === 'Following' && <><p>Following tab</p></>}


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
