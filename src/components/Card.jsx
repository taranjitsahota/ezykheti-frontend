import React from 'react'
import { useTranslation } from "react-i18next";


const Card = ({ image, title, description }) => {
    const { i18n, t } = useTranslation();
  
    return (
      console.log(title),
        <div className="bg-white rounded-4xl  overflow-hidden w-full border border-gray-300 sm:w-60 md:w-64 lg:w-72 transition-transform hover:scale-105">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        
        <div className="h-px bg-gray-300 w-full"></div>
        
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{t(title)}</h2>
          <p className="text-gray-600 text-sm">{t(description)}</p>
        </div>
      </div>
      
    );
  };
  
  export default Card;
  