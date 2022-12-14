import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import Post from '../newsfeed/Posts.js'
// import CreatePost from '../post/CreatePost'
import '../newsfeed/Newsfeed.css'
import Topbar from '../common/Topbar.js'
import RightsidebarExplore from '../common/RightsidebarExplore.js'
import { AuthContext } from '../../AuthProvider.js'
import SidebarMenu from '../common/SidebarMenu.js'
import { database } from '../../firebase.js'
import { onValue, ref, query } from 'firebase/database'
import PostsExplore from './PostsExplore.js'
import './explore.css'

function Explore({switchTheme, theme}) {
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

          if(!(postdata.imageUrl === '' )){
            PostsArr.push(post)
          }
          
        })
      })

      setPost(PostsArr.reverse())
    }
  }, [currentUser, postRef])

  return (
    <div className='app-container'>
      <Topbar className='navbar' switchTheme={switchTheme} theme={theme} />

      <div className='layout'>
          <SidebarMenu />
        <div className='explore__main' id="resultExplore">
          {/* <CreatePost /> */}
          {posts.map(post => (
            <PostsExplore
              key={post.id}
              imgUrl={post.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore;
