import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { KibChewyLogo } from '@chewy/kib-logos-react';


const Header = () => {
  return (
    <AppBar position='static' className='bar' sx={{height:"50px"}}>
      <Toolbar className='flex-header'>
        <KibChewyLogo className="logo" />
        <img src="https://static-dev.chewy.net/lib/apt-assets/1.0.1/img/website-image-card-1x.jpeg" alt="Chewy-img" className='img' />
      </Toolbar>
    </AppBar>
  )
}

export default Header
