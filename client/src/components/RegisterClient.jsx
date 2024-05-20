import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RegisterClient = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object({
<<<<<<< HEAD
    name: Yup.string().required("Required"),
    address: Yup.string().email("Invalid email address").required("Required"),
    telephone: Yup.string().required("Required"),
    clientCategory: Yup.string().required("Required"),
    boreholeLocations: Yup.string().required("Required"),
=======
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    address: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
  });

  const formik = useFormik({
    initialValues: {
<<<<<<< HEAD
      name: "",
      address: "",
      telephone: "",
      clientCategory: "",
      boreholeLocations: "",
=======
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone_number: "",
      category_id: "",
      location: "",
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

<<<<<<< HEAD
      fetch("http://localhost:3000/clients", {
=======
      fetch("http://127.0.0.1:8080/api/admin/routes/clients", {
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
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
          setSuccessMessage("Client registered successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 200);
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    },
  });

  return (
    <div
      className="pb-40 px-5 py-7 p-6 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
<<<<<<< HEAD
      <div className="max-w-md mx-auto bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <button
          className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleBackClick}
        >
          <ArrowBackIcon /> Back
        </button>
        <h2 className="text-gray-800 text-xl text-center mb-4">
=======
      <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-800 text-2xl text-center mb-4">
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
          Register Client
        </h2>
        {successMessage && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            <p>{successMessage}</p>
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
<<<<<<< HEAD
              htmlFor="name"
            >
              Name:
=======
              htmlFor="firstName"
            >
              First Name:
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
<<<<<<< HEAD
              name="name"
              value={formik.values.name}
=======
              name="firstName"
              value={formik.values.firstName}
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
<<<<<<< HEAD
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
=======
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="phone_number"
            >
              Phone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="text-red-500 text-sm">
                {formik.errors.phone_number}
              </div>
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="address"
            >
<<<<<<< HEAD
              Email Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
=======
              Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
<<<<<<< HEAD
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="telephone"
            >
              Telephone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className="text-red-500 text-sm">
                {formik.errors.telephone}
              </div>
            ) : null}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="clientCategory"
            >
              Client Category:
=======
          <div className="mb-4 relative">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="category_id"
            >
              Category:
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
<<<<<<< HEAD
                name="clientCategory"
                value={formik.values.clientCategory}
=======
                name="category_id"
                value={formik.values.category_id}
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="" hidden>
                  Choose category
                </option>
<<<<<<< HEAD
                <option value="Industrial">Industrial</option>
                <option value="Commercial">Commercial</option>
                <option value="Domestic">Domestic</option>
=======
                <option value="1">Industrial</option>
                <option value="2">Commercial</option>
                <option value="3">Domestic</option>
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 pr-2 flex items-center">
                <svg
                  className="fill-current h-4 w-4 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 12l6-6H4l6 6z" />
                </svg>
              </div>
            </div>
<<<<<<< HEAD
            {formik.touched.clientCategory && formik.errors.clientCategory ? (
              <div className="text-red-500 text-sm">
                {formik.errors.clientCategory}
=======
            {formik.touched.category_id && formik.errors.category_id ? (
              <div className="text-red-500 text-sm">
                {formik.errors.category_id}
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
<<<<<<< HEAD
              htmlFor="boreholeLocations"
            >
              Borehole Location:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              name="boreholeLocations"
              value={formik.values.boreholeLocations}
=======
              htmlFor="location"
            >
              Location:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              name="location"
              value={formik.values.location}
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
<<<<<<< HEAD
            {formik.touched.boreholeLocations &&
            formik.errors.boreholeLocations ? (
              <div className="text-red-500 text-sm">
                {formik.errors.boreholeLocations}
=======
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm">
                {formik.errors.location}
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
              </div>
            ) : null}
          </div>
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
      <button
<<<<<<< HEAD
        className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
=======
        className="bg-gray-900 text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
        onClick={handleBackClick}
      >
        <ArrowBackIcon /> Back
      </button>
    </div>
  );
};

export default RegisterClient;
