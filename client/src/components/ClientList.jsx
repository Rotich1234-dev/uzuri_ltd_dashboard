import React from "react";
import { useNavigate } from "react-router-dom";
import db from "../db.json";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClientList = ({ ThemeStyles }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
      <div className="flex justify-between items-center mb-4">
       
        <h2 className="text-2xl font-bold text-center w-full">
          OUR CLIENT LIST
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {db.clients.map((client) => (
          <div
            key={client.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {client.name}
              </div>
              <p className="text-black font-semibold text-base">
                Name: {client.name} <br />
                Address: {client.address} <br />
                Telephone: {client.telephone} <br />
                Client Category: {client.clientCategory} <br />
                Borehole Location: {client.boreholeLocations} <br />
              </p>
            </div>
          </div>
        ))}
      </div>
      <button 
          className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleBackClick}
        >
          <ArrowBackIcon /> Back
        </button>
    </div>
  );
};

export default ClientList;

