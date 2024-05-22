import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const FeeCalculator = ({ theme_styles }) => {
  const navigate = useNavigate();
  const [clients, set_clients] = useState([]);
  const [selected_client_id, set_selected_client_id] = useState("");
  const [client_email, set_client_email] = useState("");
  const [client_type, set_client_type] = useState({});
  const [available_drilling_services, set_available_drilling_services] = useState([]);
  const [selected_drilling_services, set_selected_drilling_services] = useState([]);
  const [available_pump_types, set_available_pump_types] = useState([]);
  const [selected_pump_types, set_selected_pump_types] = useState([]);
  const [pump_depth, set_pump_depth] = useState("");
  const [pump_height, set_pump_height] = useState("");
  const [available_pipe_types, set_available_pipe_types] = useState([]);
  const [selected_pipe_types, set_selected_pipe_types] = useState([]);
  const [pipe_diameter, set_pipe_diameter] = useState("");
  const [pipe_length, set_pipe_length] = useState("");
  const [number_of_outlets, set_number_of_outlets] = useState("");
  const [tank_capacity, set_tank_capacity] = useState("");
  const [total_amount, set_total_amount] = useState(null);
  const [tax_amount, set_tax_amount] = useState(null);
  const [cost_breakdown, set_cost_breakdown] = useState([]);
  const [client_categories, set_client_categories] = useState({
    1: { category: "Industrial", survey_fee: "", local_authority_fee: "" },
    2: { category: "Commercial", survey_fee: "", local_authority_fee: "" },
    3: { category: "Domestic", survey_fee: "", local_authority_fee: "" },
  });

  useEffect(() => {
    const fetch_clients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/admin/routes/clients");
        if (!response.ok) {
          throw new Error(`Error fetching clients: ${response.statusText}`);
        }
        const data = await response.json();
        set_clients(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetch_clients();
  }, []);

  useEffect(() => {
    const fetch_drilling_services = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/admin/routes/drillingservices");
        if (!response.ok) {
          throw new Error(`Error fetching drilling services: ${response.statusText}`);
        }
        const data = await response.json();
        set_available_drilling_services(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetch_drilling_services();
  }, []);

  useEffect(() => {
    const fetch_pump_types = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/admin/routes/pumps");
        if (!response.ok) {
          throw new Error(`Error fetching pump types: ${response.statusText}`);
        }
        const data = await response.json();
        set_available_pump_types(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetch_pump_types();
  }, []);

  useEffect(() => {
    const fetch_pipe_types = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/admin/routes/pipes");
        if (!response.ok) {
          throw new Error(`Error fetching pipe types: ${response.statusText}`);
        }
        const data = await response.json();
        set_available_pipe_types(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetch_pipe_types();
  }, []);

  const handle_back_click = () => {
    navigate("/dashboard");
  };

  const handle_client_change = (e) => {
    const client_id = e.target.value;
    set_selected_client_id(client_id);

    const client = clients.find((client) => client.client_id === parseInt(client_id));
    if (client) {
      console.log('Selected Client:', client);
      set_client_email(client.email);

      const category = client_categories[client.category_id];
      console.log('Client Category:', category); 

      if (category) {
        set_client_type(category);
      } else {
        console.warn(`No category found for client.category_id: ${client.category_id}`); 
        set_client_type({});
      }
    } else {
      console.warn(`No client found with client_id: ${client_id}`); 
      set_client_type({});
      set_client_email("");
    }
  };

  const handle_category_change = (e) => {
    const category_id = e.target.value;
    if (client_categories[category_id]) {
      set_client_type(client_categories[category_id]);
    } else {
      set_client_type({});
    }
  };

  const handle_add_service = (e, setter, selected_services) => {
    const selected_service = e.target.value;
    if (selected_service && !selected_services.includes(selected_service)) {
      setter([...selected_services, selected_service]);
    }
  };

  const handle_remove_service = (service, setter, selected_services) => {
    setter(selected_services.filter((s) => s !== service));
  };

  const handle_reset = () => {
    set_selected_client_id("");
    set_client_type({});
    set_client_email("");
    set_selected_drilling_services([]);
    set_selected_pump_types([]);
    set_pump_depth("");
    set_pump_height("");
    set_selected_pipe_types([]);
    set_pipe_diameter("");
    set_pipe_length("");
    set_number_of_outlets("");
    set_tank_capacity("");
    set_total_amount(null);
    set_tax_amount(null);
    set_cost_breakdown([]);
  };

  const handle_submit = async (e) => {
    e.preventDefault();

    const calculation_data = {
      client_id: selected_client_id,
      client_type: client_type.category, 
      drilling_service: selected_drilling_services.length > 0 ? selected_drilling_services[0] : "",
      pump_type: selected_pump_types.length > 0 ? selected_pump_types[0] : "",
      pump_depth: pump_depth,
      pump_height: pump_height,
      pipe_type: selected_pipe_types.length > 0 ? selected_pipe_types[0] : "",
      pipe_diameter: pipe_diameter,
      pipe_length: pipe_length,
      number_of_outlets: number_of_outlets,
      tank_capacity: tank_capacity
    };

    console.log(calculation_data);  
    console.log(JSON.stringify(calculation_data));
    
    try {
      const response = await fetch("http://127.0.0.1:8080/api/admin/routes/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calculation_data),
      });

      if (!response.ok) {
        throw new Error(`Error calculating fees: ${response.statusText}`);
      }

      const result = await response.json();
      set_total_amount(result.total_amount);
      set_tax_amount(result.tax_amount);
      set_cost_breakdown(result.cost_breakdown);
    } catch (error) {
      console.error(error.message);
    }
  };

  const save_client_details = () => {
    const client_details = {
      client_id: selected_client_id,
      client_type,
      drilling_services: selected_drilling_services,
      pump_types: selected_pump_types,
      pump_depth,
      pump_height,
      pipe_types: selected_pipe_types,
      pipe_diameter,
      pipe_length,
      number_of_outlets,
      tank_capacity,
      total_amount,
      tax_amount,
    };

    fetch("http://127.0.0.1:8080/api/admin/routes/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client_details),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        alert("Client details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving client details:", error);
        alert("Failed to save client details.");
      });
  };

  const background = {
    ...theme_styles,
    backgroundColor: "#FFFAFA",
  };

  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto" style={background}>
      <h1 className="text-gray-800 text-2xl font-bold p-3 text-center">Fee Calculator</h1>

      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handle_submit} className="space-y-6">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="text-center w-full md:w-2/2 px-3 mb-4 md:mb-0">
              <label htmlFor="selectedClientId" className="block text-gray-900 text-sm font-bold mb-2">
                Select Client
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="selectedClientId"
                value={selected_client_id}
                onChange={handle_client_change}
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

          {selected_client_id && (
            <>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="text-center w-full md:w-2/2 px-3 mb-4 md:mb-0">
                  <label htmlFor="clientEmail" className="block text-gray-900 text-sm font-bold mb-2">
                    Client Email
                  </label>
                  <input
                    type="text"
                    className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    id="clientEmail"
                    value={client_email || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="text-center w-full md:w-2/2 px-3 mb-4 md:mb-0">
                  <label htmlFor="clientType" className="block text-gray-900 text-sm font-bold mb-2">
                    Client Type
                  </label>
                  <input
                    type="text"
                    className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    id="clientType"
                    value={client_type.category || ""}
                    readOnly
                  />
                  {!client_type.category && (
                    <select
                      className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-2"
                      id="clientTypeSelect"
                      onChange={handle_category_change}
                    >
                      <option value="">Select Client Category</option>
                      {Object.keys(client_categories).map((key) => (
                        <option key={key} value={key}>
                          {client_categories[key].category}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="drillingServices" className="block text-gray-700 text-sm font-bold mb-2">
                Drilling Services
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="drillingServices"
                onChange={(e) => handle_add_service(e, set_selected_drilling_services, selected_drilling_services)}
              >
                <option value="">Select Drilling Service</option>
                {available_drilling_services.map((service) => (
                  <option key={service.id} value={service.drill_type}>
                    {service.drill_type}
                  </option>
                ))}
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {selected_drilling_services.map((service, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {service}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() => handle_remove_service(service, set_selected_drilling_services, selected_drilling_services)}
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
              <label htmlFor="pumpTypes" className="block text-gray-700 text-sm font-bold mb-2">
                Pump Types
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpTypes"
                onChange={(e) => handle_add_service(e, set_selected_pump_types, selected_pump_types)}
              >
                <option value="">Select Pump Type</option>
                {available_pump_types.map((pump) => (
                  <option key={pump.id} value={pump.pump_name}>
                    {pump.pump_name}
                  </option>
                ))}
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {selected_pump_types.map((service, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {service}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() => handle_remove_service(service, set_selected_pump_types, selected_pump_types)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="pumpDepth" className="block text-gray-700 text-sm font-bold mb-2">
                Pump Depth (in meters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpDepth"
                value={pump_depth}
                onChange={(e) => set_pump_depth(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="pumpHeight" className="block text-gray-700 text-sm font-bold mb-2">
                Pump Height (in meters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pumpHeight"
                value={pump_height}
                onChange={(e) => set_pump_height(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="pipeType" className="block text-gray-700 text-sm font-bold mb-2">
                Pipe Type
              </label>
              <select
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeType"
                onChange={(e) => handle_add_service(e, set_selected_pipe_types, selected_pipe_types)}
              >
                <option value="">Select Pipe Type</option>
                {available_pipe_types.map((pipe) => (
                  <option key={pipe.id} value={pipe.pipe_name}>
                    {pipe.pipe_name}
                  </option>
                ))}
              </select>
              <ul className="text-gray-500 list-disc pl-5 mb-4">
                {selected_pipe_types.map((pipe, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {pipe}
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                      onClick={() => handle_remove_service(pipe, set_selected_pipe_types, selected_pipe_types)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="pipeDiameter" className="block text-gray-700 text-sm font-bold mb-2">
                Pipe Diameter (in inches)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeDiameter"
                value={pipe_diameter}
                onChange={(e) => set_pipe_diameter(e.target.value)}
                placeholder="Enter value between 0.5 to 48"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="pipeLength" className="block text-gray-700 text-sm font-bold mb-2">
                Pipe Length (in mm)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="pipeLength"
                value={pipe_length}
                onChange={(e) => set_pipe_length(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="numberOfOutlets" className="block text-gray-700 text-sm font-bold mb-2">
                Number of Outlets
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="numberOfOutlets"
                value={number_of_outlets}
                onChange={(e) => set_number_of_outlets(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label htmlFor="tankCapacity" className="block text-gray-700 text-sm font-bold mb-2">
                Tank Capacity (in liters)
              </label>
              <input
                type="number"
                className="block w-full bg-gray-600 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="tankCapacity"
                value={tank_capacity}
                onChange={(e) => set_tank_capacity(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-900 mr-4">
              Calculate Fees
            </button>
            <button type="button" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-yellow-700" onClick={handle_reset}>
              Reset
            </button>
          </div>
        </form>

        {total_amount !== null && (
          <>
            <div className="mt-6 text-center">
              <h2 className="text-gray-900 text-xl font-semibold mb-2">Breakdown of Costs</h2>
              <ul className="text-gray-700 text-lg mb-4">
                {cost_breakdown.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 px-4 border-b border-gray-300">
                    <span>{item.label}</span>
                    <span>Ksh. {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">Total Cost</h2>
              <p className="text-gray-900 text-lg font-bold">{`Ksh. ${total_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
              <h2 className="text-gray-900 text-xl font-semibold mb-2">Tax Amount (16%)</h2>
              <p className="text-gray-900 text-lg font-bold">{`Ksh. ${tax_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-900" onClick={save_client_details}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
      <button
        className="py-2 px-3 mt-4 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
        onClick={handle_back_click}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default FeeCalculator;


