import { toUnitless } from '@mui/material/styles/cssUtils';
import React , {useState}from 'react'
import Button from '../common/Button'
import './CreatePost.css'

function CreatePost() {

   const [file, setFile] = useState("");
   const [postText, setPostText] = useState("");
   const [show, setShow] = useState(false); //Shoe and hide remove image cross

   const handlePostTextInput = event => {
    setPostText(event.target.value);
    console.log('value is:', event.target.value);
  };


   // Handles input change event and updates state
   function handleChange(event){
    console.log(URL.createObjectURL(event.target.files[0]))
    setFile(URL.createObjectURL(event.target.files[0]))
    setShow(true)
   }

   function isPostValid(){
      if(!file && postText === "" ){
        alert(postText)
        return false
      }else{
        return true
      }
   }

    const post = () =>{
      if(isPostValid()){
        alert('Add text or image to post')
        alert(postText)
      }else{
        alert("Add data to firebase")
        alert(postText)
      }
        
        
    }

    //Remove image
    function removeImage(){
        setShow(false)
      setFile('')
    }


  return (
    <div className="create-post-container">
        <img className="tweet__author-logo" src="https://source.unsplash.com/random/100*100" />
        <div className="tweet__main">

        <div className="postTextInput">
          <input
            placeholder="Write someting Amazing!"
            className="searchInput"
            onChange={handlePostTextInput}
            value={postText}
          />
        </div>

        <div className="tweet__content">
              {show?<p className='remove-image' onClick={removeImage}>x</p> : null}
              <img class="tweet__image" src={file} />
            </div>

        <div className='action_buttons'>
        <input className="custom-file-input" type='file' value="" title=" " accept='image/' onChange={handleChange} />

        <Button text='Post' color='#2C76EE' onClick={post} type='' />

        </div>
            
        

        </div>
      
    </div>
  )
}

export default CreatePost
