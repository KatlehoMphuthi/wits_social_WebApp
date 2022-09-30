import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Registration';
import Reset from './components/authentication/Reset';
import Newsfeed from './components/newsfeed/Newsfeed';
import OtherUserProfile from "./components/userprofile/OtherUserProfile";
import { AuthProvider } from "./AuthProvider";
import About from "./components/about/About";
import UserProfile from "./components/userprofile/UserProfile";

//App components and paths
function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/"  element ={<Login />} />
          <Route exact path="/register" element ={<Register />} />
          <Route  exact path="/reset" element ={<Reset />} />
          <Route exact path="/newsfeed" element ={<Newsfeed />} />
          <Route exact path="/about" element ={<About />} />
          <Route exact path="/:userid" element ={<UserProfile />} />
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
  
}

export default App;
