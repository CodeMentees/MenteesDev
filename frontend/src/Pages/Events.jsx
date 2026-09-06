import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvent } from "../api/eventApi";
import SEOHead from "../seo/SEOHead";
import Loading from "../Components/Helpers/Loading";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";

const EventGallery = () => {
  const { fetchEventGallery } = useEvent();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetchEventGallery();
        if (response && response.images) {
          setImages(response.images);
        }
      } catch (err) {
        console.error("Failed to load event gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  // Auto-play the slideshow
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Helper to calculate variants for the 3D Carousel
  const getVariants = (i) => {
    const difference = i - currentIndex;
    const total = images.length;
    
    // Handle wrap-around for infinite carousel effect
    let offset = difference;
    if (difference < -2) offset += total;
    if (difference > 2) offset -= total;

    // Center image
    if (offset === 0) {
      return {
        x: "0%",
        scale: 1,
        zIndex: 5,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px) brightness(1)",
      };
    }
    // First neighbor (Left)
    if (offset === -1) {
      return {
        x: "-40%",
        scale: 0.8,
        zIndex: 4,
        opacity: 0.8,
        rotateY: 15,
        filter: "blur(2px) brightness(0.6)",
      };
    }
    // First neighbor (Right)
    if (offset === 1) {
      return {
        x: "40%",
        scale: 0.8,
        zIndex: 4,
        opacity: 0.8,
        rotateY: -15,
        filter: "blur(2px) brightness(0.6)",
      };
    }
    // Second neighbor (Left)
    if (offset === -2) {
      return {
        x: "-70%",
        scale: 0.6,
        zIndex: 3,
        opacity: 0.4,
        rotateY: 25,
        filter: "blur(4px) brightness(0.4)",
      };
    }
    // Second neighbor (Right)
    if (offset === 2) {
      return {
        x: "70%",
        scale: 0.6,
        zIndex: 3,
        opacity: 0.4,
        rotateY: -25,
        filter: "blur(4px) brightness(0.4)",
      };
    }

    // Hidden behind
    return {
      x: "0%",
      scale: 0.4,
      zIndex: 1,
      opacity: 0,
      rotateY: 0,
      filter: "blur(10px) brightness(0)",
    };
  };

  return (
    <div
      className="min-h-screen text-white pt-24 pb-12 flex flex-col overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 50%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/events"
        title="Event Gallery | CodeMentees"
        description="Check out the highlights from CodeMentees events, workshops, and hackathons in colleges across the country."
      />

      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-bold tracking-widest uppercase mb-4"
          >
            Memories in Motion
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-4"
          >
            Event <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
          >
            A glimpse into our campus workshops, hackathons, and epic tech talks.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loading />
          </div>
        ) : images.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <p>No event images found in the gallery.</p>
          </div>
        ) : (
          <div className="relative w-full py-10 flex items-center justify-center perspective-[1200px]">
            {/* The 3D Carousel container */}
            <div className="relative w-full max-w-3xl aspect-[16/10] md:aspect-video flex items-center justify-center">
              {images.map((src, i) => {
                const variants = getVariants(i);
                // Only render items that are visible or slightly adjacent to keep DOM light
                if (variants.opacity === 0) return null;
                
                return (
                  <motion.div
                    key={src}
                    animate={variants}
                    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                    className="absolute w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: variants.scale === 1 ? "0 25px 50px -12px rgba(236, 72, 153, 0.25)" : "0 10px 30px -10px rgba(0,0,0,0.5)",
                      border: variants.scale === 1 ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.05)"
                    }}
                    onClick={() => setCurrentIndex(i)}
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt={`Event highlight ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Glossy overlay effect for the center image */}
                    {variants.scale === 1 && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-50 pointer-events-none" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-6xl flex justify-between px-4 md:px-0 pointer-events-none z-20">
              <button
                onClick={handlePrev}
                className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-pink-600 hover:border-pink-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
              >
                <FaChevronLeft className="text-xl md:text-2xl ml-[-2px]" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-pink-600 hover:border-pink-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
              >
                <FaChevronRight className="text-xl md:text-2xl ml-[2px]" />
              </button>
            </div>
            
            {/* Progress/Indicator dots */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentIndex 
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 w-10 shadow-[0_0_10px_rgba(236,72,153,0.5)]" 
                      : "bg-white/20 hover:bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA Banner ── */}
        <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Animated hover glow inside the CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                See your campus in our next gallery. We partner with colleges to bring hands-on tech workshops, hackathons, and industry seminars.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                Let's Make it Happen
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default EventGallery;
