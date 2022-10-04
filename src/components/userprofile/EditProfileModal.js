import React from 'react'
import ReactDom from 'react-dom'
import './EditProfileModal.css'

export default function EditProfileModal({open, onClose}) {
if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='modal-overlay'></div>
    <div className='editProfileModal'>
      <h1>editProfile</h1>
      <button onClick={onClose}>Back Arrow</button>
    </div>
    </>,
    document.getElementById('portal')
  )
}
