import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useUser } from "../UserContext";

const Item = ({ title, to, icon }) => {
  return (
    <Link to={to}>
      <MenuItem style={{ color: "rgb(200,200,200)" }} icon={icon}>
        <h4 className="bg-gray-500 text-sm" color="rgb(255,240,200)">
          {title}
        </h4>
      </MenuItem>
    </Link>
  );
};

function SideBar({ ThemeStyles }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  return (
    <div className="flex-col w-fit h-screen border-x-4 border-neutral-700 bg-gray-500 border-solid">
      <Box className="flex-col" style={ThemeStyles}>
        <Sidebar collapsed={isCollapsed} style={ThemeStyles}>
          <Menu className="bg-gray-500">
            <Box>
              <MenuItem
                className="text-slate-700 justify-between"
                onClick={() => setCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuIcon /> : undefined}
                style={{ margin: "10px 0", cursor: "pointer" }}
              >
                {!isCollapsed && (
                  <Box className="flex justify-between p-3">
                    <h1 className="text-2xl font-bold">UZURI LIMITED</h1>
                    <IconButton
                      className="text-slate-200"
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
                <Box className="mt-3">
                  <h1 className="text-2xl text-center text-white font-bold">
                    {user?.name || ""}
                  </h1>
                  <h5 className="text-xl font-bold text-center text-blue-900">
                    {user?.role || "Staff"}
                  </h5>
                </Box>
              </Box>
            )}
          </Menu>
          <Menu className="bg-gray-500">
            <Box>
              <Item icon={<HomeIcon />} title="Home" to="/Home" />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </div>
  );
}

export default SideBar;
