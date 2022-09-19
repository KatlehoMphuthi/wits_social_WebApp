// Import the functions you need from the SDKs you need
import { getDatabase,set, ref,onValue } from "firebase/database"

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut} from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-2UqL8da9mbNb0UUziNXc0vBekUq7L-o",
  authDomain: "sdpwits-social.firebaseapp.com",
  databaseURL: "https://sdpwits-social-default-rtdb.firebaseio.com",
  projectId: "sdpwits-social",
  storageBucket: "sdpwits-social.appspot.com",
  messagingSenderId: "955724540034",
  appId: "1:955724540034:web:ed7e1fb2ab11ce6f116c9b",
  measurementId: "G-DRMMZ6HQ2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get the access to the database
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);


//create a function to store users in the database
function createData(userId,email,name,surname){
    
  set(ref(database, 'users/' + userId), {
    userid: userId,
    email: email,
    firstname: name,
    lastName: surname
  });
};

//create users for registration
export function createUsers(email,password,name, lastName){
  
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
    const user =userCredential.user;
    createData(user.uid,email,name,lastName);
    console.log("account created successfully");
    alert("success")
  }).catch((error)=>{
    const errorMessage =error.message;
    if(errorMessage === "Firebase: Error (auth/email-already-in-use)."){
      console.log(errorMessage);
      alert("Email already exists");
    }else{
      console.log(errorMessage);
    }
    
  });
  
  
}

//Login function
export const loginUser = (email,password) =>{
  let errorMessage;
  try {
    const res= signInWithEmailAndPassword(auth,email,password);
    const user = res.user;
    console.log("user has logged in");
    errorMessage = "success";
  } catch (error) {
    console.log(error);
    if(error.message === "Firebase: Error (auth/wrong-password)."){
      errorMessage = "error";
      
      alert("The password you have entered is incorrect");
    }
    else{
      errorMessage = "error";
      console.log(error.message);
      alert("An error has occured");
    }
    
  }

  return errorMessage;

}


//Get current user 
function getCurrentUser(){
  const user = auth.currentUser;
  return user.uid;
}

// function to reset the password 
export function resetPass(email){
  let errorMessage; 
  try{
    const res  = sendPasswordResetEmail(auth, email)
    console.log("success")
    errorMessage = "success";
  }catch(error) {
    errorMessage = error.message;
    if(errorMessage === "Firebase: Error (auth/user-not-found)"){
      alert("You are not a registered user. Please proceed to the sign up page.");
    }else{
      alert("An error has occured!");
    }
    // ..
  };

  return errorMessage;
}

// get the user information
export function getUserinfo(){
  const info = readData();
  return info;
};
// Read the data from the database
export function readData(){
  const userid = getCurrentUser();
  const dbRef = ref(database,'users/');
  let name;
  onValue(dbRef,(DataSnapshot)=>{
    const  username =DataSnapshot
                      .child(userid)
                      .child("firstname")
                      .val();
    console.log(username);                  
    name = username;                
  });
  return name;
};

//User logout

export const logout = () => {
  signOut(auth);
};





