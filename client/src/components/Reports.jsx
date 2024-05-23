<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { pdf, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
=======
import React from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { pdf, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const Report = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/admin/routes/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:3000/fees');
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchClients();
    fetchInvoices();
  }, []);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "14%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    heading: {
      fontSize: 20,
      marginBottom: 10,
    },
  });

  const handleDownloadClientReport = () => {
    const ClientDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.heading}>Client List Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Client ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Category ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>First Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Email</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Phone Number</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Address</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Location</Text>
              </View>
            </View>
            {clients.map((client) => (
              <View style={styles.tableRow} key={client.client_id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.client_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.category_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.firstName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.email}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.phone_number}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.address}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{client.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    pdf(ClientDocument())
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ClientListReport.pdf';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const handleDownloadInvoiceReport = () => {
    const InvoiceDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.heading}>Invoice Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Invoice ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Client ID</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total Cost</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Tax Amount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
            </View>
            {invoices.map((invoice) => (
              <View style={styles.tableRow} key={invoice.invoice_id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{invoice.invoice_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{invoice.client_id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{invoice.total_cost}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{invoice.tax_amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{invoice.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    pdf(InvoiceDocument())
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'InvoiceReport.pdf';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const background = {
    ...ThemeStyles,
    backgroundColor: '#FFFAFA'
  };

  return (
    <div className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto" style={background}>
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-600">Registered Client List</h1>
          <button
            className="bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
            onClick={handleDownloadClientReport}
          >
            Download Client PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-#16182F dark:bg-gray-100">
            <thead>
              <tr className="text-gray-900 dark:text-gray-700">
                <th className="py-2 px-4 border-b dark:border-gray-600">Client ID</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Category ID</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">First Name</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Email</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Phone Number</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Address</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Location</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.client_id} className="text-gray-900 dark:text-gray-700">
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.client_id}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.category_id}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.firstName}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.email}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.phone_number}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.address}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{client.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-600">Invoice Report</h1>
          <button
            className="bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
            onClick={handleDownloadInvoiceReport}
          >
            Download Invoice PDF
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-#16182F dark:bg-gray-100">
            <thead>
              <tr className="text-gray-900 dark:text-gray-700">
                <th className="py-2 px-4 border-b dark:border-gray-600">Invoice ID</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Client ID</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Total Cost</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Tax Amount</th>
                <th className="py-2 px-4 border-b dark:border-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.invoice_id} className="text-gray-900 dark:text-gray-700">
                  <td className="py-2 px-4 border-b dark:border-gray-600">{invoice.invoice_id}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{invoice.client_id}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{invoice.total_cost}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{invoice.tax_amount}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-600">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-gray-900"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default Report;
>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568

const Report = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/dashboard");
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const reports = [
    {
      id: 1,
      title: "Monthly Sales Report",
      description: "Summary of sales for the last month",
      date: "2023-03-15",
      format: "PDF",
    },
    {
      id: 2,
      title: "Quarterly Performance Report",
      description: "Performance analysis for the last quarter",
      date: "2023-03-01",
      format: "Excel",
    },
    {
      id: 3,
      title: "Yearly Financial Report",
      description: "Financial overview for the last year",
      date: "2022-12-31",
      format: "PDF",
    },
  ];

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    section: {
      marginBottom: 10,
    },
    heading: {
      fontSize: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 4,
    },
  });

  const handleDownload = (report) => {
    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.heading}>{report.title}</Text>
          <Text style={styles.text}>
            <strong>Description:</strong> {report.description}
          </Text>
          <Text style={styles.text}>
            <strong>Date:</strong> {report.date}
          </Text>
          <Text style={styles.text}>
            <strong>Format:</strong> {report.format}
          </Text>
        </Page>
      </Document>
    );

    pdf(MyDocument())
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${report.title}.pdf`;
        link.click();
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div
      className="pb-40 px-5 py-7 w-full h-screen overflow-y-auto"
      style={ThemeStyles}
    >
      <div className="max-w-3xl mx-auto bg-gray-400 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
        </div>

        <ul className="space-y-6">
          {reports.map((report) => (
            <li
              key={report.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-gray-900 text-xl font-semibold mb-2">
                {report.title}
              </h2>
              <p className="text-gray-900 mb-2">{report.description}</p>
              <p className="text-gray-900 mb-2">
                <strong>Date:</strong> {report.date}
              </p>
              <p className="text-gray-900 mb-4">
                <strong>Format:</strong> {report.format}
              </p>
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-900"
                onClick={() => handleDownload(report)}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="flex items-center justify-center bg-gray-900 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-white"
        onClick={handleBackClick}
      >
        <ArrowBackIcon className="mr-2" /> Back
      </button>
    </div>
  );
};

export default Report;
=======

>>>>>>> 11dd6e925a0d7ab62673a9f324e7253cf3a0d568
=======
>>>>>>> 304a03f8ea2e47ca69296d2a548655953b9cff70
