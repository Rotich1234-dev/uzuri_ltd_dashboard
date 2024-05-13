// src/components/ClientList.js
import React from 'react';
import { useSelector } from 'react-redux';

function ClientList() {
  const clients = useSelector(state => state.clients.data);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Clients</h2>
      <ul className="list-disc pl-5">
        {clients.map(client => (
          <li key={client.id} className="text-gray-700 hover:text-blue-500 cursor-pointer mb-2">
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
