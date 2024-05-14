import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Box, IconButton, Button } from "@mui/material";
import Logo from "../assets/uzurilogo.png";
import Survey from "../assets/survey.png";
import Testing from "../assets/testing.png";
import Equipment from "../assets/equipment.png";
import Design from "../assets/design.png";

import { Link } from "react-router-dom";

const Dashboard = ({ ThemeStyles }) => {
  return (
    <div className="p-6 overflow-hidden h-screen">
      <Box class="justify-between flex" style={ThemeStyles}>
        <div>
          <h1 className="text-3xl font-bold mb-4">UZURI LIMITED </h1>
          <h2 className="text-2xl font-semibold mb-8 text-white-600">
            KARIBU KWENYE DASHBODI YA UZURI
          </h2>
        </div>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
        {/* Email sent*/}
        <Box className="bg-gray-100 p-2  shadow-md flex items-center">
          <div className="w-4 h-8 text-gray-100 mr-2">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Design}
              alt="Recent Tickets"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Design & Construction</h2>
          </div>
        </Box>

        <div className="bg-gray-100 p-4  shadow-md flex items-center">
          <div className="w-8 h-8 text-green-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Testing}
              alt="Recent Tickets"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900">Drilling & Test Pumping</h2>
          </div>
        </div>

        <div className="bg-gray-100 p-4  shadow-md flex items-center">
          <div className="w-8 h-8 text-yellow-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Survey}
              alt="Recent Tickets"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900"> Hydrogeological Survey & Report</h2>
          </div>
        </div>

        {/* Clients Metrics */}
        <div className="bg-gray-100 p-4  shadow-md flex items-center">
          <div className="w-8 h-8 text-purple-500 mr-4">
            <DonutLargeIcon />
          </div>
          <div>
            <img
              src={Equipment}
              alt="Recent Tickets"
              className="mr-4"
              style={{ width: "60px", height: "60px" }}
            />
            <h2 className="text-slate-900"> Pump & Tank Installation</h2>
          </div>
        </div>
      </Box>

      <Box class="flex w-100 justify-center ">
        <Box class="p-2 bg-gray-100 m-3 w-4/4 h-60 overflow-hidden">
          <div className="flex  justify-between text-center">
            <div className="bg-gray-100 p-4  shadow-md flex items-center">
              <img
                src={Logo}
                alt="Recent Tickets"
                className="mr-4"
                style={{ width: "200px", height: "auto" }}
              />
              <div className="w-8 h-8 text-yellow-500 mr-4">
                <DonutLargeIcon />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-300">61</h1>
                <h2 className="text-yellow-500"></h2>
                <h3 className="text-green-500"> U.L.T </h3>
              </div>
            </div>
            <Link to="/Item">
              <IconButton class="text-emerald-500"></IconButton>
            </Link>
          </div>
        </Box>
      </Box>

      {/* Campaign */}
      <Box class="flex justify-between overflow-hidden">
      <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Orders</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ordered By</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 0</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 10000</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
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
        <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Orders</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ordered By</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 0</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 10000</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
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
        <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Orders</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ordered By</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 0</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 10000</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
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
            <button className="tex-gray-500 hover:text-white underline">
              View All
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;
