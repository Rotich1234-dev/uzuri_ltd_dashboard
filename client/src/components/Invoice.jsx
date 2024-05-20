import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import 'jspdf-autotable';

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
const otherServices = ["Pump Maintenance"];

const clientCategories = {
  1: { type: "Industrial", surveyFee: 20000, localAuthorityFee: 50000 },
  2: { type: "Commercial", surveyFee: 15000, localAuthorityFee: 30000 },
  3: { type: "Domestic", surveyFee: 7000, localAuthorityFee: 10000 },
};

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
  Copper: 2100,
  "Cast Iron": 2500,
  "Galvanized Steel": 2500,
};

const plumbingCosts = {
  "Pipe Diameter": 200,
  "Pipe Length": 200,
  "Number Of Outlets": 1000,
};

const tankInstallationCostPerLiter = 1200;
const otherCosts = {
  "Pump Maintenance": 15000,
};

const pipeTypes = [
  "PVC - Polyvinyl Chloride",
  "PEX - Cross-linked Polyethylene",
  "ABS - Acrylonitrile Butadiene Styrene",
  "Copper",
  "Cast Iron",
  "Galvanized Steel",
];

const Invoice = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const validationSchema = Yup.object({
    clientId: Yup.string().required("Required"),
    clientName: Yup.string().required("Required"),
    clientEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    clientCategory: Yup.string().required("Required"),
    invoiceNumber: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    projectStatus: Yup.string().required("Required"),
    drillingServices: Yup.array()
      .min(1, "At least one service is required")
      .required("Required"),
    pumpTypes: Yup.array()
      .min(1, "At least one service is required")
      .required("Required"),
    plumbingServices: Yup.array(),
    pipeType: Yup.string().required("Required"),
    pipeDiameter: Yup.number()
      .min(0.5, "Minimum value is 0.5 inches")
      .max(48, "Maximum value is 48 inches")
      .required("Required"),
    pipeLength: Yup.number()
      .min(1, "Minimum value is 1 mm")
      .required("Required"),
    numberOfOutlets: Yup.number()
      .min(1, "Minimum value is 1")
      .required("Required"),
    tankCapacity: Yup.number().required("Required"),
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

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Invoice", 20, 20);
    doc.text(`From: Uzuri Limited Accounts Department`, 20, 30);
    doc.text(`To: ${formik.values.clientName} (${formik.values.clientEmail})`, 20, 40);
    doc.text(`Invoice #: ${formik.values.invoiceNumber}`, 20, 50);
    doc.text(`Date: ${formik.values.date}`, 20, 60);
    doc.text(`Project Status: ${formik.values.projectStatus}`, 20, 70);
    doc.text(`Description: ${formik.values.description}`, 20, 80);
    doc.text(`Client ID: ${formik.values.clientId}`, 20, 90);
    doc.text(`Client Category: ${clientCategories[formik.values.clientCategory]?.type}`, 20, 100);
    doc.text(`Survey Fee: Ksh ${clientCategories[formik.values.clientCategory]?.surveyFee}`, 20, 110);
    doc.text(`Local Authority Fee: Ksh ${clientCategories[formik.values.clientCategory]?.localAuthorityFee}`, 20, 120);

    doc.autoTable({
      startY: 130,
      head: [['Service', 'Cost']],
      body: [
        ...formik.values.drillingServices.map((service) => [service, `Ksh ${drillingCosts[service]}`]),
        ...formik.values.pumpTypes.map((pump) => [pump, `Ksh ${pumpCosts[pump]}`]),
        ['Pipe Type', `Ksh ${pipeCosts[formik.values.pipeType]}`],
        ['Pipe Diameter', `Ksh ${formik.values.pipeDiameter * plumbingCosts["Pipe Diameter"]}`],
        ['Pipe Length', `Ksh ${formik.values.pipeLength * plumbingCosts["Pipe Length"]}`],
        ['Number Of Outlets', `Ksh ${formik.values.numberOfOutlets * plumbingCosts["Number Of Outlets"]}`],
        ['Tank Capacity', `Ksh ${formik.values.tankCapacity * tankInstallationCostPerLiter}`],
        ...formik.values.otherServices.map((service) => [service, `Ksh ${otherCosts[service]}`]),
      ],
    });

    doc.text(`Total Cost Before Tax: Ksh ${formik.values.totalCostBeforeTax}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Tax Amount (16%): Ksh ${formik.values.taxAmount}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Cost After Tax: Ksh ${formik.values.totalCostAfterTax}`, 20, doc.autoTable.previous.finalY + 30);

    return doc;
  };

  const handleSendEmail = () => {
    const doc = generatePDF();
    const pdfBase64 = doc.output('datauristring');

    const templateParams = {
      to_email: formik.values.clientEmail,
      to_name: formik.values.clientName,
      invoice_number: formik.values.invoiceNumber,
      invoice_date: formik.values.date,
      services: [
        ...formik.values.drillingServices.map((service) => `${service}: Ksh ${drillingCosts[service]}`),
        ...formik.values.pumpTypes.map((pump) => `${pump}: Ksh ${pumpCosts[pump]}`),
        `Pipe Type (${formik.values.pipeType}): Ksh ${pipeCosts[formik.values.pipeType]}`,
        `Pipe Diameter (${formik.values.pipeDiameter} inches): Ksh ${formik.values.pipeDiameter * plumbingCosts["Pipe Diameter"]}`,
        `Pipe Length (${formik.values.pipeLength} mm): Ksh ${formik.values.pipeLength * plumbingCosts["Pipe Length"]}`,
        `Number Of Outlets (${formik.values.numberOfOutlets}): Ksh ${formik.values.numberOfOutlets * plumbingCosts["Number Of Outlets"]}`,
        `Tank Capacity (${formik.values.tankCapacity} liters): Ksh ${formik.values.tankCapacity * tankInstallationCostPerLiter}`,
        ...formik.values.otherServices.map((service) => `${service}: Ksh ${otherCosts[service]}`),
        `Total Cost Before Tax: Ksh ${formik.values.totalCostBeforeTax}`,
        `Tax Amount (16%): Ksh ${formik.values.taxAmount}`,
        `Total Cost After Tax: Ksh ${formik.values.totalCostAfterTax}`
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
    formik.resetForm();
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
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      const clientCategory = clientCategories[formik.values.clientCategory];
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
      if (pipeCosts[formik.values.pipeType]) {
        serviceCost += pipeCosts[formik.values.pipeType];
      }
      serviceCost +=
        formik.values.pipeDiameter * plumbingCosts["Pipe Diameter"];
      serviceCost += formik.values.pipeLength * plumbingCosts["Pipe Length"];
      serviceCost +=
        formik.values.numberOfOutlets * plumbingCosts["Number Of Outlets"];
      serviceCost +=
        formik.values.tankCapacity * tankInstallationCostPerLiter;

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
    formik.values.otherServices,
    formik.values.clientCategory,
    formik.values.pipeType,
    formik.values.pipeDiameter,
    formik.values.pipeLength,
    formik.values.numberOfOutlets,
    formik.values.tankCapacity,
  ]);

  const background = {
    ...ThemeStyles,
    backgroundColor: "#FFFAFA ",
  };

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={background}
    >
      <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 relative">
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
                      formik.setFieldValue(
                        "clientCategory",
                        selectedClient.category_id
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
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="projectStatus"
                >
                  Project Status
                </label>
                <select
                  id="projectStatus"
                  name="projectStatus"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectStatus}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select status" />
                  <option value="Completed">Completed</option>
                  <option value="Incomplete">
                    Incomplete (Pending Downpayment)
                  </option>
                </select>
                {formik.touched.projectStatus && formik.errors.projectStatus ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.projectStatus}
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
                  htmlFor="pipeType"
                >
                  Pipe Type
                </label>
                <select
                  id="pipeType"
                  name="pipeType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pipeType}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" label="Select pipe type" />
                  {pipeTypes.map((pipeType, index) => (
                    <option key={index} value={pipeType}>
                      {pipeType}
                    </option>
                  ))}
                </select>
                {formik.touched.pipeType && formik.errors.pipeType ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.pipeType}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pipeDiameter"
                >
                  Pipe Diameter (inches)
                </label>
                <input
                  id="pipeDiameter"
                  name="pipeDiameter"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pipeDiameter}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value between 0.5 to 48"
                />
                {formik.touched.pipeDiameter && formik.errors.pipeDiameter ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.pipeDiameter}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pipeLength"
                >
                  Pipe Length (mm)
                </label>
                <input
                  id="pipeLength"
                  name="pipeLength"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pipeLength}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
                {formik.touched.pipeLength && formik.errors.pipeLength ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.pipeLength}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="numberOfOutlets"
                >
                  Number Of Outlets
                </label>
                <input
                  id="numberOfOutlets"
                  name="numberOfOutlets"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.numberOfOutlets}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter number from 1"
                />
                {formik.touched.numberOfOutlets &&
                formik.errors.numberOfOutlets ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.numberOfOutlets}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="tankCapacity"
                >
                  Tank Capacity (liters)
                </label>
                <input
                  id="tankCapacity"
                  name="tankCapacity"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tankCapacity}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter value from 1"
                />
                {formik.touched.tankCapacity && formik.errors.tankCapacity ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.tankCapacity}
                  </p>
                ) : null}
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
            <div className="justify-center flex flex-row gap-9 mt-3 mb-6">
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">Amount</h2>
                <p className="bg-gray-300 text-lg text-gray-900">
                  Ksh {formik.values.totalCostBeforeTax}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">
                  Tax (16%)
                </h2>
                <p className="bg-gray-300 text-lg text-gray-900">
                  Ksh {formik.values.taxAmount}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-900">
                  TOTAL KES
                </h2>
                <p className="bg-gray-300 text-2xl text-gray-900">
                  Ksh {formik.values.totalCostAfterTax}
                </p>
              </div>
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
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-green-700"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Creating..." : "Save Invoice"}
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
                onClick={handlePreview}
              >
                Preview Invoice
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
                onClick={handleSendEmail}
              >
                Send Email
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
            <p><strong>To:</strong> {formik.values.clientName} ({formik.values.clientEmail})</p>
            <p><strong>Invoice #:</strong> {formik.values.invoiceNumber}</p>
            <p><strong>Date:</strong> {formik.values.date}</p>
            <p><strong>Project Status:</strong> {formik.values.projectStatus}</p>
            <p><strong>Description:</strong> {formik.values.description}</p>
            <p><strong>Client ID:</strong> {formik.values.clientId}</p>
            <p><strong>Client Category:</strong> {clientCategories[formik.values.clientCategory]?.type}</p>
            <p><strong>Survey Fee:</strong> Ksh {clientCategories[formik.values.clientCategory]?.surveyFee}</p>
            <p><strong>Local Authority Fee:</strong> Ksh {clientCategories[formik.values.clientCategory]?.localAuthorityFee}</p>
            <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
            <ul className="mb-4">
              {formik.values.drillingServices.map((service, index) => (
                <li key={index}>{service}: Ksh {drillingCosts[service]}</li>
              ))}
              {formik.values.pumpTypes.map((pump, index) => (
                <li key={index}>{pump}: Ksh {pumpCosts[pump]}</li>
              ))}
              <li>Pipe Type ({formik.values.pipeType}): Ksh {pipeCosts[formik.values.pipeType]}</li>
              <li>Pipe Diameter ({formik.values.pipeDiameter} inches): Ksh {formik.values.pipeDiameter * plumbingCosts["Pipe Diameter"]}</li>
              <li>Pipe Length ({formik.values.pipeLength} mm): Ksh {formik.values.pipeLength * plumbingCosts["Pipe Length"]}</li>
              <li>Number Of Outlets ({formik.values.numberOfOutlets}): Ksh {formik.values.numberOfOutlets * plumbingCosts["Number Of Outlets"]}</li>
              <li>Tank Capacity ({formik.values.tankCapacity} liters): Ksh {formik.values.tankCapacity * tankInstallationCostPerLiter}</li>
              {formik.values.otherServices.map((service, index) => (
                <li key={index}>{service}: Ksh {otherCosts[service]}</li>
              ))}
            </ul>
            <p><strong>Total Cost Before Tax:</strong> Ksh {formik.values.totalCostBeforeTax}</p>
            <p><strong>Tax Amount (16%):</strong> Ksh {formik.values.taxAmount}</p>
            <p><strong>Total Cost After Tax:</strong> Ksh {formik.values.totalCostAfterTax}</p>
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



