import React, { useEffect, useState } from "react";
import { fetchSiteData } from "../../api/siteDataApi";

function Carousel() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoPlay = true;
  const interval = 5000; // 3 seconds per slide

  // Fetch images from API
  useEffect(() => {
    const fetchSite = async () => {
      try {
        const data = await fetchSiteData();
        setImages(data.carasouls || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setLoading(false);
      }
    };
    fetchSite();
  }, []);

  // Auto-play slides
  useEffect(() => {
    if (!autoPlay || images.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  // Navigation Functions
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-4/5 justify-center items-center mx-auto">
      {/* Carousel wrapper */}
      <div className="relative h-56 my-10  overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Carousel ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            aria-current={activeIndex === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
