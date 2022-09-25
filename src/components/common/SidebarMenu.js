import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import SidebarOption from './SidebarOption'
import { Button } from '@material-ui/core'
import './SidebarMenu.css'

function SidebarMenu () {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = () => {
    if (currentUser) {
      alert('Are you sure want to logout?')
      signOut(auth)
      navigate('/', { replace: true })
    } else {
      alert('An error has occured')
    }
  }

  const goToAbout = () => {
    if (currentUser) {
      navigate('/about', { replace: true })
    }
  }

  const goToHome = () => {
    if (currentUser) {
      navigate('/newsfeed', { replace: true })
    }
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__top-menu'>
        <SidebarOption
          text='Newsfeed'
          Icon={ViewStreamRoundedIcon}
          active={true}
          onClick={goToHome}
        />
        <SidebarOption
          text='About'
          Icon={InfoRoundedIcon}
          onClick={goToAbout}
        />
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
