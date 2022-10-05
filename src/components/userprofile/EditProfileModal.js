import React from 'react'
import ReactDom from 'react-dom'
import './EditProfileModal.css'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useForm } from 'react-hook-form'
import { Form, Button } from 'semantic-ui-react'

export default function EditProfileModal({open, onClose, firstname, lasttname, bio}) {
    console.log("Modal Names", firstname,lasttname )
    let hasProfilePicture = false;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
      } = useForm()

      const onSubmit = (data, e) => {
        //
        e.preventDefault()
    
    
      }
    

    function saveChanges(){
        alert("hi")
    }

if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='modal-overlay'></div>
    <div className='editProfileModal'>
        <div className="modal-header">
            <div className='modal-header-right'>
                <CloseRoundedIcon onClick={onClose} />
                <h3>Edit Profile</h3>
            </div>
            <button onClick={saveChanges}>Save</button>
        </div>

        <div className='modal-profile-picture'>
            {hasProfilePicture ? <img alt='user profile picture'/> : <h2 className='modal-profile-picture-placeholder'>WS</h2>}
        </div>

        <Form className='modal-profile-details' onSubmit={handleSubmit(onSubmit)}>

        {/******First name******* */}
        <Form.Field>
            <label>First Name</label>
            <input
              placeholder='First Name'
              type='text'
              value= {firstname}
              {...register('firstName', { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.firstName && (
            <p className='text-error'>Please check the First Name</p>
          )}

          {/******Last Name******* */}
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder='Last Name'
              type='text'
              value={lasttname}
              {...register('lastName', { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.lasttName && (
            <p className='text-error'>Please check the Last Name</p>
          )}

          {/******Bio******* */}
          <Form.Field>
            <label>Bio</label>
            <textarea
              placeholder='Bio'
              wrap="hard"
              rows={4}
              type='text'
              {...register('bio', { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.bio && (
            <p className='text-error'>Please check the Bio</p>
          )}
        </Form>
     
    </div>
    </>,
    document.getElementById('portal')
  )
}
