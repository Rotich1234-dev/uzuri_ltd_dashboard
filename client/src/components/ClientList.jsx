import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClientList = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/routes/clients")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

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
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-100 flex flex-wrap justify-center">
          {clients.map((client) => (
            <div
              key={client.client_id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            >
              <div className="px-6 py-4">
                <div className="text-green-900 font-bold text-xl mb-2">
                  {client.firstName} {client.lastName}
                </div>
                <p className="text-black font-semibold text-base">
                  Email: {client.email} <br />
                  Address: {client.address} <br />
                  Telephone: {client.phone_number} <br />
                  Client Category: {client.category_id} <br />
                  Location: {client.location} <br />
                  Transaction: {client.transaction} <br />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        className="mt-4 bg-gray-900 text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleBackClick}
      >
        <ArrowBackIcon /> Back
      </button>
    </div>
  );
};

export default ClientList;




