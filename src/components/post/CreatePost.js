import React from 'react'
import Button from '../common/Button'
import './CreatePost.css'

function CreatePost() {
  return (
    <div className="tweet">
        <img className="tweet__author-logo" src="https://source.unsplash.com/random/100*100" />
        <div className="tweet__main">

        <div className="postTextInput">
          <input
            placeholder="Write someting Amazing!"
            className="searchInput"
          />
        </div>

        <div className='action_buttons'>
        <Button
        name = "Add Image"
        />

        <Button
        name = "Post"
        />

        </div>
            
        

        </div>
      
    </div>
  )
}

export default CreatePost
