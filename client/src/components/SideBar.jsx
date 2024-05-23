import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuIcon from '@mui/icons-material/Menu';
<<<<<<< HEAD
import { useState } from "react"
import { Box, IconButton } from "@mui/material";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useUser } from "../UserContext";
=======
import { Link } from "react-router-dom"
=======
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

const Item = ({ title, to, icon }) => {
  return (
    <Link to={to}>
      <MenuItem className="text-black hover:text-gray-600" icon={icon}>
        <h4 className="text-extrabold text-green-300 hover:text-gray-600">{title}</h4>
      </MenuItem>
    </Link>
  );
};

function SideBar({ toggleColor, darkTheme }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const ThemeStyles = {
    backgroundColor: darkTheme ? "#16182F" : "rgb(209, 213, 219)",
    color: darkTheme ? "White" : "Black"
  };

  const MenuStyles = {
    backgroundColor: darkTheme ? "#16182F" : "rgb(255, 255, 255)"
  };

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <div className="flex-col w-fit h-screen" style={ThemeStyles}>
      <Box className="flex-col" style={ThemeStyles}>
        <Sidebar collapsed={isCollapsed} style={ThemeStyles}>
          <Menu style={MenuStyles}>
            <Box>
              <MenuItem
                className="py-2 text-slate-700 justify-between hover:text-gray-600"
                onClick={() => setCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuIcon /> : undefined}
                style={{ margin: "10px 0", cursor: "pointer" }}
              >
                {!isCollapsed && (
                  <Box className="flex justify-between p-3">
                    <h1 className={`text-2xl font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-900'}`}>UZURI LIMITED</h1>
                    <IconButton
                      className="text-slate-400 hover:text-gray-600"
                      onClick={() => setCollapsed(!isCollapsed)}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
            </Box>
            {!isCollapsed && (
              <Box>
<<<<<<< HEAD
                <Box className="mt-3">
<<<<<<< HEAD
                  <h1 className="text-2xl text-center text-white font-bold">
                    {user?.name || ""}
                  </h1>
                  <h5 className="text-xl font-bold text-center text-blue-900">
                    {user?.role || "Staff"}
                  </h5>
=======
                  <h1 className="text-2xl text-center text-white font-bold">{user?.name || ""}</h1>
                  <h5 className="text-xl font-bold text-center text-blue-900">{user?.role || "Staff"}</h5>
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
=======
                <Box className="mt-3 text-center">
                  {user ? (
                    <>
                      <h1 className={`text-2xl font-bold ${darkTheme ? 'text-white' : 'text-black'}`}>
                        {user.name}
                      </h1>
                      <h5 className={`text-xl font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-900'}`}>
                        {user.role || "Admin"}
                      </h5>
                    </>
                  ) : (
                    <h5 className={`text-xl font-bold ${darkTheme ? 'text-gray-400' : 'text-gray-900'}`}>
                      Admin
                    </h5>
                  )}
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
                </Box>
              </Box>
            )}
          </Menu>
          <Menu className="mt-4" style={MenuStyles}>
            <Box>
<<<<<<< HEAD
<<<<<<< HEAD
              <Item icon={<HomeIcon />} title="Home" to="/Home" />
=======
              <Item
                icon={<HomeIcon />}
                title="Home"
                to="/Home"
              />
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
=======
              <Item icon={<HomeIcon />} title="Home" to="/Home" />
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
            </Box>
          </Menu>
          <Menu className="mt-auto" style={MenuStyles}>
            <Box className="flex items-center justify-center py-3">
              <IconButton onClick={handleLogout} className="text-black hover:text-gray-600">
                <ExitToAppIcon className="text-2xl" />
                {!isCollapsed && (
                  <span className={`ml-2 ${darkTheme ? 'text-gray-400 font-bold' : 'text-black'}`}>Logout</span>
                )}
              </IconButton>
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </div>
  );
}

export default SideBar;
