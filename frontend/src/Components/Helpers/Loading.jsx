import React from "react";
import { motion } from "framer-motion";

const dotVariants = {
  jump: {
    y: "-30px",
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  jump: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/** Premium full-page loader — shown while lazy chunks are downloading */
export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full gap-12 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      
      {/* Jumping Dots Loader */}
      <motion.div
        className="flex justify-center items-center gap-[10px]"
        variants={containerVariants}
        initial="initial"
        animate="jump"
      >
        <motion.div 
          className="w-5 h-5 rounded-full" 
          style={{ backgroundColor: "#ff0088", willChange: "transform" }}
          variants={dotVariants} 
        />
        <motion.div 
          className="w-5 h-5 rounded-full" 
          style={{ backgroundColor: "#ff0088", willChange: "transform" }}
          variants={dotVariants} 
        />
        <motion.div 
          className="w-5 h-5 rounded-full" 
          style={{ backgroundColor: "#ff0088", willChange: "transform" }}
          variants={dotVariants} 
        />
      </motion.div>
      
      {/* Brand mark & Message */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
          <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-black bg-gradient-to-br from-pink-500 to-purple-600">C</span>
          CodeMentees
        </span>
        <p className="text-xs font-medium tracking-widest uppercase text-gray-500 animate-pulse mt-1">
          {message}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
