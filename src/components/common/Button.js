import React from 'react'

function Button({name,clickEvent, color}) {
  return (
    <button onClick={clickEvent} className={color}>
        {name}
    </button>
  )
}

export default Button
