import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Registration';
import Reset from './components/authentication/Reset';
import Newsfeed from './components/newsfeed/Newsfeed';
import { AuthProvider } from "./AuthProvider";
import About from "./components/about/About";

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
        </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
  
}

export default App;
