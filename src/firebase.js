// Import the functions you need from the SDKs you need
import { getDatabase,set, ref,onValue } from "firebase/database"

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail} from "firebase/auth";


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

export const database = getDatabase(app);
export const auth = getAuth(app);

function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

      case "auth/email-already-in-use":
        return "Email already exists";
  
      default:
        return "";
    }
  }


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
export const loginUser = async(email,password) =>{
  try {
    const res= await signInWithEmailAndPassword(auth,email,password);
    const user = res.user;
    console.log("user has logged in");
    
    
  } catch (error) {
    console.log(error);
    alert(error.message);
  }

}

//Get current user 
function getCurrentUser(){
  const user = auth.currentUser;
  return user.uid;
}

// function to reset the password 
export function resetPass(email){
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    console.log("success!");
    return "success";
    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    return errorMessage;
    // ..
  });
}

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



