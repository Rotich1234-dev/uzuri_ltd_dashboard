import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Overall Statistics',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Average Statistics',
      data: [1000, 5000, 7000, 9000, 3000, 2000],
      backgroundColor: 'red',
    },
    {
        label: 'Reporting Statistics',
        data: [5000, 3000, 7000, 5000, 1000, 7000],
        backgroundColor: 'orange',
      },
  ],
};


const OurChart = () => {
  return (
    <Bar options={options} data={data} />
  )
}

export default OurChart
