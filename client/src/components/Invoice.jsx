import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import 'jspdf-autotable';

emailjs.init("_i-rvf-Vb-3NAy7sG");

const Invoice = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [fees, setFees] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formValues, setFormValues] = useState({
    clientId: "",
    clientName: "",
    clientEmail: "",
    clientCategory: "",
    invoiceNumber: "",
    date: "",
    projectStatus: "",
    drillingServices: [],
    pumpTypes: [],
    plumbingServices: [],
    pipeType: "",
    pipeDiameter: "",
    pipeLength: "",
    numberOfOutlets: "",
    tankCapacity: "",
    otherServices: [],
    totalCostBeforeTax: 0,
    taxAmount: 0,
    totalCostAfterTax: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e, field) => {
    const { value } = e.target;
    if (value && !formValues[field].includes(value)) {
      setFormValues({ ...formValues, [field]: [...formValues[field], value] });
    }
  };

  const handleRemoveService = (field, index) => {
    setFormValues({
      ...formValues,
      [field]: formValues[field].filter((_, i) => i !== index),
    });
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };


  const handleClientChange = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = clients.find(client => client.client_id === selectedClientId);
    if (selectedClient) {
      setFormValues({
        ...formValues,
        clientId: selectedClient.client_id,
        clientEmail: selectedClient.email,
        clientName: `${selectedClient.firstName} ${selectedClient.lastName}`,
        clientCategory: selectedClient.category_id,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage("Invoice created successfully!");
        setFormValues({
          clientId: "",
          clientName: "",
          clientEmail: "",
          clientCategory: "",
          invoiceNumber: "",
          date: "",
          projectStatus: "",
          drillingServices: [],
          pumpTypes: [],
          plumbingServices: [],
          pipeType: "",
          pipeDiameter: "",
          pipeLength: "",
          numberOfOutlets: "",
          tankCapacity: "",
          otherServices: [],
          totalCostBeforeTax: 0,
          taxAmount: 0,
          totalCostAfterTax: 0,
        });
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Invoice", 20, 20);
    doc.text(`From: Uzuri Limited Accounts Department`, 20, 30);
    doc.text(`To: ${formValues.clientName} (${formValues.clientEmail})`, 20, 40);
    doc.text(`Invoice #: ${formValues.invoiceNumber}`, 20, 50);
    doc.text(`Date: ${formValues.date}`, 20, 60);
    doc.text(`Project Status: ${formValues.projectStatus}`, 20, 70);
    doc.text(`Description: ${formValues.description}`, 20, 80);
    doc.text(`Client ID: ${formValues.clientId}`, 20, 90);
    doc.text(`Client Category: ${formValues.clientCategory}`, 20, 100);
    doc.text(`Survey Fee: Ksh ${formValues.surveyFee}`, 20, 110);
    doc.text(`Local Authority Fee: Ksh ${formValues.localAuthorityFee}`, 20, 120);

    doc.autoTable({
      startY: 130,
      head: [['Service', 'Cost']],
      body: [
        ...formValues.drillingServices.map((service) => [service, `Ksh ${fees[service]}`]),
        ...formValues.pumpTypes.map((pump) => [pump, `Ksh ${fees[pump]}`]),
        ['Pipe Type', `Ksh ${fees[formValues.pipeType]}`],
        ['Pipe Diameter', `Ksh ${formValues.pipeDiameter * fees["Pipe Diameter"]}`],
        ['Pipe Length', `Ksh ${formValues.pipeLength * fees["Pipe Length"]}`],
        ['Number Of Outlets', `Ksh ${formValues.numberOfOutlets * fees["Number Of Outlets"]}`],
        ['Tank Capacity', `Ksh ${formValues.tankCapacity * fees["Tank Capacity"]}`],
        ...formValues.otherServices.map((service) => [service, `Ksh ${fees[service]}`]),
      ],
    });

    doc.text(`Total Cost Before Tax: Ksh ${formValues.totalCostBeforeTax}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Tax Amount (16%): Ksh ${formValues.taxAmount}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Cost After Tax: Ksh ${formValues.totalCostAfterTax}`, 20, doc.autoTable.previous.finalY + 30);

    return doc;
  };

  const handleSendEmail = () => {
    const doc = generatePDF();
    const pdfBase64 = doc.output('datauristring');

    const templateParams = {
      to_email: formValues.clientEmail,
      to_name: formValues.clientName,
      invoice_number: formValues.invoiceNumber,
      invoice_date: formValues.date,
      services: [
        ...formValues.drillingServices.map((service) => `${service}: Ksh ${fees[service]}`),
        ...formValues.pumpTypes.map((pump) => `${pump}: Ksh ${fees[pump]}`),
        `Pipe Type (${formValues.pipeType}): Ksh ${fees[formValues.pipeType]}`,
        `Pipe Diameter (${formValues.pipeDiameter} inches): Ksh ${formValues.pipeDiameter * fees["Pipe Diameter"]}`,
        `Pipe Length (${formValues.pipeLength} mm): Ksh ${formValues.pipeLength * fees["Pipe Length"]}`,
        `Number Of Outlets (${formValues.numberOfOutlets}): Ksh ${formValues.numberOfOutlets * fees["Number Of Outlets"]}`,
        `Tank Capacity (${formValues.tankCapacity} liters): Ksh ${formValues.tankCapacity * fees["Tank Capacity"]}`,
        ...formValues.otherServices.map((service) => `${service}: Ksh ${fees[service]}`),
        `Total Cost Before Tax: Ksh ${formValues.totalCostBeforeTax}`,
        `Tax Amount (16%): Ksh ${formValues.taxAmount}`,
        `Total Cost After Tax: Ksh ${formValues.totalCostAfterTax}`
      ].join('\n'),
      pdf_base64: pdfBase64,
    };

    emailjs
      .send(
        "service_ubxhk3m",
        "template_s71zm2p",
        templateParams,
        "_i-rvf-Vb-3NAy7sG"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      });
  };

  const handlePrint = () => {
    const doc = generatePDF();
    doc.save('invoice.pdf');
  };

  const handleReset = () => {
    setFormValues({
      clientId: "",
      clientName: "",
      clientEmail: "",
      clientCategory: "",
      invoiceNumber: "",
      date: "",
      projectStatus: "",
      drillingServices: [],
      pumpTypes: [],
      plumbingServices: [],
      pipeType: "",
      pipeDiameter: "",
      pipeLength: "",
      numberOfOutlets: "",
      tankCapacity: "",
      otherServices: [],
      totalCostBeforeTax: 0,
      taxAmount: 0,
      totalCostAfterTax: 0,
    });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/routes/clients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });

    fetch("http://127.0.0.1:8080/api/admin/routes/fees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFees(data);
      })
      .catch((error) => {
        console.error("Error fetching fees:", error);
      });
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      const clientCategory = clients.find(client => client.client_id === formValues.clientId);
      const surveyFee = clientCategory?.surveyFee || 0;
      const localAuthorityFee = clientCategory?.localAuthorityFee || 0;

      let serviceCost = 0;
      formValues.drillingServices.forEach(service => {
        if (fees[service]) {
          serviceCost += fees[service];
        }
      });
      formValues.pumpTypes.forEach(service => {
        if (fees[service]) {
          serviceCost += fees[service];
        }
      });
      formValues.plumbingServices.forEach(service => {
        if (fees[service]) {
          serviceCost += fees[service];
        }
      });
      if (fees[formValues.pipeType]) {
        serviceCost += fees[formValues.pipeType];
      }
      serviceCost += formValues.pipeDiameter * fees["Pipe Diameter"];
      serviceCost += formValues.pipeLength * fees["Pipe Length"];
      serviceCost += formValues.numberOfOutlets * fees["Number Of Outlets"];
      serviceCost += formValues.tankCapacity * fees["Tank Capacity"];

      formValues.otherServices.forEach(service => {
        if (fees[service]) {
          serviceCost += fees[service];
        }
      });

      const totalCostBeforeTax = surveyFee + localAuthorityFee + serviceCost;
      const taxAmount = totalCostBeforeTax * 0.16;
      const totalCostAfterTax = totalCostBeforeTax + taxAmount;

      setFormValues({
        ...formValues,
        totalCostBeforeTax,
        taxAmount,
        totalCostAfterTax,
      });
    };

    calculateTotalCost();
  }, [
    formValues.drillingServices,
    formValues.pumpTypes,
    formValues.plumbingServices,
    formValues.otherServices,
    formValues.clientCategory,
    formValues.pipeType,
    formValues.pipeDiameter,
    formValues.pipeLength,
    formValues.numberOfOutlets,
    formValues.tankCapacity,
    fees,
    clients,
  ]);

  const background = {
    ...ThemeStyles,
    backgroundColor: "#FFFAFA",
  };

  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto" style={background}>
      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 relative">
        <div className="absolute top-0 right-0 p-4">
          <img src="src/assets/uzurilogo.png" alt="Logo" className="w-16 h-16 rounded-full object-cover" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">Invoice</h1>
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="from">
                  From
                </label>
                <textarea
                  id="from"
                  name="from"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Uzuri Limited Accounts Department"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="clientEmail">
                  Bill To
                </label>
                <input
                  id="clientEmail"
                  name="clientEmail"
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.clientEmail}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Your customer's billing address"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="clientId">
                  Client Id
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  onChange={handleClientChange}
                  value={formValues.clientId}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select client" />
                  {clients.map(client => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_id} - {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="invoiceNumber">
                  Invoice #
                </label>
                <input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.invoiceNumber}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Invoice Number"
                />
              </div>
              <div className="w-full md:w-2/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                  Invoice Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  onChange={handleInputChange}
                  value={formValues.date}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.description}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="projectStatus">
                  Project Status
                </label>
                <select
                  id="projectStatus"
                  name="projectStatus"
                  onChange={handleInputChange}
                  value={formValues.projectStatus}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select status" />
                  <option value="Completed">Completed</option>
                  <option value="Incomplete">Incomplete (Pending Downpayment)</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="drillingServices">
                  Drilling Services
                </label>
                <select
                  id="drillingServices"
                  name="drillingServices"
                  onChange={(e) => handleSelectChange(e, 'drillingServices')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Drilling")).map((drillingService, index) => (
                    <option key={index} value={drillingService}>
                      {drillingService}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formValues.drillingServices.map((drillingService, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {drillingService}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handleRemoveService('drillingServices', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pumpTypes">
                  Pump Types
                </label>
                <select
                  id="pumpTypes"
                  name="pumpTypes"
                  onChange={(e) => handleSelectChange(e, 'pumpTypes')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pump type" />
                  {Object.keys(fees).filter(key => key.includes("Pump")).map((pumpType, index) => (
                    <option key={index} value={pumpType}>
                      {pumpType}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formValues.pumpTypes.map((pumpType, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {pumpType}
                      <button
                        type="button"
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handleRemoveService('pumpTypes', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plumbingServices">
                  Plumbing Services
                </label>
                <select
                  id="plumbingServices"
                  name="plumbingServices"
                  onChange={(e) => handleSelectChange(e, 'plumbingServices')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Pipe") || key.includes("Outlet")).map((plumbingService, index) => (
                    <option key={index} value={plumbingService}>
                      {plumbingService}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formValues.plumbingServices.map((plumbingService, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {plumbingService}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handleRemoveService('plumbingServices', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipeType">
                  Pipe Type
                </label>
                <select
                  id="pipeType"
                  name="pipeType"
                  onChange={handleInputChange}
                  value={formValues.pipeType}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pipe type" />
                  {Object.keys(fees).filter(key => key.includes("Pipe Type")).map((pipeType, index) => (
                    <option key={index} value={pipeType}>
                      {pipeType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipeDiameter">
                  Pipe Diameter (inches)
                </label>
                <input
                  id="pipeDiameter"
                  name="pipeDiameter"
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.pipeDiameter}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value between 0.5 to 48"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipeLength">
                  Pipe Length (mm)
                </label>
                <input
                  id="pipeLength"
                  name="pipeLength"
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.pipeLength}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberOfOutlets">
                  Number Of Outlets
                </label>
                <input
                  id="numberOfOutlets"
                  name="numberOfOutlets"
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.numberOfOutlets}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter number from 1"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tankCapacity">
                  Tank Capacity (liters)
                </label>
                <input
                  id="tankCapacity"
                  name="tankCapacity"
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.tankCapacity}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="otherServices">
                  Other Services
                </label>
                <select
                  id="otherServices"
                  name="otherServices"
                  onChange={(e) => handleSelectChange(e, 'otherServices')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Service") || key.includes("Maintenance")).map((otherService, index) => (
                    <option key={index} value={otherService}>
                      {otherService}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formValues.otherServices.map((otherService, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {otherService}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handleRemoveService('otherServices', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="justify-center flex flex-row gap-9 mt-3 mb-6">
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">Amount</h2>
                <p className="bg-gray-300 text-lg text-gray-900">Ksh {formValues.totalCostBeforeTax}</p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">Tax (16%)</h2>
                <p className="bg-gray-300 text-lg text-gray-900">Ksh {formValues.taxAmount}</p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">TOTAL KES</h2>
                <p className="bg-gray-300 text-2xl text-gray-900">Ksh {formValues.totalCostAfterTax}</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="terms">
                Terms & Conditions
              </label>
              <textarea
                id="terms"
                name="terms"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Payment is due within 15 days"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline italic"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem" }}
              >
                Thank You
              </button>
            </div>
            <div className="flex justify-between mb-6">
              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-700">
                Save Invoice
              </button>
              <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700" onClick={handlePreview}>
                Preview Invoice
              </button>
              <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700" onClick={handleSendEmail}>
                Send Email
              </button>
              <button type="button" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-yellow-700" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        )}
      </div>
      <button
        className="flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900 mb-4"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>

      {showPreview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 p-8 rounded shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
            <p><strong>From:</strong> Uzuri Limited Accounts Department</p>
            <p><strong>To:</strong> {formValues.clientName} ({formValues.clientEmail})</p>
            <p><strong>Invoice #:</strong> {formValues.invoiceNumber}</p>
            <p><strong>Date:</strong> {formValues.date}</p>
            <p><strong>Project Status:</strong> {formValues.projectStatus}</p>
            <p><strong>Description:</strong> {formValues.description}</p>
            <p><strong>Client ID:</strong> {formValues.clientId}</p>
            <p><strong>Client Category:</strong> {formValues.clientCategory}</p>
            <p><strong>Survey Fee:</strong> Ksh {formValues.surveyFee}</p>
            <p><strong>Local Authority Fee:</strong> Ksh {formValues.localAuthorityFee}</p>
            <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
            <ul className="mb-4">
              {formValues.drillingServices.map((service, index) => (
                <li key={index}>{service}: Ksh {fees[service]}</li>
              ))}
              {formValues.pumpTypes.map((pump, index) => (
                <li key={index}>{pump}: Ksh {fees[pump]}</li>
              ))}
              <li>Pipe Type ({formValues.pipeType}): Ksh {fees[formValues.pipeType]}</li>
              <li>Pipe Diameter ({formValues.pipeDiameter} inches): Ksh {formValues.pipeDiameter * fees["Pipe Diameter"]}</li>
              <li>Pipe Length ({formValues.pipeLength} mm): Ksh {formValues.pipeLength * fees["Pipe Length"]}</li>
              <li>Number Of Outlets ({formValues.numberOfOutlets}): Ksh {formValues.numberOfOutlets * fees["Number Of Outlets"]}</li>
              <li>Tank Capacity ({formValues.tankCapacity} liters): Ksh {formValues.tankCapacity * fees["Tank Capacity"]}</li>
              {formValues.otherServices.map((service, index) => (
                <li key={index}>{service}: Ksh {fees[service]}</li>
              ))}
            </ul>
            <p><strong>Total Cost Before Tax:</strong> Ksh {formValues.totalCostBeforeTax}</p>
            <p><strong>Tax Amount (16%):</strong> Ksh {formValues.taxAmount}</p>
            <p><strong>Total Cost After Tax:</strong> Ksh {formValues.totalCostAfterTax}</p>
            <button
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
