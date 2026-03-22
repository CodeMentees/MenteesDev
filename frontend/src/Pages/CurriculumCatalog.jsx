import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FaFilter, FaSearch, FaArrowRight, FaClock, FaLayerGroup, FaLanguage, FaTimes, FaPlus, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useSchoolCourseAPI } from '../api/schoolCourseApi';
import Toast from '../Components/UI/Toast';
import { getDirectImageUrl, handleImageError, FALLBACK_IMAGE_URL } from '../utils/imageUtils';
import SchoolCodingQueryForm from '../Components/Forms/SchoolCodingQueryForm';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm shadow-2xl overflow-y-auto">
            <div className="bg-[#0a0f1a] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <div className="sticky top-0 bg-[#0a0f1a]/95 backdrop-blur-md border-b border-gray-700 p-6 flex justify-between items-center z-10">
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

const CurriculumCatalog = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { fetchSchoolCourses, deleteSchoolCourse } = useSchoolCourseAPI();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        level: 'All Grade Levels',
        duration: 'All Durations',
        language: 'All Languages'
    });

    const levels = ["All Grade Levels", "Elementary", "Middle School", "High School"];
    const durations = ["All Durations", "Full Year", "Semester", "Quarter"];
    const languages = ["All Languages", "Python", "Java", "JavaScript", "Scratch", "HTML/CSS"];
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [showQuery, setShowQuery] = useState(false);
    const [isToast, setToast] = useState({ visible: false, message: '', type: 'success' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchSchoolCourses();
            setCourses(Array.isArray(data) ? data : (data.data || []));
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            try {
                await deleteSchoolCourse(id);
                setToast({ visible: true, message: "Course deleted successfully", type: "success" });
                setTimeout(() => setToast({ ...isToast, visible: false }), 3000);
                fetchData();
            } catch (error) {
                console.error('Error deleting course:', error);
                setToast({ visible: true, message: "Failed to delete course", type: "error" });
                setTimeout(() => setToast({ ...isToast, visible: false }), 3000);
            }
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = filters.level === 'All Grade Levels' || course.level === filters.level;
        const matchesDuration = filters.duration === 'All Durations' || (course.duration || '').toLowerCase().includes(filters.duration.toLowerCase());
        const matchesLanguage = filters.language === 'All Languages' || (course.language || '').toLowerCase().includes(filters.language.toLowerCase());

        return matchesSearch && matchesGrade && matchesDuration && matchesLanguage;
    });

    return (
        <div className="min-h-screen bg-[#050810] text-white pt-24 pb-20">
            <Helmet>
                <title>Curriculum Catalog | CodeMentees</title>
                <meta name="description" content="Explore our comprehensive school coding curriculum catalog." />
            </Helmet>

            <Toast message={isToast.message} type={isToast.type} visible={isToast.visible} />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">
                            CURRICULUM <span className="text-blue-500 underline decoration-blue-500/30">CATALOG</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Discover our world-class computer science curriculum designed for K-12. From foundational puzzles to advanced career-ready projects.
                        </p>
                    </div>
                    {user?.isAdmin && (
                        <button
                            onClick={() => navigate('/admin/school-courses/add')}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                        >
                            <FaPlus /> Add New Course
                        </button>
                    )}
                </div>

                {/* Filter Bar */}
                <div className="bg-dark-background py-6 border-b border-transparent mb-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="transition-all duration-500 space-y-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                {/* Search */}
                                <div className="relative w-full lg:w-96 group">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search by title, description..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-[#111827] border border-gray-700 rounded-2xl pl-12 pr-6 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-600 py-3.5 text-sm"
                                    />
                                </div>

                                {/* Dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                    {/* Level Filter */}
                                    <div className="relative group">
                                        <select
                                            value={filters.level}
                                            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                            className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-pink-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3 text-sm"
                                        >
                                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-pink-400 transition-colors" />
                                    </div>

                                    {/* Duration Filter */}
                                    <div className="relative group">
                                        <select
                                            value={filters.duration}
                                            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                                            className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3 text-sm"
                                        >
                                            {durations.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-blue-400 transition-colors" />
                                    </div>

                                    {/* Language Filter */}
                                    <div className="relative group">
                                        <select
                                            value={filters.language}
                                            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                                            className="w-full appearance-none bg-[#111827] border border-gray-700 rounded-xl px-4 pr-10 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer font-medium hover:border-gray-600 text-gray-300 py-3 text-sm"
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
                                    {(searchTerm || filters.level !== "All Grade Levels" || filters.duration !== "All Durations" || filters.language !== "All Languages") && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm("");
                                                setFilters({
                                                    level: 'All Grade Levels',
                                                    duration: 'All Durations',
                                                    language: 'All Languages'
                                                });
                                            }}
                                            className="text-gray-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded-full"
                                        >
                                            <FaTimes size={12} />
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course List */}
                <div className="space-y-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-medium italic">Loading curriculum...</p>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div key={course._id} className="group flex flex-col lg:flex-row bg-[#0a0f1a] border border-gray-800 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 relative">
                                {/* Admin Overlay */}
                                {user?.isAdmin && (
                                    <div className="absolute top-6 right-6 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => navigate(`/admin/school-courses/edit/${course._id}`)}
                                            className="p-3 bg-gray-800/80 hover:bg-blue-600 text-white rounded-xl transition-all border border-white/5 active:scale-90"
                                            title="Update Course"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="p-3 bg-gray-800/80 hover:bg-red-600 text-white rounded-xl transition-all border border-white/5 active:scale-90"
                                            title="Delete Course"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Left: Icon/Image Section (CodeHS Style Circular Icon) */}
                                <div className="lg:w-64 p-8 flex items-center justify-center bg-gradient-to-br from-[#0d1424] to-transparent">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner overflow-hidden">
                                        <img
                                            src={getDirectImageUrl(course.image) || `https://placehold.co/400x400/0a0f1a/3b82f6?text=${encodeURIComponent(course.title.substring(0, 1))}`}
                                            alt={course.title}
                                            className="w-full h-full object-cover p-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            onError={(e) => handleImageError(e, FALLBACK_IMAGE_URL)}
                                        />
                                    </div>
                                </div>

                                {/* Center: Content */}
                                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center border-l border-gray-800/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                            {course.level}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors pr-20 md:pr-0">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl line-clamp-2 md:line-clamp-none">
                                        {course.description}
                                    </p>

                                    {/* Metadata Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <FaClock className="text-blue-500/70" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-gray-500">Duration</span>
                                                <span className="text-sm font-semibold">{course.duration}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <FaLayerGroup className="text-purple-500/70" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-gray-500">Difficulty</span>
                                                <span className="text-sm font-semibold">{course.level}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <FaLanguage className="text-pink-500/70" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-gray-500">Language</span>
                                                <span className="text-sm font-semibold">{course.language}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="lg:w-72 p-8 lg:p-10 bg-gray-900/20 flex flex-col justify-center gap-4 border-l border-gray-800/50">
                                    <button
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setModalType('units');
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn"
                                    >
                                        View Units
                                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setShowQuery(true);
                                        }}
                                        className="w-full bg-transparent hover:bg-gray-800 text-gray-300 font-bold py-3.5 rounded-xl transition-all border border-gray-700 active:scale-95"
                                    >
                                        Join Now
                                    </button>
                                    {user?.isAdmin && (
                                        <button
                                            onClick={() => navigate(`/admin/school-courses/edit/${course._id}`)}
                                            className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 font-bold py-3.5 rounded-xl transition-all border border-indigo-500/30 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <FaEdit size={14} />
                                            Edit Course
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-[#0a0f1a] rounded-[2rem] border border-gray-800">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Enrollment Modal */}
            {showQuery && selectedCourse && (
                <SchoolCodingQueryForm 
                    courseName={selectedCourse.title} 
                    setQuery={setShowQuery} 
                />
            )}

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
        </div>
    );
};

export default CurriculumCatalog;
