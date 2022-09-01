import React from "react";
import { readData } from "./firebase";
import './Newsfeed.css'

function Newsfeed(){

const name = readData();
console.log(name);

return(
    <div className="Newsfeed">
      <header className="Newsfeed">
        <p>
          Welcome to Wits_Social,{name}!
        </p>
      </header>
    </div>
);
}

export default Newsfeed;