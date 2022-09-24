import React, { useEffect, useState,useRef } from "react";
import { onAuthStateChanged,signInWithEmailAndPassword,setPersistence,browserLocalPersistence,browserSessionPersistence } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = React.createContext();

export  function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const session = useRef(browserSessionPersistence)

  setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  
 function login(email,password){
    return signInWithEmailAndPassword(auth,email,password); 
  }
  

  useEffect(() => {
    
  onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
              setCurrentUser(currentUser);
              console.log("user is in the application");
            }
            else{
              console.log("Auth has changed");
            }
            
       });
       
     
    // console.log(currentUser);
 }, []);

  const value = {
    currentUser,
    login,
    
  }

  return (
    <AuthContext.Provider value={value }>
      {loading && children}
    </AuthContext.Provider>
  );
};