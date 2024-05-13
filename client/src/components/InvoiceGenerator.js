import React from 'react';
import { useSelector } from 'react-redux';

const InvoiceGenerator = () => {
  const invoices = useSelector(state => state.invoices);

  return (
    <div>
      <h2>Invoice Generator</h2>
      {/* Display invoices */}
    </div>
  );
};

export default InvoiceGenerator;
