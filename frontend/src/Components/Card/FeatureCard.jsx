import React from "react";
const FeatureCard = ({ bgColor, title, description, delay, icon }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-white shadow-xl p-6 text-center rounded-xl"
    >
      <div
        style={{ background: bgColor }}
        className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
      >
        {icon}
      </div>
      <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">{title}</h1>
      <p className="px-4 text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;
