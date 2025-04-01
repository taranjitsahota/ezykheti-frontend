import React, { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wheat from "../assets/images/wheat.png";
import paymentmobile from "../assets/images/payment.png";
import tractorbooking from "../assets/images/tractorbooking.jpg";
import maps from "../assets/images/map.jpg";

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
    image: maps,
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
    slidesToShow: 3.5, // Adjust based on required visibility
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10%",  // Adjust to control how much of the next slide is visible
    arrows: false, 
    rtl: true, // Enables right-to-left mode to shift half-slide to the left
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3,
          centerPadding: "15%", 
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
};



  return (
    <div className="relative px-4 sm:px-8 py-10 bg-gray-100">
      <Slider ref={sliderRef} {...settings}>
        {services.map((item, index) => (
          <div key={index} className="px-2 sm:px-4">
            <div className="relative border border-gray-300 bg-white rounded-3xl w-full max-w-xs sm:max-w-sm h-80 overflow-hidden mx-auto">
              {/* Sharp base image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Small subtle blur overlay at the top */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover blur-sm"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0) 30%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0) 30%)",
                  }}
                />
              </div>

              <div className="absolute top-4 left-4 text-black px-3 py-1 rounded-lg z-20">
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom bottom-right arrows */}
      <div className="flex justify-center sm:justify-end gap-3 mt-4 pr-4 sm:pr-10">
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
