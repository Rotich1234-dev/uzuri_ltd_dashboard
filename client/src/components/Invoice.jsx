import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

const Invoice = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    clientEmail: '',
    invoiceNumber: '',
    date: '',
    services: [],
    totalCost: 0,
  });
  const [serviceInput, setServiceInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleAddService = () => {
    if (serviceInput.trim() !== '') {
      setInvoiceData({
        ...invoiceData,
        services: [...invoiceData.services, serviceInput],
      });
      setServiceInput('');
    }
  };

  const handleRemoveService = (index) => {
    const newServices = invoiceData.services.filter((_, i) => i !== index);
    setInvoiceData({
      ...invoiceData,
      services: newServices,
    });
  };

  const handleSendEmail = () => {
    const templateParams = {
      clientName: invoiceData.clientName || 'N/A',
      clientEmail: invoiceData.clientEmail || 'N/A',
      invoiceNumber: invoiceData.invoiceNumber || 'N/A',
      date: invoiceData.date || 'N/A',
      services: invoiceData.services.join(', ') || 'N/A',
      totalCost: invoiceData.totalCost || 0,
    };

    emailjs.send('service_id', 'template_id', templateParams)
      .then((response) => {
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here data is sent to the backend or handle it as needed
    console.log(invoiceData);
    setIsLoading(false);
  };

  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto" style={ThemeStyles}>
      <div className="max-w-3xl mx-auto bg-gray-500 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">Invoice</h1>

        <form onSubmit={handleSubmit}>
          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Client Information</h2>
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="clientName">Name:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleChange}
              required
            />
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="clientEmail">Email:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="email"
              name="clientEmail"
              value={invoiceData.clientEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="invoiceNumber">Invoice Number:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={handleChange}
              required
            />
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="date">Date:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Services</h2>
            <div className="flex items-center mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-900 ml-2"
                onClick={handleAddService}
              >
                Add Service
              </button>
            </div>
            <ul className="list-disc pl-5 mb-4">
              {invoiceData.services.map((service, index) => (
                <li key={index} className="flex items-center justify-between">
                  {service}
                  <button
                    type="button"
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                    onClick={() => handleRemoveService(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Total Cost</h2>
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="totalCost">Total (Ksh):</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="number"
              name="totalCost"
              value={invoiceData.totalCost}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 mr-4"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Invoice'}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-400"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
      <button
        className="flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-900 mb-4"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default Invoice;
