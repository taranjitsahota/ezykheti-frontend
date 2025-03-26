import React from 'react'
import greenlines from '../assets/images/line_vector.png'
const about = () => {
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
                  About Us <br />
                  <br />
                </h1>
              </div>
            </div>

    </div>
  )
}

export default about