import React from "react";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    nameKey: "rajesh_kumar",
    roleKey: "punjab_farmer",
    messageKey: "rajesh_kumar_description",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    nameKey: "suman_kaur",
    roleKey: "smallholder_farmer",
    messageKey: "suman_kaur_description",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    nameKey: "amar_singh",
    roleKey: "agricultural_innovator",
    messageKey: "amar_singh_description",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    nameKey: "gurpreet_kaur",
    roleKey: "organic_farmer",
    messageKey: "gurpreet_kaur_description",
    img: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    nameKey: "harpreet_singh",
    roleKey: "traditional_farmer",
    messageKey: "harpreet_singh_description",
    img: "https://randomuser.me/api/portraits/men/39.jpg",
  },
  {
    nameKey: "nirmal_kaur",
    roleKey: "community_leader",
    messageKey: "nirmal_kaur_description",
    img: "https://randomuser.me/api/portraits/women/76.jpg",
  },
];

const Testimonials = () => {
  const { i18n, t } = useTranslation();

  return (
    <section data-aos="fade-up" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("farmers'_voices")} </h2>
        <p className="text-gray-600 mb-12">
        {t("farmers'_voices_description")} 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tItem, index) => (
            <div
              key={index}
              className="bg-black text-white p-6 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div>
                <p className="mb-6 text-sm leading-relaxed">
                  {t(tItem.messageKey)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* <img
                  src={tItem.img}
                  alt={t(tItem.nameKey)}
                  className="w-12 h-12 rounded-full object-cover"
                /> */}
                <div>
                  <h4 className="font-bold">{t(tItem.nameKey)}</h4>
                  <p className="text-sm text-gray-300">{t(tItem.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
