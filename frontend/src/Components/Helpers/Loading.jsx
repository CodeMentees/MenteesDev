import React from "react";
import ReactDOM from "react-dom";

/** Premium full-page loader — shown while lazy chunks are downloading */
export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full gap-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      {/* Sleek animated spinner */}
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-500 border-r-purple-500 animate-[spin_1s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 border-l-pink-500 animate-[spin_0.75s_linear_infinite_reverse]" />
        <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse" />
      </div>
      
      {/* Brand mark */}
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
          <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-black bg-gradient-to-br from-pink-500 to-purple-600">C</span>
          CodeMentees
        </span>
      </div>

      <p className="text-xs font-medium tracking-widest uppercase text-gray-500 animate-pulse">
        {message}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

