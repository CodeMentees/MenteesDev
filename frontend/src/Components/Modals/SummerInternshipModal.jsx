import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SummerInternshipModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown in this session
    const hasSeenModal = sessionStorage.getItem("hasSeenInternshipModal");
    if (!hasSeenModal) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenInternshipModal", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl">
        {/* Close Button — outside overflow-hidden so it's never clipped */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 rounded-full p-2 transition-colors z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Inner card — overflow-hidden for decorative blurs, close button is safely outside */}
        <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl shadow-purple-900/50 overflow-hidden transform transition-all animate-float">
          {/* Decorative Gradients */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/30 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="p-8 md:p-10 text-center relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 transform -rotate-6">
              <span className="text-4xl">🚀</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Summer Training & Internships
            </h2>

            <p className="text-lg text-gray-300 mb-6 font-light">
              Elevate your career with our exclusive industrial training programs. Work on real projects, master top tech stacks, and get certified!
            </p>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8">
              <p className="text-yellow-400 font-medium">
                🌟 Government Authorised Certifications & LORs Available
              </p>
            </div>

            <Link
              to="/summer-internships"
              onClick={() => setIsOpen(false)}
              className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/50 transform hover:-translate-y-1 transition-all text-lg"
            >
              Apply Now
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="block w-full sm:w-auto mt-4 mx-auto text-gray-400 hover:text-gray-200 transition-colors text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummerInternshipModal;
