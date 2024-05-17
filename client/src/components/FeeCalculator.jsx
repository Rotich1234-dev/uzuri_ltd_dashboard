import React, { useState } from "react";
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

const otherCosts = {
  Plumbing: 10000,
  "Pump Maintenance": 15000,
  "Water Pump Installation": 20000,
  "Tank Installation": 25000,
};

const clientCategories = {
  Industrial: { surveyFee: 20000, localAuthorityFee: 50000 },
  Commercial: { surveyFee: 15000, localAuthorityFee: 30000 },
  Domestic: { surveyFee: 7000, localAuthorityFee: 10000 },
};

const depthCosts = [
  { maxDepth: 100, costPerMeter: 1000 },
  { maxDepth: 200, costPerMeter: 1500 },
  { maxDepth: 300, costPerMeter: 2000 },
  { maxDepth: Infinity, costPerMeter: 2500 },
];

const FeeCalculator = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clientType, setClientType] = useState("");
  const [drillingServices, setDrillingServices] = useState([]);
  const [pumpTypes, setPumpTypes] = useState([]);
  const [depth, setDepth] = useState("");
  const [height, setHeight] = useState("");
  const [otherServices, setOtherServices] = useState([]);
  const [totalCost, setTotalCost] = useState(null);

  const handleBackClick = () => {
    navigate("/dashboard");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let cost = 0;

    if (clientType && clientCategories[clientType]) {
      cost +=
        clientCategories[clientType].surveyFee +
        clientCategories[clientType].localAuthorityFee;
    }

    drillingServices.forEach((service) => {
      if (drillingCosts[service]) {
        cost += drillingCosts[service];
      }
    });

    pumpTypes.forEach((service) => {
      if (pumpCosts[service]) {
        cost += pumpCosts[service];
      }
    });

    if (depth) {
      const depthValue = parseFloat(depth);
      const depthCost = depthCosts.find((d) => depthValue <= d.maxDepth);
      if (depthCost) {
        cost += depthValue * depthCost.costPerMeter;
      }
    }

    if (height) {
      const heightValue = parseFloat(height);
      cost += heightValue * 100; // Assuming a cost per meter height
    }

    otherServices.forEach((service) => {
      if (otherCosts[service]) {
        cost += otherCosts[service];
      }
    });

    setTotalCost(cost);
  };

  return (
    <div
      className="pb-40 px-5 py-7 p-6 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
      <h1 className="text-2xl font-bold p-3 text-center">Fee Calculator</h1>

      <div className="max-w-md mx-auto bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="clientType"
              className="block text-gray-900 text-sm font-bold mb-2"
            >
              Client Type
            </label>
            <select
              className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="clientType"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <option value="">Select Client Type</option>
              <option value="Industrial">Industrial</option>
              <option value="Commercial">Commercial</option>
              <option value="Domestic">Domestic</option>
            </select>
          </div>

          <div className="mb-4">
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
                <li key={index} className="flex items-center justify-between">
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

          <div className="mb-4">
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
                <li key={index} className="flex items-center justify-between">
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

          <div className="mb-4">
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
              <option value="Plumbing">Plumbing</option>
              <option value="Pump Maintenance">Pump Maintenance</option>
              <option value="Water Pump Installation">
                Water Pump Installation
              </option>
              <option value="Tank Installation">Tank Installation</option>
            </select>
            <ul className="text-gray-500 list-disc pl-5 mb-4">
              {otherServices.map((service, index) => (
                <li key={index} className="flex items-center justify-between">
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

          <div className="mb-4">
            <label
              htmlFor="depth"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Depth (in meters)
            </label>
            <input
              type="number"
              className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="depth"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="height"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Height (in meters)
            </label>
            <input
              type="number"
              className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 mr-4"
          >
            Calculate Fees
          </button>
        </form>
        {totalCost !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-gray-900 text-xl font-semibold mb-2">
              Total Cost
            </h2>
            <p className="text-gray-900 text-lg font-bold underline">{`Ksh. ${totalCost}`}</p>
          </div>
        )}
      </div>
      <button
        className="mt-4 flex items-center justify-center bg-gray-500 text-white font-bold rounded focus:outline-none focus:shadow-outline hover:bg-gray-600"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default FeeCalculator;
