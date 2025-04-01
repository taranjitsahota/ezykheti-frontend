import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
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
import ContactModal from "./Modal";
import LearnMoreModal from "./LearnMoreModal";
import { Typewriter } from "react-simple-typewriter";


export const Navlinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 3, name: "About Us", link: "/about" },
  { id: 2, name: "Services", link: "/services" },
  { id: 4, name: "Pricing", link: "/pricing" },
  { id: 4, name: "Registration", link: "/registration" },
];

const Navbar = () => {

    const [showLearnMore, setShowLearnMore] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-opacity-80 transition-all duration-500 ease-in-out text-gray-900">
      {/* Top Bar */}
      <div className="hidden xl:flex justify-between items-center px-22 bg-white border-b border-gray-300 text-sm">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+918104535322"
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-500 transition"
          >
            <FaPhone />
            <span>+91 81045 35322</span>
          </a>
          <a
            href="mailto:info@rscarrentalgoa.com"
            className="flex items-center space-x-1 text-gray-800 hover:text-red-500 transition"
          >
            <FaEnvelope />
            <span>info@ezykheti.com</span>
          </a>
          <a
            href="https://wa.me/918104535322"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-800 hover:text-green-500 transition"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
        </div>
        <div className="max-w-md w-ful">
          <Typewriter
            words={[
              "🚜 Best & Cheap Prices for farming services!",
              "📞 Call: +91 12345 67890 for instant booking!",
              "🌾 24 hours prior booking needed for smooth service!",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </div>
        <div className="flex items-center space-x-4">
          {[
            { icon: FaFacebook, color: "text-blue-500" },
            { icon: FaTwitter, color: "text-sky-400" },
            { icon: FaInstagram, color: "text-pink-500" },
            { icon: FaYoutube, color: "text-red-500" },
          ].map(({ icon: Icon, color }, idx) => (
            <a
  key={idx}
  href="#"
  className={`inline-flex ${color} text-lg hover:scale-110 transition-transform duration-300 ease-in-out`}
>
  <Icon className="w-4 h-4" />
</a>

          ))}
        </div>
      </div>

      {/* Navigation Bar */}

      <div className="bg-white flex justify-between items-center py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-gray-300">
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
               onClick={() => setShowLearnMore(true)}
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

          {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          

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
              
              showMenu={showMenu}
              toggleMenu={toggleMenu}
            />
          )}
        </div>
      </div>
      {isModalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      {showLearnMore && <LearnMoreModal onClose={() => setShowLearnMore(false)} />}
    </header>
  );
};

export default Navbar;
