import React, { useEffect, useState } from "react";
import { fetchSiteData } from "../../api/siteDataApi";
import Loading from "../Helpers/Loading";

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ height: "100vh" }}>
      <section style={{ position: "static" }} className="bg-dark-background">
        <div
          style={{ position: "absolute", zIndex: 2, left: "86px" }}
          className="grid max-w-6xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
        >
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              Master Coding with Ease!
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Whether you're a beginner or an experienced developer, our
              platform offers expert-led tutorials, real-world projects, and
              interactive coding challenges to help you sharpen your skills.
              Stay ahead with the latest technologies, build powerful
              applications, and join a community of passionate coders. Start
              your journey today!
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-dark-btn text-gray-100 shadow-sm hover:bg-dark-btn shadow-purple-700"
            >
              Make a call
            </a>
          </div>
          <div style={{position:"relative"}} className="lg:mt-0 lg:col-span-5 lg:flex">
            {images?.[0] ? (
              <img style={{position:"absolute",zIndex:10 ,left:50}} src={images[0]} alt="mockup" className="animate-float " />
            ) : (
              <p className="text-gray-500">Image not available</p>
            )}
            <svg
              style={{position:"absolute",top:"-60px"}}
              className="animate-float"
              id="sw-js-blob-svg"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <defs>
                {" "}
                <linearGradient id="sw-gradient" x1={0} x2={1} y1={1} y2={0}>
                  {" "}
                  <stop
                    id="stop1"
                    stopColor="rgba(205, 0, 148, 1)"
                    offset="0%"
                  />{" "}
                  <stop
                    id="stop2"
                    stopColor="rgba(112.821, 31, 251, 1)"
                    offset="100%"
                  />{" "}
                </linearGradient>{" "}
              </defs>{" "}
              <path
                fill="url(#sw-gradient)"
                d="M21.7,-26C26.5,-21.7,27.9,-13.4,30.4,-4.6C32.9,4.3,36.6,13.7,34.1,21.3C31.6,28.8,23.1,34.4,14.6,35.5C6.1,36.5,-2.3,33,-11.3,30.2C-20.3,27.3,-29.9,25,-33.3,19.2C-36.8,13.4,-34.1,3.9,-30.6,-3.6C-27.2,-11.2,-23,-16.8,-17.8,-21.1C-12.6,-25.3,-6.3,-28.1,1.1,-29.3C8.4,-30.6,16.8,-30.3,21.7,-26Z"
                width="100%"
                height="100%"
                transform="translate(50 50)"
                strokeWidth={0}
                style={{ transition: "0.3s" }}
              />{" "}
            </svg>
          </div>
        </div>

        <style>
        {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 2s ease-in-out infinite;
      }
    `}
      </style>
      </section>
    </div>
  );
}

export default Carousel;
