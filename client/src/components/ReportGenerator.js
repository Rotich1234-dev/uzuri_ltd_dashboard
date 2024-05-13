import React from 'react';
import { useSelector } from 'react-redux';

const ReportGenerator = () => {
  const reports = useSelector(state => state.reports);

  return (
    <div>
      <h2>Report Generator</h2>
      {/* Display reports */}
    </div>
  );
};

export default ReportGenerator;
