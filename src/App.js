import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/authentication/Login';
import Register from './components/authentication/Registration';
import Reset from './components/authentication/Reset';
import Newsfeed from './components/newsfeed/Newsfeed';

//App components and paths
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/"  element ={<Login />} />
          <Route exact path="/register" element ={<Register />} />
          <Route  exact path="/reset" element ={<Reset />} />
          <Route exact path="/newsfeed" element ={<Newsfeed />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
