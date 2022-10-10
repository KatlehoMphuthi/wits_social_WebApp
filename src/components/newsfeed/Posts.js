//import React from 'react'
import './Post.css'
import React, { useEffect, useState, useContext } from 'react'

import './likestyle.scss'
//Authprovider import
import { AuthContext } from '../../AuthProvider'

//navigation import
import { Link } from "react-router-dom";

import Button from '../common/Button'
//Firebase imports
import { database } from '../../firebase'
import { set, ref, push, onValue } from 'firebase/database'
//comment import
import Comment from './Comment'

//style and functionality of the button
import ActionButton from './ActionButton' 
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

//Share buttons
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton,
          FacebookIcon,TwitterIcon,WhatsappIcon } from 'react-share';

function Posts ({ username, name, caption, imgUrl, time, postid }) {

    //===================

  //To be used for post timestamp

  let SECOND_MILLIS = 1000
  let MINUTE_MILLIS = 60 * SECOND_MILLIS
  let HOUR_MILLIS = 60 * MINUTE_MILLIS
  let DAY_MILLIS = 24 * HOUR_MILLIS

  const commentsRef = ref(database, 'comments')

  const { currentUser } = useContext(AuthContext) //get the current user.
  const [clickedPostId, setClickedPostId] = useState(postid) //get the current post
  const [timeCreated, setTime] = useState('') // time the post was created


  //Comments State
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [showCommentBox, setShowComentBox] = useState(false)
  const [commentActiveColor, setCommentActiveColor] = useState('')
  const [commentColor, setCommentColor] = useState('')
  
  //Share state
  const [showShareBox, setShareBox] = useState(false)
  const [shareCount, setshareCount] = useState(0)
  

  //Like Feature States
  const [liked, setLiked] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [likeActiveColor, setLikeActiveColor] = useState('')
  const [likeColor, setlikeColor] = useState('')
  const count = 0

  // Toggle the like state
  const likePost = () =>{
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

  //Toggle comments section
  const toggleComment = () => {
    if (showCommentBox == true) {
      setShowComentBox(false)
    } else {
      setShowComentBox(true)
    }
  }

  //Toggle share section
  const toggleshare = () => {
    if (showShareBox == true) {
      setShareBox(false)
    } else {
      setShareBox(true)
    }
  }
  //Share post
  const showShare = () =>{
    // TODO : Add Share code here
    if(currentUser){
      //shared post
      set(ref(database,`share/${clickedPostId}/sharedby/${currentUser.uid}`),true);
      //keep track of what the user shared
      set(ref(database,`userShares/${currentUser.uid}/posts/${clickedPostId}`),true);
    }

  }

  //Get comment made by a user
  const handleCommentTextInput = event => {
    setComment(event.target.value)
  }

  //Submit comment written on post
  const submitComment = event => {
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

//converting the time 
  useEffect(() => {
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
  useEffect(() => {
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
  }, [showCommentBox]);

  useEffect(() =>{
    // to get the count for share reference
    setClickedPostId(postid);
    const shareRef = ref(database,`share/${clickedPostId}/sharedby`);

    onValue(shareRef,(DataSnapshot) =>{
      if(DataSnapshot.exists()){
        let count = DataSnapshot.size;
         setshareCount(count);
      }
    });
  },[shareCount]);



  return (
    <div className='tweet'>
      
      <Link to={`/${name}`}>
      <img 
        className='tweet__author-logo'
        src='https://source.unsplash.com/random/100*100'
      />
      </Link>
      <div className='tweet__main'>
        <div className='tweet__header'>
          <div className='tweet__author-name'>{username}</div>
          <div className='tweet__author-slug'>
            <Link to={`/${name}`} state={{from:'name', clickedpost:clickedPostId, username:{name}}}>{name}</Link>
            </div>
          <div className='tweet__publish-time'>{timeCreated}</div>
         
        </div>
        
        <div className='tweet__content'>
          {caption}
          <img className='tweet__image' src={imgUrl} />
          <Link to ={`/newsfeed/post/${clickedPostId}`} state ={{from:'post',clickedpost:clickedPostId}}></Link> 
        </div>
        
        <div className='tweet__action-buttons'>

      {/*<LikeButton />*/}
    
    <ActionButton
    text='Comments'
    Icon = {QuestionAnswerRoundedIcon}
    activeColor = {commentActiveColor}
    color = {commentColor}
    onClick={toggleComment}/>
    
    <ActionButton
    text='Like'
    Icon = {FavoriteBorderRoundedIcon}
    active = {clicked}
    activeColor = {likeActiveColor}
    color = {likeColor}
    onClick={likePost}/>

    <ActionButton
    text={`Share  ${shareCount}`}
    Icon = {IosShareRoundedIcon}
    onClick={toggleshare}/>  
         
      {/********** Show comment box ********************/}   
        </div>

        {showCommentBox ? (
          <div className='tweet__comment-section'>
            <input
              placeholder='Add comment...'
              className='searchInput'
              onChange={handleCommentTextInput}
              value={comment}
            />
            <Button
              text='Send'
              color='#2C76EE'
              onClick={submitComment}
              type=''
            />

          {/********* Show comments from all users **********/}
            <div>
              {
              comments.map(commentToShow => (
                <Comment
                  key={commentToShow.postid}
                  username={commentToShow.username}
                  comment={commentToShow.commentFromUser}
                />
              ))}
            </div>
          </div>
        ) : null}
        
        {showShareBox ? (
          <div className='tweet__share-section'>
            <li>
              <FacebookShareButton
                  url = {window.location.href + `/post/${clickedPostId}`}
                  title= {`${username} has shared the following with you! `}
                  separator=":: "
                  hashtag="#camperstribe">
                  <FacebookIcon size={25} />
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton
                  url = {window.location.href + `/post/${clickedPostId}`}
                  title= {`${username} has shared the following with you! `}
                  separator=":: "
                  hashtag="#camperstribe">
                  <TwitterIcon size={25} />
              </TwitterShareButton>
            </li>

            <li onClick={showShare}>
              <WhatsappShareButton
                  url = {window.location.href + `/post/${clickedPostId}`}
                  title= {`${username} has shared the following with you! `}
                  separator=":: ">
                  <WhatsappIcon size={25} />
              </WhatsappShareButton>
            </li>

          </div>
        ):null}
      </div>
    </div>
  )
}

export default Posts;
