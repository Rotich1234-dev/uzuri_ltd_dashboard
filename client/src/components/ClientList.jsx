import React from "react";
import db from "/root/Development/code/project5/uzuri_ltd_dashboard/client/src/db.json";

const ClientList = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center w-full">
        OUR CLIENT LIST
      </h2>
      {db.contacts.map((contact) => (
        <div
          key={contact.id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {contact.firstName} {contact.lastName}
            </div>
            <p className="text-gray-700 text-base">
              Email: {contact.email} <br />
              Contact: {contact.contact} <br />
              Address: {contact.address1}, {contact.address2} <br />
              Position: {contact.position}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
