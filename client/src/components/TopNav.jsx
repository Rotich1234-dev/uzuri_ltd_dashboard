<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import { Box, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";
function TopNav({ toggleColor, darkTheme }) {
  const ThemeStyles = {
    backgroundColor: darkTheme ? "rgb(107, 114, 128)" : "rgb(22, 78, 99)",
    color: darkTheme ? "rgb(13, 13, 13)" : "rgb(255 255 255)",
=======
import React from 'react'
import { Box,IconButton } from '@mui/material'
=======
import React from 'react';
import { Box, IconButton } from '@mui/material';
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
function TopNav({toggleColor,darkTheme}) {
  const ThemeStyles={
    backgroundColor: darkTheme ? "rgb(107, 114, 128)" : "rgb(22, 78, 99)", 
    color:darkTheme?"rgb(13, 13, 13)":"rgb(255 255 255)",
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
=======

function TopNav({ toggleColor, darkTheme }) {
  const ThemeStyles = {
    backgroundColor: darkTheme ? "#16182F" : "rgb(209, 213, 219)",
    color: darkTheme ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
  };

  const MenuStyles = {
    backgroundColor: darkTheme ? "rgb(55, 65, 81)" : "rgb(255, 255, 255)"
  };

  return (
<<<<<<< HEAD
    <Box className="flex justify-between mt-2 p-5" style={ThemeStyles}>
      {/*searchbar*/}
      <Box className="flex">
        {/* <input className="text-slate-700 bg-sky-950 " placeholder="search"/> */}
        <IconButton style={ThemeStyles} className="text-slate-400"></IconButton>
      </Box>
      {/*icons*/}
      <Box display="flex p-2">
        <IconButton
          style={ThemeStyles}
          className="text-xl"
          onClick={toggleColor}
        >
          {darkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>

        <Link to="/Profile">
          <IconButton className="text-neutral-300" style={ThemeStyles}>
=======
    <Box className="flex justify-between p-2" style={ThemeStyles}>
      <Box>
        {/* Search bar or other components can go here */}
      </Box>
      {/* Icons */}
      <Box display="flex" p={2}>
        <IconButton style={{ ...MenuStyles, marginRight: '16px' }} className="text-xl" onClick={toggleColor}>
          {darkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <Link to="/home">
          <IconButton style={MenuStyles} className="text-neutral-300">
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
            <Person2OutlinedIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
}

export default TopNav;
<<<<<<< HEAD
=======


// import React from 'react';
// import { Box, IconButton } from '@mui/material';
// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import { Link } from 'react-router-dom';

// function TopNav({ toggleColor, darkTheme }) {
//   const ThemeStyles = {
//     backgroundColor: darkTheme ? "#16182F" : "rgb(209, 213, 219)",
//     color: darkTheme ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
//   };

//   const MenuStyles = {
//     backgroundColor: darkTheme ? "rgb(55, 65, 81)" : "rgb(255, 255, 255)"
//   };

//   return (
//     <Box className="flex justify-between p-2" style={ThemeStyles}>
//       <Box>
//         {/* Search bar or other components can go here */}
//       </Box>
//       {/* Icons */}
//       <Box display="flex" p={2}>
//         <IconButton style={{ ...MenuStyles, marginRight: '16px' }} className="text-xl" onClick={toggleColor}>
//           {darkTheme ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
//         </IconButton>
//         <Link to="/Profile">
//           <IconButton style={MenuStyles} className="text-neutral-300">
//             <Person2OutlinedIcon />
//           </IconButton>
//         </Link>
//       </Box>
//     </Box>
//   );
// }

// export default TopNav;


>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
