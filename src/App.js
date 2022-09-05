
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Registration';
import Reset from './Reset';
import Newsfeed from './Newsfeed';


//import RegistrationForm from './Registration';
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
