import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logogood.webp";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-10">
      <div
        data-aos="zoom-in"
        className="px-6 py-8 transition duration-300 ease-in-out"
      >
        <img
          src={logo}
          alt="RS Goa Car Rental Logo"
          className="max-w-[150px] md:max-w-[190px] h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              Quick Links
            </h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link to="/" className="text-black hover:text-green-500">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-black hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services"
                  className="text-black hover:text-green-500"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/technology"
                  className="text-black hover:text-green-500"
                >
                  Technology
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/registration"
                  className="text-black hover:text-green-500"
                >
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              Contact Information
            </h3>
            <p className="text-black mb-2">Adrress of punjab office</p>
            <p className="text-black mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-black">Email: info@carrental.com</p>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              Follow Us
            </h3>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="bg-gray-400 hover:text-blue-600 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="bg-gray-400 hover:text-blue-400 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="bg-gray-400 hover:text-pink-700 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-gray-400 hover:text-red-600 rounded-full w-10 h-10 flex items-center justify-center  p-1 transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
              Newsletter
            </h3>
            <p className="text-black mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white rounded-l-md p-2 w-3/4 focus:outline-none"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md p-2 w-1/2"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center text-center mt-8 border-t border-gray-600 pt-8 gap-4 md:gap-6">
        <p className="text-black">
          &copy; {new Date().getFullYear()} Ezykheti Agri Services Pvt Ltd. All
          rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/privacy" className="text-black hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-black hover:text-white">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
