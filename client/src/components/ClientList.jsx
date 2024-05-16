import React from "react";
import db from "../db.json";

const ClientList = ({ ThemeStyles }) => {
  return (
    <div
    className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
    style={ThemeStyles}>      
    <h2 className="text-2xl font-bold mb-4 text-center w-full">
        OUR CLIENT LIST
      </h2>
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
              <p className="text-blue-600 text-base">
                Name: {client.name} <br />
                Address: {client.address} <br />
                Telephone: {client.telephone} <br />
                Clientcategory: {client.clientCategory} <br />
                Boreholelocation: {client.boreholeLocations} <br />
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;

