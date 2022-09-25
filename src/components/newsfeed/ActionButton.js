import React from 'react'
import { useState } from 'react'
import './ActionButton.css'

function ActionButton({text, Icon, active,color, activeColor, onClick}) {

  return (
    <div className='actionButton' onClick={onClick} style={{backgroundColor : activeColor }}>
      <Icon className='actionButton__icon' style={{color : color }}/>
      <p className='actionButton__text' style={{color : color }}>{text}</p>
    </div>
  )
}

ActionButton.defaultProps ={
    activeColor : '#F8F8F8',
    color : 'black'
  }

export default ActionButton
