import React from "react";
import { Helmet } from "react-helmet-async";
import { FaCode, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SchoolCoding = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-dark-background min-h-screen text-white pt-[22px] pb-12 font-sans relative">
            <Helmet>
                <title>School Coding Curriculum | CodeMentees</title>
                <meta name="description" content="Explore our comprehensive K-12 computer science curriculum designed for schools and districts." />
            </Helmet>

            {/* AI Animated Banner - Cinematic Entry */}
            <style>
                {`
                    @keyframes wordPop {
                        0% { opacity: 0; transform: translateY(10px) scale(0.95); filter: blur(3px); }
                        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                    }
                    @keyframes slideUp {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-word {
                        display: inline-block;
                        animation: wordPop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        font-family: 'Outfit', sans-serif;
                    }
                    .animate-slide-up {
                        animation: slideUp 1s ease-out forwards;
                    }
                `}
            </style>

            {/* AI is Reshaping Section - Cinematic Entry */}
            <div className="pt-24 pb-12 flex justify-center">
                <div className="text-center px-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
                        Future of Education
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight overflow-hidden">
                        {[
                            { text: "AI", type: "normal" },
                            { text: "IS", type: "normal" },
                            { text: "RESHAPING", type: "gradient" },
                            { text: "THE", type: "normal" },
                            { text: "WORLD", type: "normal" }
                        ].map((word, i) => (
                            <span
                                key={i}
                                className={`inline-block animate-word mx-2 ${word.type === "gradient"
                                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                                    : ""
                                    }`}
                                style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
                            >
                                {word.text}
                            </span>
                        ))}
                    </h1>
                    <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base">
                        {"Education must lead what comes next".split(" ").map((word, i) => (
                            <span
                                key={i}
                                className="inline-block animate-word mx-1"
                                style={{ animationDelay: `${0.8 + i * 0.1}s`, opacity: 0 }}
                            >
                                {word}
                            </span>
                        ))}
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative pt-10 pb-32">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-blue-600 px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                K-12 Educational Excellence
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1]">
                            The World's Best <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                                School Coding
                            </span><br />
                            Curriculum
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg font-medium">
                            Empower your students with our modular, industry-aligned curriculum. Designed by educators, for educators, to make computer science accessible to everyone.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => {
                                    navigate("/contact");
                                    window.scrollTo(0, 0);
                                }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center gap-3"
                            >
                                Try a Free Lesson <FaArrowRight />
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/school-coding/catalog");
                                    window.scrollTo(0, 0);
                                }}
                                className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl font-bold transition-all"
                            >
                                Browse Courses...
                            </button>
                        </div>
                    </div>
                    {/* Hero Image Component */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#0B0F19] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="/images/school_coding_hero_new.png"
                                alt="School Coding Hero"
                                className="w-full aspect-video object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Impact Section */}
            <div className="py-24 bg-[#0a0f1a] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Global Impact</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                CodeMentees is more than just a curriculum provider. We are a global movement dedicated to bringing high-quality tech education to every classroom.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-2xl backdrop-blur-sm">
                                <div className="text-4xl font-black text-blue-500 mb-2">2M+</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Students Reached</div>
                            </div>
                            <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-2xl backdrop-blur-sm">
                                <div className="text-4xl font-black text-pink-500 mb-2">500+</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Schools Partnered</div>
                            </div>
                            <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-2xl backdrop-blur-sm">
                                <div className="text-4xl font-black text-purple-500 mb-2">150+</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Course Modules</div>
                            </div>
                            <div className="bg-gray-800/30 border border-gray-700/50 p-8 rounded-2xl backdrop-blur-sm">
                                <div className="text-4xl font-black text-green-500 mb-2">98%</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Teacher Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Built for Student Success Section */}
            <div className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 relative order-2 lg:order-1">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-[2.5rem] blur opacity-20"></div>
                            <img
                                src="/images/school_coding_success.png"
                                alt="Student Success"
                                className="relative rounded-[2.5rem] border border-white/10 shadow-2xl w-full"
                            />
                        </div>
                        <div className="flex-1 space-y-8 order-1 lg:order-2">
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">
                                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Student Success</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed">
                                Our interactive curriculum turns abstract concepts into real-world creations. From building games to AI, students stay engaged and inspired.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Project-based learning with instant feedback",
                                    "Industry-standard tools and languages",
                                    "Progress tracking and achievement badges"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empowering Educators Section */}
            <div className="py-32 bg-[#0a0f1a] relative border-y border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">
                                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Educators</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed">
                                You don't need a CS degree to teach world-class coding. Our comprehensive platform provides all the tools you need to succeed in the classroom.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { title: "Lesson Plans", desc: "Detailed, step-by-step guides" },
                                    { title: "Auto-Grading", desc: "Save hours on assessment" },
                                    { title: "Teacher Training", desc: "Professional development" },
                                    { title: "Class Insights", desc: "Real-time student metrics" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 bg-gray-800/20 border border-gray-700/50 rounded-2xl">
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <img
                                src="/images/school_coding_educators.png"
                                alt="Empowering Educators"
                                className="rounded-[2.5rem] border border-white/10 shadow-2xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum Call To Action */}
            <div className="py-24 bg-gradient-to-b from-[#0a0f1a] to-[#050810] relative overflow-hidden border-t border-gray-800/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold tracking-widest uppercase mb-6">
                        Explore Requirements
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        Ready to see what your students <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">will build next?</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        Browse our full curriculum catalog featuring over 150+ interactive modules spanning from elementary block-coding to high school machine learning.
                    </p>

                    <button
                        onClick={() => {
                            navigate("/school-coding/catalog");
                            window.scrollTo(0, 0);
                        }}
                        className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-black text-lg transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-4 mx-auto group"
                    >
                        Browse Full Curriculum Catalog
                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-2"><FaCode /> Python, Java, Web</span>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-500" /> K-12 Aligned</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolCoding;
