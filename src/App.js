import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/authentication/Login.js';
import Register from './components/authentication/Registration.js';
import Reset from './components/authentication/Reset.js';
import Newsfeed from './components/newsfeed/Newsfeed.js';
import { AuthProvider } from "./AuthProvider.js";
import About from "./components/about/About.js";
import UserProfile from "./components/userprofile/UserProfile.js";
import Explore from "./components/explore/Explore.js";
import SharedPost from "./components/newsfeed/SharedPost.js";
import './index.css';
import useLocalStorage from "react-use-localstorage";

//App components and paths
function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  console.log("theme from app.js", localStorage.getItem("theme"))
  const switchTheme =(e) =>{
    e.preventDefault()
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
    alert(newTheme)
  }
 
  const change = () =>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <AuthProvider>
    <div className="App" data-theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/"  element ={<Login />} />
          <Route exact path="/register" element ={<Register />} />
          <Route  exact path="/reset" element ={<Reset />} />
          <Route exact path="/newsfeed" element ={<Newsfeed test={change} theme={theme}/>} />
          <Route exact path="/about" element ={<About />} />
          <Route exact path="/:userId" element ={<UserProfile theme={theme}/>} />
          <Route exact path="/explore" element ={<Explore />} />
          <Route exact path= "/newsfeed/post/:postid" element = {<SharedPost />}/>
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
  
}

export default App;
