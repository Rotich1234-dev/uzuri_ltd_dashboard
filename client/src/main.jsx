<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./Theme.jsx";
import { UserProvider } from "./UserContext.jsx";
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './Theme.jsx'
import { UserProvider } from './UserContext.jsx';
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
<<<<<<< HEAD
);
=======
)  
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
