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

import Followers from './Followers'


function UserProfile () {

  const POSTS_URL = "https://sdpwits-social-default-rtdb.firebaseio.com/posts.json"
  


  //Global
  const { currentUser } = useContext(AuthContext) //get the current user.
  const [posts, setPost] = useState([])

  const [followers, setFollowers] = useState([])

  const [postsTest, setPostTest] = useState(null)


  //Get clicked post id
  const location = useLocation()
  const postId = location.state.clickedpost
  const [postUserId, setPostUserId] = useState('')


  //Get clicked follow id
  const locationf = useLocation()
  const followId = locationf.state.clickedpost
  const [followUserId, setFollowerId] = useState('')
  const [follow_name, setFollow_name] = useState('')
  const [follow_lname, setFollow_lname] = useState('')

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
  

   //To get user id of the clicked follow
  useEffect(() => {
    if (location.state.from === 'topbar' || location.state.from === 'menu') {
      setFollowerId(currentUser.uid)
    } else if (location.state.from === 'search') {
      setFollowerId(followId)
    } else {
      let data

      //Clicked follow reference
      const followereRef = ref(database, `follow/${followId}/userId`)

      //get clicked follow data -> userid
      onValue(followereRef, snapshot => {
        data = snapshot.val()

        //Update user id variable to be used to get user details
        setFollowerId(data)
      })
    }
  }, [])


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
    console.log("user posts")
    axios.get(USER_POST_URL).then((response)=>{
      setProfileInitals(response.data.firstname)
    }).catch(console.error)

    console.log("hi")
  },[profileInitals])

  useEffect(() =>{
    console.log("axios start")
    axios.get(POSTS_URL).then((response) =>{
      console.log(response.data)
      setPost(Object.values(response.data))
      console.log(posts)
    })

    console.log("axios done")
  },[])

   
  //followers + following
  
  
  
  //get reference to users that the current user is following
  let numOfFollowers = 0
  let numOfFollowing = 0
  const followingRef = ref(database, 'follow/' + postUserId + '/following')
  const followersRef = ref(database, 'follow/' + postUserId + '/followers')

  const followers_url = `https://sdpwits-social-default-rtdb.firebaseio.com/follow/${postUserId}/followers`;

  useEffect(() =>{
    let followers = [];
    let followerArr =[];
    onValue(followersRef,(snapshot) =>{
      snapshot.forEach( child =>{
        followers.push(child.key)
      })
    });

    //console.log(followers)

    for(let i = 0; i<followers.length;i++){
      onValue(ref(database,`users/${followers[i]}`),(snap) =>{
        const data =  snap.val()
        setFollow_name(data.firstname)
        setFollow_lname(data.lastName)
  
        const follow = {
          firstname:data.firstname,
          lastname: data.lastName
        }

        followerArr.push(follow)
      })

      
    }

    //console.log(followerArr);

    setFollowers(followerArr);

  },[followersRef,setFollowers]);

  onValue(followingRef, snapshot => {
    numOfFollowing = snapshot.size

    //console.log(numOfFollowing)

  })

  //followers
  onValue(followersRef, snapshot => {
    numOfFollowers = snapshot.size

    //console.log(numOfFollowers)

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
              {false ? (
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
              {value === 'Posts' && (
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
              {/* {value === 'Following' && <p>Followers tab</p>} */}
           



              {/*********Display  Following************ */}
              {value === 'Followers' && (
                <>
                  {followers.map(follow => (
                    <Followers
                      fname = {follow.firstname}
                      lname = {follow.lastname}
                    />
                  ))}
                </>
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
