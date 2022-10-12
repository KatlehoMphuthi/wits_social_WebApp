import "./topbar.css";
import {database, readData} from "../../firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../AuthProvider";
import {onValue,ref, set } from "firebase/database";
import { Link } from "react-router-dom";


export default function Topbar() {
const {currentUser} = useContext(AuthContext);
const [fname, setfname] = useState("");
const [lname, setlname] = useState("");
const navigate = useNavigate();
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
    onValue(ref(database,'users/'+ currentUser.uid),(DataSnapshot)=>{
      if(DataSnapshot.exists()){
        const data = DataSnapshot.val();
        setfname(data.firstname);
        setlname(data.lastName);
      }
                   
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

const goToUserProfile=(u)=>{
  console.log(u.email)
  // for navigation, pass the user u,  use a function navigate
  //navigate('userprofile',user:u) 

  // how to pass data to another page in  navigation 
}

return fname !== "" ? 
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
            />
          </span>
          {word !== "" && <div className="searchbar__results"/*>style={searchStyle}*/>
          {word !== "" && filtered.map((u) => {
            return <p data-testid="results" className="searchbar__result" 
              style={{ padding: 10,margin:10,
                       background: "white"}}
              //onClick={ ()=>goToUserProfile(u)} // go to user profile
            > <Link to={`/${u.firstname}`}  state={{from:'search', clickedpost:u.userid, username:u.firstname}}   >{u.firstname}</Link></p>
          })}
        </div>}
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
          {/*<span> <p> <span className="profile__initals">{fname[0]}{lname[0]}</span>{fname} {lname}</p></span>*/}
          <Link to={`/${fname}`} state={{from:'topbar', clickedpost:'', username:{fname}}}>{fname}</Link>
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
         
          { <input
          
            placeholder="Search for friend!"
            className="searchInput"

          />}
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

