import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../assets/uzurilogo.png";
const InvoiceForm = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState({
    drillingServices: [],
    pumpTypes: [],
    plumbingServices: [],
    pipeTypes: [],
    tankCapacities: [],
  });
  const [invoice, setInvoice] = useState({
    clientId: "",
    invoiceNumber: "",
    invoiceDate: "",
    description: "",
    projectStatus: "",
    drillingService: "",
    pumpType: "",
    pumpDepth: "",
    pumpHeight: "",
    plumbingService: "",
    pipeType: "",
    pipeDiameter: "",
    pipeLength: "",
    numberOfOutlets: "",
    tankCapacity: "",
    otherService: "",
  });

  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchClients();
    fetchServices();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/admin/routes/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const [drillingResponse, pumpResponse, plumbingResponse, pipeResponse, tankResponse] = await Promise.all([
        fetch("http://127.0.0.1:8080/api/admin/routes/drillingservices"),
        fetch("http://127.0.0.1:8080/api/admin/routes/pumpservices"),
        fetch("http://127.0.0.1:8080/api/admin/routes/plumbingservices"),
        fetch("http://127.0.0.1:8080/api/admin/routes/pipeservices"),
        fetch("http://127.0.0.1:8080/api/admin/routes/tank"),
      ]);

      const drillingServices = await drillingResponse.json();
      const pumpServices = await pumpResponse.json();
      const plumbingServices = await plumbingResponse.json();
      const pipeServices = await pipeResponse.json();
      const tankServices = await tankResponse.json();

      setServices({
        drillingServices,
        pumpTypes: pumpServices,
        plumbingServices,
        pipeTypes: pipeServices,
        tankCapacities: tankServices,
      });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const calculateAmount = () => {
    // Implement your calculation logic here
    const calculatedAmount = 0; // Replace with actual calculation
    const calculatedTax = calculatedAmount * 0.16;
    const calculatedTotal = calculatedAmount + calculatedTax;
    setAmount(calculatedAmount);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = clients.find(client => client.id === clientId);

    if (selectedClient) {
      setInvoice({
        ...invoice,
        clientId: selectedClient.id,
        clientEmail: selectedClient.email,
      });

      // Populate other service fields if needed
    }
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handlePreviewInvoice = () => {
    // Implement preview invoice logic
  };

  const handleSendEmail = () => {
    // Implement send email logic
  };

  const handleReset = () => {
    setInvoice({
      clientId: "",
      invoiceNumber: "",
      invoiceDate: "",
      description: "",
      projectStatus: "",
      drillingService: "",
      pumpType: "",
      pumpDepth: "",
      pumpHeight: "",
      plumbingService: "",
      pipeType: "",
      pipeDiameter: "",
      pipeLength: "",
      numberOfOutlets: "",
      tankCapacity: "",
      otherService: "",
    });
    setAmount(0);
    setTax(0);
    setTotal(0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <img src={logo} alt="Company Logo" className="h-16" />
            <h2 className="text-2xl font-bold">Uzuri Limited Accounts Department</h2>
          </div>
          <h1 className="text-3xl font-bold">Invoice</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Client ID</label>
            <select
              name="clientId"
              value={invoice.clientId}
              onChange={handleClientChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Invoice #</label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              value={invoice.invoiceDate}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={invoice.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Project Status</label>
            <select
              name="projectStatus"
              value={invoice.projectStatus}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Drilling Services</label>
            <select
              name="drillingService"
              value={invoice.drillingService}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select service</option>
              {services.drillingServices.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pump Types</label>
            <select
              name="pumpType"
              value={invoice.pumpType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select pump type</option>
              {services.pumpTypes.map(pump => (
                <option key={pump.id} value={pump.id}>{pump.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pump Depth</label>
            <input
              type="number"
              name="pumpDepth"
              value={invoice.pumpDepth}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Pump Height</label>
            <input
              type="number"
              name="pumpHeight"
              value={invoice.pumpHeight}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Plumbing Services</label>
            <select
              name="plumbingService"
              value={invoice.plumbingService}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select service</option>
              {services.plumbingServices.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pipe Type</label>
            <select
              name="pipeType"
              value={invoice.pipeType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select pipe type</option>
              {services.pipeTypes.map(pipe => (
                <option key={pipe.id} value={pipe.id}>{pipe.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Pipe Diameter (inches)</label>
            <input
              type="number"
              name="pipeDiameter"
              value={invoice.pipeDiameter}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Pipe Length (mm)</label>
            <input
              type="number"
              name="pipeLength"
              value={invoice.pipeLength}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Number of Outlets</label>
            <input
              type="number"
              name="numberOfOutlets"
              value={invoice.numberOfOutlets}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tank Capacity (liters)</label>
            <input
              type="number"
              name="tankCapacity"
              value={invoice.tankCapacity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Other Services</label>
            <input
              type="text"
              name="otherService"
              value={invoice.otherService}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={calculateAmount}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Calculate Amount
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <label className="block text-gray-700">Amount</label>
            <p className="text-lg font-bold">Ksh {amount}</p>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Tax (16%)</label>
            <p className="text-lg font-bold">Ksh {tax}</p>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Total KES</label>
            <p className="text-lg font-bold">Ksh {total}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Terms & Conditions</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="3"
            defaultValue="Payment is due within 15 days"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviewInvoice}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700"
          >
            Preview Invoice
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Send Email
          </button>
          <button
            onClick={handleReset}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-700"
          >
            Reset
          </button>
        </div>
      </div>

      <button
        className="bg-gray-900 text-gray-500 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4"
        onClick={handleBackClick}
      >
        <ArrowBackIcon /> Back
      </button>
    </div>
  );
};

export default InvoiceForm;



