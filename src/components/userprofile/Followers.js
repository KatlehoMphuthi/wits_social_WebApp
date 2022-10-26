import React,{useState,useContext,useEffect,useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';



export default function Followers({fname, lname}){
    return(
     <div className="who-to-follow__block">

            <div className="who-to-follow__author-logo">
                <FontAwesomeIcon icon={faUser}/>
            </div>

            <div className="who-to-follow__content">
                <div className="who-to-follow__author-name">
                {<p>{fname + " " + lname}</p>}
                </div>
            </div>     
     </div>   
    )
}

