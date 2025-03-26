import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import video from "../assets/images/shaktiman-background-video.mp4";
import tractor from "../assets/images/tractor.webp";
import greenlines from "../assets/images/line_vector.png";
import tractorcards from "../assets/images/image.jpg";
import farmer from "../assets/images/farmer.webp";
import packages from "../assets/images/packages.webp";
import app from "../assets/images/App-image.png";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import SubscriptionPlans from "../components/SubscriptionPlans";
import LoopingYoutube from "../components/LoopingYouTube";
import EzykhetiHero from "../components/EzykhetiHero";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div>
      {/* Background video section */}
      <LoopingYoutube />
      
      <div className="relative flex flex-col items-center justify-center text-center mb-10 sm:mb-14 md:mb-20 lg:mb-25">
              <div
                className="h-full absolute inset-0 bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${greenlines})`,
                  backgroundSize: "cover",
                  backgroundPosition: "bottom",
                  // opacity: ,
                  zIndex: -1,
                }}
              ></div>
      
              <div data-aos="slide-up" className=" gap-4">
                {/* Content */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
                Empowering Farmers <br />
            with Affordable Agricultural <br />
            Solutions
                </h1>
                <p className="text-md md:text-lg text-gray-700 max-w-5xl leading-relaxed mb-8 px-4">
            Ezykheti Agri Services is dedicated to transforming agriculture in
             by empowering farmers with innovative technology and high-end
            farm machinery. Our mission is to provide world-class solutions when
            finding farm labour is getting harder, hence enhance yields while
            promoting sustainable practices. We recognized the challenges faced
            by farmers and developed a state-of-the-art mobile app for easy
            access to modern farming machinery. Our commitment to exceptional
            service ensures that farmers can leverage advanced equipment without
            heavy financial burdens, ultimately helping them thrive and
            sustainably feed the nation.
          </p>

          <button
              onClick={() => navigate("/registration")}
            className="cursor-pointer rounded-full px-5 py-2 border border-gray-400 text-green-400  hover:bg-[#32cd32] hover:text-white transition-all duration-300"
          >
            Register Now
          </button>
      
              </div>
            </div>
      {/* Cards section below the video */}

      <div
        data-aos="fade-up"
        className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-12 py-4 md:py-22 md:px-12  bg-gray-100"
      >
        <div className="text-center">
          <img
            src={app}
            alt="Easy App Access"
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Easy App Access</h2>
          <p className="text-sm">
            Our mobile app provides farmers with seamless access to modern
            farming machinery, right at their fingertips, simplifying the rental
            process.
          </p>
        </div>
        <div className="text-center">
          <img
            src={tractor}
            alt="Modern Machinery"
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Modern Machinery</h2>
          <p className="text-sm">
            EzyKheti offers access to a wide range of modern farming machinery,
            enabling farmers to improve efficiency and productivity on their
            farms.
          </p>
        </div>
        <div className="text-center">
          <img
            src={farmer}
            alt="Simple Booking"
            className="w-full h-48 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Simple Booking</h2>
          <p className="text-sm">
            Our booking service makes renting machinery straightforward,
            allowing farmers to quickly secure the equipment they need, when
            they need it.
          </p>
        </div>
        <div className="text-center">
          <img
            src={packages}
            alt="Subscription Plans"
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Subscription Plans</h2>
          <p className="text-sm">
            EzyKheti's subscription plans provide cost-effective access to
            farming machinery, helping farmers manage expenses and improve their
            bottom line.
          </p>
        </div>
      </div>
      <Testimonials />

      <div
        className="w-full flex flex-col items-center justify-center px-10 py-16 bg-no-repeat"
        style={{
          backgroundImage: `url(${tractorcards})`,
          backgroundSize: "100%", // Slight zoom for fullness
          backgroundPosition: "center 100%", // Pulls more of the lower part of the image
          height: "700px",
        }}
      >
        <div data-aos="fade-up" className="mt-10 py-10">
          <h1 className="text-5xl text-white font-extrabold text-center -mt-28 mb-10 tracking-wide drop-shadow-2xl underline decoration-4 px-6 py-2 rounded-xl backdrop-blur-xl bg-[#2C2C2C]/80 w-fit mx-auto">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
              E
            </span>
            zyKheti?
          </h1>
        </div>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full px-10"
        >
          {[
            {
              title: "Affordable Access",
              desc: "No need for large capital investment; pay only when you use the equipment.",
            },
            {
              title: "State-of-the-Art Machinery",
              desc: "Regularly maintained and upgraded to ensure peak performance.",
            },
            {
              title: "Designed for Farmers",
              desc: "Specifically tailored to the needs of  farmers.",
            },
            {
              title: "Flexible Plans",
              desc: "Choose between pay-as-you-go or annual subscription for continuous service.",
            },
            {
              title: "Increased Productivity & Profitability",
              desc: "Enhance efficiency, reduce labor dependency, and maximize yield.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-white rounded-3xl p-6 flex flex-col gap-2 shadow-lg relative items-center text-center"
              style={{ backgroundColor: "#2C2C2C", opacity: 0.9 }}
            >
              <div className="w-4 h-4 bg-green-500 rounded-full absolute top-4 left-4" />
              <h3 className="text-lg font-bold mt-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <HowItWorks />
      <EzykhetiHero />
      {/* <SubscriptionPlans /> */}
    </div>
  );
};

export default Home;
