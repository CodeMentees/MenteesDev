import React from "react";

const InfoCard = ({ image, title, buttonText, buttonStyle, onClick }) => {
  return (
    <div className="relative md:w-5/12">
      <img className="rounded-2xl" src={image} alt={title} loading="lazy" />
      <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">
            {title}
          </h1>
          <button
            className={`rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out ${buttonStyle}`}
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
