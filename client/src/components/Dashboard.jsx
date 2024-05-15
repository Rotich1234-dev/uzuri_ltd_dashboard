import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Box, IconButton } from "@mui/material";
import Logo from "../assets/uzurilogo.png";
import Survey from "../assets/survey.png";
import Testing from "../assets/testing.png";
import Equipment from "../assets/equipment.png";
import Design from "../assets/design.png";
import { Link } from "react-router-dom";

const Dashboard = ({ ThemeStyles }) => {
  return (
    <div
      className="px-5 py-7 p-6 w-full h-screen overflow-y-auto"
      style={{ ...ThemeStyles, overflowY: "auto" }}
    >
      <Box className="justify-between flex" style={ThemeStyles}>
        <div>
          <h1 className="text-3xl font-bold mb-4">UZURI LIMITED </h1>
          <h2 className="text-2xl font-semibold mb-8 text-white-600">
            KARIBU KWENYE DASHBODI YA UZURI
          </h2>
        </div>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
        {/* Design & Construction */}
        <Box className="bg-gray-100 p-2 shadow-md flex items-center">
          <div className="w-4 h-8 text-gray-100 mr-2">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Design}
              alt="Design & Construction"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Design & Construction</h2>
          </div>
        </Box>

        {/* Drilling & Test Pumping */}
        <Box className="bg-gray-100 p-4 shadow-md flex items-center">
          <div className="w-8 h-8 text-green-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Testing}
              alt="Drilling & Test Pumping"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Drilling & Test Pumping</h2>
          </div>
        </Box>

        {/* Hydrogeological Survey & Report */}
        <Box className="bg-gray-100 p-4 shadow-md flex items-center">
          <div className="w-8 h-8 text-yellow-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Survey}
              alt="Hydrogeological Survey & Report"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Hydrogeological Survey & Report</h2>
          </div>
        </Box>

        {/* Pump & Tank Installation */}
        <Box className="bg-gray-100 p-4 shadow-md flex items-center">
          <div className="w-8 h-8 text-purple-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Equipment}
              alt="Pump & Tank Installation"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Pump & Tank Installation</h2>
          </div>
        </Box>
      </Box>

      <Box className="flex w-full justify-center">
        <Box className="p-2 bg-gray-100 m-3 w-4/4 h-60 overflow-hidden">
          <div className="flex justify-between text-center">
            <div className="bg-gray-100 p-4 shadow-md flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="mr-4"
                style={{ width: "200px", height: "auto" }}
              />
              <div className="w-8 h-8 text-yellow-500 mr-4">
                <DonutLargeIcon />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-300">61</h1>
                <h3 className="text-green-500">U.L.T</h3>
              </div>
            </div>
            <Link to="/Item">
              <IconButton className="text-emerald-500"></IconButton>
            </Link>
          </div>
        </Box>
      </Box>

      {/* Campaign */}
      <Box className="flex flex-col gap-4 overflow-hidden">
        <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Service Requests</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Message</th>
                <th className="text-left p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2" colSpan="4">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-right mt-2">
            <button className="text-black hover:text-white underline">
              View All
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
