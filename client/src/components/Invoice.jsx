import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


const Invoice = ({ThemeStyles}) => {
    
    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate('/dashboard');
    };
  
  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
    style={ThemeStyles}>

      <h1>Invoice</h1>

      <button 
          className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleBackClick}
        >
          <ArrowBackIcon /> Back
        </button>
      </div>
  )
}


export default Invoice