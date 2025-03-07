import React from "react";
import { Designer } from "../../assets/mainPage";


const WorkshopCard = ({ imageUrl, title, description, date, time, buttonText, buttonLink }) => {
  return (
    <div data-aos="zoom-in" className="max-w-xs container bg-dark-background border border-blue-900 shadow-indigo-700  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${Designer})` }}
      ></div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-800 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>

        {/* Date and Time */}
        <div className="flex items-center text-sm text-dark-text mb-4">
          <svg
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>
            {date} | {time}
          </span>
        </div>

        {/* Call-to-Action Button */}
        <a
          href={buttonLink}
          className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default WorkshopCard;