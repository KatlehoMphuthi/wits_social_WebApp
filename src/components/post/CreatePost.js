import React from 'react'
import Button from '../common/Button'
import './CreatePost.css'

function CreatePost() {

    const addImage = () =>{
        alert("Add image")
        //render an image block under post
    }


    const post = () =>{
        //run validation first
        alert("Post")
    }
  return (
    <div className="create-post-container">
        <img className="tweet__author-logo" src="https://source.unsplash.com/random/100*100" />
        <div className="tweet__main">

        <div className="postTextInput">
          <input
            placeholder="Write someting Amazing!"
            className="searchInput"
          />
        </div>

        <div className='action_buttons'>
        <Button text='Add Image' color='#D9E6FC' onClick={addImage} />

        <Button text='Post' color='#2C76EE' onClick={post} />

        </div>
            
        

        </div>
      
    </div>
  )
}

export default CreatePost
