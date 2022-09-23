import React from 'react'
import { ReactPropTypes } from "react"
import './Button.css'

function Button({text,color, onClick,type}) {
  return (
    <button onClick = {onClick}
    style={{backgroundColor : color }}
    className="action-button" type={type}>{text}
    </button>
  )
}

Button.defaultProps ={
    color :  '#F8F8F8'
  }

export default Button
