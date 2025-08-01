import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/Logo-2.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { i18n, t } = useTranslation();
  return (
    <footer className="bg-gray-200 text-black py-2">
      <div
        data-aos="zoom-in"
        className="px-6 py-4 transition duration-300 ease-in-out"
      >
        <img
          src={logo}
          alt="RS Goa Car Rental Logo"
          className="max-w-[190px] md:max-w-[190px] h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              {t("quick_links")}
            </h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link to="/" className="text-black hover:text-green-500">
                  {t("home_bottom_link")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-black hover:text-green-500">
                  {t("about_us_bottom_link")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/service" className="text-black hover:text-green-500">
                  {t("services_bottom_link")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/pricing" className="text-black hover:text-green-500">
                  {t("pricing_bottom_link")}
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/registration"
                  className="text-black hover:text-green-500"
                >
                  {t("registration_bottom_link")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              {t("contact_information")}
            </h3>
            <p className="text-black mb-2">{t("address")}</p>
            <p className="text-black mb-2">{t("address1")}</p>
            <p className="text-black mb-2">{t("address2")}</p>
            <p className="text-black mb-2">{t("phone")}</p>
            <p className="text-black">{t("email")}</p>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              {t("follow_us")}
            </h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/share/1HPz1mQXoL/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-400 hover:text-blue-600 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/EzyKheti"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-400 hover:text-blue-400 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <X />
              </a>
              <a
                href="https://www.instagram.com/ezykheti/"
                 target="_blank"
              rel="noopener noreferrer"
                className="bg-gray-400 hover:text-pink-700 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@ezykheti"
                 target="_blank"
              rel="noopener noreferrer"
                className="bg-gray-400 hover:text-red-600 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center text-center mt-8 mb-4 border-t border-gray-600 pt-8 gap-4 md:gap-8">
        <p className="text-black">
          &copy; {new Date().getFullYear()} DWIJAS AGRO SERVICES PRIVATE LIMITED. All
          rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="text-black hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/refund-policy" className="text-black hover:text-white">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
