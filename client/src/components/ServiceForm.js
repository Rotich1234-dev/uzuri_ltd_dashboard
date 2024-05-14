import React, { useState } from 'react';

function ServiceForm() {
  const [service, setService] = useState('');
  const [servicesList, setServicesList] = useState([]); 

  const addService = (newService) => {
    setServicesList(prevServices => [...prevServices, newService]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addService(service);
    setService(''); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="service">Service:</label>
        <input
          type="text"
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <button type="submit">Add Service</button>
      </form>
      {/* Optionally display the list of services */}
      <ul>
        {servicesList.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceForm;


