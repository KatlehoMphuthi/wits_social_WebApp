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

function UserProfile () {
  //Global
  const { currentUser } = useContext(AuthContext) //get the current user.
  const [posts, setPost] = useState([])
  const [Likedposts, setLikedPost] = useState([])
  const [Final_Likedposts, setFinalLikedPost] = useState([])

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
  let profileInitals
  if (currentUser !== null) {
    //Current user reference
    const userRef = ref(database, 'users/' + postUserId)

    onValue(userRef, snapshot => {
      userData = snapshot.val()
      console.log(userData.firstname, userData.lastName)
    })
  }
  //===============================================================

  //Get user Posts
  const postRef = ref(database, 'posts/')

  useEffect(() => {
    let postInfo
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

          if (postdata.userId === postUserId) {
            PostsArr.push(post)
          }
        })
      })

      setPost(PostsArr.reverse())
    }
  }, [currentUser, postRef, setPost])

  //-----  fetch posts liked by user 

  const LikedRef = ref(database, `userLikes/${postUserId}/posts`)

  useEffect(() => {
    
    if (currentUser !== null) {
      const LikedPostsArr = []

      onValue(LikedRef, Datasnapshot => {
        Datasnapshot.forEach(child => {
          const LikedPosts_data = child.key
            LikedPostsArr.push(LikedPosts_data) 
        })
      })
      console.log("hey array of liked posts: ", LikedPostsArr)
      setLikedPost(LikedPostsArr)

    }

  }, [currentUser, LikedRef, setLikedPost])

// ----------------------------- end of posts liked by user


  console.log("size of likedPosts 2 : ", Likedposts)
//========= now loop ID of user liked  posts, if ID found in posts then store in a array of liked posts========
  const LikedpostRef = ref(database, 'posts/')

  useEffect(() => {
    let postInfo
    if (currentUser !== null) {
      const LikedPostsArr = []

      onValue(LikedpostRef, Datasnapshot => {
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

          for (let i = 0; i < Likedposts.length; i++) {
            if (Likedposts[i] == postdata.postid )
            {
              LikedPostsArr.push(post)
            }
          }

        })
      })

      setFinalLikedPost(LikedPostsArr.reverse())
    }
  }, [currentUser, LikedpostRef, setFinalLikedPost])

//====================================end of 
  //followers + following
  //get reference to users that the current user is following
  let numOfFollowers = 0
  let numOfFollowing = 0
  const followingRef = ref(database, 'follow/' + postUserId + '/following')
  const followersRef = ref(database, 'follow/' + postUserId + '/followers')

  onValue(followingRef, snapshot => {
    numOfFollowing = snapshot.size
    // console.log(numOfFollowing)
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
                <p className='displayPicture'>dp</p>
              </div>

              <div className='userProfile__userDetails'>
                <h2>
                  {userData.firstname} {userData.lastName}
                </h2>
                <p>{userData.bio}</p>
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

               {value === 'Likes'  && (
                <>
                  {Final_Likedposts.map(post => (
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
                </>
              )}
              

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
          firstname={userData.firstname}
          lasttname={userData.lastName}
          userId={postUserId}
          bio={userData.bio}
        />
      </div>
    </div>
  )
}

export default UserProfile
