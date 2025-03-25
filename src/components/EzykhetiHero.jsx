import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const EzykhetiHero = () => {
  const underlineRef = useRef(null);
  const isInView = useInView(underlineRef, { once: false, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        strokeDashoffset: 0,
        transition: { duration: 1.5, ease: "easeInOut" },
      });
    } else {
      controls.start({ strokeDashoffset: 300 });
    }
  }, [isInView, controls]);

  return (
    <div className="bg-white text-black w-full py-16 px-4 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug relative inline-block">
            <span className="relative inline-block">
              Ezykheti
              <svg
                ref={underlineRef}
                width="150"
                height="30"
                viewBox="0 0 150 20"
                fill="none"
                className="absolute -bottom-1 left-0"
              >
                <motion.path
                d="M5 20 C50 5, 100 35, 150 20 S250 30, 300 15 S400 40, 450 25 S550 35, 600 20"
             
              
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="300"
                  strokeDashoffset="300"
                  animate={controls}
                />
              </svg>
            </span>{" "}
            App: Your <br /> Gateway to Modern <br /> Farming
          </h1>
        </div>
        <div>
          <p className="text-lg mb-8">
            Our mobile app is designed to empower farmers with easy access to
            modern farming machinery. Book rentals or subscriptions
            effortlessly, right from your smartphone, enhancing productivity and
            efficiency.
          </p>
          <div className="flex gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-2">Select</h3>
              <p className="text-sm">
                Choose from our wide range of agricultural machinery with ease.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Book</h3>
              <p className="text-sm">
                Schedule equipment use at your convenience through our app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EzykhetiHero;
