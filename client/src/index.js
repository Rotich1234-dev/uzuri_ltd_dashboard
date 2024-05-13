import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ThemeContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>
);

