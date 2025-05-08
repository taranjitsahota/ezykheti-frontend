import React, { useRef, useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { Mail, Phone, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

import logo from "../assets/images/logo/Logo.png";
import ContactModal from "./Modal";
import LearnMoreModal from "./LearnMoreModal";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";

export const Navlinks = [
  { id: 1, nameKey: "home_link", link: "/" },
  { id: 3, nameKey: "about_us_menu_link", link: "/about" },
  { id: 2, nameKey: "services_menu_link", link: "/service" },
  { id: 4, nameKey: "pricing_menu_link", link: "/pricing" },
  { id: 4, nameKey: "registration_menu_link", link: "/registration" },
];

const languages = [
  { code: "en", label: "EN" },
  { code: "hn", label: "हिन्दी" },
  { code: "pj", label: "ਪੰਜਾਬੀ" },
];

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
    localStorage.setItem("language", code);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const changeLanguage = (event) => {
  //   const selectedLang = event.target.value;
  //   i18n.changeLanguage(selectedLang);

  //   const changeLanguage = (lng) => {
  //     i18n.changeLanguage(lng);
  //     setSelectedLang(lng);
  //     setOpen(false);
  //   };

  //   localStorage.setItem("language", selectedLang); // Save to localStorage
  // };

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
            href="tel:+916239007239"
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-500 transition"
          >
            <Phone />
            <span>+91 62390 07239</span>
          </a>
          <a
            href="mailto:admin@ezykheti.com"
            className="flex items-center space-x-1 text-gray-800 hover:text-red-500 transition"
          >
            <Mail />
            <span>admin@ezykheti.com</span>
          </a>
          <a
            href="https://wa.me/916239007239"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-800 hover:text-green-500 transition"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
        <div className="max-w-md w-ful">
          <Typewriter
            words={[
              "🚜 Best & Cheap Prices for farming services!",
              "📞 Call: +91 62390 07239 for instant booking!",
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
            {
              icon: FaFacebook,
              color: "text-blue-500",
              link: "https://www.facebook.com/share/1HPz1mQXoL/",
            },
            {
              icon: X,
              color: "text-black-400",
              link: "https://x.com/EzyKheti",
            },
            {
              icon: FaInstagram,
              color: "text-pink-500",
              link: "https://www.instagram.com/ezykheti/",
            },
            {
              icon: FaYoutube,
              color: "text-red-500",
              link: "https://www.youtube.com/@ezykheti",
            },
          ].map(({ icon: Icon, color, link }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
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
        <Link to="/">
          <div
            data-aos="zoom-in"
            className="transition duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Ezykheti"
              className="max-w-[150px] md:max-w-[190px] h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {Navlinks.map(({ id, nameKey, link }) => (
            <NavLink
              key={id}
              to={link}
              className={`text-lg tracking-wide transition-all duration-300 ease-in-out px-3 py-2 rounded-lg ${
                location.pathname === link
                  ? "text-green-400 border-green-400"
                  : "hover:text-green-400"
              }`}
            >
              {t(nameKey)}
            </NavLink>
          ))}
        </nav>
        <div className="relative sm:block" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 px-3 py-2 text-sm md:text-base border border-gray-300 rounded hover:bg-gray-100 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>{languages.find((l) => l.code === selectedLang)?.label}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {open && (
            <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
              {languages.map(({ code, label }) => (
                <li
                  key={code}
                  onClick={() => handleSelect(code)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex hidden xl:flex items-center gap-4">
          <button
            onClick={() => setShowLearnMore(true)}
            className="cursor-pointer px-5 py-2 border border-[#32cd32] text-green-400 rounded-md hover:bg-[#32cd32] hover:text-white transition-all duration-300"
          >
            {t("learn_more_link")}
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#32cd32] cursor-pointer text-white rounded-md px-5 py-2 shadow-lg "
          >
            {t("get_started_link")}
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
            <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu} />
          )}
        </div>
      </div>
      {isModalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      {showLearnMore && (
        <LearnMoreModal onClose={() => setShowLearnMore(false)} />
      )}
    </header>
  );
};

export default Navbar;
