//import React from 'react'
import './Post.css';
import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import "./likestyle.scss";

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


function Posts({username,caption,imgUrl,name}) {

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
              <img class="tweet__image" src={imgUrl} />
            </div>
            <LikeButton/>

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