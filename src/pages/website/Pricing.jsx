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
            Our Services <br />
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
              Bulk Discount
            </h1>
            <p className="font-semibold">
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-transparent mr-2"></span>
              {t("")}Additional{" "}
              <span className="text-green-500">{t("")}5% discount</span> {t("")}
              when subscribing for 3 acres or more.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-gray-400 rounded-2xl shadow-md overflow-hidden h-auto w-full transition-transform hover:scale-105">
            <h1 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              {t("")}Payment Terms
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

      <div className="flex flex-col items-center justify-center p-16">
        <h1 className="text-3xl font-bold mb-4">
          {t("")}Pay-As-You-Go Price List
        </h1>
        <h3 className="text-2xl font-bold mb-8">
          {t("")}Cultivation Equipment
        </h3>

        <div className="w-full bg-gray-300 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 font-bold p-4 min-w-[500px]">
            <div>{t("")}Service/Equipment</div>
            <div>{t("")}Price</div>
            <div>{t("")}Conditions</div>
          </div>

          {[
            {
              service: "Super Seeder (7 feet)",
              price: "Rs. 250 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Rotavator (7 feet)",
              price: "Rs. 600 per 30 mins",
              condition: "-",
            },
            {
              service: "Cultivator",
              price: "Rs. 90 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Potato Planter",
              price: "Rs. 250 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Pneumatic Planter",
              price: "Rs. 160 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Automatic Paddy Planter",
              price: "Rs. 200 per Kanal",
              condition: "-",
            },
            { service: "Trencher", price: "TBC", condition: "-" },
            { service: "Automatic Boom Sprayer", price: "TBC", condition: "-" },
            { service: "Drone Sprayer", price: "TBC", condition: "-" },
          ].map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-3 p-2 min-w-[500px] ${
                index % 2 === 0 ? "bg-white" : "bg-gray-200"
              }`}
            >
              <div>{item.service}</div>
              <div>{item.price}</div>
              <div>{item.condition}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white flex flex-col items-center justify-center p-16">
        <h1 className="text-3xl font-bold mb-8">Harvesting Equipment</h1>

        <div className="w-full bg-white overflow-x-auto">
          <div className="bg-gray-300 grid grid-cols-1 md:grid-cols-3 font-bold p-4 min-w-[500px]">
            <div>Service/Equipment</div>
            <div>Price</div>
            <div>Conditions</div>
          </div>

          {[
            {
              service: "Wheat Combine Harvester",
              price: "Rs. 250 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Paddy Combine Harvester",
              price: "Rs. 300 per Kanal",
              condition: "Minimum 4 Kanals",
            },
            {
              service: "Sugarcane Harvester",
              price: "Rs. 90 per Quintal",
              condition: "Includes Transport to Mill",
            },
            {
              service: "Automatic Potato Digger & Grader",
              price: "Rs. 2500 per Acre",
              condition: "Minimum 2 Acres",
            },
            {
              service: "Pneumatic Planter",
              price: "Rs. 160 per Kanal",
              condition: "Minimum 4 Kanals",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-3 p-4 min-w-[500px] ${
                index % 2 === 0 ? "" : "bg-gray-200"
              }`}
            >
              <div>{item.service}</div>
              <div>{item.price}</div>
              <div>{item.condition}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-16">
        <h1 className="text-3xl font-bold mb-4">Transportation Services</h1>
        <div className="w-full mt-10 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-300 font-bold p-4 min-w-[500px]">
            <div>Service/Equipment</div>
            <div>Price</div>
            <div>Conditions</div>
          </div>

          {[
            {
              service: "Trolley Bed (5 feet high)",
              price: "Rs. 300 per Km",
              condition: "-",
            },
            {
              service: "PTO Trolley for Sugarcane",
              price: "Rs. 30 per Quintal",
              condition: "-",
            },
            {
              service: "Tata 207 or UTE",
              price: "Rs. 600",
              condition: "Up to 5 Kilometers",
            },
            {
              service: "Additional Mileage Charge",
              price: "Rs. 50 per Km",
              condition: "Beyond 5 Kilometers",
            },
            {
              service: "Pneumatic Planter",
              price: "Rs. 160 per Kanal",
              condition: "Minimum 4 Kanals",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-3 p-4 min-w-[500px] ${
                index % 2 === 0 ? "" : "bg-gray-200"
              }`}
            >
              <div>{item.service}</div>
              <div>{item.price}</div>
              <div>{item.condition}</div>
            </div>
          ))}
        </div>
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
};

export default Pricing;
