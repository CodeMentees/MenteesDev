import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaChevronDown, FaClock, FaGraduationCap, FaCode, FaTimes } from "react-icons/fa";
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
            <div className="relative overflow-hidden bg-[#050a15] border-b border-blue-500/30 py-8 mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 animate-pulse"></div>
                <div className="max-w-7xl mx-auto px-4 relative flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col gap-3 items-center">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold border border-blue-500/20 mb-2 tracking-widest uppercase opacity-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
                            Future of Education
                        </div>

                        <h2 className="text-4xl md:text-7xl font-[900] tracking-tighter text-white flex flex-wrap justify-center gap-x-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                            {"AI IS RESHAPING THE WORLD".split(" ").map((word, i) => (
                                <span
                                    key={i}
                                    className="opacity-0 animate-word"
                                    style={{ animationDelay: `${300 + i * 150}ms` }}
                                >
                                    {word}
                                </span>
                            ))}
                        </h2>

                        <p className="text-blue-500 font-bold text-base md:text-2xl tracking-[0.25em] h-12 uppercase flex flex-wrap justify-center gap-x-3">
                            {"Education must lead what comes next".split(" ").map((word, i) => (
                                <span
                                    key={i}
                                    className="opacity-0 animate-slide-up bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                    style={{ animationDelay: `${1500 + i * 120}ms` }}
                                >
                                    {word}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                {/* Radiant Glows */}
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-48 bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000"></div>
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-48 bg-purple-600/10 blur-[120px] rounded-full group-hover:bg-purple-600/20 transition-all duration-1000"></div>
            </div>

            {/* Hero Section - Code.org Style Split Layout */}
            <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Content */}
                    <div className="flex-1 text-left space-y-8">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/20 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            K-12 Educational Excellence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                            The World's Best <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                School Coding
                            </span>
                            <br /> Curriculum
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                            Empower your students with our modular, industry-aligned curriculum. Designed by educators, for educators, to make computer science accessible to everyone.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => navigate("/school-coding/catalog")}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center gap-3"
                            >
                                Explore Courses
                            </button>
                            <button className="bg-gray-800/50 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-gray-700 hover:border-gray-600 active:scale-95">
                                For Schools & Districts
                            </button>
                        </div>
                    </div>

                    {/* Right: Premium Image Section */}
                    <div className="flex-1 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-dark-card rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl transform transition-transform group-hover:scale-[1.02] duration-500">
                            <img
                                src="/assets/images/school_hero.png"
                                alt="Students coding"
                                className="w-full h-auto object-cover"
                            />
                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-blue-400">
                                git commit -m "innovation"
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats Section */}
            <div className="bg-gradient-to-b from-dark-background to-[#0a0f1a] py-24 border-y border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Global Impact</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                CodeMentees is more than just a curriculum provider. We are a global movement dedicated to bringing high-quality tech education to every classroom.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-dark-background bg-gray-800"></div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-bold">50,000+ Students</p>
                                    <p className="text-gray-500">Already learning with us</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Students Reached", value: "2M+", color: "text-blue-400" },
                                { label: "Schools Partnered", value: "500+", color: "text-pink-400" },
                                { label: "Course Modules", value: "150+", color: "text-purple-400" },
                                { label: "Teacher Success", value: "98%", color: "text-emerald-400" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gray-800/20 border border-gray-700/50 p-8 rounded-3xl hover:border-gray-600 transition-colors group">
                                    <p className={`text-4xl font-extrabold mb-2 ${stat.color} group-hover:scale-110 transition-transform origin-left`}>
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Audience Section 1: Students (Image Left, Text Right) */}
            <div className="py-24 bg-dark-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 relative order-2 lg:order-1">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-2xl"></div>
                            <img
                                src="/assets/images/feature_students.png"
                                alt="Students having fun coding"
                                className="relative rounded-[2rem] border border-gray-800 shadow-2xl w-full h-auto"
                            />
                        </div>
                        <div className="flex-1 space-y-6 order-1 lg:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Built for <span className="text-blue-400">Student Success</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Our interactive curriculum turns abstract concepts into real-world creations. From building games to AI, students stay engaged and inspired.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Project-based learning with instant feedback",
                                    "Industry-standard tools and languages",
                                    "Progress tracking and achievement badges"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300 font-medium">
                                        <div className="bg-blue-500/20 p-1 rounded-full border border-blue-500/30">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audience Section 2: Teachers (Text Left, Image Right) */}
            <div className="py-24 bg-[#0a0f1a]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Empowering <span className="text-pink-400">Educators</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                You don't need a CS degree to teach world-class coding. Our comprehensive platform provides all the tools you need to succeed in the classroom.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    { title: "Lesson Plans", desc: "Detailed, step-by-step guides" },
                                    { title: "Auto-Grading", desc: "Save hours on assessment" },
                                    { title: "Teacher Training", desc: "Professional development" },
                                    { title: "Class Insights", desc: "Real-time student metrics" }
                                ].map((feature, idx) => (
                                    <div key={idx} className="bg-gray-800/30 p-4 rounded-2xl border border-gray-800">
                                        <p className="text-white font-bold text-sm mb-1">{feature.title}</p>
                                        <p className="text-gray-500 text-xs">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -inset-4 bg-pink-500/10 rounded-[2.5rem] blur-2xl"></div>
                            <img
                                src="/assets/images/feature_teachers.png"
                                alt="Empowered teacher"
                                className="relative rounded-[2rem] border border-gray-800 shadow-2xl w-full h-auto"
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
