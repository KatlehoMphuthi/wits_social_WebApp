import React from 'react'
import { ReactPropTypes } from "react"

function Button({text,color, onClick,type}) {
  return (
    <button
    onClick = {onClick}
    className="action-button" type={type}>{text}
    </button>
  )
}

/*
Button.defaultProps ={
    color :  '#F8F8F8'
  }*/

export default Button
