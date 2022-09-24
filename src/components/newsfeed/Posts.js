//import React from 'react'
import './Post.css';
import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import "./likestyle.scss";
import Button from '../common/Button';
import { database } from '../../firebase';

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






function Posts({username,caption,imgUrl,name,postid}) {

  const toggleComment = () =>{
    if(showCommentBox == true){
      setShowComentBox(false)
      console.log(username)
    }else{
      setShowComentBox(true)
    }
   
  }
  
  const [id, setId] = useState("efsdf");
  const [comment, setComment] = useState("");
  const[showCommentBox, setShowComentBox] = useState(false)
  
  const handleCommentTextInput = event => {
    setComment(event.target.value);
    console.log('value is:', event.target.value);
  };


  const submitComment = (event) =>{

    //Get comment feilds
    alert("I am responsibel for sending the comment");

    //get post id
    const value = event;
    setId(postid)
    console.log(id)
    
    /*
    //=======================
    if(currentUser){ // check if there is user logged in

      //Check if the user has typeed something
      if(comment === ""){
        alert('Type something to comment')
      }else{
        //get reference for posts


        //Get post id from the clicked post
        const postsRef = ref(database,'posts/');
        const commentsRef = ref(database, 'comments')
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
                postid:postid,
                comment: comment
              });
            }
          });  
                
      }
    }
*/


    //===================
  }

  let time = Math.floor((Math.random() * 45) + 1)
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
                {time + "min ago"}
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

            {showCommentBox?<div className='tweet__comment-section'>
        <input
            placeholder="Add comment..." className="searchInput" onChange={handleCommentTextInput}
            value={comment}
          /> 

          <Button  text='Send' color='#2C76EE' onClick={submitComment} type='' />
        </div> : null}


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