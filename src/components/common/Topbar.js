import React, { useState, useEffect } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { logout } from "../../firebase";


import { getDatabase, set, ref, onValue } from "firebase/database"
import { blue } from "@mui/material/colors";



export default function Topbar() {
  const database = getDatabase();

  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([])
  const [word, setWord] = useState("")
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    fetchUsers()
  })
  ///----------------------------------End testing-------------

  const searchUser = (val) => {
    setWord(val)
    const filt = users.filter(v => {
      return v.firstname.toLowerCase().includes(val.toLowerCase());

    })
    // console.log(filt)
    setFiltered(filt);
  }


  const submit = () => {
    logout();
    navigate('/', { replace: true });
  };
  //function to go to user profile
  const goToUserProfile=(u)=>{
    console.log(u.email)
    // for navigation, pass the user u,  use a function navigate
    //navigate('userprofile',user:u) 

    // how to pass data to another page in  navigation 
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65} /></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon" />
          <input
            onChange={(e) => searchUser(e.target.value)}
            placeholder="Search for friend, post or video coming Soon"
            className="searchInput"
          />
        </div>


        {word !== "" && <div style={searchStyle}>
          {word !== "" && filtered.map((u) => {
            return <p
              style={{ padding: 10,margin:0, background: "blue" }}
              onClick={ ()=>goToUserProfile(u)} // go to user profile
            >{u.firstname}</p>
          })}
        </div>}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">

        </div>
        <span><Button onClick={submit}>Logout</Button></span>
      </div>
    </div>
  );
}

const searchStyle = {
  background: "whit",
  padding: 10,
  // width: 200,
}
