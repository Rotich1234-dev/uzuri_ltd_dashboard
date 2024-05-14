import React, { useState } from "react";
import { IoSearch, IoPersonAdd  } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-scroll"; 
import client from "../assets/sam.jpg";

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleColor = () => {
    setDarkTheme(!darkTheme);
    document.body.style.backgroundColor = darkTheme ? "#ffffff" : "#333333";
    document.body.style.color = darkTheme ? "#333333" : "#ffffff";
  };

  return (
    <section
      className={`w-full ${darkTheme ? 'bg-gray-800' : 'bg-slate-100'} lg:h-20 h-fit flex lg:flex-row flex-col justify-between items-center p-4 rounded-xl lg:gap-2 gap-4`}
    >
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
      </div>

      <div className="flex justify-between items-center gap-10">
        <IoSearch className="w-6 h-6 cursor-pointer hover:scale-150 hover:text-yellow-500 transition-all" />

        <div className="text-xl cursor-pointer" onClick={toggleColor}>
          {darkTheme ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </div>

        {/* <div id="client-info" className="flex justify-center items-center gap-4">
          <img src={client} alt="client" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center -mb-1 gap-2">
              <h1 className="text-lg font-semibold">Hi, Sam</h1>
              <IoIosArrowDown />
            </div>
            <p>Admin</p>
          </div>
        </div> */}

        <Link to="loginForm" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer hover:scale-110 transition-all flex items-center gap-2">
          <IoPersonAdd className="w-6 h-6" />
          <span>Login</span>
        </Link>
      </div>
    </section>
  );
};

export default Header;


