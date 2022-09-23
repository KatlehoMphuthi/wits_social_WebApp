//import React from 'react'
import './Post.css';
import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";
import "./likestyle.scss";
import { set } from 'firebase/database';

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


function Posts({username,caption,imgUrl,name,time}) {
  const [timeCreated, setTime] = useState("");
  let  SECOND_MILLIS = 1000;
  let   MINUTE_MILLIS = 60 * SECOND_MILLIS;
  let  HOUR_MILLIS = 60 * MINUTE_MILLIS;
  let   DAY_MILLIS = 24 * HOUR_MILLIS;

  useEffect(() => {
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