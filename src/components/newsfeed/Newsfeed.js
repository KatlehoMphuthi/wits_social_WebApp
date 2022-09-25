import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import Post from './Posts'
import CreatePost from '../post/CreatePost'
import './Newsfeed.css'
import Topbar from '../common/Topbar'
import RightSideBar from '../common/RightSideBar'
import { AuthContext } from '../../AuthProvider'
import SidebarMenu from '../common/SidebarMenu'
import { database } from '../../firebase'
import { onValue, ref, query } from 'firebase/database'
import { async } from '@firebase/util'
import Posts from './Posts'

function Newsfeed () {
  const { currentUser } = useContext(AuthContext)
  const [posts, setPost] = useState([])

  //const PostsArr = useRef([]); // create an empty array to store the posts in
  const postRef = ref(database, 'posts/')
  useEffect(() => {
    if (currentUser !== null) {
      const PostsArr = []

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
          <CreatePost />
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
          <RightSideBar />
      </div>
    </div>
  )
}

export default Newsfeed
