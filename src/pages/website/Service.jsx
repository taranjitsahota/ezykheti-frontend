import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import SugarcaneTrencher from "../../assets/images/attachments/SugarcaneTrencher.jpg";
import sugarcanetrench from "../../assets/images/attachments/furrow-sugarcane-trench-ridger.jpg";
import BalerRectangular from "../../assets/images/attachments/BalerRectangular.jpg";
import PotatoPlanter from "../../assets/images/attachments/PotatoPlanter.jpg";
import Riceplanter from "../../assets/images/attachments/Riceplanter.jpg";
import wheat from "../../assets/images/wheat.png";
import paymentmobile from "../../assets/images/paymentmobile.png";
import tractorbooking from "../../assets/images/tractorbooking.jpg";
import Trolley from "../../assets/images/attachments/Trolley.jpg";
import TATA207 from "../../assets/images/attachments/TATA207.png";
import SugarcaneHarvester from "../../assets/images/attachments/SugarcaneHarvester.png";
import Shaktiman_Rotavator from "../../assets/images/attachments/Shaktiman_Rotavator.png";
import PTOTrolley from "../../assets/images/attachments/PTOTrolley.jpg";
import pneumaticplanter from "../../assets/images/attachments/pneumatic-planter.png";
import PotatoHarvester from "../../assets/images/attachments/Potato-Harvester.png";
import superseeder from "../../assets/images/attachments/super-seeder.png";
import Cultivator from "../../assets/images/attachments/Cultivator.jpg";
import discharrow from "../../assets/images/attachments/disc-harrow.png";
import CropSprayingDrone from "../../assets/images/attachments/Crop-Spraying-Drone.jpg";
import Combine from "../../assets/images/attachments/Combine.jpg";
import BoomSprayer from "../../assets/images/attachments/BoomSprayer.jpg";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceSlider from "../../components/ServiceSlider";
import Cards from "../../components/Card";
import { useTranslation } from "react-i18next";

const cardData = [
  {
    image: Cultivator,
    titleKey: "cultivator",
    descriptionKey: "cultivator_price",
  },
  {
    image: Trolley,
    titleKey: "trolley_with_pto",
    descriptionKey: "trolley_with_pto_price",
  },
  {
    image: TATA207,
    titleKey: "tata_207",
    descriptionKey: "tata_207_price",
  },
  {
    image: SugarcaneHarvester,
    titleKey: "sugarcane_harvester1",
    descriptionKey: "sugarcane_harvester_price1",
  },
  {
    image: Shaktiman_Rotavator,
    titleKey: "rotavator1",
    descriptionKey: "rotavator_price1",
  },
  {
    image: PTOTrolley,
    titleKey: "pto_trolley",
    descriptionKey: "pto_trolley_price",
  },
  {
    image: pneumaticplanter,
    titleKey: "pneumatic_planter",
    descriptionKey: "pneumatic_planter_price",
  },
  {
    image: PotatoHarvester,
    titleKey: "automatic_potato_digger_and_loader",
    descriptionKey: "automatic_potato_digger_and_loader_price",
  },
  {
    image: discharrow,
    titleKey: "disc_harrow",
    descriptionKey: "disc_harrow_price",
  },
  {
    image: CropSprayingDrone,
    titleKey: "drone_spraying",
    descriptionKey: "drone_spraying_price",
  },
  {
    image: Combine,
    titleKey: "combine_harvester",
    descriptionKey: "combine_harvester_price",
  },
  {
    image: superseeder,
    titleKey: "super_seeder1",
    descriptionKey: "super_seeder_price1",
  },
  {
    image: BoomSprayer,
    titleKey: "tractor_mounted_boom_sprayer",
    descriptionKey: "tractor_mounted_boom_sprayer_price",
  },
  {
    image: Riceplanter,
    titleKey: "rice_planter",
    descriptionKey: "rice_planter_price",
  },
  {
    image: PotatoPlanter,
    titleKey: "potato_planter",
    descriptionKey: "potato_planter_price",
  },
  // {
  //   image: BalerRectangular,
  //   titleKey: "baler_rectangular",
  //   price: "TBC",
  //   descriptionKey: "baler_rectangular_price",
  // },
  {
    image: sugarcanetrench,
    titleKey: "sugar_cane_trench",
    descriptionKey: "sugar_cane_trench_price",
  },
  {
    image: SugarcaneTrencher,
    titleKey: "sugar_cane_trencher",
    descriptionKey: "sugar_cane_trencher_price",
  },
];

const services = [
  {
    title: "Crop Selection",
    image: wheat,
  },
  {
    title: "Live View of Service on your mobile",
    image: tractorbooking,
  },
  {
    title: "Real-time Tracking",
    image: paymentmobile,
  },
  {
    title: "Flexible Payment Options",
    image: paymentmobile,
  },
];

const CustomPrevArrow = (props) => (
  <div
    onClick={props.onClick}
    className="absolute left-[-50px] top-[50%] transform -translate-y-1/2 cursor-pointer border border-green-500 rounded-full p-2 hover:bg-green-100 z-10"
  >
    <ArrowLeft className="text-green-500" />
  </div>
);

const CustomNextArrow = (props) => (
  <div
    onClick={props.onClick}
    className="absolute right-[-50px] top-[50%] transform -translate-y-1/2 cursor-pointer border border-green-500 rounded-full p-2 hover:bg-green-100 z-10"
  >
    <ArrowRight className="text-green-500" />
  </div>
);

const Service = () => {
  const { i18n, t } = useTranslation();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

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
            {t("our_services_header")} <br />
            <br />
          </h1>
        </div>
      </div>

      <div className="w-full relative px-10 py-10 bg-gray-100">
        <p className="px-12">
          Our <span className="text-2xl font-bold">Services</span>
        </p>

        <h2 className="px-12 text-3xl font-bold mb-5">{t("core_services")}</h2>

        <ServiceSlider />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-10 py-10 bg-white text-center gap-4">
        <p>
          {t("our")} <span className="font-bold">{t("equipments")}</span>
        </p>
        <h1 className="text-3xl font-bold">{t("our_equipments")}</h1>
      </div>
      <div className="w-full px-10 py-10 flex flex-wrap justify-center gap-6">
        {cardData.map((card, index) => (
          <Cards
            key={index}
            image={card.image}
            title={card.titleKey}
            description={card.descriptionKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
