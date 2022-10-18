import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { NavLink } from 'react-router-dom'
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SidebarOption from './SidebarOption'
import ViewComfyRoundedIcon from '@mui/icons-material/ViewComfyRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { Button } from '@material-ui/core'
import './SidebarMenu.css'

function SidebarMenu ({userid}) {
  const currentUser  = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = () => {
    if (currentUser) {
      alert('Are you sure want to logout?');
      signOut(auth);
      localStorage.clear();
      navigate('/', { replace: true });
    } else {
      alert('An error has occured')
    }
  }



  return (
    <div className='sidebar'>
      <div className='sidebar__top-menu'>

<NavLink to='/newsfeed'
>
        <SidebarOption
          text='Newsfeed'
          Icon={ViewStreamRoundedIcon}
        />
      </NavLink>

<NavLink to='/explore'
>  
<SidebarOption
          text='Explore'
          Icon={GridViewRoundedIcon}
        />
  </NavLink>


{/** 
<SidebarOption
          text='Profile'
          Icon={PersonRoundedIcon}
          onClick={goToProfile}
        />
*/}

<NavLink to='/about'
>
      <SidebarOption
          text='About'
          Icon={InfoRoundedIcon}
        />
</NavLink>
      </div>


      {/* Button -> Logout */}
      <Button
        onClick={submit}
        variant='outlined'
        className='sidebar__logout'
        fullWidth
      >
        Logout
      </Button>
    </div>
  )
}

export default SidebarMenu
