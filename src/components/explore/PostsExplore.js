import '../newsfeed/Post.css';
import React, { useEffect, useState, useContext } from 'react'
import cn from 'classnames'
import '../newsfeed/likestyle.scss'
import { AuthContext } from '../../AuthProvider.js'
import { useNavigate } from 'react-router-dom'
import { database } from '../../firebase.js'
import { set, ref, push, onValue } from 'firebase/database'



const LikeButton = () => {
  const [liked, setLiked] = useState(null)
  const [clicked, setClicked] = useState(false)
  const count = 0
  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setClicked(true)
        //count++;
        console.log(count)
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn('like-button-wrapper', {
        liked,
        clicked
      })}
    >
      <div className='like-button'>
      
        <span>Like</span>
        <span className={cn('suffix', { liked })}>d</span>
      </div>
    </button>
  )
}

function PostsExplore({ username, name, caption, imgUrl, time, postid }) {

  const navigate = useNavigate()
    //===================

  //To be used for post timestamp

  let SECOND_MILLIS = 1000
  let MINUTE_MILLIS = 60 * SECOND_MILLIS
  let HOUR_MILLIS = 60 * MINUTE_MILLIS
  let DAY_MILLIS = 24 * HOUR_MILLIS

  const commentsRef = ref(database, 'comments')

  const { currentUser } = useContext(AuthContext) //get the current user.
  const [clickedPostId, setClickedPostId] = useState(postid)
  const [timeCreated, setTime] = useState('')


  //Comments State
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [showCommentBox, setShowComentBox] = useState(false)
  const [commentActiveColor, setCommentActiveColor] = useState('')
  const [commentColor, setCommentColor] = useState('')


  //Like Feature States
  const [liked, setLiked] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [likeActiveColor, setLikeActiveColor] = useState('')
  const [likeColor, setlikeColor] = useState('')
  const count = 0

  const likePost = () =>
   {
    setLiked(!liked)
    setClicked(true)
    if(likeActiveColor === ''){
      setLikeActiveColor('#FFE9E9')
      setlikeColor('#F2383A')
    }else{
      setLikeActiveColor('')
      setlikeColor('')
    }  
    
  }

  //Toggel comments section
  const toggleComment = () => 
  {
    if (showCommentBox == true) {
      setShowComentBox(false)
    } else {
      setShowComentBox(true)
    }
  }

  //Share post
  const showShare = () =>{
    alert("Share is coming very soon")


    // TODO : Add Share code here
  }

  //Get comment made by a user
  const handleCommentTextInput = event => {
    setComment(event.target.value)
  }

  //Submit comment written on post
  const submitComment = event => 
  {
    //Get comment feilds

    //=======================
    if (currentUser) {
      // check if there is user logged in

      //Check if the user has typeed something
      if (comment === '') {
        alert('Type something to comment')
      } else {
        //get reference for posts

        //Get post id from the clicked post
        const postsRef = ref(database, 'posts/')
        const userRef = ref(database, 'users/' + currentUser.uid)

        const commentid = push(commentsRef).key

        //get reference to the post with the id
        const new_commentRef = ref(database, 'comments/' + commentid)

        //retrieving the current user firstname
        onValue(userRef, DataSnapshot => {
          if (DataSnapshot.exists()) {
            const data = DataSnapshot.val()
            // stores in the real time database
            set(new_commentRef, {
              username: data.firstname,
              userid: currentUser.uid,
              postid: clickedPostId,
              comment: comment
            })
          }
        })

        //Success message
        setShowComentBox(false)
        setComment('')
      }
    }
  }
  
  useEffect(() => 
  {
    if (time < 1000000000000) {
      time *= 1000
    }
    let now = Date.now()

    if (time > now || time <= 0) {
      setTime('')
    }
    let timePosted = now - time

    if (timePosted < MINUTE_MILLIS) {
      setTime('just now')
    } else if (timePosted < 2 * MINUTE_MILLIS) {
      setTime('a minute ago')
    } else if (timePosted < 50 * MINUTE_MILLIS) {
      setTime(Math.floor(timePosted / MINUTE_MILLIS) + ' minutes ago')
    } else if (timePosted < 90 * MINUTE_MILLIS) {
      setTime('an hour ago')
    } else if (timePosted < 24 * HOUR_MILLIS) {
      setTime(Math.floor(timePosted / HOUR_MILLIS) + ' hours ago')
    } else if (timePosted < 48 * HOUR_MILLIS) {
      setTime('yesterday')
    } else {
      setTime(Math.floor(timePosted / DAY_MILLIS) + ' days ago')
    }
  }, [timeCreated])

  //Get id of a clicked post
  useEffect(() => 
  {
    setClickedPostId(postid)

    //Get all comments from database

    if (currentUser !== null) {
      const CommentsArr = []

      onValue(commentsRef, Datasnapshot => {
        Datasnapshot.forEach(child => {
          const commentdata = child.val()
          const commentByUser = {
            username: commentdata.username,
            commentFromUser: commentdata.comment,
            postid: commentdata.postid
          }

          if (commentdata.postid === clickedPostId)
            CommentsArr.push(commentByUser)
        })
      })

      if(CommentsArr.length !== 0){
        setCommentActiveColor('#DFF3FF')
        setCommentColor('#08A0F7')
      }
      setComments(CommentsArr.reverse())
      
    }
  }, [showCommentBox])


 /* const image = () =>{
    
    <img className='tweet__image' src={imgUrl} />

    if(imgUrl !==' '){
          
    }
  } */


  return (
    <div className='tweet'>
      <div className='tweet__main'>
        <img className='tweet__image' src={imgUrl} />

      </div>
    </div>
  )
}

export default PostsExplore