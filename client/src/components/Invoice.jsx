import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import 'jspdf-autotable';

emailjs.init("_i-rvf-Vb-3NAy7sG");

const Invoice = ({ theme_styles }) => {
  const navigate = useNavigate();
  const [clients, set_clients] = useState([]);
  const [fees, set_fees] = useState({});
  const [success_message, set_success_message] = useState("");
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(null);
  const [show_preview, set_show_preview] = useState(false);
  const [form_values, set_form_values] = useState({
    client_id: "",
    client_name: "",
    client_email: "",
    client_type: "",
    invoice_number: "",
    date: "",
    project_status: "",
    drilling_services: [],
    pump_types: [],
    plumbing_services: [],
    pipe_type: "",
    pipe_diameter: "",
    pipe_length: "",
    number_of_outlets: "",
    tank_capacity: "",
    survey_fee: 0,
    local_authority_fee: 0,
    other_services: [],
    total_cost_before_tax: 0,
    tax_amount: 0,
    total_cost_after_tax: 0,
  });

  const handle_input_change = (e) => {
    const { name, value } = e.target;
    set_form_values({ ...form_values, [name]: value });
  };

  const handle_select_change = (e, field) => {
    const { value } = e.target;
    if (value && !form_values[field].includes(value)) {
      set_form_values({ ...form_values, [field]: [...form_values[field], value] });
    }
  };

  const handle_remove_service = (field, index) => {
    set_form_values({
      ...form_values,
      [field]: form_values[field].filter((_, i) => i !== index),
    });
  };

  const handle_back_click = () => {
    navigate("/dashboard");
  };

  const handle_client_change = (e) => {
    const selected_client_id = e.target.value;
    const selected_client = clients.find(client => client.client_id === selected_client_id);
    if (selected_client) {
      fetch(`http://127.0.0.1:8080/api/admin/routes/fees?client_Id=${selected_client_id}`)
        .then(response => response.json())
        .then(data => {
          set_fees(data);  // Assuming the API returns additional fees and services
          set_form_values({
            ...form_values,
            client_id: selected_client.client_id,
            client_email: selected_client.email,
            client_name: `${selected_client.first_name} ${selected_client.last_name}`,
            client_type: selected_client.client_type,
            survey_fee: data.survey_fee,
            local_authority_fee: data.local_authority_fee
          });
        })
        .catch(error => {
          console.error("Error fetching client details and fees:", error);
        });
    }
  };

  const handle_submit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_values),
    })
      .then((res) => res.json())
      .then((data) => {
        set_success_message("Invoice created successfully!");
        setTimeout(() => {
          set_success_message("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generate_pdf = () => {
    const doc = new jsPDF();

    doc.text("Invoice", 20, 20);
    doc.text(`From: Uzuri Limited Accounts Department`, 20, 30);
    doc.text(`To: ${form_values.client_name} (${form_values.client_email})`, 20, 40);
    doc.text(`Invoice #: ${form_values.invoice_number}`, 20, 50);
    doc.text(`Date: ${form_values.date}`, 20, 60);
    doc.text(`Project Status: ${form_values.project_status}`, 20, 70);
    doc.text(`Description: ${form_values.description}`, 20, 80);
    doc.text(`Client ID: ${form_values.client_id}`, 20, 90);
    doc.text(`Client Type: ${form_values.client_type}`, 20, 100);
    doc.text(`Survey Fee: Ksh ${form_values.survey_fee}`, 20, 110);
    doc.text(`Local Authority Fee: Ksh ${form_values.local_authority_fee}`, 20, 120);

    doc.autoTable({
      startY: 130,
      head: [['Service', 'Cost']],
      body: [
        ...form_values.drilling_services.map((service) => [service, `Ksh ${fees[service]}`]),
        ...form_values.pump_types.map((pump) => [pump, `Ksh ${fees[pump]}`]),
        ['Pipe Type', `Ksh ${fees[form_values.pipe_type]}`],
        ['Pipe Diameter', `Ksh ${form_values.pipe_diameter * fees["Pipe Diameter"]}`],
        ['Pipe Length', `Ksh ${form_values.pipe_length * fees["Pipe Length"]}`],
        ['Number Of Outlets', `Ksh ${form_values.number_of_outlets * fees["Number Of Outlets"]}`],
        ['Tank Capacity', `Ksh ${form_values.tank_capacity * fees["Tank Capacity"]}`],
        ...form_values.other_services.map((service) => [service, `Ksh ${fees[service]}`]),
      ],
    });

    doc.text(`Total Cost Before Tax: Ksh ${form_values.total_cost_before_tax}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Tax Amount (16%): Ksh ${form_values.tax_amount}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Cost After Tax: Ksh ${form_values.total_cost_after_tax}`, 20, doc.autoTable.previous.finalY + 30);

    return doc;
  };

  const handle_send_email = () => {
    const doc = generate_pdf();
    const pdf_base64 = doc.output('datauristring');

    const template_params = {
      to_email: form_values.client_email,
      to_name: form_values.client_name,
      invoice_number: form_values.invoice_number,
      invoice_date: form_values.date,
      services: [
        ...form_values.drilling_services.map((service) => `${service}: Ksh ${fees[service]}`),
        ...form_values.pump_types.map((pump) => `${pump}: Ksh ${fees[pump]}`),
        `Pipe Type (${form_values.pipe_type}): Ksh ${fees[form_values.pipe_type]}`,
        `Pipe Diameter (${form_values.pipe_diameter} inches): Ksh ${form_values.pipe_diameter * fees["Pipe Diameter"]}`,
        `Pipe Length (${form_values.pipe_length} mm): Ksh ${form_values.pipe_length * fees["Pipe Length"]}`,
        `Number Of Outlets (${form_values.number_of_outlets}): Ksh ${form_values.number_of_outlets * fees["Number Of Outlets"]}`,
        `Tank Capacity (${form_values.tank_capacity} liters): Ksh ${form_values.tank_capacity * fees["Tank Capacity"]}`,
        ...form_values.other_services.map((service) => `${service}: Ksh ${fees[service]}`),
        `Total Cost Before Tax: Ksh ${form_values.total_cost_before_tax}`,
        `Tax Amount (16%): Ksh ${form_values.tax_amount}`,
        `Total Cost After Tax: Ksh ${form_values.total_cost_after_tax}`
      ].join('\n'),
      pdf_base64: pdf_base64,
    };

    emailjs
      .send(
        "service_ubxhk3m",
        "template_s71zm2p",
        template_params,
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

  const handle_print = () => {
    const doc = generate_pdf();
    doc.save('invoice.pdf');
  };

  const handle_reset = () => {
    set_form_values({
      client_id: "",
      client_name: "",
      client_email: "",
      client_type: "",
      invoice_number: "",
      date: "",
      project_status: "",
      drilling_services: [],
      pump_types: [],
      plumbing_services: [],
      pipe_type: "",
      pipe_diameter: "",
      pipe_length: "",
      number_of_outlets: "",
      tank_capacity: "",
      other_services: [],
      total_cost_before_tax: 0,
      tax_amount: 0,
      total_cost_after_tax: 0,
    });
  };

  const handle_preview = () => {
    set_show_preview(true);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/routes/fees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        set_clients(data);
        set_loading(false);
      })
      .catch((error) => {
        set_error(error.toString());
        set_loading(false);
      });

    fetch("http://127.0.0.1:8080/api/admin/routes/fees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        set_fees(data);
      })
      .catch((error) => {
        console.error("Error fetching fees:", error);
      });
  }, []);

  useEffect(() => {
    const calculate_total_cost = () => {
      const client_type = clients.find(client => client.client_id === form_values.client_id);
      const survey_fee = client_type?.survey_fee || 0;
      const local_authority_fee = client_type?.local_authority_fee || 0;

      let service_cost = 0;
      form_values.drilling_services.forEach(service => {
        if (fees[service]) {
          service_cost += fees[service];
        }
      });
      form_values.pump_types.forEach(service => {
        if (fees[service]) {
          service_cost += fees[service];
        }
      });
      form_values.plumbing_services.forEach(service => {
        if (fees[service]) {
          service_cost += fees[service];
        }
      });
      if (fees[form_values.pipe_type]) {
        service_cost += fees[form_values.pipe_type];
      }
      service_cost += form_values.pipe_diameter * fees["Pipe Diameter"];
      service_cost += form_values.pipe_length * fees["Pipe Length"];
      service_cost += form_values.number_of_outlets * fees["Number Of Outlets"];
      service_cost += form_values.tank_capacity * fees["Tank Capacity"];

      form_values.other_services.forEach(service => {
        if (fees[service]) {
          service_cost += fees[service];
        }
      });

      const total_cost_before_tax = survey_fee + local_authority_fee + service_cost;
      const tax_amount = total_cost_before_tax * 0.16;
      const total_cost_after_tax = total_cost_before_tax + tax_amount;

      set_form_values({
        ...form_values,
        total_cost_before_tax: total_cost_before_tax,
        tax_amount: tax_amount,
        total_cost_after_tax: total_cost_after_tax,
      });
    };

    calculate_total_cost();
  }, [
    form_values.drilling_services,
    form_values.pump_types,
    form_values.plumbing_services,
    form_values.other_services,
    form_values.client_type,
    form_values.pipe_type,
    form_values.pipe_diameter,
    form_values.pipe_length,
    form_values.number_of_outlets,
    form_values.tank_capacity,
    fees,
    clients,
  ]);

  const background = {
    ...theme_styles,
    backgroundColor: "#FFFAFA",
  };

  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto" style={background}>
      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 relative">
        <div className="absolute top-0 right-0 p-4">
          <img src="src/assets/uzurilogo.png" alt="Logo" className="w-16 h-16 rounded-full object-cover" />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">Invoice</h1>
        {success_message && <p className="text-green-500 text-center">{success_message}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <form onSubmit={handle_submit}>
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="client_email">
                  Bill To
                </label>
                <input
                  id="client_email"
                  name="client_email"
                  type="text"
                  onChange={handle_input_change}
                  value={form_values.client_email}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Your customer's billing address"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="client_id">
                  Client Id
                </label>
                <select
                  id="client_id"
                  name="client_id"
                  onChange={handle_client_change}
                  value={form_values.client_id}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select client" />
                  {clients.map(client => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_id} - {client.first_name} {client.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="invoice_number">
                  Invoice #
                </label>
                <input
                  id="invoice_number"
                  name="invoice_number"
                  type="text"
                  onChange={handle_input_change}
                  value={form_values.invoice_number}
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
                  onChange={handle_input_change}
                  value={form_values.date}
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
                  onChange={handle_input_change}
                  value={form_values.description}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="project_status">
                  Project Status
                </label>
                <select
                  id="project_status"
                  name="project_status"
                  onChange={handle_input_change}
                  value={form_values.project_status}
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="drilling_services">
                  Drilling Services
                </label>
                <select
                  id="drilling_services"
                  name="drilling_services"
                  onChange={(e) => handle_select_change(e, 'drilling_services')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Drilling")).map((drilling_service, index) => (
                    <option key={index} value={drilling_service}>
                      {drilling_service}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {form_values.drilling_services.map((drilling_service, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {drilling_service}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handle_remove_service('drilling_services', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pump_types">
                  Pump Types
                </label>
                <select
                  id="pump_types"
                  name="pump_types"
                  onChange={(e) => handle_select_change(e, 'pump_types')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pump type" />
                  {Object.keys(fees).filter(key => key.includes("Pump")).map((pump_type, index) => (
                    <option key={index} value={pump_type}>
                      {pump_type}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {form_values.pump_types.map((pump_type, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {pump_type}
                      <button
                        type="button"
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handle_remove_service('pump_types', index)}
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plumbing_services">
                  Plumbing Services
                </label>
                <select
                  id="plumbing_services"
                  name="plumbing_services"
                  onChange={(e) => handle_select_change(e, 'plumbing_services')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Pipe") || key.includes("Outlet")).map((plumbing_service, index) => (
                    <option key={index} value={plumbing_service}>
                      {plumbing_service}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {form_values.plumbing_services.map((plumbing_service, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {plumbing_service}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handle_remove_service('plumbing_services', index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipe_type">
                  Pipe Type
                </label>
                <select
                  id="pipe_type"
                  name="pipe_type"
                  onChange={handle_input_change}
                  value={form_values.pipe_type}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pipe type" />
                  {Object.keys(fees).filter(key => key.includes("Pipe Type")).map((pipe_type, index) => (
                    <option key={index} value={pipe_type}>
                      {pipe_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipe_diameter">
                  Pipe Diameter (inches)
                </label>
                <input
                  id="pipe_diameter"
                  name="pipe_diameter"
                  type="number"
                  onChange={handle_input_change}
                  value={form_values.pipe_diameter}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value between 0.5 to 48"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pipe_length">
                  Pipe Length (mm)
                </label>
                <input
                  id="pipe_length"
                  name="pipe_length"
                  type="number"
                  onChange={handle_input_change}
                  value={form_values.pipe_length}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="number_of_outlets">
                  Number Of Outlets
                </label>
                <input
                  id="number_of_outlets"
                  name="number_of_outlets"
                  type="number"
                  onChange={handle_input_change}
                  value={form_values.number_of_outlets}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter number from 1"
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tank_capacity">
                  Tank Capacity (liters)
                </label>
                <input
                  id="tank_capacity"
                  name="tank_capacity"
                  type="number"
                  onChange={handle_input_change}
                  value={form_values.tank_capacity}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="other_services">
                  Other Services
                </label>
                <select
                  id="other_services"
                  name="other_services"
                  onChange={(e) => handle_select_change(e, 'other_services')}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {Object.keys(fees).filter(key => key.includes("Service") || key.includes("Maintenance")).map((other_service, index) => (
                    <option key={index} value={other_service}>
                      {other_service}
                    </option>
                  ))}
                </select>
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {form_values.other_services.map((other_service, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {other_service}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() => handle_remove_service('other_services', index)}
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
                <p className="bg-gray-300 text-lg text-gray-900">Ksh {form_values.total_cost_before_tax}</p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">Tax (16%)</h2>
                <p className="bg-gray-300 text-lg text-gray-900">Ksh {form_values.tax_amount}</p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">TOTAL KES</h2>
                <p className="bg-gray-300 text-2xl text-gray-900">Ksh {form_values.total_cost_after_tax}</p>
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
              <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700" onClick={handle_preview}>
                Preview Invoice
              </button>
              <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700" onClick={handle_send_email}>
                Send Email
              </button>
              <button type="button" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-yellow-700" onClick={handle_reset}>
                Reset
              </button>
            </div>
          </form>
        )}
      </div>
      <button
        className="flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900 mb-4"
        onClick={handle_back_click}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>

      {show_preview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 p-8 rounded shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Invoice Preview</h2>
            <p><strong>From:</strong> Uzuri Limited Accounts Department</p>
            <p><strong>To:</strong> {form_values.client_name} ({form_values.client_email})</p>
            <p><strong>Invoice #:</strong> {form_values.invoice_number}</p>
            <p><strong>Date:</strong> {form_values.date}</p>
            <p><strong>Project Status:</strong> {form_values.project_status}</p>
            <p><strong>Description:</strong> {form_values.description}</p>
            <p><strong>Client ID:</strong> {form_values.client_id}</p>
            <p><strong>Client Type:</strong> {form_values.client_type}</p>
            <p><strong>Survey Fee:</strong> Ksh {form_values.survey_fee}</p>
            <p><strong>Local Authority Fee:</strong> Ksh {form_values.local_authority_fee}</p>
            <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
            <ul className="mb-4">
              {form_values.drilling_services.map((service, index) => (
                <li key={index}>{service}: Ksh {fees[service]}</li>
              ))}
              {form_values.pump_types.map((pump, index) => (
                <li key={index}>{pump}: Ksh {fees[pump]}</li>
              ))}
              <li>Pipe Type ({form_values.pipe_type}): Ksh {fees[form_values.pipe_type]}</li>
              <li>Pipe Diameter ({form_values.pipe_diameter} inches): Ksh {form_values.pipe_diameter * fees["Pipe Diameter"]}</li>
              <li>Pipe Length ({form_values.pipe_length} mm): Ksh {form_values.pipe_length * fees["Pipe Length"]}</li>
              <li>Number Of Outlets ({form_values.number_of_outlets}): Ksh {form_values.number_of_outlets * fees["Number Of Outlets"]}</li>
              <li>Tank Capacity ({form_values.tank_capacity} liters): Ksh {form_values.tank_capacity * fees["Tank Capacity"]}</li>
              {form_values.other_services.map((service, index) => (
                <li key={index}>{service}: Ksh {fees[service]}</li>
              ))}
            </ul>
            <p><strong>Total Cost Before Tax:</strong> Ksh {form_values.total_cost_before_tax}</p>
            <p><strong>Tax Amount (16%):</strong> Ksh {form_values.tax_amount}</p>
            <p><strong>Total Cost After Tax:</strong> Ksh {form_values.total_cost_after_tax}</p>
            <button
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
              onClick={() => set_show_preview(false)}
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



