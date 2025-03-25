import React from 'react'

const Card = ({ image, title, description }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full sm:w-60 md:w-64 lg:w-72 transition-transform hover:scale-105">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        
        <div className="h-px bg-gray-300 w-full"></div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      
    );
  };
  
  export default Card;
  