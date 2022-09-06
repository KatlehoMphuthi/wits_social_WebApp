import "./topbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { logout } from "./firebase";

export default function Topbar() {

    const navigate = useNavigate();
	

	const submit = () =>{
		logout();
		navigate('/',{replace: true});
	};

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><img src="/svg/WS_Logo.svg" alt="" width={65}/></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
          <input
          
            placeholder="Search for friend, post or video coming Soon"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
         
        </div>
        <span><Button onClick={submit}>Logout</Button></span>
      </div>
    </div>
  );
}