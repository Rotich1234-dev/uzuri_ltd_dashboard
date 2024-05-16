import React from 'react'
import { Box,IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
//import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';

function TopNav({toggleColor,darkTheme}) {
  const ThemeStyles={
    backgroundColor: darkTheme ? "rgb(107, 114, 128)" : "rgb(22, 78, 99)", 
    color: darkTheme ? "rgb(107, 114, 128)" : "rgb(22, 78, 99)", 
  };
  return (
    
    <Box  className="overflow-y-auto flex-col items-center gap-2 flex justify-between mt-2 p-5" style={ThemeStyles} >
          
    <Box className="flex">
      {/* <input className="text-slate-700 bg-sky-950 " placeholder="search"/> */}
      <IconButton style={ThemeStyles} className="text-slate-700">
        
      </IconButton>
      
    </Box>
    {/*icons*/}
    <Box display="flex p-2">
      <IconButton style={ThemeStyles} className="text-xl"  onClick={toggleColor}>
       {darkTheme?<DarkModeOutlinedIcon/>:<LightModeOutlinedIcon />}
      </IconButton>
      
     
      <Link to="/Profile">
        <IconButton className="text-neutral-300" style={ThemeStyles}>
        <Person2OutlinedIcon />
      </IconButton>
      </Link>
      
    </Box>
  </Box>

    
  )
}

export default TopNav
