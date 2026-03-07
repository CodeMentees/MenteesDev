import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaClock } from "react-icons/fa";

const BlogPromoSidebar = () => {
    // Set target date to 24 hours from now (simulated offer timeframe)
    // To make it persist somewhat, we could store the end time in localStorage
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59,
    });

    useEffect(() => {
        // Initialize target time 24 hours from first mount, store in sessionStorage
        // so it doesn't reset on every page navigation within the same session
        let targetTime = sessionStorage.getItem("promoEndTime");
        if (!targetTime) {
            targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            sessionStorage.setItem("promoEndTime", targetTime);
        }

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <aside className="w-full lg:w-72 shrink-0 sticky top-28 self-start">
            <div>
                <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden border border-indigo-700/50">

                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">

                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                            <FaUserPlus className="text-3xl text-pink-400" />
                        </div>

                        <h3 className="text-2xl font-black mb-2 tracking-tight">
                            Join our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Live Course</span>
                        </h3>

                        <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                            Master Full-Stack Development and AI with IIT/IIIT alumni and MNC experts.
                        </p>

                        {/* Timer Section */}
                        <div className="w-full bg-black/30 rounded-2xl p-4 mb-6 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2 mb-3 text-pink-300 font-semibold text-xs uppercase tracking-widest">
                                <FaClock className="text-sm" />
                                <span>Before Offer Ends</span>
                            </div>

                            <div className="flex justify-center gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.hours)}
                                    </div>
                                    <span className="text-[10px] uppercase text-indigo-300 mt-2 font-medium tracking-wider">Hours</span>
                                </div>
                                <div className="text-xl font-bold text-white/50 mt-2 flex">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.minutes)}
                                    </div>
                                    <span className="text-[10px] uppercase text-indigo-300 mt-2 font-medium tracking-wider">Mins</span>
                                </div>
                                <div className="text-xl font-bold text-white/50 mt-2 flex">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.seconds)}
                                    </div>
                                    <span className="text-[10px] uppercase text-indigo-300 mt-2 font-medium tracking-wider">Secs</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/courses"
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-pink-500/50 active:translate-y-0"
                        >
                            Join Now
                        </Link>

                        <span className="text-xs text-indigo-300 mt-4 font-medium">Limited seats available</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default BlogPromoSidebar;
