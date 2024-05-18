import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

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
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object({
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

  const onSubmit = (values, { setSubmitting }) => {
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });

    // After saving the invoice, also send the email
    handleSendEmail(values);
  };

  const handleSendEmail = (values) => {
    // Construct the templateParams object using form values
    const templateParams = {
      to_email: values.clientEmail,
      to_name: values.clientName,
      invoice_number: values.invoiceNumber,
      invoice_date: values.date,
      services: values.drillingServices.join(", "), // Assuming drillingServices is an array
      total_cost: values.totalCostAfterTax, // Assuming totalCostAfterTax is the total cost
    };
    const serviceId = "service_ubxhk3m";
    const templateId = "template_s71zm2p";
    const userId = "_i-rvf-Vb-3NAy7sG";

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      });
  };

  const formik = useFormik({
    initialValues: {
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
    onSubmit: onSubmit,
  });

  const handleBackClick = () => {
    navigate("/dashboard");
  };

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
      const totalCostAfterTax = totalCostBeforeTax - taxAmount;

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

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
      <div className="max-w-3xl mx-auto bg-gray-300 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-gray-900 text-2xl font-bold text-center mb-6">
          Invoice
        </h1>
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Client Information</h2>
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientName"
            >
              Name:
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            {formik.touched.clientName && formik.errors.clientName ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.clientName}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientEmail"
            >
              Email:
            </label>
            <input
              id="clientEmail"
              name="clientEmail"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            {formik.touched.clientEmail && formik.errors.clientEmail ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.clientEmail}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientCategory"
            >
              Category:
            </label>
            <select
              id="clientCategory"
              name="clientCategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientCategory}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="">Select Category</option>
              {clientCategories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            {formik.touched.clientCategory && formik.errors.clientCategory ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.clientCategory}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="invoiceNumber"
            >
              Invoice Number:
            </label>
            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceNumber}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.invoiceNumber}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date:
            </label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.date}
              </div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Services</h2>
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="drillingServices"
            >
              Drilling Services:
            </label>
            <div className="mb-4">
              {drillingServices.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    id={service}
                    name="drillingServices"
                    value={service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.drillingServices.includes(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
            {formik.touched.drillingServices && formik.errors.drillingServices ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.drillingServices}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="pumpTypes"
            >
              Pump Types:
            </label>
            <div className="mb-4">
              {pumpTypes.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    id={service}
                    name="pumpTypes"
                    value={service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pumpTypes.includes(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
            {formik.touched.pumpTypes && formik.errors.pumpTypes ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.pumpTypes}
              </div>
            ) : null}

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="plumbingServices"
            >
              Plumbing Services:
            </label>
            <div className="mb-4">
              {plumbingServices.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    id={service}
                    name="plumbingServices"
                    value={service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.plumbingServices.includes(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="tankServices"
            >
              Tank Services:
            </label>
            <div className="mb-4">
              {tankServices.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    id={service}
                    name="tankServices"
                    value={service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tankServices.includes(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>

            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="otherServices"
            >
              Other Services:
            </label>
            <div className="mb-4">
              {otherServices.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    id={service}
                    name="otherServices"
                    value={service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.otherServices.includes(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
            {formik.touched.otherServices && formik.errors.otherServices ? (
              <div className="text-red-500 text-xs mb-2">
                {formik.errors.otherServices}
              </div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Cost Summary</h2>
            <div className="mb-2">
              <strong>Total Cost Before Tax:</strong>{" "}
              {formik.values.totalCostBeforeTax}
            </div>
            <div className="mb-2">
              <strong>Tax Amount:</strong> {formik.values.taxAmount}
            </div>
            <div className="mb-2">
              <strong>Total Cost After Tax:</strong>{" "}
              {formik.values.totalCostAfterTax}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            {/* <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSendEmail}
            >
              Send Email
            </button> */}
          </div>
        </form>

        <button
          className="flex items-center mt-6 text-gray-700 hover:text-gray-900"
          onClick={handleBackClick}
        >
          <ArrowBackIcon className="mr-2" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Invoice;
