// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database"

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  apiKey: "AIzaSyA3nYLo0FSdnuzMRl3rE4ocV9B6o7C2s_0",
  authDomain: "wits-social-a5069.firebaseapp.com",
  databaseURL: "https://wits-social-a5069-default-rtdb.firebaseio.com",
  projectId: "wits-social-a5069",
  storageBucket: "wits-social-a5069.appspot.com",
  messagingSenderId: "353931215460",
  appId: "1:353931215460:web:3698eb84d9575c19621571",
  measurementId: "G-J2P86TQJK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);

