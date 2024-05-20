import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const drillingCosts = {
  "Symmetric Drilling": 130000,
  "Core Drilling": 225000,
  "Geo-technical Drilling": 335000,
};

const pumpCosts = {
  "Submersible Electric Pump": 90000,
  "Solar Pump": 65000,
  "Hand Pump": 30000,
};

const pipeCosts = {
  "PVC - Polyvinyl Chloride": 1200,
  "PEX - Cross-linked Polyethylene": 1200,
  "ABS - Acrylonitrile Butadiene Styrene": 2000,
  "Copper": 2100,
  "Cast Iron": 2500,
  "Galvanized Steel": 2500,
};

const plumbingCosts = {
  "Pipe Diameter": 200,
  "Pipe Length": 200,
  "Number Of Outlets": 1000,
};

const otherCosts = {
  "Pump Maintenance": 15000,
};

const tankInstallationCostPerLiter = 1200;

const clientCategories = {
  1: { category: "Industrial", surveyFee: 20000, localAuthorityFee: 50000 },
  2: { category: "Commercial", surveyFee: 15000, localAuthorityFee: 30000 },
  3: { category: "Domestic", surveyFee: 7000, localAuthorityFee: 10000 },
};

const pumpDepthHeightCosts = [
  { maxPumpDepthHeight: 100, costPerMeter: 1000 },
  { maxPumpDepthHeight: 200, costPerMeter: 1500 },
  { maxPumpDepthHeight: 300, costPerMeter: 2000 },
  { maxPumpDepthHeight: Infinity, costPerMeter: 2500 },
];

const FeeCalculator = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [clientCategory, setClientCategory] = useState({});
  const [drillingServices, setDrillingServices] = useState([]);
  const [pumpTypes, setPumpTypes] = useState([]);
  const [pumpDepth, setPumpDepth] = useState("");
  const [pumpHeight, setPumpHeight] = useState("");
  const [pipeTypes, setPipeTypes] = useState([]);
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [pipeLength, setPipeLength] = useState("");
  const [numberOfOutlets, setNumberOfOutlets] = useState("");
  const [otherServices, setOtherServices] = useState([]);
  const [tankCapacity, setTankCapacity] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [taxAmount, setTaxAmount] = useState(null);
  const [costBreakdown, setCostBreakdown] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/admin/routes/clients");
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);
    const client = clients.find(client => client.client_id === clientId);
    if (client && clientCategories[client.category_id]) {
      setClientCategory(clientCategories[client.category_id]);
    } else {
      setClientCategory({});
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (clientCategories[categoryId]) {
      setClientCategory(clientCategories[categoryId]);
    } else {
      setClientCategory({});
    }
  };

  const handleAddService = (e, setter, selectedServices) => {
    const selectedService = e.target.value;
    if (selectedService && !selectedServices.includes(selectedService)) {
      setter([...selectedServices, selectedService]);
    }
  };

  const handleRemoveService = (service, setter, selectedServices) => {
    setter(selectedServices.filter((s) => s !== service));
  };

  const handleReset = () => {
    setSelectedClientId("");
    setClientCategory({});
    setDrillingServices([]);
    setPumpTypes([]);
    setPumpDepth("");
    setPumpHeight("");
    setPipeTypes([]);
    setPipeDiameter("");
    setPipeLength("");
    setNumberOfOutlets("");
    setOtherServices([]);
    setTankCapacity("");
    setTotalCost(null);
    setTaxAmount(null);
    setCostBreakdown([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cost = 0;
    const breakdown = [];

    if (clientCategory && clientCategory.surveyFee && clientCategory.localAuthorityFee) {
      cost += clientCategory.surveyFee + clientCategory.localAuthorityFee;
      breakdown.push({ label: `Survey Fee (${clientCategory.category})`, amount: clientCategory.surveyFee });
      breakdown.push({ label: `Local Authority Fee (${clientCategory.category})`, amount: clientCategory.localAuthorityFee });
    }

    drillingServices.forEach((service) => {
      if (drillingCosts[service]) {
        cost += drillingCosts[service];
        breakdown.push({ label: service, amount: drillingCosts[service] });
      }
    });

    pumpTypes.forEach((service) => {
      if (pumpCosts[service]) {
        cost += pumpCosts[service];
        breakdown.push({ label: service, amount: pumpCosts[service] });
      }
    });

    pipeTypes.forEach((pipe) => {
      if (pipeCosts[pipe]) {
        cost += pipeCosts[pipe];
        breakdown.push({ label: pipe, amount: pipeCosts[pipe] });
      }
    });

    if (pipeDiameter) {
      const diameterCost = parseFloat(pipeDiameter) * plumbingCosts["Pipe Diameter"];
      cost += diameterCost;
      breakdown.push({ label: `Pipe Diameter (${pipeDiameter} inches)`, amount: diameterCost });
    }

    if (pipeLength) {
      const lengthCost = parseFloat(pipeLength) * plumbingCosts["Pipe Length"];
      cost += lengthCost;
      breakdown.push({ label: `Pipe Length (${pipeLength} mm)`, amount: lengthCost });
    }

    if (numberOfOutlets) {
      const outletsCost = parseFloat(numberOfOutlets) * plumbingCosts["Number Of Outlets"];
      cost += outletsCost;
      breakdown.push({ label: `Number Of Outlets (${numberOfOutlets})`, amount: outletsCost });
    }

    if (pumpDepth) {
      const pumpDepthValue = parseFloat(pumpDepth);
      const pumpDepthCost = pumpDepthHeightCosts.find((d) => pumpDepthValue <= d.maxPumpDepthHeight).costPerMeter * pumpDepthValue;
      cost += pumpDepthCost;
      breakdown.push({ label: `Pump Depth (${pumpDepth} meters)`, amount: pumpDepthCost });
    }

    if (pumpHeight) {
      const pumpHeightValue = parseFloat(pumpHeight);
      const pumpHeightCost = pumpDepthHeightCosts.find((d) => pumpHeightValue <= d.maxPumpDepthHeight).costPerMeter * pumpHeightValue;
      cost += pumpHeightCost;
      breakdown.push({ label: `Pump Height (${pumpHeight} meters)`, amount: pumpHeightCost });
    }

    otherServices.forEach((service) => {
      if (otherCosts[service]) {
        cost += otherCosts[service];
        breakdown.push({ label: service, amount: otherCosts[service] });
      }
    });

    if (tankCapacity) {
      const capacityCost = parseFloat(tankCapacity) * tankInstallationCostPerLiter;
      cost += capacityCost;
      breakdown.push({ label: `Tank Capacity (${tankCapacity} liters)`, amount: capacityCost });
    }

    const tax = cost * 0.16;
    const totalCostWithTax = cost + tax;

    setTaxAmount(tax);
    setTotalCost(totalCostWithTax);
    setCostBreakdown(breakdown);
  };

  const handleSave = async () => {
    const clientDetails = {
      client_id: selectedClientId,
      clientCategory,
      drillingServices,
      pumpTypes,
      pumpDepth,
      pumpHeight,
      pipeTypes,
      pipeDiameter,
      pipeLength,
      numberOfOutlets,
      otherServices,
      tankCapacity,
      totalCost,
      taxAmount,
    };

    try {
      const response = await fetch("http://localhost:3000/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Client details saved successfully!");
    } catch (error) {
      console.error("Error saving client details:", error);
      alert("Failed to save client details.");
    }
  };

  const background = {
    ...ThemeStyles,
    backgroundColor: '#FFFAFA'
  };

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={background}
    >
      <h1 className="text-gray-800 text-2xl font-bold p-3 text-center">Fee Calculator</h1>

      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="text-center w-full md:w-2/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="selectedClientId"
                className="block text-gray-900 text-sm font-bold mb-2"
              >
                Select Client
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="selectedClientId"
                value={selectedClientId}
                onChange={handleClientChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.client_id} value={client.client_id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="text-center w-full md:w-2/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="clientCategory"
                className="block text-gray-900 text-sm font-bold mb-2"
              >
                Client Category
              </label>
              <input
                type="text"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="clientCategory"
                value={clientCategory.category || ""}
                readOnly
              />
              {!clientCategory.category && (
                <select
                  className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-2"
                  id="clientCategorySelect"
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Client Category</option>
                  {Object.keys(clientCategories).map((key) => (
                    <option key={key} value={key}>
                      {clientCategories[key].category}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="drillingServices"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Drilling Services
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="drillingServices"
                onChange={(e) =>
                  handleAddService(e, setDrillingServices, drillingServices)
                }
              >
                <option value="">Select Drilling Service</option>
                <option value="Symmetric Drilling">Symmetric Drilling</option>
                <option value="Core Drilling">Core Drilling</option>
                <option value="Geo-technical Drilling">
                  Geo-technical Drilling
                </option>
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {drillingServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {service}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() =>
                        handleRemoveService(
                          service,
                          setDrillingServices,
                          drillingServices
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pumpTypes"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pump Types
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpTypes"
                onChange={(e) => handleAddService(e, setPumpTypes, pumpTypes)}
              >
                <option value="">Select Pump Type</option>
                <option value="Submersible Electric Pump">
                  Submersible Electric Pump
                </option>
                <option value="Solar Pump">Solar Pump</option>
                <option value="Hand Pump">Hand Pump</option>
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {pumpTypes.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {service}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() =>
                        handleRemoveService(service, setPumpTypes, pumpTypes)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pumpDepth"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pump Depth (in meters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpDepth"
                value={pumpDepth}
                onChange={(e) => setPumpDepth(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pumpHeight"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pump Height (in meters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpHeight"
                value={pumpHeight}
                onChange={(e) => setPumpHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pipeType"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pipe Type
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeType"
                onChange={(e) =>
                  handleAddService(e, setPipeTypes, pipeTypes)
                }
              >
                <option value="">Select Pipe Type</option>
                <option value="PVC - Polyvinyl Chloride">
                  PVC - Polyvinyl Chloride
                </option>
                <option value="PEX - Cross-linked Polyethylene">
                  PEX - Cross-linked Polyethylene
                </option>
                <option value="ABS - Acrylonitrile Butadiene Styrene">
                  ABS - Acrylonitrile Butadiene Styrene
                </option>
                <option value="Copper">Copper</option>
                <option value="Cast Iron">Cast Iron</option>
                <option value="Galvanized Steel">Galvanized Steel</option>
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {pipeTypes.map((pipe, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {pipe}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() =>
                        handleRemoveService(pipe, setPipeTypes, pipeTypes)
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pipeDiameter"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pipe Diameter (in inches)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeDiameter"
                value={pipeDiameter}
                onChange={(e) => setPipeDiameter(e.target.value)}
                placeholder="Enter value between 0.5 to 48"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="pipeLength"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pipe Length (in mm)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeLength"
                value={pipeLength}
                onChange={(e) => setPipeLength(e.target.value)}
                placeholder="Enter value from 1"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="numberOfOutlets"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Number Of Outlets
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="numberOfOutlets"
                value={numberOfOutlets}
                onChange={(e) => setNumberOfOutlets(e.target.value)}
                placeholder="Enter number from 1"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                htmlFor="otherServices"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Other Services
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="otherServices"
                onChange={(e) =>
                  handleAddService(e, setOtherServices, otherServices)
                }
              >
                <option value="">Select Service</option>
                <option value="Pump Maintenance">Pump Maintenance</option>
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {otherServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {service}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() =>
                        handleRemoveService(
                          service,
                          setOtherServices,
                          otherServices
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3 mb-4 md:mb-0">
              <label
                htmlFor="tankCapacity"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tank Capacity (in liters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="tankCapacity"
                value={tankCapacity}
                onChange={(e) => setTankCapacity(e.target.value)}
                placeholder="Enter value from 1"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-900 mr-4"
            >
              Calculate Fees
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-yellow-700"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        {totalCost !== null && (
          <>
            <div className="mt-6 text-center">
              <h2 className="text-gray-900 text-xl font-semibold mb-2">
                Breakdown of Costs
              </h2>
              <ul className="text-gray-700 text-lg mb-4">
                {costBreakdown.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 px-4 border-b border-gray-300"
                  >
                    <span>{item.label}</span>
                    <span>Ksh. {item.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">
                Total Cost
              </h2>
              <p className="text-gray-900 text-lg font-bold">{`Ksh. ${totalCost.toFixed(
                2
              )}`}</p>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">
                Tax Amount (16%)
              </h2>
              <p className="text-gray-900 text-lg font-bold">{`Ksh. ${taxAmount.toFixed(
                2
              )}`}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-900"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
      <button
        className="py-2 px-3 mt-4 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default FeeCalculator;



