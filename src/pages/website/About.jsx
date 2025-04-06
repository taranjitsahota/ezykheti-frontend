import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import keshav from "../../assets/images/farmer.webp";
import { useTranslation } from "react-i18next";

const About = () => {
  const { i18n, t } = useTranslation();

  return (
    <div>
      {/* About Us Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center mt-10 mb-10 sm:mt-14 sm:mb-14 md:mt-20 md:mb-20 lg:mt-26 lg:mb-38">
        <div
          className="h-full absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${greenlines})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        ></div>

        <div data-aos="slide-up" className="gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
            {t("about_us_header")}
            <br />
          </h1>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-700 text-lg md:text-xl">
          {t("about_us_description1")}
          <span className="bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
            {t("about_us_description_punjabi_hindi1")}
          </span>
          <span className="bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
            {t("about_us_description2")}
          </span>
          {t("about_us_description3")}
          {t("about_us_description_punjabi_hindi2")}
        </p>
      </div>

      {/* Team Members Section */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {t("meet_our_team")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Keshav Dwivedi",
              role: "CEO & Founder",
              image: keshav,
            },
            {
              name: "Hardeep Singh",
              role: "CEO & Founder",
              image: keshav,
            },
            {
              name: "Keshav Dwivedi",
              role: "Lead Developer",
              image: keshav,
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full shadow-md mb-6"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {t("why_choose_us")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            t("why_choose_us1"),
            t("why_choose_us2"),
            t("why_choose_us3"),
            t("why_choose_us4"),
          ].map((point, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-green-500 text-xl">✔</span>
              <p className="text-lg text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
