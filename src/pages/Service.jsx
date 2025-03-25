import React from "react";
import greenlines from "../assets/images/line_vector.png";
import tractor from "../assets/images/tenweb_media_sfqvrggfb.webp";
import wheat from "../assets/images/wheat.png";
import paymentmobile from "../assets/images/paymentmobile.png";
import tractorbooking from "../assets/images/tractorbooking.jpg";
import Trolley from "../assets/images/attachments/Trolley.jpg";
import TATA207 from "../assets/images/attachments/TATA207.png";
import superseeder from "../assets/images/attachments/super-seeder.png";
import SugarcaneHarvester from "../assets/images/attachments/SugarcaneHarvester.png";
import Shaktiman_Rotavator from "../assets/images/attachments/Shaktiman_Rotavator.png";
import PTOTrolley from "../assets/images/attachments/PTOTrolley.jpg";
import pneumaticplanter from "../assets/images/attachments/pneumatic-planter.png";
import PotatoHarvester from "../assets/images/attachments/Potato-Harvester.png";
import DroneSprayer from "../assets/images/attachments/DroneSprayer.jpeg";
import Cultivator from "../assets/images/attachments/Cultivator.jpg";
import discharrow from "../assets/images/attachments/disc-harrow.png";
import CropSprayingDrone from "../assets/images/attachments/Crop-Spraying-Drone.jpg";
import Combine from "../assets/images/attachments/Combine.jpg";
import BoomSprayer from "../assets/images/attachments/BoomSprayer.jpg";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ServiceSlider from "../components/ServiceSlider";
import Cards from "../components/Card";

const cardData = [
  {
    image: Cultivator,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: Trolley,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: TATA207,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: SugarcaneHarvester,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: Shaktiman_Rotavator,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: PTOTrolley,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: pneumaticplanter,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: PotatoHarvester,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: discharrow,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: CropSprayingDrone,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: Combine,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: DroneSprayer,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
  {
    image: BoomSprayer,
    title: "Cultivation Equipment",
    description: "Super Seeders,Rotavators,Disc  Harrows, Cultivators, Potato Planters,Pneumatic Planters,Automatic Paddy Planters",
  },
];

const services = [
  {
    title: "Crop Selection",
    image: wheat,
  },
  {
    title: "Tractor Booking",
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
            Our Services <br />
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

      <div className="w-full relative px-10 py-10 bg-gray-100">
        <p className="px-12">
          Our <span className="text-2xl font-bold">Services</span>
        </p>

        <h2 className="px-12 text-3xl font-bold mb-5">Core Services for Users</h2>
        {/* <Slider {...settings}>
          {services.map((service, index) => (
            <div key={index} className="p-3">
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover rounded-t-3xl"
                />
                <div className="p-4 text-left font-semibold text-xl">
                  {service.title}
                </div>
              </div>
            </div>
          ))}
        </Slider> */}
        <ServiceSlider />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-10 py-10 bg-white text-center gap-4">
        <p>
          Our <span className="font-bold">Equipments</span>
        </p>
        <h1 className="text-3xl font-bold">
          Equipments Available for Rent & Subscriptions
        </h1>
      </div>
      <div className="w-full px-10 py-10 flex flex-wrap justify-center gap-6">
        {cardData.map((card, index) => (
          <Cards
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
