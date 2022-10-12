import React, { useEffect, useState,useRef } from "react";
import { onAuthStateChanged,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,browserSessionPersistence, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = React.createContext({
  currentUser: null,
  login:null
});

export  function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isloggedin,setisLoggedin ] = useState(null);

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password); 
  }

  setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  

  useEffect(() => {
    
  onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
              setCurrentUser(currentUser);
              localStorage.setItem('user',currentUser);
              setisLoggedin(true);
              console.log(currentUser);
            }
            else{
              console.log("Auth has changed");
              setisLoggedin(false)
            }
            
       });
       
     
    // console.log(currentUser);
 }, []);

  const value = {
    currentUser,
    login,
  }

  return (
    <AuthContext.Provider value={{currentUser,login}}>
      {loading && children}
    </AuthContext.Provider>
  );
};