import React, { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wheat from "../assets/images/wheat.png";
import paymentmobile from "../assets/images/paymentmobile.png";
import tractorbooking from "../assets/images/tractorbooking.jpg";

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
    image: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    isIllustration: true,
  },
  {
    title: "Flexible Payment Options",
    image: paymentmobile,
    isIllustration: true,
  },
];

const ServiceCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // hide default arrows
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative px-8 py-10 bg-gray-100">
      <Slider ref={sliderRef} {...settings}>
        {services.map((item, index) => (
          <div key={index} className="px-4">
            <div className="relative bg-white rounded-2xl w-64 h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-opacity-50 text-black px-3 py-1 rounded-lg">
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* <Slider ref={sliderRef} {...settings}>
        {services.map((item, index) => (
          <div key={index} className="px-4">
            <div className="relative bg-white rounded-2xl overflow-hidden w-64 h-64 shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider> */}

      {/* Custom bottom-right arrows */}
      <div className="flex justify-end gap-3 mt-4 pr-10">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="bg-white border border-green-500 rounded-full p-2 hover:bg-green-500 hover:text-white transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="bg-white border border-green-500 rounded-full p-2 hover:bg-green-500 hover:text-white transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceCarousel;
