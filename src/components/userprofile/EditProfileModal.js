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
import {getDownloadURL, ref as Ref,uploadBytesResumable } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { useAlert,positions,transitions } from 'react-alert';
import ProfilePicture from './ProfilePicture';

export default function EditProfileModal({open, onClose, firstname, lastname, bio,userId, profilePictureUrl}) {
 //   console.log("Modal Names", firstname,lasttname, bio )
    const {currentUser} = useContext(AuthContext);

    //check if the user has set a profile picture
   // let hasProfilePicture = false;
   const userRef = ref(database, 'users/' + userId);
   const  alert2 = useAlert();
    //Profile picture States
    //const [file, setFile] = useState("");
    //const [hasProfilePicture, setHasProfilePicture] = useState(false); //Shoe and hide remove image cross


    //Profile Picture
    const [percent, setPercent] = useState(0)
    const uploadedImage= useRef(null);

    const imageUploader = useRef(null);
    const [imageFile, setImageFile] = useState("");

    const handleImageUpload = e =>{
        const[file] = e.target.files;

        setImageFile(e.target.files[0]);

        if(file){
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = e =>{
                current.src = e.target.result;
            };

           reader.readAsDataURL(file);
            console.log("file : ", file)
            console.log("image file : ", imageFile)
            console.log("uploaded image : ", uploadedImage)
            console.log("image filename : ", imageFile.name)

        }
    };

    /*
    * For handling the form
    */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        watch
      } = useForm()


      function updateProfilePicture(){
        const storageRef = Ref(storage,`/profile_images/${imageFile.name}`);
       // const storageRef = ref(storage, `/profile_images/${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            //update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            //download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) =>{
              console.log(url)

              //add to user object
              update(userRef,{
                profilePictureUrl : url 
              });

            });
          }
        );
      }


      const onSubmit = data =>{
        //get form from data and upload to firebase

        //only upload to firebase if a new file was added
        if(imageFile){
          updateProfilePicture()
        }
        
        console.log(data.firstName, data.lastName);
   
        console.log('about to run update')
        update(userRef,{
          firstname : data.firstName,
          lastName : data.lastName,
          bio : data.bio
        });  

        console.log("isSubmitSuccessful : ", isSubmitSuccessful);
        console.log("bio : ", data.bio);

        //Close the modal
        onClose()

        alert2.show("Profile Updated Successfully",{
          type: 'success',
          position: 'bottom right',
          timeout: 2000,
          transition: transitions.SCALE
        });
      } 
    

    function saveChanges(){
        alert("hi")
    }

if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='modal-overlay'></div>
    <div className='editProfileModal'>
        
        {/**************    Modal Header    ***************/}
        <div className="modal-header">
            <div className='modal-header-right'>
                <CloseRoundedIcon onClick={onClose} />
                <h3>Edit Profile</h3>
                <p>{percent} "% done"</p>
            </div>
        </div>

        {/**************    Profile Picture    ***************/}
        <div className='modal-profile-picture'>
            {/*hasProfilePicture ?  : <h2 className='modal-profile-picture-placeholder'>{firstname[0]}{lasttname[0]}</h2>*/}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none"
                }}
              />
              <div
                style={{
                  height: "120px",
                  width: "120px",
                  borderRadius : "50%",
                  border: "1px dashed black"
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  alt =''
                  ref={uploadedImage}
                  src = {!(profilePictureUrl === " ") ? profilePictureUrl : " "}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius : "50%",
                    position: "acsolute"
                  }}
                />
              </div>
            </div>

        </div>

        {/**************   Form Inputs   ***************/}
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
              defaultValue={lastname}
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
              defaultValue={bio}
              {...register('bio', { required: false, maxLength: 500 })}
            />
          </Form.Field>

            <button type='submit'>Save</button>
        </Form>
     
    </div>
    </>,
    document.getElementById('portal')
  )
}
