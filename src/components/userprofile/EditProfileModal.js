import React , {useState, useRef, useContext} from 'react'
import ReactDom from 'react-dom'
import {database,storage} from '../../firebase';
import './EditProfileModal.css'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useForm } from 'react-hook-form'
import {AuthContext} from '../../AuthProvider';
import { Form, Button } from 'semantic-ui-react'
import {set,ref, push, onValue,child, update} from 'firebase/database';
import { FirebaseError } from 'firebase/app';

export default function EditProfileModal({open, onClose, firstname, lasttname, bio,userId}) {
    console.log("Modal Names", firstname,lasttname )
    const {currentUser} = useContext(AuthContext);

    //check if the user has set a profile picture
   // let hasProfilePicture = false;
   const userRef = ref(database, 'users/' + userId);

    //Profile picture States
    const [file, setFile] = useState("");
    const [hasProfilePicture, setHasProfilePicture] = useState(false); //Shoe and hide remove image cross

    const image = useRef(null);

      // Handles input change event and updates state
      function handleChange(event){
        //console.log(URL.createObjectURL(event.target.files[0]))
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        console.log(imageUrl);
        setFile(imageUrl);
        image.current = event.target.files[0];
        setHasProfilePicture(prevstate => !prevstate)
       }



    /*
    * For handling the form
    */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
      } = useForm()



      const onSubmit = data =>{
        //get form from data and upload to firebase
        console.log(data.firstName, data.lastName);
   
        console.log('about to run update')
        update(userRef,{
        firstname : data.firstName,
        lastName : data.lastName,
        bio : data.bio
        });
        console.log('updated')
        
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
           
        </div>

        <div className='modal-profile-picture' onChange={handleChange}>
            {hasProfilePicture ? <img alt='user profile picture' src={file} /> : <h2 className='modal-profile-picture-placeholder'>WS</h2>}
        </div>

        <Form className='modal-profile-details' onSubmit={handleSubmit(onSubmit)}>

        {/******First name******* */}
        <Form.Field>
            <label>First Name</label>
            <input
              placeholder='First Name'
              type='text'
              defaultValue= {firstname}
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
              defaultValue={lasttname}
              {...register('lastName', { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.lastName && (
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
              {...register('bio', { required: false, maxLength: 10 })}
            />
          </Form.Field>

            <button type='submit'>Save</button>
        </Form>
     
    </div>
    </>,
    document.getElementById('portal')
  )
}
