import React from "react";

const SectionHeader = ({ title, highlight, description }) => {
  return (
    <div data-aos="flip-down" className="text-center max-w-screen-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {title}
        <span className="text-yellow-500">{highlight}</span>
      </h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default SectionHeader;
