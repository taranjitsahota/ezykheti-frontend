import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Navlinks } from "./Navbar";
import logo from "../assets/images/logo/logo.png";

const ResponsiveMenu = ({ showMenu }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`
    ${showMenu ? "left-0" : "-left-[100%]"}
    fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white text-black
    px-8 pb-6 pt-16 transition-all duration-200 md:hidden rounded-r-xl shadow-md
  `}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          {/* <FaUserCircle size={50} /> */}
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
          
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data) => (
              <li>
                <a href={data.link} className="mb-5 inline-block">
                {t(data.nameKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
