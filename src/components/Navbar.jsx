import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "../components/ResponsiveMenu";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/images/logogood.webp";
import Modal from "./Modal";

export const Navlinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 3, name: "About Us", link: "/about" },
  { id: 2, name: "Services", link: "/services" },
  { id: 4, name: "Technology", link: "/technology" },
  { id: 4, name: "Registration", link: "/registration" },
];

const Navbar = ({ theme, setTheme }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-opacity-80 transition-all duration-500 ease-in-out text-gray-900">
      {/* Top Bar */}
      <div className="bg-white text-gray-900 border-green-200 hidden xl:flex justify-between items-center py-1 px-12 border-b transition-all duration-300 text-xs">
    
        <div className="bg-green-100 text-gray-900 border-green-200 flex justify-between items-center tracking-wide rounded-md flex items-center space-x-4 py-0.2 px-8 border-b transition-all duration-300 text-xs hover:space-x-6 hover:py-1 hover:px-16 hover:scale-105 transform-gpu">
          <a
            href="tel:+918104535322"
            className="flex items-center space-x-1 hover:text-blue-500 transition duration-300"
          >
            <FaPhone className="text-blue-500 text-sm" />
            <span>+91 81045 35322</span>
          </a>
          <a
            href="mailto:info@rscarrentalgoa.com"
            className="flex items-center space-x-1 hover:text-red-500 transition duration-300"
          >
            <FaEnvelope className="text-red-500 text-sm" />
            <span>info@rscarrentalgoa.com</span>
          </a>
          <a
            href="https://wa.me/918104535322"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-green-500 transition duration-300"
          >
            <FaWhatsapp className="text-green-500 text-sm" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="max-w-sm w-ful">
          <marquee
            behavior="scroll"
            direction="left"
            className="bg-green-100 px-6  text-gray-900 border border-green-100 flex justify-between items-center tracking-wide rounded-md flex items-center space-x-4 py-0.2 px-8 border-b transition-all duration-300 text-xs hover:py-1 hover:px-[200px] hover:scale-105 transform-gpu"
          >
            🚜 Book Your Slot Now! Best & cheap Prices for farming related
            services | Min 24 hours Prior Booking | Call: +91 12345 67890 🚜
          </marquee>
        </div>

        
        <div className="bg-green-100 px-4 text-gray-800 border border-green-100 flex justify-between items-center tracking-wide rounded-md flex items-center space-x-6 py-0.2 px-8 border-b transition-all duration-300 text-xs hover:space-x-8 hover:py-1 hover:px-16 hover:scale-105 transform-gpu">
          {[
            { icon: FaFacebook, color: "text-blue-600" },
            { icon: FaTwitter, color: "text-blue-400" },
            { icon: FaInstagram, color: "text-pink-500" },
            { icon: FaYoutube, color: "text-red-600" },
          ].map(({ icon: Icon, color }, index) => (
            <a
              key={index}
              href="#"
              className={`${color} text-sm rounded-full hover:scale-105 transition duration-300`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}

      <div className="bg-white flex justify-between items-center py-4 px-22 border-b border-gray-300">
        {/* Logo */}
        <div
          data-aos="zoom-in"
          className="transition duration-300 hover:scale-105"
        >
          <img
            src={logo}
            alt="RS Goa Car Rental Logo"
            className="max-w-[150px] md:max-w-[190px] h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {Navlinks.map(({ id, name, link }) => (
            <NavLink
              key={id}
              to={link}
              className={`text-lg tracking-wide transition-all duration-300 ease-in-out px-3 py-2 rounded-lg ${
                location.pathname === link
                  ? "text-green-400 border-green-400"
                  : "hover:text-green-400"
              }`}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="flex hidden xl:flex items-center gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer px-5 py-2 border border-[#32cd32] text-green-400 rounded-md hover:bg-[#32cd32] hover:text-white transition-all duration-300"
          >
            Learn More
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#32cd32] cursor-pointer text-white rounded-md px-5 py-2 shadow-lg "
          >
            Get Started
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>

        {/* Mobile View (Hamburger Menu & Theme Toggle) */}
        <div className="flex items-center gap-4 md:hidden">
          {theme === "dark" ? (
            <BiSolidSun
              onClick={() => setTheme("light")}
              className="text-2xl cursor-pointer transition duration-300 hover:text-yellow-400"
            />
          ) : (
            <BiSolidMoon
              onClick={() => setTheme("dark")}
              className="text-2xl cursor-pointer transition duration-300 hover:text-gray-600"
            />
          )}

          {/* Hamburger Menu */}
          {showMenu ? (
            <HiMenuAlt1
              onClick={toggleMenu}
              className="cursor-pointer transition-all duration-300"
              size={30}
            />
          ) : (
            <HiMenuAlt3
              onClick={toggleMenu}
              className="cursor-pointer transition-all duration-300"
              size={30}
            />
          )}
          {showMenu && (
            <ResponsiveMenu
              theme={theme}
              showMenu={showMenu}
              toggleMenu={toggleMenu}
            />
          )}
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Navbar;
