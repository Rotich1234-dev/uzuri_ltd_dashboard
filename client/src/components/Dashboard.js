//src/components/Dashboard.js
import React from 'react';
import ClientList from './ClientList';
import ServiceForm from './ServiceForm';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ClientList />
      <ServiceForm />
    </div>
  );
}

export default Dashboard;

