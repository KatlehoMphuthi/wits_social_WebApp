//import React from 'react'
import './Post.css';
import React, { useEffect, useState, useContext } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import "./likestyle.scss";
import {AuthContext} from '../../AuthProvider';

import Button from '../common/Button';
import { database } from '../../firebase';
import {set,ref, push, onValue} from 'firebase/database';
import Comment from './Comment';

/*const LikeButton = () => {
  const [liked, setLiked] = useState(null);

  return (
    <button
      onClick={() => setLiked(!liked)}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
      })}
    >
      <div className="like-button">
        <Hand />
        <span>Like</span>
      </div>
    </button>
  );
};
*/
const LikeButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const count = 0;
  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
        //count++;
        console.log(count);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <Hand />
        <span>Like</span>
        <span className={cn("suffix", {  liked })}>d</span>
      </div>
    </button>
  );
};

function Posts({username,name,caption,imgUrl,time,postid}) {

  const commentsRef = ref(database, 'comments')
  
  const {currentUser} = useContext(AuthContext); //get the current user.
  const [clickedPostId, setClickedPostId] = useState(postid)
  const [timeCreated, setTime] = useState("");


  const [comments,setComments] = useState([]);

  const [comment, setComment] = useState("");
  const[showCommentBox, setShowComentBox] = useState(false);


  //Toggel comments section
  const toggleComment = () =>{
    if(showCommentBox == true){
      setShowComentBox(false)
    }else{
      setShowComentBox(true)
    }
   
  }
  
  //Get comment made by a user
    const handleCommentTextInput = event => {
    setComment(event.target.value);
    console.log('value is:', event.target.value);
  };


  //Submit comment written on post
  const submitComment = (event) =>{
    //Get comment feilds

    //get post id
    const value = event


    //console.log(prop)}
    
    //=======================
    if(currentUser){ // check if there is user logged in

      //Check if the user has typeed something
      if(comment === ""){
        alert('Type something to comment')
      }else{
        //get reference for posts


        //Get post id from the clicked post
        const postsRef = ref(database,'posts/');
        const userRef = ref(database,'users/' + currentUser.uid);

        const commentid = push(commentsRef).key;
        console.log(commentid);

        //get clicked post id


          //get reference to the post with the id
          const new_commentRef = ref(database,'comments/' + commentid);

          //retrieving the current user firstname
          onValue(userRef,(DataSnapshot) =>{
            if(DataSnapshot.exists()){
              const data = DataSnapshot.val();
              // stores in the real time database
              set(new_commentRef,{
                username: data.firstname,
                userid: currentUser.uid,
                postid:clickedPostId,
                comment: comment
              });
            }
          }); 

          //Success message
          setShowComentBox(false)
          alert("Comment added to post")           
      }
    }

  }

    //===================
  
  

 

    //To be used for post timestamp

  let  SECOND_MILLIS = 1000;
  let   MINUTE_MILLIS = 60 * SECOND_MILLIS;
  let  HOUR_MILLIS = 60 * MINUTE_MILLIS;
  let   DAY_MILLIS = 24 * HOUR_MILLIS;

  useEffect(() => {
      // Create event listener
document.addEventListener('click', (e) =>
{
  // Retrieve id from clicked element
  let elementId = e.target.id;
  // If element has id
  if (elementId !== '') {
      console.log(elementId);
  }
  // If element has no id
  else { 
      console.log("An element without an id was clicked.");
  }
});
    if (time < 1000000000000) {
      time *= 1000;
  }
  let  now = Date.now();

    if (time > now || time <= 0) {
      setTime("");
    }
    let timePosted = now - time;

    if (timePosted < MINUTE_MILLIS){
      setTime("just now");
    }
    else if(timePosted < 2*MINUTE_MILLIS){
        setTime("a minute ago");
    }else if(timePosted < 50*MINUTE_MILLIS){
        setTime(Math.floor(timePosted/MINUTE_MILLIS) +" minutes ago");
    }else if (timePosted < 90*MINUTE_MILLIS){
      setTime("an hour ago");
    } else if(timePosted<24 * HOUR_MILLIS){
      setTime(Math.floor(timePosted/HOUR_MILLIS) + " hours ago");
    }else if(timePosted < 48 * HOUR_MILLIS){
      setTime("yesterday");
    } else{
      setTime(Math.floor(timePosted/DAY_MILLIS) + " days ago");
    }
  },[timeCreated]);


  //Get id of a clicked post
  useEffect(()=>{
    setClickedPostId(postid)

    //Get all comments from database

    if(currentUser !== null){
      const CommentsArr = [];
       
        
        onValue(commentsRef,(Datasnapshot) =>{
          Datasnapshot.forEach((child)=>{
            const commentdata = child.val();
            const commentByUser = {
              username: commentdata.username,
              commentFromUser: commentdata.comment,
              postid : commentdata.postid
            }
  
            if(commentdata.postid === clickedPostId)
            CommentsArr.push(commentByUser);
          });
          
        });
        
        
        setComments(CommentsArr.reverse());
      }


  },[showCommentBox])
  

  return (

    <div className="tweet">
          <img className="tweet__author-logo" src="https://source.unsplash.com/random/100*100" />
          <div className="tweet__main">
            <div className="tweet__header">
              <div className="tweet__author-name">
              {username}
              </div>
              <div className="tweet__author-slug">
              {name}
              </div>
              <div className="tweet__publish-time">
                {timeCreated}
              </div>
            </div>
            <div className="tweet__content">
              {caption}
              <img className="tweet__image" src={imgUrl} />
            </div>

            <div className='tweet__action-buttons'>
            <LikeButton/>
            <Button
            text="comment"
            onClick={toggleComment}/>

            <Button
            text="Share"/>
            </div>

            {showCommentBox?
            
            <div className='tweet__comment-section'>
              <input
                  placeholder="Add comment..." className="searchInput" onChange={handleCommentTextInput}
                  value={comment}
                /> 
                <Button  text='Send' color='#2C76EE' onClick={submitComment} type='' />

                <div>
            {
                comments.map(commentToShow=>(
          <Comment 
          key={commentToShow.postid}
          username = {commentToShow.username}
          comment = {commentToShow.commentFromUser}
          />)) 
          }

                </div>
            </div>
            : null}


          </div>

        </div>


/*
    <div className="post">
        <div className='post_header'>
            <Avatar
                className="post_avatar" 
                alt='Michael'
                src="/static/images/avatar/1.jpg"
                
            />
             
              <h3>{username}</h3>
              <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
              <LikeButton
              namespace="testing-react"
              id="everybody-like-now"
            />
              </Provider>

        </div>
          
    //{/* header->avatar +username */)}

    
    //{/* Image */}
          
      //    <img className = "post_image" src={imgUrl}></img>

    //      <h4 className='post_text '>
  //        <strong>{username} </strong> {caption}</h4>
//    {/* Michael + Hey Witsies!!! */}

 // )
//}

export default Posts