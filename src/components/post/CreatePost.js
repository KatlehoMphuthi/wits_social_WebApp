import React , {useState,useContext, useRef}from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Explore from '../explore/Explore.js';
import Button from '../common/Button.js';
import './CreatePost.css';
import {AuthContext} from '../../AuthProvider.js';
import {database,storage} from '../../firebase.js';
import {set,ref, push, onValue} from 'firebase/database';
import {getDownloadURL, ref as Ref,uploadBytesResumable } from 'firebase/storage';
import { useAlert,positions,transitions } from 'react-alert';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded.js';


export default function CreatePost({username, profilePictureUrl}) {

  const {currentUser} = useContext(AuthContext); //get the current user.
   const [file, setFile] = useState("");
   const [postText, setPostText] = useState("");
   const [show, setShow] = useState(false); //Show and hide remove image cross

   const [textareaheight, setTextareaheight] = useState(1); 

   const image = useRef(null);
   const  alert2 = useAlert();

   const handlePostTextInput = (event) => {
    setPostText(event.target.value);
    console.log(event.target.rows," | height : ", event.target.height)
  };


   // Handles input change event and updates state
   function handleChange(event){
    //console.log(URL.createObjectURL(event.target.files[0]))
    
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    console.log(imageUrl);
    setFile(imageUrl);
    image.current = event.target.files[0];
    setShow(true)
   }

   

    const post = () =>{
      if(currentUser){ // check if there is user logged in
        if(!file && postText === ""){
          alert2.show('Add text or image to post',
                {type:'error',
                timeout: 2000, 
                position: positions.BOTTOM_CENTER });
                
          
        }else{
          //get reference for posts
          const postsRef = ref(database,'posts/');
          const userRef = ref(database,'users/' + currentUser.uid);

          const postid = push(postsRef).key;
          console.log(postid);
          const storageRef = Ref(storage,'images/'+ postid);

          //if there is just a text only 
          if(postText !== ""){
            
            //get reference to the post with the id
            const new_postsRef = ref(database,'posts/' + postid);
            //retrieving the current user firstname
            onValue(userRef,(DataSnapshot) =>{
              if(DataSnapshot.exists()){
                const data = DataSnapshot.val();
                // stores in the real time database
                set(new_postsRef,{
                  username: data.firstname,
                  userId : currentUser.uid,
                  time: Date.now(),
                  postid:postid,
                  text: postText,
                  caption: "",
                  imageUrl: ""
                });
              }
            });
            setPostText("");  
            
          } 

          // image only 
          if(file && postText === ""){
            const new_postsRef = ref(database,'posts/' + postid);
              const uploadTask = uploadBytesResumable(storageRef,image.current);
              uploadTask.on("state_changed",(snapshot)=>{
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },(error) =>{
                console.log(error);
              },() =>{
                // getting the downloadable url
                getDownloadURL(uploadTask.snapshot.ref).then((fileUrl)=>{
                  // getting current user's detail 
                  console.log("we are in the download part")
                  onValue(userRef,(DataSnapshot) =>{
                    if(DataSnapshot.exists()){
                      const data = DataSnapshot.val();
                      // storing the data on firebase 
                      set(new_postsRef,{
                        username: data.firstname,
                        userId : currentUser.uid,
                        time: Date.now(),
                        postid:postid,
                        text: "",
                        caption: "",
                        imageUrl: fileUrl
                      });
                    }
                  });  
                }).catch((error) =>{
                  console.log(error);
                });
              });
              
              //Remove and hide image section
              removeImage()
          }

          // this is for when there is a caption with an image
          if(file && postText !== ""){
              console.log("we are here now");
            const new_postsRef = ref(database,'posts/' + postid);
              const uploadTask = uploadBytesResumable(storageRef,image.current);
              uploadTask.on("state_changed",(snapshot)=>{
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },(error) =>{
                console.log(error);
              },() =>{
                // getting the downloadable url
                getDownloadURL(uploadTask.snapshot.ref).then(
                  (fileUrl)=>{
                    // getting current user's detail 
                    onValue(userRef,(DataSnapshot) =>{
                      if(DataSnapshot.exists()){
                        const data = DataSnapshot.val();
                        // storing the data on firebase 
                        set(new_postsRef,{
                          username: data.firstname,
                          userId : currentUser.uid,
                          time: Date.now(),
                          postid:postid,
                          text: "",
                          caption: postText,
                          imageUrl: fileUrl
                        });
                      }
                    });  
                  }
                );
              }); 
            
            //Remove and hide image section
            removeImage()
            
            }


            alert("Posted successfully");
          }
      }
        
    }


    //Remove image
    function removeImage(){
        setShow(false)
      setFile('')
    }

    function handleKeyDown(e) {
      e.target.style.height = 'inherit';
      e.target.style.height = `${e.target.scrollHeight}px`; 
      // In case you have a limitation
      // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }


  return (
    <div className="tweet">
           {!(profilePictureUrl == null) ?  <img alt =''
        className='tweet__author-logo'
        src={profilePictureUrl}
      /> :
      
      <p className='tweet__author-logo_image'>
        {!(username == null) ? username[0] : ''}
      </p>
      
      }
        <div className="create-post__main">

        <div className="postTextInput">
          <TextareaAutosize
            placeholder="Write someting Amazing!"
            className="searchInput"
            onChange={handlePostTextInput}
            value={postText}
            data-testid = "postInput"
            id = "pInput"
          />
        </div>

        {show?
        <div className="create_post__content">
          
              <p className='remove-image' onClick={removeImage}>x</p> 
              <img className="tweet__image" src={file} />
              
            </div>: null}

        <div className='action_buttons'>
          <span className='action__buttons-add-image'>
        <input className="custom-file-input" type='file' value="" title=" " accept='image/*' onChange={handleChange} />
        </span>
        <Button text='Post' color='#2C76EE' onClick={post} type='' />

        </div>
            
        

        </div>
      
    </div>
  )
}

// export default CreatePost;
