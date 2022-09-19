import React, { useState, useEffect } from "react";
import "./topbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { logout } from "../../firebase";


import { getDatabase, set, ref, onValue } from "firebase/database"



export default function Topbar() {
   const database = getDatabase();

  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([])
  const [word, setWord] = useState("")
  const [users, setUsers] = useState([])

///----------------------------------Start firebase testing-------------
  const fetchUsers = () => {

    const userRef = ref(database, 'users/')
     //ref = ref(database, 'users/')
    onValue(userRef, (snapshot) => 
    {
      snapshot.forEach((childSnapshot) => 
      {
        const childKey = childSnapshot.key;
        const username = (childSnapshot.val().firstname) 
        users.push(username);
        //(users);
      });
      
      setUsers(users);
    }

    )}

  useEffect(() => {
     fetchUsers()
  })
///----------------------------------End testing-------------

  const searchUser = (val) => {
    setWord(val)
    const filt = users.filter(v=>{
      return v.toLowerCase().includes(val.toLowerCase());
      
    })
    // console.log(filt)
    setFiltered(filt);
  }


  const submit = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65} /></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon" />
          <input
            onChange={(e)=>searchUser(e.target.value)}
            placeholder="Search for friend, post or video coming Soon"
            className="searchInput"
          />
        </div>

        { word!=="" &&<div style={searchStyle}>
          {word!=="" && filtered.map((u) => {
            return <p>{u}</p>
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
     // ref.then((snapshot) => {
      //   // now map users into the Array
      //   let users = snapshot.docs.map(doc => {
      //     const data = doc.data();
      //     const id = doc.id;
      //     return { id, ...data }
      //   });
      //   setUsers(users)
      // })