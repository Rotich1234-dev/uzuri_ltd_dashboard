import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { pdf, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const Report = ({ ThemeStyles }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/dashboard");
  };

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
