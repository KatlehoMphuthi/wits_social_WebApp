import React,{useState,useContext,useEffect,useRef} from "react";
import { followHelper,database} from "../../firebase.js";
import {onValue,ref } from "firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../AuthProvider.js";


export default function Users_Rsidebar(){
    
    //Create a function to give a random item in an array.
    function random_item(items){
        return items[Math.floor(Math.random()*items.length)];
    }

    //useRef allows the variables to consistent through each render

    const {currentUser}  = useContext(AuthContext); //this gets the current state auth state of the user
    const userid = useRef(); // userid for the other users
    const result = useRef([]);
    const currentuserid = useRef();
    //current state for the name and follow status
    const [isActive, setIsActive] = useState(true);
    const[name, setName] = useState("NAME");
    const[profilePictureUrl, setProfilePictureUrl] = useState('')
    const [followbtn,setfollowBtn] = useState("Follow");

    //renders this as long there is a current users
    useEffect(() =>{
        if(currentUser){ //if currentUser is null then user is not logged in on firebase 
            // get the user id of the current user who has logged in
            currentuserid.current = currentUser.uid; 
        
        /*********************************Promise  Starts here ************************************/
           let p = new Promise(resolve =>{
            // get  the reference to the users
            const userRef = ref(database,'users/');
            
            // get the users unique id
            onValue(userRef,(DataSnapshot) =>{
                //loop through each user 
                DataSnapshot.forEach((snapshot)=>{
                    // add each to the array  except for current user
                    if( snapshot.key !== currentUser.uid){
                        result.current.push(snapshot.key);
                        resolve(result.current);
                    }
                });
            },{onlyOnce:true}); //read the data at once 
            return result.current;
           });

        p.then(arr => {
            userid.current = random_item(arr);

            //get the reference to the other user information
            const dbRef = ref(database,'users/'+ userid.current);
            //reading the data 
            onValue(dbRef,(DataSnapshot)=>{              
              if (DataSnapshot.exists()) {
                const data = DataSnapshot.val();
                
                setName(data.firstname);// set it on the user container
                setProfilePictureUrl(data.profilePictureUrl)
                 // To check if function is works 
                console.log(data.firstname); // should log the name of the user
              }});

            //get reference to users that the current user is following
            const followerRef = ref(database,'follow/'+currentuserid.current +'/following');
            let following = [];
            //check if the current user is following the user
            onValue(followerRef,(DataSnapshot)=>{
                const obj = DataSnapshot.hasChild(userid.current); // check if the user is present
                console.log(obj);
                if(obj === true){
                    setfollowBtn("Following");
                    setIsActive(false);
                }else{
                    setfollowBtn("Follow");
                    setIsActive(true);
                }
            },{onlyOnce: true}); //Reads only onces
            
        })
         .catch(error => console.log(error));

         /***********************************PROMISE ENDS HERE******************************************* */
          }
    },[currentUser]); // renders only if there is a user 
    
   
  //follow and toggle button functionality  
  const follow = () =>{
    if(currentUser !== null ){
        if(followbtn === "Follow"){ // check the follow status
            // This sets the follow button to following 
            console.log("Current user has just followed " + name);
            const response = followHelper(currentUser.uid,userid.current); //function returns finish status or not failed 
            if( response === "finished"){
                setfollowBtn("Following");
                setIsActive(false);
            }else{
                alert("Following "+ name + " failed!");
            }
            }
            else{// status = following user
                
                alert("You are already following " + name);
            }
            

        
    }else{
        alert("An error has occurred!");
    }
  }

    return(
     <div className="who-to-follow__block">

            <div>

            {!(profilePictureUrl == null) ?  <img alt =''
        className='tweet__author-logo'
        src={profilePictureUrl}
      /> :
      
      <p className='tweet__author-logo_image'>
        {!(name == null) ? name[0] : ''}
      </p>
      
      }
               {/*} <FontAwesomeIcon icon={faUser}/>*/}
            </div>

            <div className="who-to-follow__content">
                <div className="who-to-follow__author-name">
                {currentUser && <p>{name}</p>}
                </div>

                
                    <div className="followcont">
                    {currentUser && <p
                    
                    className="followbtn"
                    onClick={follow} 
                    style={{
                    backgroundColor: isActive ? ' ': '#2185d0',
                    color: isActive ? '' : 'white',
                    }}
                    > {followbtn}</p>}
</div>
            </div>     
     </div>   
    )
}

