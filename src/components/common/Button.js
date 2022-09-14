import React from 'react'
import { ReactPropTypes } from "react"

function Button({text,color, onClick}) {
  return (
    <button onClick = {onClick}
    style={{backgroundColor : color }}
    className="btn">{text}
    </button>
  )
}

Button.defaultProps ={
    color :  '#F8F8F8'

  }

export default Button
