import React, { useEffect, useState } from "react";
import { onAuthStateChanged,signInWithEmailAndPassword,setPersistence,browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = React.createContext({
  currentUser: null,
  login:null
});

export  function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password); 
  }

  setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(errorCode);
  });
  

  useEffect(() => {
    
  onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
              setCurrentUser(currentUser);
              localStorage.setItem('user',JSON.stringify(currentUser));
              console.log(currentUser);
            }
            else{
              console.log("Auth has changed");
            }
            
       });
       
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