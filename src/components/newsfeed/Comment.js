import React from 'react'
import './Comment.css'

function Comment(props) {
  return (
    <div className='commentConatiner'>
      <p className='comment__username'>{props.username}</p>
      <p className='comment__text'>{props.comment}</p>
    </div>
  )
}

export default Comment
