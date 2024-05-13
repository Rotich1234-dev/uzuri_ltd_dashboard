// src/components/ServiceForm.js
import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';

function ServiceForm() {
  const [service, setService] = useState('');
  const { addService } = useServices();

  const handleSubmit = (event) => {
    event.preventDefault();
    addService({ service });
    setService('');
  };

  return (
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
  );
}

export default ServiceForm;
