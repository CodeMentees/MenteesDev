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
        // Calculate the next midnight for a consistent daily countdown
        // This prevents the timer from randomly resetting on every page refresh
        const now = new Date();
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime();

        const timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const distance = targetTime - currentTime;

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
        <aside className="w-full xl:w-72 shrink-0 sticky top-28 self-start">
            <div>
                <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden border border-indigo-700/50">

                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">

                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner">
                            <FaUserPlus className="text-xl text-pink-400" />
                        </div>

                        <h3 className="text-xl font-black mb-1 tracking-tight">
                            Join our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Live Course</span>
                        </h3>

                        <p className="text-indigo-200 text-xs mb-5 leading-relaxed">
                            Master Full-Stack Development and AI with IIT/IIIT alumni and MNC experts.
                        </p>

                        {/* Timer Section */}
                        <div className="w-full bg-black/30 rounded-xl p-3 mb-5 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300 font-semibold text-[10px] uppercase tracking-widest">
                                <FaClock className="text-xs" />
                                <span>Before Offer Ends</span>
                            </div>

                            <div className="flex justify-center gap-2">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.hours)}
                                    </div>
                                    <span className="text-[9px] uppercase text-indigo-300 mt-1 font-medium tracking-wider">Hours</span>
                                </div>
                                <div className="text-lg font-bold text-white/50 mt-1 flex">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.minutes)}
                                    </div>
                                    <span className="text-[9px] uppercase text-indigo-300 mt-1 font-medium tracking-wider">Mins</span>
                                </div>
                                <div className="text-lg font-bold text-white/50 mt-1 flex">:</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg font-bold font-mono shadow-inner border border-white/5">
                                        {formatTime(timeLeft.seconds)}
                                    </div>
                                    <span className="text-[9px] uppercase text-indigo-300 mt-1 font-medium tracking-wider">Secs</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/courses"
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white rounded-lg font-bold text-xs shadow-lg shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-pink-500/50 active:translate-y-0"
                        >
                            Join Now
                        </Link>

                        <span className="text-[10px] text-indigo-300 mt-3 font-medium">Limited seats available</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default BlogPromoSidebar;
