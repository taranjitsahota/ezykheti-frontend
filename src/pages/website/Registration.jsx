import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import tractor from "../../assets/images/tenweb_media_sfqvrggfb.webp";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const { i18n, t } = useTranslation();

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center text-center mt-10 mb-10 sm:mt-14 sm:mb-14 md:mt-20 md:mb-20 lg:mt-26 lg:mb-38">
        <div
          className="h-full absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${greenlines})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: ,
            zIndex: -1,
          }}
        ></div>

        <div data-aos="slide-up" className=" gap-4">
          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
            Register <br />
            <br />
          </h1>

          {/* <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all">
            Contact Us
          </button>
          <button className="border border-gray-400 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-all">
            Know More
          </button> */}
          {/* <p className="text-md md:text-lg text-gray-700 max-w-3xl leading-relaxed mb-8 px-4">
            Ezykheti Agri Services is dedicated to transforming agriculture in
            Punjab by empowering farmers with innovative technology and high-end
            farm machinery. Our mission is to provide world-class solutions when
            finding farm labour is getting harder, hence enhance yields while
            promoting sustainable practices. We recognized the challenges faced
            by farmers and developed a state-of-the-art mobile app for easy
            access to modern farming machinery. Our commitment to exceptional
            service ensures that farmers can leverage advanced equipment without
            heavy financial burdens, ultimately helping them thrive and
            sustainably feed the nation.
          </p> */}
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row bg-gray-100 p-20">
        {/* Left side - Form and text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("get_in_touch")}
          </h2>
          <p className="text-md md:text-lg text-gray-700 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s..
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder={t("farmer_name")}
                className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder={t("contact_number")}
                className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t("email_optional")}
                className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder={t("village_name")}
                className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t("area_of_land")}
                className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
              />
              <select className="border-b-2 border-green-400 py-2 px-8 outline-none text-gray-700">
                <option>{t("in_kanal")}</option>
                <option>{t("in_acres")}</option>
                <option>{t("in_hectares")}</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right side - Image with button */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 relative">
          <img
            src={tractor} // Replace with your image path
            alt="Ezykheti"
            className="rounded-xl w-full h-auto object-cover"
            style={{ maxWidth: "100%", maxHeight: "800px" }}
          />
          {/* <button className="absolute top-6 left-6 bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 transition-all">
          Find your farming solution here.
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
