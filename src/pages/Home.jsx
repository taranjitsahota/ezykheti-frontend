import React from "react";
import video from "../assets/images/shaktiman-background-video.mp4";
import tractor from "../assets/images/tractor.webp";
import farmer from "../assets/images/farmer.webp";
import packages from "../assets/images/packages.webp";
import app from "../assets/images/App-image.png";
import Testimonials from "../components/Testimonials"; // adjust path if needed

const Home = () => {
  return (
    <div>
      {/* Background video section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Content over the video */}
        {/* <div className="relative z-10 flex items-center h-full text-black text-left p-4">
        <div className="p-6 rounded-xl max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ezykheti Agri Services Pvt Ltd</h1>
          <p className="text-sm w-xl md:text-base leading-relaxed">
            Ezykheti Agri Services Pvt Ltd is dedicated to transforming agriculture in Punjab by empowering farmers with innovative technology and high-end farm machinery. Our mission is to provide world-class solutions when finding farm labour is getting harder, hence enhance yields while promoting sustainable practices. We recognized the challenges faced by farmers and developed a state-of-the-art mobile app for easy access to modern farming machinery. Our commitment to exceptional service ensures that farmers can leverage advanced equipment without heavy financial burdens, ultimately helping them thrive and sustainably feed the nation.
          </p>
        </div>
      </div> */}
      </div>

      {/* Cards section below the video */}

      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-12 py-8 md:py-12 md:px-16 bg-gray-100">
        <div className="text-center">
          <img
            src={app}
            alt="Easy App Access"
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Easy App Access</h2>
          <p className="text-sm">
            Our mobile app provides Punjab farmers with seamless access to
            modern farming machinery, right at their fingertips, simplifying the
            rental process.
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
    </div>
  );
};

export default Home;
