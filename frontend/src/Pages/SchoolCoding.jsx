import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaChevronDown, FaClock, FaGraduationCap, FaCode, FaTimes, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSchoolCourseAPI } from "../api/schoolCourseApi";
import Loading from "../Components/Helpers/Loading";
import { getDirectImageUrl, handleImageError, FALLBACK_IMAGE_URL } from "../utils/imageUtils";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm shadow-2xl overflow-y-auto">
            <div className="bg-dark-card border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <div className="sticky top-0 bg-dark-card/95 backdrop-blur-md border-b border-gray-700 p-6 flex justify-between items-center z-10">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent italic">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};


const SchoolCoding = () => {
    const { fetchSchoolCourses } = useSchoolCourseAPI();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [levelFilter, setLevelFilter] = useState("All Grade Levels");
    const [durationFilter, setDurationFilter] = useState("All Durations");
    const [languageFilter, setLanguageFilter] = useState("All Languages");

    // State for Modals
    const [modalType, setModalType] = useState(null); // 'units' or 'syllabus'
    const [selectedCourse, setSelectedCourse] = useState(null);



    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await fetchSchoolCourses();
                // Ensure we handle both { data: [...] } and directly [...] formats if they change
                if (response && response.data) {
                    setCourses(Array.isArray(response.data) ? response.data : []);
                } else if (Array.isArray(response)) {
                    setCourses(response);
                } else {
                    setCourses([]);
                }
            } catch (error) {
                console.error("Error fetching school courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    // Options
    const levels = ["All Grade Levels", "Elementary", "Middle School", "High School"];
    const durations = ["All Durations", "Full Year", "Semester", "Quarter"];
    const languages = ["All Languages", "Python", "Java", "JavaScript", "Scratch", "HTML/CSS"];

    // Filter Logic
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch = !searchQuery ||
                course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLevel = levelFilter === "All Grade Levels" || course.level === levelFilter;
            const matchesDuration = durationFilter === "All Durations" || course.duration === durationFilter;
            const matchesLanguage = languageFilter === "All Languages" ||
                course.language?.toLowerCase().includes(languageFilter.toLowerCase());

            return matchesSearch && matchesLevel && matchesDuration && matchesLanguage;
        });
    }, [courses, searchQuery, levelFilter, durationFilter, languageFilter]);

    if (loading) return <Loading />;

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
                                    navigate("/contact");
                                    window.scrollTo(0, 0);
                                }}
                                className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl font-bold transition-all"
                            >
                                For Schools & Districts
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

            {/* Filter Bar */}
            <div className="bg-dark-background py-6 border-b border-transparent">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="transition-all duration-500 space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="relative w-full lg:w-96 group">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title, description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#111827] border border-gray-700 rounded-2xl pl-12 pr-6 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-600 py-3.5"
                                />
                            </div>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                {/* Level Filter */}
                                <div className="relative group">
                                    <select
                                        value={levelFilter}
                                        onChange={(e) => setLevelFilter(e.target.value)}
                                        className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-pink-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3"
                                    >
                                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-pink-400 transition-colors" />
                                </div>

                                {/* Duration Filter */}
                                <div className="relative group">
                                    <select
                                        value={durationFilter}
                                        onChange={(e) => setDurationFilter(e.target.value)}
                                        className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3"
                                    >
                                        {durations.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-blue-400 transition-colors" />
                                </div>

                                {/* Language Filter */}
                                <div className="relative group">
                                    <select
                                        value={languageFilter}
                                        onChange={(e) => setLanguageFilter(e.target.value)}
                                        className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3"
                                    >
                                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                    </select>
                                    <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-purple-400 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Filter Summary & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-800/50 pt-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/20">
                                    {filteredCourses.length} Courses Found
                                </span>
                                {(searchQuery || levelFilter !== "All Grade Levels" || durationFilter !== "All Durations" || languageFilter !== "All Languages") && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setLevelFilter("All Grade Levels");
                                            setDurationFilter("All Durations");
                                            setLanguageFilter("All Languages");
                                        }}
                                        className="text-gray-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded-full"
                                    >
                                        <FaTimes size={12} />
                                        Clear Filters
                                    </button>
                                )}
                            </div>

                            <div className="hidden sm:flex gap-2">
                                {levelFilter !== "All Grade Levels" && (
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border border-gray-800 px-2 py-0.5 rounded bg-gray-800/50">Level: {levelFilter}</span>
                                )}
                                {durationFilter !== "All Durations" && (
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border border-gray-800 px-2 py-0.5 rounded bg-gray-800/50">Duration: {durationFilter}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <p className="text-gray-400 font-medium">
                        Showing <span className="text-white font-bold">{filteredCourses.length}</span> results
                    </p>
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-dark-card border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 group flex flex-col shadow-lg hover:shadow-pink-500/10"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={getDirectImageUrl(course.image)}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => handleImageError(e, FALLBACK_IMAGE_URL)}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400/30">
                                            {course.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {course.description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="space-y-3 mb-8 text-sm">
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <FaGraduationCap className="text-blue-500" />
                                            <span>Level: <span className="text-white font-medium">{course.level}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <FaClock className="text-pink-500" />
                                            <span>Duration: <span className="text-white font-medium">{course.duration}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <FaCode className="text-orange-500" />
                                            <span>Language: <span className="text-white font-medium">{course.language}</span></span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-800">
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setModalType('units');
                                            }}
                                            className="text-sm font-bold text-gray-300 hover:text-white transition-colors py-2.5 px-4 rounded-xl border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50"
                                        >
                                            View Units
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setModalType('syllabus');
                                            }}
                                            className="text-sm font-bold text-blue-400 hover:text-white transition-all py-2.5 px-4 rounded-xl border border-blue-500/30 hover:bg-blue-600 shadow-md hover:shadow-blue-500/20"
                                        >
                                            View Syllabus
                                        </button>
                                        {user?.isAdmin ? (
                                            <button
                                                onClick={() => navigate(`/school-courses/edit/${course._id}`)}
                                                className="col-span-2 text-sm font-bold text-green-400 hover:text-white transition-all py-2.5 px-4 rounded-xl border border-green-500/30 hover:bg-green-600 shadow-md hover:shadow-green-500/20 mt-2"
                                            >
                                                Edit Course
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => navigate('/contact')}
                                                className="col-span-2 text-sm font-bold text-pink-400 hover:text-white transition-all py-2.5 px-4 rounded-xl border border-pink-500/30 hover:bg-pink-600 shadow-md hover:shadow-pink-500/20 mt-2"
                                            >
                                                Register Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-dark-card rounded-3xl border border-gray-800 shadow-inner max-w-2xl mx-auto border-dashed">
                        <div className="bg-gray-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <FaSearch className="text-gray-600" size={40} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">No Courses Found</h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed text-lg">
                            We couldn't find any courses matching your current search or filters. Try adjusting your criteria or start fresh.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setLevelFilter("All Grade Levels");
                                setDurationFilter("All Durations");
                                setLanguageFilter("All Languages");
                            }}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center gap-3 mx-auto"
                        >
                            <FaTimes size={18} />
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <Modal
                isOpen={modalType === 'units'}
                onClose={() => setModalType(null)}
                title={`Course Units: ${selectedCourse?.title}`}
            >
                <div className="space-y-8">
                    {selectedCourse?.units?.length > 0 ? (
                        selectedCourse.units.map((unit, index) => (
                            <div key={index} className="flex gap-6 items-start group">
                                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 text-blue-400 font-bold min-w-[3.5rem] h-[3.5rem] flex items-center justify-center text-xl shadow-lg group-hover:border-blue-500/50 transition-colors">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{unit.title}</h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">{unit.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center italic">No units defined for this course.</p>
                    )}
                </div>
            </Modal>

            <Modal
                isOpen={modalType === 'syllabus'}
                onClose={() => setModalType(null)}
                title={`Course Syllabus: ${selectedCourse?.title}`}
            >
                <div className="space-y-6">
                    {selectedCourse?.syllabus?.length > 0 ? (
                        selectedCourse.syllabus.map((item, index) => (
                            <div key={index} className="bg-gray-800/50 border border-gray-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all">
                                <h4 className="text-lg font-bold mb-3 text-pink-400">{item.title}</h4>
                                <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                                    {item.content}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center italic">No syllabus detailed for this course.</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default SchoolCoding;
