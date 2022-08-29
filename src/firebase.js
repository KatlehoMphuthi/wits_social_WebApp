// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database"

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyD-2UqL8da9mbNb0UUziNXc0vBekUq7L-o",
  authDomain: "sdpwits-social.firebaseapp.com",
  projectId: "sdpwits-social",
  storageBucket: "sdpwits-social.appspot.com",
  messagingSenderId: "955724540034",
  appId: "1:955724540034:web:ed7e1fb2ab11ce6f116c9b",
  measurementId: "G-DRMMZ6HQ2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
export const database = getDatabase(app);
*/


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8TWsczDtb8qAXypoRRNmsVt77msL2GXk",
  authDomain: "wits-social-7aafb.firebaseapp.com",
  databaseURL: "https://wits-social-7aafb-default-rtdb.firebaseio.com",
  projectId: "wits-social-7aafb",
  storageBucket: "wits-social-7aafb.appspot.com",
  messagingSenderId: "929664260842",
  appId: "1:929664260842:web:858134693a7d4da3db1593",
  measurementId: "G-CTRL52YF52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

export function createUsers(auth,email,password){
  
  createUserWithEmailAndPassword(auth,email,password)
  .then(()=>{
    console.log("Account created successfully!");
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
};

