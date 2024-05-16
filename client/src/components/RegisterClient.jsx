import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const RegisterClient = ({ ThemeStyles }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    address: Yup.string().email("Invalid email address").required("Required"),
    telephone: Yup.string().required("Required"),
    clientCategory: Yup.string().required("Required"),
    boreholeLocations: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      telephone: "",
      clientCategory: "",  
      boreholeLocations: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

      fetch("http://localhost:3000/clients", {
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
          navigate('/dashboard');  
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
      <div className="max-w-md mx-auto bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-gray-600 text-xl text-center mb-4">Register Client</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Email Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
              Telephone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className="text-red-500 text-sm">{formik.errors.telephone}</div>
            ) : null}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientCategory">
              Client Category:
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="clientCategory"
                value={formik.values.clientCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="" hidden>
                  Choose category
                </option>
                <option value="Industrial">Industrial</option>
                <option value="Commercial">Commercial</option>
                <option value="Domestic">Domestic</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 pr-2 flex items-center">
                <svg
                  className="fill-current h-4 w-4 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 12l6-6H4l6 6z" />
                </svg>
              </div>
            </div>
            {formik.touched.clientCategory && formik.errors.clientCategory ? (
              <div className="text-red-500 text-sm">{formik.errors.clientCategory}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="boreholeLocations">
              Borehole Location:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="boreholeLocations"
              value={formik.values.boreholeLocations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.boreholeLocations && formik.errors.boreholeLocations ? (
              <div className="text-red-500 text-sm">{formik.errors.boreholeLocations}</div>
            ) : null}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;



