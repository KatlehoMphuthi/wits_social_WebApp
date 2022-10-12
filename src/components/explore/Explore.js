import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import Post from '../newsfeed/Posts'
<<<<<<< HEAD
import CreatePost from '../post/CreatePost'
import '../newsfeed/Newsfeed.css'
import Topbar from '../common/Topbar'
import RightSideBar from '../common/RightSideBar'
=======
// import CreatePost from '../post/CreatePost'
import '../newsfeed/Newsfeed.css'
import Topbar from '../common/Topbar'
import RightsidebarExplore from '../common/RightsidebarExplore'
>>>>>>> 5dc421bd73889802a915e01aafdbb8cdb448dce3
import { AuthContext } from '../../AuthProvider'
import SidebarMenu from '../common/SidebarMenu'
import { database } from '../../firebase'
import { onValue, ref, query } from 'firebase/database'
<<<<<<< HEAD
=======
import PostsExplore from './PostsExplore'
>>>>>>> 5dc421bd73889802a915e01aafdbb8cdb448dce3

function Explore() {
  const { currentUser } = useContext(AuthContext)
  const [posts, setPost] = useState([])

  const postRef = ref(database, 'posts/')
  useEffect(() => {
    if (currentUser !== null) {
      const PostsArr = []// create an empty array to store the posts in

      onValue(postRef, Datasnapshot => {
        Datasnapshot.forEach(child => {
          const postdata = child.val()
          const post = {
            username: '',
            caption: postdata.caption !== '' ? postdata.caption : postdata.text,
            imgUrl: postdata.imageUrl === '' ? '' : postdata.imageUrl,
            name: postdata.username,
            time: postdata.time,
            id: postdata.postid
          }

          PostsArr.push(post)
        })
      })

      setPost(PostsArr.reverse())
    }
  }, [currentUser, postRef])

  return (
    <div className='app-container'>
      <Topbar className='navbar' />

      <div className='layout'>
          <SidebarMenu />
        <div className='layout__main'>
<<<<<<< HEAD
          <CreatePost />
          {posts.map(post => (
            <Post
=======
          {/* <CreatePost /> */}
          {posts.map(post => (
            <PostsExplore
>>>>>>> 5dc421bd73889802a915e01aafdbb8cdb448dce3
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
<<<<<<< HEAD
          <RightSideBar />
=======
          <RightsidebarExplore />
>>>>>>> 5dc421bd73889802a915e01aafdbb8cdb448dce3
      </div>
    </div>
  )
}

export default Explore;
