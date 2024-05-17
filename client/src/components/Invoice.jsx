import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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
    onSubmit: (values, { setSubmitting }) => {
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
    },
  });

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleSendEmail = () => {
    fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
              <div>{formik.errors.clientName}</div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
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
              <div>{formik.errors.clientEmail}</div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="clientCategory"
            >
              Client Category
            </label>
            <select
              id="clientCategory"
              name="clientCategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientCategory}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="" label="Select category" />
              {clientCategories.map((category, index) => (
                <option key={index} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            {formik.touched.clientCategory && formik.errors.clientCategory ? (
              <div>{formik.errors.clientCategory}</div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
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
              <div>{formik.errors.invoiceNumber}</div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
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
              <div>{formik.errors.date}</div>
            ) : null}
          </div>

          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
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
              <div>{formik.errors.drillingServices}</div>
            ) : null}
            <ul className="list-disc pl-5 mb-4">
              {formik.values.drillingServices.map((drillingService, index) => (
                <li key={index} className="flex items-center justify-between">
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
              ))}
            </ul>
          </div>

          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="" label="Select pump type" />
              {pumpTypes.map((pumpType, index) => (
                <option key={index} value={pumpType}>
                  {pumpType}
                </option>
              ))}
            </select>
            {formik.touched.pumpTypes && formik.errors.pumpTypes ? (
              <div>{formik.errors.pumpTypes}</div>
            ) : null}
            <ul className="list-disc pl-5 mb-4">
              {formik.values.pumpTypes.map((pumpType, index) => (
                <li key={index} className="flex items-center justify-between">
                  {pumpType}
                  <button
                    type="button"
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                    onClick={() =>
                      formik.setFieldValue(
                        "pumpTypes",
                        formik.values.pumpTypes.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
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
              <div>{formik.errors.plumbingServices}</div>
            ) : null}
            <ul className="list-disc pl-5 mb-4">
              {formik.values.plumbingServices.map((plumbingService, index) => (
                <li key={index} className="flex items-center justify-between">
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
              ))}
            </ul>
          </div>
          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="" label="Select service" />
              {tankServices.map((tankService, index) => (
                <option key={index} value={tankService}>
                  {tankService}
                </option>
              ))}
            </select>
            {formik.touched.tankServices && formik.errors.tankServices ? (
              <div>{formik.errors.tankServices}</div>
            ) : null}
            <ul className="list-disc pl-5 mb-4">
              {formik.values.tankServices.map((tankService, index) => (
                <li key={index} className="flex items-center justify-between">
                  {TrackEventService}
                  <button
                    type="button"
                    className="mt-2 bg-red-500 text-white font-bold gap-2 py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:bg-red-900"
                    onClick={() =>
                      formik.setFieldValue(
                        "tankServices",
                        formik.values.tankServices.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-gray-900 mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="" label="Select service" />
              {otherServices.map((otherService, index) => (
                <option key={index} value={otherService}>
                  {otherService}
                </option>
              ))}
            </select>
            {formik.touched.otherServices && formik.errors.otherServices ? (
              <div>{formik.errors.otherServices}</div>
            ) : null}
            <ul className="list-disc pl-5 mb-4">
              {formik.values.otherServices.map((otherService, index) => (
                <li key={index} className="flex items-center justify-between">
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

          <div className="text-gray-900 mb-4">
            <h2 className="text-xl font-semibold mb-2">Total Cost</h2>
            <p className="block text-gray-900 text-sm font-bold mb-2">
              Total Before Tax (Ksh): {formik.values.totalCostBeforeTax}
            </p>
            <p className="block text-gray-900 text-sm font-bold mb-2">
              Tax Amount (Ksh): {formik.values.taxAmount}
            </p>
            <p className="block text-gray-900 text-sm font-bold mb-2">
              Total After Tax (Ksh): {formik.values.totalCostAfterTax}
            </p>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-900 mr-4"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Creating..." : "Create Invoice"}
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
