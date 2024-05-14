import React from "react";
import Header from "./Header";
import OurChart from "./OurChart";
import Survey from "../assets/survey.png";
import Testing from "../assets/testing.png";
import Equipment from "../assets/equipment.png";
import Design from "../assets/design.png";

const Main = () => {
  return (
    <section className="w-4/5 grow bg-gradient-to-b from-gray-400 via-cyan to-white h-screen overflow-y-auto flex flex-col justify-start items-center gap-2 p-4">
      <Header />
      <h1 className="text-3xl text-black font-semibold">Services</h1>
      <div className="text-xl cursor-pointer"></div>

      {/* Main section starts here */}
      <div
        id="main-section"
        className="grid lg:grid-cols-3 grid-cols-1 gap-6 w-full h-full"
      >
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img
              src={Testing}
              alt="Drilling & Test Pumping"
              className="h-9 w-9"
            />
            <span>Drilling & Test Pumping</span>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img src={Design} alt="Design & Construction" className="h-9 w-9" />
            <span>Design & Construction</span>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img
              src={Survey}
              alt="Hydrogeological Survey"
              className=" c-white h-9 w-9"
            />
            <span>Hydrogeological Survey & Report</span>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
            <p class="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
            <p class="font-normal text-gray-700 dark:text-gray-400"></p>
          </a>
        </div>
        <div>
          <a
            href="#"
            class="block w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <img
              src={Equipment}
              alt="Pump & Tank Installation"
              className="h-9 w-9"
            />
            <span>Pump & Tank Installation</span>
          </a>
        </div>
      </div>
      {/* Tables for Orders and Contacts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Orders Table */}
        <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Orders</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ordered By</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 0</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2">Client User</td>
                <td className="p-2">Ksh. 10000</td>
                <td className="p-2">1 hour ago</td>
                <td className="p-2">
                  <button className="bg-blue-500 hover:bg-black text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-right mt-2">
            <button className="text-black hover:text-white underline">
              View All
            </button>
          </div>
        </div>

        {/* Recent Contact Requests Table */}
        <div className="bg-blue-500 p-4 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className="font-bold text-md mb-2">Recent Service Requests</h3>
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Message</th>
                <th className="text-left p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2" colSpan="4">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-right mt-2">
            <button className="tex-gray-500 hover:text-white underline">
              View All
            </button>
          </div>
        </div>
        <OurChart />
      </div>
    </section>
  );
};

export default Main;
