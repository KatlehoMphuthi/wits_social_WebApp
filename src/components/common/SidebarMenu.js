import React, { useEffect } from 'react'
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

  const [homeActive, setHomeActive] = useState(true);
  const [aboutActive, setAboutActive] = useState(false);
  //const [profileActive,setProfileActive] = useState(false);
  const [exploreActive,setExploreActive] = useState(false);

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
    setAboutActive(true);
    setHomeActive(false);
    if (currentUser) {
      navigate('/about', { replace: true })
     
    }
  }

  const goToHome = () => {
      setHomeActive(true)
      setAboutActive(false);
    if (currentUser) {
      navigate('/newsfeed', { replace: true })
      
    }
  }

  const goToProfile = () => {
    setAboutActive(false);
    setHomeActive(false);
    setExploreActive(false);
    if (currentUser) {

      navigate('/:userId', { replace: true })
      
    }
  }

  const goToExplore = () => {
    setAboutActive(false);
    setHomeActive(false);
    setExploreActive(true);
    if (currentUser) {
      navigate('/explore', { replace: true })
     
    }
  }

  return (
    <div className='sidebar'>
      <div className='sidebar__top-menu'>
        <SidebarOption
          text='Newsfeed'
          Icon={ViewStreamRoundedIcon}
          active={homeActive}
          onClick={goToHome}
        />
        <SidebarOption
          text='About'
          Icon={InfoRoundedIcon}
          active={aboutActive}
          onClick={goToAbout}
        />

<SidebarOption
          text='Profile'
          Icon={InfoRoundedIcon}
          onClick={goToProfile}
        />

<SidebarOption
          text='Explore'
          Icon={InfoRoundedIcon}
          active={exploreActive}
          onClick={goToExplore}
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
