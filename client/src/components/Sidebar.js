import React, { useState, useEffect } from "react";
import { MdDashboard, MdLogout, MdEmail } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { FaCalendar, FaMoneyCheck, FaFileInvoice } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiAuthentik } from "react-icons/si";
import { Link } from "react-router-dom";

const variants = {
  expanded: { width: "25%" },
  nonExpanded: { width: "5%" },
};

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
  { name: "ClientList", path: "/client-list", icon: IoPeople },
  { name: "ServiceForm", path: "/service-form", icon: GrServices },
  { name: "FeeCalculator", path: "/fee-calculator", icon: FaMoneyCheck },
  {
    name: "ReportGenerator",
    path: "/report-generator",
    icon: HiOutlineDocumentReport,
  },
  { name: "InvoiceGenerator", path: "/invoice-generator", icon: FaFileInvoice },
  { name: "Email", path: "/email", icon: MdEmail },
  { name: "Help-Desk", path: "/help-desk", icon: MdLogout },
  { name: "Calendar", path: "/calendar", icon: FaCalendar },
  { name: "Authentication", path: "/authentication", icon: SiAuthentik },
];

const Sidebar = () => {
  // const { theme } = useTheme();
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
            <h1 className="text-blue-600 font-extrabold">UZURI LIMITED{""}</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-blue-900 font-bold text-1xl">UZURI</h1>
            <span className="italic text-green-500 text-3xl"></span>
          </div>
        )}
        {/* */}
        <div
          id="navlinks-box"
          className="flex flex-col justify-center items-start gap-5 w-full mt-5"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={
                "flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl " +
                (activeNavIndex === index ? "bg-blue-200 text-black" : "text-white") +
                (isExpanded ? "px-6 py-2" : "p-2")
              }
              onClick={() => setActiveNavIndex(index)}
            >
              <div className="bg-blue-600 text-black p-2 rounded-full">
                <item.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span
                className={
                  "text-lg " + (isExpanded ? "flex" : "hidden") +
                  (activeNavIndex === index ? " font-bold" : "")
                }
              >
                {item?.name}
              </span>
            </Link>
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
        className="w-full flex flex-col justify-start items-center gap-4 cursor-pointer"
      >
        <div className="bg-slate-700 w-full h-[0.5px]"></div>
        <div className="flex justify-center items-center gap-2">
          <MdLogout className="text-white h-6 w-6" />
          <span
            className={"text-white text-lg " + (isExpanded ? "flex" : "hidden")}
          >
            Logout
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default Sidebar;

