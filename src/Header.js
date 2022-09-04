import * as React from "react";
import { useNavigate } from "react-router-dom";
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { logout } from "./firebase";

export default function Header() {
	
	const navigate = useNavigate();
	

	const submit = () =>{
		logout();
		navigate('/',{replace: true});
	};
return (
	<AppBar position="static">
		<Toolbar>
		{/*Inside the IconButton, we
		can render various icons*/}
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
		>

        <div className= "app_header">
        {/* adding an  image on top left */}
     
		
        </div>
			{/*This is a simple Menu
			Icon wrapped in Icon */}

		</IconButton>
		{/* The Typography component applies
		default font weights and sizes */}

		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1 }}>
			Wits Social
		</Typography>
		<Button color="inherit" onClick={submit}>Logout</Button>
		</Toolbar>
	</AppBar>
);
}
