<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
import db from "../db.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ClientList = ({ ThemeStyles }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClientList = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const background = {
    ...ThemeStyles,
    backgroundColor: '#FFFAFA'
  };

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={background}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 text-2xl font-bold text-center w-full">
          OUR CLIENT LIST
        </h2>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="flex flex-wrap justify-center">
        {db.clients.map((client) => (
          <div
            key={client.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{client.name}</div>
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
=======
=======
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="text-gray-900 p-2 border rounded"
        />
      </div>
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-100 flex flex-wrap justify-center">
          {filteredClients.map((client) => (
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
<<<<<<< HEAD
        className="mt-4 bg-gray-900 text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
=======
        className="py-2 px-3 mt-4 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
        onClick={handleBackClick}
      >
        <ArrowBackIcon /> Back
      </button>
    </div>
  );
};

export default ClientList;


