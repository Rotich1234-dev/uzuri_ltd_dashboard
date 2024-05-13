import React from 'react';
import { useSelector } from 'react-redux';

const FeeCalculator = () => {
  const totalFees = useSelector(state => state.fees.totalFees);

  return (
    <div>
      <h2>Fee Calculator</h2>
      <p>Total Fees: {totalFees}</p>
    </div>
  );
};

export default FeeCalculator;
