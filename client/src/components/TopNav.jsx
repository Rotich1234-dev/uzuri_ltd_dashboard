import React from 'react';
import { Box, IconButton } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';

function TopNav({ toggleColor, darkTheme }) {
  const ThemeStyles = {
    backgroundColor: darkTheme ? "#16182F" : "rgb(209, 213, 219)",
    color: darkTheme ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
  };

  const MenuStyles = {
    backgroundColor: darkTheme ? "rgb(55, 65, 81)" : "rgb(255, 255, 255)"
  };

  return (
    <Box className="flex justify-between p-2" style={ThemeStyles}>
      <Box>
        {/* Search bar or other components can go here */}
      </Box>
      {/* Icons */}
      <Box display="flex" p={2}>
        <IconButton style={{ ...MenuStyles, marginRight: '16px' }} className="text-xl" onClick={toggleColor}>
          {darkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <Link to="/Profile">
          <IconButton style={MenuStyles} className="text-neutral-300">
            <Person2OutlinedIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}

export default TopNav;


