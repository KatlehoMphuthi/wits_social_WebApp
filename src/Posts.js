import React from 'react'
import './Post.css';
import { Avatar } from '@mui/material'
import { Provider, LikeButton } from "@lyket/react";

function Posts({username,caption,imgUrl}) {
  return (

    <div className="tweet">
          <img className="tweet__author-logo" src="https://source.unsplash.com/random/50×50" />
          <div className="tweet__main">
            <div className="tweet__header">
              <div className="tweet__author-name">
              {username}
              </div>
              <div className="tweet__author-slug">
                @elixirdigest
              </div>
              <div className="tweet__publish-time">
                10d
              </div>
            </div>
            <div className="tweet__content">
              {caption}
              <img class="tweet__image" src={imgUrl} />
            </div>
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