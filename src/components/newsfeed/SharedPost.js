//Firebase imports
import { onValue, ref } from "firebase/database";
//react imports
import React from "react";
import { useEffect,useState } from "react";

//navigation imports
import { useLocation } from "react-router-dom";
import { database } from "../../firebase";
//topbare
import SharedTopBar from "./SharedTopBar";
import './Post.css';

function SharedPost(){
    // will be used in the time conversion
    let SECOND_MILLIS = 1000
  let MINUTE_MILLIS = 60 * SECOND_MILLIS
  let HOUR_MILLIS = 60 * MINUTE_MILLIS
  let DAY_MILLIS = 24 * HOUR_MILLIS

  //get the url of the page
    const location = useLocation()
    const postPath = location.pathname;
    
    //current states to store data
    const [postId,setPostId] = useState("");
    const [name,setName] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");
    const [caption,setCaption] = useState("");
    const [timeCreated, settimeCreated] = useState('');

    //processing the url and getting data  from Firebase 
    useEffect(() =>{
        const postArray = postPath.split("/");
        setPostId(postArray[3]);

        if(postId !== ""){
            console.log("inside if statement")
            const postRef = ref(database,"/posts/" + postId);

            //get the data
            onValue(postRef,(DataSnapshot)=>{
                if(DataSnapshot.exists()){
                    const data = DataSnapshot.val();

                    setName(data.username);
                    setCaption(data.text !== "" ? data.text:data.caption);
                    setText(data.text);
                    setTime(data.time);
                    setImage(data.imageUrl);
                }
                
            })
        }

    },[postId,postPath]);

    //getting the time of the post
    useEffect(() => {
        let _time = time;
        if (_time < 1000000000000) {
            _time *= 1000
          }
          let now = Date.now()
      
          if (_time > now || _time <= 0) {
            settimeCreated('')
          }
          let timePosted = now - _time
      
          if (timePosted < MINUTE_MILLIS) {
            settimeCreated('just now')
          } else if (timePosted < 2 * MINUTE_MILLIS) {
            settimeCreated('a minute ago')
          } else if (timePosted < 50 * MINUTE_MILLIS) {
            settimeCreated(Math.floor(timePosted / MINUTE_MILLIS) + ' minutes ago')
          } else if (timePosted < 90 * MINUTE_MILLIS) {
            settimeCreated('an hour ago')
          } else if (timePosted < 24 * HOUR_MILLIS) {
            settimeCreated(Math.floor(timePosted / HOUR_MILLIS) + ' hours ago')
          } else if (timePosted < 48 * HOUR_MILLIS) {
            settimeCreated('yesterday')
          } else {
            settimeCreated(Math.floor(timePosted / DAY_MILLIS) + ' days ago')
          }
    },[timeCreated,time])

    return(
        <div>
            <div className= "navbar">
              <SharedTopBar />  
            </div>
            
        
        <div className='tweet'>
      <img 
        className='tweet__author-logo'
        src='https://source.unsplash.com/random/100*100'
      />
      
      <div className='tweet__main'>
        <div className='tweet__header'>
          <div className='tweet__author-name'>{name}</div>
          <div className='tweet__author-slug'>
            </div>
          <div className='tweet__publish-time'>{timeCreated}</div>
         
        </div>
        
        <div className='tweet__content'>
          {caption}
          <img className='tweet__image' src={image} />
        </div>
      </div>
    </div>
    </div>
    )
}

export default SharedPost;