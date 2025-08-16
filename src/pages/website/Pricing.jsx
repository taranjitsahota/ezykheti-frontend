import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import { useTranslation } from "react-i18next";

const Pricing = () => {
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

        <div className=" gap-4">
          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
            Our Prices <br />
            <br />
          </h1>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="bg-gray-100 flex flex-col items-center justify-center p-8 sm:p-12 md:p-16"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
          {t("annual_subscription_plans")}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg xl:text-xl mb-2 sm:mb-4">
          {t("ezykheti_agri_services")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-12 py-8">
          <div className="bg-white p-6 sm:p-8 border border-gray-400 rounded-2xl shadow-md overflow-hidden h-auto w-full transition-transform hover:scale-105">
            <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              {t("annual_charge")}
            </h1>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              ₹ <span className="text-green-500">18,000</span>{" "}
              {t("annual_charge_description")}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-gray-400 rounded-2xl shadow-md overflow-hidden h-auto w-full transition-transform hover:scale-105">
            <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              {t("early_bird_discount")}
            </h1>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              {t("early_bird_discount_description1")}{" "}
              <span className="text-green-500">
                {t("early_bird_discount_description_punjabi_hindi1")}
              </span>
              <span className="text-green-500">
                {t("early_bird_discount_description2")}
              </span>
              {t("early_bird_discount_description_punjabi_hindi2")}
              {t("early_bird_discount_description3")}
              <span className="text-green-500">
                {t("early_bird_discount_description_punjabi_hindi3")}
              </span>
              {t("early_bird_discount_description_punjabi_hindi4")}
              <span className="text-green-500">
                {" "}
                {t("early_bird_discount_description4")}
              </span>{" "}
              {t("early_bird_discount_description5")}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-gray-400 rounded-2xl shadow-md overflow-hidden h-auto w-full transition-transform hover:scale-105">
            <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              {t("bulk_discount")}
            </h1>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              {t("bulk_discount_description1")}
              {t("bulk_discount_description_punjabi_hindi1")}
              <span className="text-green-500">
                {t("bulk_discount_description2")}
              </span>{" "}
              {t("bulk_discount_description3")}
              <span className="text-green-500">
                {t("bulk_discount_description_punjabi_hindi2")}{" "}
              </span>{" "}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-gray-400 rounded-2xl shadow-md overflow-hidden h-auto w-full transition-transform hover:scale-105">
            <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              {t("payment_terms")}
            </h1>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              <span className="text-green-500">{t("")}25%</span> {t("")}of the
              total
              {t("")}
              {t("")}subscription amount is payable on the day of subscription.
            </p>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              {t("")}The remaining amount will be direct debited from your
              provided bank account or chosen payment method in equal monthly
              installments for the rest of the year.
            </p>
          </div>
        </div>
      </div>
      <div className="admin-wrapper bg-white py-20 px-4 md:px-10">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-center  text-4xl md:text-5xl font-bold mb-24">
            {t("pay_as_you_go")}
          </h1>
          <h2 className="text-center  text-3xl md:text-4xl font-bold mb-14">
            {t("cultivation_equipment_table")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: t("super_seeder"),
                price: t("super_seeder_price"),
                conditions: t("super_seeder_conditions"),
              },
              {
                name: t("rotavator"),
                price: t("rotavator_price"),
                conditions: t("rotavator_conditions"),
              },
              {
                name: t("cultivator"),
                price: t("cultivator_price"),
                conditions: t("cultivator_conditions"),
              },
              {
                name: t("potato_planter"),
                price: t("potato_planter_price"),
                conditions: t("potato_planter_conditions"),
              },
              {
                name: t("pneumatic_planter"),
                price: t("pneumatic_planter_price"),
                conditions: t("pneumatic_planter_conditions"),
              },
              {
                name: t("automatic_paddy_planter"),
                price: t("automatic_paddy_planter_price"),
                conditions: t("automatic_paddy_planter_conditions"),
              },
              {
                name: t("trencher"),
                price: t("trencher_price"),
                conditions: t("trencher_conditions"),
              },
              {
                name: t("automatic_boom_sprayer"),
                price: t("automatic_boom_sprayer_price"),
                conditions: t("automatic_boom_sprayer_conditions"),
              },
              {
                name: t("drone_sprayer"),
                price: t("drone_sprayer_price"),
                conditions: t("drone_sprayer_conditions"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 border border-green-100"
              >
                <div className="bg-green-100 text-black text-xl font-medium px-4 py-4 rounded-t-3xl tracking-wide">
                  {item.name}
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-green-900 mb-2">
                    {item.price}
                  </div>
                  <p className="text-green-600 text-sm leading-relaxed">
                    {item.conditions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-white py-20 px-4 md:px-10">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-center  text-3xl md:text-4xl font-bold mb-14">
            {t("harvesting_equipment_table")}
          </h2>
          {/* <p className=" text-center text-lg  mb-16">
            {t("cultivation_equipment_table")}
          </p> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                service: t("wheat_combine_harvester"),
                price: t("wheat_combine_harvester_price"),
                condition: t("wheat_combine_harvester_conditions"),
              },
              {
                service: t("paddy_combine_harvester"),
                price: t("paddy_combine_harvester_price"),
                condition: t("paddy_combine_harvester_conditions"),
              },
              {
                service: t("sugarcane_harvester"),
                price: t("sugarcane_harvester_price"),
                condition: t("sugarcane_harvester_conditions"),
              },
              {
                service: t("automatic_potato_digger_grader"),
                price: t("automatic_potato_digger_grader_price"),
                condition: t("automatic_potato_digger_grader_conditions"),
              },
              {
                service: t("pneumatic_planter"),
                price: t("pneumatic_planter_price"),
                condition: t("pneumatic_planter_conditions"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 border border-green-100"
              >
                <div className="bg-green-100 text-black text-xl font-medium px-4 py-4 rounded-t-3xl tracking-wide">
                  {item.service}
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-green-900 mb-2">
                    {item.price}
                  </div>
                  <p className="text-green-600 text-sm leading-relaxed">
                    {item.condition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-white py-20 px-4 md:px-10">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-center  text-3xl md:text-4xl font-bold mb-14">
            {t("transportation_services_table")}
          </h2>
          {/* <p className=" text-center text-lg  mb-16">
            {t("cultivation_equipment_table")}
          </p> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                service: t("trolley_bed"),
                price: t("trolley_bed_price"),
                condition: t("trolley_bed_conditions"),
              },
              {
                service: t("pto_trolley_sugarcane"),
                price: t("pto_trolley_sugarcane_price"),
                condition: t("pto_trolley_sugarcane_conditions"),
              },
              {
                service: t("tata_207_ute"),
                price: t("tata_207_ute_price"),
                condition: t("tata_207_ute_conditions"),
              },
              {
                service: t("additional_mileage_charge"),
                price: t("additional_mileage_charge_price"),
                condition: t("additional_mileage_charge_conditions"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 border border-green-100"
              >
                <div className="bg-green-100 text-black text-xl font-medium px-4 py-4 rounded-t-3xl tracking-wide">
                  {item.service}
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-green-900 mb-2">
                    {item.price}
                  </div>
                  <p className="text-green-600 text-sm leading-relaxed">
                    {item.condition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <a
        href="/your-pdf-filename.pdf"
        download
        className="fixed right-4 bottom-16 bg-green-500 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg text-lg font-semibold transition duration-300 z-50"
      >
        Download Rates PDF
      </a>
    </div>
  );
  z;
};

export default Pricing;
