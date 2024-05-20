import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { useFormik } from "formik";
import * as Yup from "yup";
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

<<<<<<< HEAD
const Invoice = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    clientEmail: "",
    invoiceNumber: "",
    date: "",
    services: [],
    totalCost: 0,
  });
  const [serviceInput, setServiceInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
=======
emailjs.init("_i-rvf-Vb-3NAy7sG");

const drillingServices = [
  "Symmetric Drilling",
  "Core Drilling",
  "Geo-technical Drilling",
];

const pumpTypes = ["Submersible Electric Pump", "Solar Pump", "Hand Pump"];

const plumbingServices = [
  "Pipe Type",
  "Pipe Diameter",
  "Pipe Length",
  "Number Of Outlets",
];
const tankServices = ["Tank Capacity", "Tank Maintenance"];
const otherServices = [
  "Pump Maintenance",
  "Water Pump Installation",
  "Tank Installation",
];

const clientCategories = [
  { category: "Industrial", surveyFee: 20000, localAuthorityFee: 50000 },
  { category: "Commercial", surveyFee: 15000, localAuthorityFee: 30000 },
  { category: "Domestic", surveyFee: 7000, localAuthorityFee: 10000 },
];

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
const plumbingCosts = [
  "Pipe Type",
  "Pipe Diameter",
  "Pipe Length",
  "Number Of Outlets",
];
const tankCosts = {
  "Tank Capacity": 20000,
  "Tank Maintenance": 15000,
};
const otherCosts = {
  "Pump Maintenance": 15000,
  "Water Pump Installation": 20000,
};

const Invoice = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    clientId: Yup.string().required("Required"),
    clientName: Yup.string().required("Required"),
    clientEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    clientCategory: Yup.string().required("Required"),
    invoiceNumber: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    drillingServices: Yup.array()
      .min(1, "At least one service is required")
      .required("Required"),
    pumpTypes: Yup.array()
      .min(1, "At least one service is required")
      .required("Required"),
    plumbingServices: Yup.array(),
    tankServices: Yup.array(),
    otherServices: Yup.array()
      .min(1, "At least one service is required")
      .required("Required"),
    totalCostBeforeTax: Yup.number().required("Required"),
    taxAmount: Yup.number().required("Required"),
    totalCostAfterTax: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      clientId: "",
      clientName: "",
      clientEmail: "",
      clientCategory: "",
      invoiceNumber: "",
      date: "",
      drillingServices: [],
      pumpTypes: [],
      plumbingServices: [],
      tankServices: [],
      otherServices: [],
      totalCostBeforeTax: 0,
      taxAmount: 0,
      totalCostAfterTax: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);

      fetch("http://localhost:3000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubmitting(false);
          setSuccessMessage("Invoice created successfully!");
          resetForm();
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    },
  });
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

  const handleBackClick = () => {
    navigate("/dashboard");
  };

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleAddService = () => {
    if (serviceInput.trim() !== "") {
      setInvoiceData({
        ...invoiceData,
        services: [...invoiceData.services, serviceInput],
      });
      setServiceInput("");
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
      clientName: invoiceData.clientName || "N/A",
      clientEmail: invoiceData.clientEmail || "N/A",
      invoiceNumber: invoiceData.invoiceNumber || "N/A",
      date: invoiceData.date || "N/A",
      services: invoiceData.services.join(", ") || "N/A",
      totalCost: invoiceData.totalCost || 0,
    };

    emailjs
      .send("service_id", "template_id", templateParams)
      .then((response) => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here data is sent to the backend or handle it as needed
    console.log(invoiceData);
    setIsLoading(false);
  };
=======
  const handleSendEmail = () => {
    const templateParams = {
      to_email: formik.values.clientEmail,
      to_name: formik.values.clientName,
      invoice_number: formik.values.invoiceNumber,
      invoice_date: formik.values.date,
      services: [
        ...formik.values.drillingServices,
        ...formik.values.pumpTypes,
        ...formik.values.plumbingServices,
        ...formik.values.tankServices,
        ...formik.values.otherServices,
      ].join(", "),
      total_cost: formik.values.totalCostAfterTax,
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
    window.print();
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
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      const clientCategory = clientCategories.find(
        (cat) => cat.category === formik.values.clientCategory
      );
      const surveyFee = clientCategory?.surveyFee || 0;
      const localAuthorityFee = clientCategory?.localAuthorityFee || 0;

      let serviceCost = 0;
      formik.values.drillingServices.forEach((service) => {
        if (drillingCosts[service]) {
          serviceCost += drillingCosts[service];
        }
      });
      formik.values.pumpTypes.forEach((service) => {
        if (pumpCosts[service]) {
          serviceCost += pumpCosts[service];
        }
      });
      formik.values.plumbingServices.forEach((service) => {
        if (plumbingCosts[service]) {
          serviceCost += plumbingCosts[service];
        }
      });
      formik.values.tankServices.forEach((service) => {
        if (tankCosts[service]) {
          serviceCost += tankCosts[service];
        }
      });
      formik.values.otherServices.forEach((service) => {
        if (otherCosts[service]) {
          serviceCost += otherCosts[service];
        }
      });

      const totalCostBeforeTax = surveyFee + localAuthorityFee + serviceCost;
      const taxAmount = totalCostBeforeTax * 0.16;
      const totalCostAfterTax = totalCostBeforeTax + taxAmount;

      formik.setValues({
        ...formik.values,
        totalCostBeforeTax,
        taxAmount,
        totalCostAfterTax,
      });
    };

    calculateTotalCost();
  }, [
    formik.values.drillingServices,
    formik.values.pumpTypes,
    formik.values.plumbingServices,
    formik.values.tankServices,
    formik.values.otherServices,
    formik.values.clientCategory,
  ]);
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
<<<<<<< HEAD
      <div className="max-w-3xl mx-auto bg-gray-500 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">
          Invoice
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Client Information</h2>
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientName"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleChange}
              required
            />
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientEmail"
            >
              Email:
            </label>
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
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="invoiceNumber"
            >
              Invoice Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={handleChange}
              required
            />
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date:
            </label>
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
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="totalCost"
            >
              Total (Ksh):
            </label>
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
              {isLoading ? "Saving..." : "Save Invoice"}
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

=======
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 relative">
        <div className="absolute top-0 right-0 p-4">
          <img
            src="src/assets/uzurilogo.png"
            alt="Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">
          Invoice
        </h1>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="from"
                >
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
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="clientEmail"
                >
                  Bill To
                </label>
                <input
                  id="clientEmail"
                  name="clientEmail"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientEmail}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Your customer's billing address"
                  readOnly
                />
                {formik.touched.clientEmail && formik.errors.clientEmail ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.clientEmail}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="clientId"
                >
                  Client Id
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  onChange={(e) => {
                    const selectedClientId = e.target.value;
                    const selectedClient = clients.find(
                      (client) => client.client_id == selectedClientId
                    );
                    if (selectedClient) {
                      formik.setFieldValue(
                        "clientId",
                        selectedClient.client_id
                      );
                      formik.setFieldValue("clientEmail", selectedClient.email);
                      formik.setFieldValue(
                        "clientName",
                        `${selectedClient.firstName} ${selectedClient.lastName}`
                      );
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientId}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  style={{ color: "black" }}
                >
                  <option value="" label="Select client" />
                  {clients.map((client) => (
                    <option key={client.client_id} value={client.client_id}>
                      {client.client_id} - {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
                {formik.touched.clientId && formik.errors.clientId ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.clientId}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="invoiceNumber"
                >
                  Invoice #
                </label>
                <input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.invoiceNumber}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Invoice Number"
                />
                {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.invoiceNumber}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-2/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Invoice Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                {formik.touched.date && formik.errors.date ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.date}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Description"
                />
                {formik.touched.description && formik.errors.description ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="drillingServices"
                >
                  Drilling Services
                </label>
                <select
                  id="drillingServices"
                  name="drillingServices"
                  onChange={(e) => {
                    const selectedService = e.target.value;
                    if (
                      selectedService &&
                      !formik.values.drillingServices.includes(selectedService)
                    ) {
                      formik.setFieldValue("drillingServices", [
                        ...formik.values.drillingServices,
                        selectedService,
                      ]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {drillingServices.map((drillingService, index) => (
                    <option key={index} value={drillingService}>
                      {drillingService}
                    </option>
                  ))}
                </select>
                {formik.touched.drillingServices &&
                formik.errors.drillingServices ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.drillingServices}
                  </p>
                ) : null}
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formik.values.drillingServices.map(
                    (drillingService, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        {drillingService}
                        <button
                          type="button"
                          className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                          onClick={() =>
                            formik.setFieldValue(
                              "drillingServices",
                              formik.values.drillingServices.filter(
                                (_, i) => i !== index
                              )
                            )
                          }
                        >
                          Remove
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pumpTypes"
                >
                  Pump Types
                </label>
                <select
                  id="pumpTypes"
                  name="pumpTypes"
                  onChange={(e) => {
                    const selectedPump = e.target.value;
                    if (
                      selectedPump &&
                      !formik.values.pumpTypes.includes(selectedPump)
                    ) {
                      formik.setFieldValue("pumpTypes", [
                        ...formik.values.pumpTypes,
                        selectedPump,
                      ]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pump type" />
                  {pumpTypes.map((pumpType, index) => (
                    <option key={index} value={pumpType}>
                      {pumpType}
                    </option>
                  ))}
                </select>
                {formik.touched.pumpTypes && formik.errors.pumpTypes ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.pumpTypes}
                  </p>
                ) : null}
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formik.values.pumpTypes.map((pumpType, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      {pumpType}
                      <button
                        type="button"
                        className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() =>
                          formik.setFieldValue(
                            "pumpTypes",
                            formik.values.pumpTypes.filter(
                              (_, i) => i !== index
                            )
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
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="plumbingServices"
                >
                  Plumbing Services
                </label>
                <select
                  id="plumbingServices"
                  name="plumbingServices"
                  onChange={(e) => {
                    const selectedService = e.target.value;
                    if (
                      selectedService &&
                      !formik.values.plumbingServices.includes(selectedService)
                    ) {
                      formik.setFieldValue("plumbingServices", [
                        ...formik.values.plumbingServices,
                        selectedService,
                      ]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {plumbingServices.map((plumbingService, index) => (
                    <option key={index} value={plumbingService}>
                      {plumbingService}
                    </option>
                  ))}
                </select>
                {formik.touched.plumbingServices &&
                formik.errors.plumbingServices ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.plumbingServices}
                  </p>
                ) : null}
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formik.values.plumbingServices.map(
                    (plumbingService, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        {plumbingService}
                        <button
                          type="button"
                          className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                          onClick={() =>
                            formik.setFieldValue(
                              "plumbingServices",
                              formik.values.plumbingServices.filter(
                                (_, i) => i !== index
                              )
                            )
                          }
                        >
                          Remove
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="tankServices"
                >
                  Tank Services
                </label>
                <select
                  id="tankServices"
                  name="tankServices"
                  onChange={(e) => {
                    const selectedService = e.target.value;
                    if (
                      selectedService &&
                      !formik.values.tankServices.includes(selectedService)
                    ) {
                      formik.setFieldValue("tankServices", [
                        ...formik.values.tankServices,
                        selectedService,
                      ]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {tankServices.map((tankService, index) => (
                    <option key={index} value={tankService}>
                      {tankService}
                    </option>
                  ))}
                </select>
                {formik.touched.tankServices && formik.errors.tankServices ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.tankServices}
                  </p>
                ) : null}
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formik.values.tankServices.map((tankService, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      {tankService}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() =>
                          formik.setFieldValue(
                            "tankServices",
                            formik.values.tankServices.filter(
                              (_, i) => i !== index
                            )
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
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="otherServices"
                >
                  Other Services
                </label>
                <select
                  id="otherServices"
                  name="otherServices"
                  onChange={(e) => {
                    const selectedService = e.target.value;
                    if (
                      selectedService &&
                      !formik.values.otherServices.includes(selectedService)
                    ) {
                      formik.setFieldValue("otherServices", [
                        ...formik.values.otherServices,
                        selectedService,
                      ]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value=""
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select service" />
                  {otherServices.map((otherService, index) => (
                    <option key={index} value={otherService}>
                      {otherService}
                    </option>
                  ))}
                </select>
                {formik.touched.otherServices && formik.errors.otherServices ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.otherServices}
                  </p>
                ) : null}
                <ul className="list-disc pl-5 text-gray-900 mb-4">
                  {formik.values.otherServices.map((otherService, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      {otherService}
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                        onClick={() =>
                          formik.setFieldValue(
                            "otherServices",
                            formik.values.otherServices.filter(
                              (_, i) => i !== index
                            )
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Amount</h2>
              <p className="text-lg text-gray-900">
                Ksh {formik.values.totalCostBeforeTax}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Tax (16%)</h2>
              <p className="text-lg text-gray-900">
                Ksh {formik.values.taxAmount}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">TOTAL KES</h2>
              <p className="text-2xl text-gray-900">
                Ksh {formik.values.totalCostAfterTax}
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="terms"
              >
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
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Creating..." : "Save Invoice"}
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                onClick={handlePrint}
              >
                Print
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </form>
        )}
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

>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
export default Invoice;
