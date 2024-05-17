import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const FeeCalculator = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const [clientType, setClientType] = useState('');
  const [drillingService, setDrillingService] = useState('');
  const [pumpType, setPumpType] = useState('');
  const [depth, setDepth] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate fees based on the input data
  };

  return (
    <div className="pb-40 px-5 py-7 p-6 w-full h-screen overflow-y-auto" style={ThemeStyles}>
      <h1 className='text-2xl font-bold p-3 text-center'>Fee Calculator</h1>

      <div className="max-w-md mx-auto bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="clientType" className="block text-gray-700 text-sm font-bold mb-2">
              Client Type
            </label>
            <select
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="clientType"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <option value="">Select Client Type</option>
              <option value="Industrial">Industrial</option>
              <option value="Commercial">Commercial</option>
              <option value="Domestic">Domestic</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="drillingService" className="block text-gray-700 text-sm font-bold mb-2">
              Drilling Service
            </label>
            <select
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="drillingService"
              value={drillingService}
              onChange={(e) => setDrillingService(e.target.value)}
            >
              <option value="">Select Drilling Service</option>
              <option value="Symmetric Drilling">Symmetric Drilling</option>
              <option value="Core Drilling">Core Drilling</option>
              <option value="Geo-technical Drilling">Geo-technical Drilling</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="pumpType" className="block text-gray-700 text-sm font-bold mb-2">
              Pump Type
            </label>
            <select
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="pumpType"
              value={pumpType}
              onChange={(e) => setPumpType(e.target.value)}
            >
              <option value="">Select Pump Type</option>
              <option value="Submersible Electric Pump">Submersible Electric Pump</option>
              <option value="Solar Pump">Solar Pump</option>
              <option value="Hand Pump">Hand Pump</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="depth" className="block text-gray-700 text-sm font-bold mb-2">
              Depth (in meters)
            </label>
            <input
              type="number"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="depth"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="height" className="block text-gray-700 text-sm font-bold mb-2">
              Height (in meters)
            </label>
            <input
              type="number"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-white"
          >
            Calculate Fees
          </button>
        </form>
      </div>
      <button
        className="mt-4 flex items-center justify-center bg-gray-500 text-white font-bold rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default FeeCalculator;