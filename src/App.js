import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Registration';
import Reset from './components/authentication/Reset';
import Newsfeed from './components/newsfeed/Newsfeed';
import { AuthProvider } from "./AuthProvider";
import About from "./components/about/About";
import UserProfile from "./components/userprofile/UserProfile";
import Explore from "./components/explore/Explore";
import SharedPost from "./components/newsfeed/SharedPost";
import './index.css'
import useLocalStorage from 'react-use-localstorage';

//App components and paths
function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme =() =>{
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
