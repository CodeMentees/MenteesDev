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

  return (
    <div
      className="min-h-screen text-white pt-24 pb-12 flex flex-col"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 50%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/events"
        title="Event Gallery | CodeMentees"
        description="Check out the highlights from CodeMentees events, workshops, and hackathons in colleges across the country."
      />

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Event <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A glimpse into our campus workshops, hackathons, and tech talks.
          </p>
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
          <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 group border border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Event highlight ${currentIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>

            {/* Gradient overlay at bottom for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-pink-600 transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
              <FaChevronLeft />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-pink-600 transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
              <FaChevronRight />
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-pink-500 w-8" : "bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA Banner ── */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(139,92,246,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              Host an Event with Us
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Want to see your campus in this gallery? We partner with colleges to bring tech workshops and seminars.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-pink-600 hover:bg-pink-500 transition-all duration-300 shadow-lg shadow-pink-600/30"
            >
              Get in Touch
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default EventGallery;
