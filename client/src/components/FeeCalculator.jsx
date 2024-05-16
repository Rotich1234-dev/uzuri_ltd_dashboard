import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


const FeeCalculator = ({ThemeStyles}) => {
    
    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate('/dashboard');
    };
  
  return (
    <div>
      <h1>FeeCalculator</h1>

      <button 
          className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleBackClick}
        >
          <ArrowBackIcon /> Back
        </button>
      </div>
  )
}

export default FeeCalculator