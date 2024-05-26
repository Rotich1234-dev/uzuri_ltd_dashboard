import React from 'react';
import { useLocation } from "react-router-dom";
import { UpdateTheme, UseTheme } from "./Theme";
import SideBar from "./components/SideBar";
import TopNav from "./components/TopNav";
import { Routes, Route } from "react-router-dom";
import Authentication from './components/Authentication';
import Invoice from "./components/Invoice";
import Dashboard from "./components/Dashboard";
import RegisterClient from "./components/RegisterClient";
import FeeCalculator from "./components/FeeCalculator";
import Home from "./components/Home";
import Reports from "./components/Reports";
import ClientList from "./components/ClientList";
import ServicesList from "./components/ServicesList";
import Bg from "../src/assets/water.png";

function App() {
  const darkTheme = UseTheme();
  const toggleColor = UpdateTheme();
  const location = useLocation();

  const ThemeStyles = {
    backgroundImage: `url(${Bg})`,
    backgroundColor: darkTheme ? "rgb(46, 45, 45)" : "rgb(171, 163, 159)",
    color: darkTheme ? "rgb(240, 240, 240)" : "rgb(26, 46, 5)",
    backgroundSize: "cover",
  };

  const headerGradient = darkTheme
    ? "bg-gradient-to-r from-blue-900 to-gray-500"
    : "bg-gradient-to-r from-gray-500 to-gray-900";

  return (
    <div className="app overflow-hidden" style={ThemeStyles}>
      <SideBar toggleColor={toggleColor} darkTheme={darkTheme} />
      <main className="content">
        <TopNav toggleColor={toggleColor} darkTheme={darkTheme} />

        {/* Conditionally render the welcome message */}
        {location.pathname === "/" && (
          <div className="flex items-center justify-center min-h-screen">
            <h1
              className={`px-10 py-25 mt-9 font-bold text-7xl text-transparent bg-clip-text ${headerGradient}`}
            >
              UZURI LIMITED DASHBOARD
            </h1>
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/Profile" element={<Authentication ThemeStyles={ThemeStyles} />} />
          <Route path="/Dashboard" element={<Dashboard ThemeStyles={ThemeStyles} />} />
          <Route path="/RegisterClient" element={<RegisterClient ThemeStyles={ThemeStyles} />} />
          <Route path="/FeeCalculator" element={<FeeCalculator ThemeStyles={ThemeStyles} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Invoice" element={<Invoice ThemeStyles={ThemeStyles} />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/ClientList" element={<ClientList ThemeStyles={ThemeStyles} />} />
          <Route path="/ServicesList" element={<ServicesList ThemeStyles={ThemeStyles} />} />
        </Routes>
        {/* <ServicesList style={ThemeStyles} /> */}
      </main>
    </div>
  );
}

export default App;


