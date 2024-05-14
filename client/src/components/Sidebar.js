import React, { useState, useEffect } from 'react';
// import { Link } from 'react-scroll';
import { scroller } from 'react-scroll';
import { MdDashboard, MdLogout, MdEmail } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import { GrServices } from "react-icons/gr";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { FaCalendar, FaMoneyCheck, FaFileInvoice } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiAuthentik } from "react-icons/si";

const variants = {
    expanded: { width: "25%" },
    nonExpanded: { width: "5%" }
};

const navItems = [
    { name: "Dashboard", icon: MdDashboard, target: "dashboard" },
    { name: "ClientList", icon: IoPeople, target: "client-list" },
    { name: "ServiceForm", icon: GrServices, target: "service-form" },
    { name: "FeeCalculator", icon: FaMoneyCheck, target: "fee-calculator" },
    { name: "ReportGenerator", icon: HiOutlineDocumentReport, target: "report-generator" },
    { name: "InvoiceGenerator", icon: FaFileInvoice, target: "invoice-generator" },
    { name: "Email", icon: MdEmail, target: "email" },
    { name: "Help-Desk", icon: MdLogout, target: "help-desk" },
    { name: "Calendar", icon: FaCalendar, target: "calendar" },
    { name: "Authentication", icon: SiAuthentik, target: "authentication" },
];

const Sidebar = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
      const handleResize = () => {
          const width = window.innerWidth;
          setIsExpanded(width >= 768);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (item, index) => {
      setActiveNavIndex(index);
      scroller.scrollTo(item.target, {
          duration: 500,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -70,
      });
  };

  return (
    <motion.section
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className={
        "w-5/5 bg-gray-400 h-screen flex flex-col justify-between items-center gap-10 relative " +
        (isExpanded ? "py-8 px-6" : "px-8 py-6")
      }
    >
      <div className="flex flex-col justify-center items-center gap-8">
        {isExpanded ? (
          <div id="logo-box">
            <h1 className="text-blue-600 font-extrabold">UZURI LIMITED</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-blue-900 font-bold text-1xl">UZURI</h1>
          </div>
        )}
        <div
          id="navlinks-box"
          className="flex flex-col justify-center items-start gap-5 w-full mt-5"
        >
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item, index)}
              className={
                "flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl " +
                (activeNavIndex === index
                  ? "bg-blue-200 text-black"
                  : "text-white") +
                (isExpanded ? "px-6 py-2" : "p-2") +
                " outline-none focus:outline-none"
              }
            >
              <div className="bg-blue-600 text-black p-2 rounded-full">
                <item.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className={"text-lg " + (isExpanded ? "flex" : "hidden")}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        id="expanded-icon"
        className="bg-blue-600 text-black p-2 rounded-full cursor-pointer absolute -right-4 bottom-20
          md:bottom-40 md:flex hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaArrowsLeftRight />
      </div>
      <div
        id="logout-box"
        className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer">
        <div className="bg-slate-700 w-full h-[0.5px]"></div>
        <div className="flex justify-center items-center gap-2">
          <MdLogout className="text-white h-6 w-6" />
          <span className={'text-white text-lg ' + (isExpanded ? 'flex' : 'hidden')}>Logout</span>
        </div>
      </div>
    </motion.section>
    );
};

export default Sidebar;


