import { motion } from "framer-motion";

export default function HowItWorks() {
  const circles = [
    { radius: 100, duration: 6 },
    { radius: 150, duration: 8 },
    { radius: 200, duration: 10 },
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#2C2F36] to-[#1E1F23] px-4 py-10 overflow-hidden">
      {/* Rotating circles with dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full min-h-[500px] md:min-h-screen bg-gradient-to-br from-[#2C2F36] to-[#1E1F23] flex items-center justify-center">
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px]">
            {/* Circles */}
            {circles.map((circle, index) => (
              <div
                key={index}
                className="absolute border border-green-500 border-opacity-30 rounded-full"
                style={{
                  width: `${circle.radius * 2}px`,
                  height: `${circle.radius * 2}px`,
                  top: `calc(50% - ${circle.radius}px)`,
                  left: `calc(50% - ${circle.radius}px)`,
                }}
              />
            ))}

            {/* Orbiting dots */}
            {circles.map((circle, index) => (
              <motion.div
                key={index}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: circle.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 origin-center"
              >
                <div
                  className="w-3 h-3 bg-green-400 rounded-full absolute"
                  style={{
                    transform: `translate(${circle.radius}px, -50%)`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-2xl sm:text-3xl font-bold text-center leading-snug">
                How <br /> It Works
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Cards layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-16 p-6 max-w-4xl mx-auto relative z-10">
        {[
          {
            title: "Select Equipment",
            desc: "Choose from our range of agricultural machinery.",
            number: "01",
            pos: "justify-self-start self-start",
          },
          {
            title: "Pick a Plan",
            desc: "Opt for a one-time rental or an annual subscription.",
            number: "02",
            pos: "justify-self-end self-start",
          },
          {
            title: "Book & Use",
            desc: "Schedule your equipment conveniently through our app.",
            number: "03",
            pos: "justify-self-start self-end",
          },
          {
            title: "We Handle Maintenance",
            desc: "Focus on farming — we handle the rest.",
            number: "04",
            pos: "justify-self-end self-end",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-[#2C2F36] to-[#1E1F23] border border-green-500 border-opacity-80 rounded-2xl p-4 text-white shadow-md relative w-full max-w-full sm:max-w-[300px] h-36 ${item.pos}`}
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm mb-3 leading-snug">
              {item.desc}
            </p>
            <span className="absolute top-3 right-5 text-3xl font-bold text-green-400 opacity-80">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
