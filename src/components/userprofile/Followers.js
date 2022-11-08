import React from "react";
import "../newsfeed/Newsfeed.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';

export default function Followers({fname, lname,propic}){
    return(
     <div className="who-to-follow__block who-to-follow__block__userprofile">

            <div className="who-to-follow__author-logo">
                {propic === "" ? (<FontAwesomeIcon icon = {faUser}/>):(<img className="who-to-follow__author-logo" src={propic}/>)}
            </div>

            <div className="who-to-follow__content">
                <div className="who-to-follow__author-name">
                {<p>{fname + " " + lname}</p>}
                </div>
            </div>     
     </div>   
    )
}

