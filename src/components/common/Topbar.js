import "./topbar.css";
import {database, readData} from "../../firebase.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext}  from "../../AuthProvider.js";
import {onValue,ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from 'react-use-localstorage';



export default function Topbar({switchTheme, theme}) {
const {currentUser} = useContext(AuthContext);
const [fname, setfname] = useState("");
const [lname, setlname] = useState("");
const [profilePicture,setProfilePicture] = useState("");
//const navigate = useNavigate();
const [filtered, setFiltered] = useState([]);
const [word, setWord] = useState("");
const [users, setUsers] = useState([]);


///----------------------------------Start firebase testing-------------
const fetchUsers = () => {

  const userRef = ref(database, 'users/')
  const arr = [];
  //ref = ref(database, 'users/')
  onValue(userRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      // const childKey = childSnapshot.key; (childSnapshot.val()) 
      const user_data = {
        // get the user object
        email: childSnapshot.val().email,
        firstname: childSnapshot.val().firstname,
        lastName: childSnapshot.val().lastname,
        userid: childSnapshot.val().userid,
      }
      arr.push(user_data);

    });

    setUsers(arr);
  }

  )
}




///----------------------------------End testing-------------

useEffect(()=>{
  if(currentUser){
    //setting the username 
    onValue(ref(database,`users/${currentUser.uid}`),(DataSnapshot)=>{
        const data = DataSnapshot.val();
        setfname(data.firstname);
        setlname(data.lastName);
        setProfilePicture(data.profilePictureUrl);               
    });
  fetchUsers();

  }
}, [currentUser,fname]);



const searchUser = (val) => {
  setWord(val)
  const filt = users.filter(v => {
    console.log(v)
    return v.firstname.toLowerCase().includes(val.toLowerCase());

  })
  // console.log(filt)
  setFiltered(filt);
}

return currentUser !== null ? 
  (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
    </div>
    <div className="topbarCenter">
      <span className="searchbar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
        <input
          onChange={(e) => searchUser(e.target.value)}
          placeholder="Search for a  friend!"
          className="searchInput"
          aria-label = "search"
          data-testid = "sInput"
          value = {word}
        />
      </span>
      {word !== "" && <div className="searchbar__results" data-testid="results"  id="child">
      {word !== "" && filtered.map((u) => {
        return <span data-testid ="please"><p  className="searchbar__result" aria-label="child2"
          style={{ padding: 10,margin:10,
                   background: "white"}}
          //onClick={ ()=>goToUserProfile(u)} // go to user profile
        > <Link to={`/${u.firstname}`}  state={{from:'search', clickedpost:u.userid, username:u.firstname}}   >{u.firstname}</Link></p>
      </span> })}
    </div>}
    </div>
    <div className="topbarRight">
      <span className="topbarLinks" data-testid = "user">
      {!(profilePicture == null) ?  <img alt =''
        className='tweet__author-logo topBar_image'
        src={profilePicture}
      /> :
      
      <p className='tweet__author-logo_image topBar_image'>
        {fname[0]}{lname[0]}
      </p>}

      {<span>
        <p > 
        <Link to={`/${fname}`} state={{from:'topbar', clickedpost:'', username:{fname}}}>{fname} {lname}</Link>
      </p>
      </span>}
      </span>

        <div className="theme_toggel" onClick={switchTheme}>
         
       
     
        {localStorage.getItem("theme") === 'dark'?
        
        <div>
          <p className="theme_name">{localStorage.getItem("theme")}</p>
          <FontAwesomeIcon icon={faMoon} />
        </div> 
        :
        <div>
          <p className="theme_name">{localStorage.getItem("theme")}</p>
          <FontAwesomeIcon icon={faSun} />
        </div> 
        }
    
      </div>
      
    </div>
  </div>
  )
  :
  (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
         
          {/* <input
          
            placeholder="Search for friend, post or video coming Soon"
            className="searchInput"

          /> */}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <span><p>Loading...</p></span>
        </div>
      </div>
    </div>
  )
 ;
 
}

const searchStyle = {
 background: "white",
 padding: 10,
  width: 200,
}

