import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLiveCourseAPI } from '../../api/liveCourseApi';
import SEOHead from '../../seo/SEOHead';
import { useDynamicSEO } from '../../seo/useDynamicSEO';
import LoadingSpinner from '../../Components/UI/LoadingSpinner';
import { FaPlay, FaFileAlt, FaLock, FaArrowLeft, FaVideo, FaInfoCircle } from 'react-icons/fa';


const LiveCourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchLiveCourse } = useLiveCourseAPI();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState({ visible: false, message: "" });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await fetchLiveCourse(id);
                setCourse(data);
            } catch (error) {
                console.error("Error fetching live course details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getDetails();
    }, [id]);

    const seoProps = useDynamicSEO('liveCourse', course);

    const handleContentAccess = (item) => {
        if (!isAuthenticated || !user?.isFullAccess) {
            setToast({ visible: true, message: "Please register for this course to access this content." });
            setTimeout(() => setToast({ visible: false, message: "" }), 2500);
            return;
        }
        window.open(item.url, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                style={{ background: "rgb(var(--bg))" }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="bg-dark-background min-h-screen pt-24 text-center text-white">
                <h2 className="text-2xl font-bold">Course not found</h2>
                <button onClick={() => navigate('/live')} className="mt-4 text-blue-400 hover:underline">Back to Live Courses</button>
            </div>
        );
    }

    return (
        <div className="bg-[#050810] min-h-screen pt-24 pb-20 text-white font-sans">
            <SEOHead path="/live/:id" {...seoProps} />

            {toast.visible && (
                <div className="fixed z-50 top-20 right-5 p-4 bg-gray-800 text-white border-l-4 border-red-500 rounded-lg shadow-2xl animate-fade-in-down">
                    <span className="text-xl">🔒</span> {toast.message}
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <button
                    onClick={() => navigate('/live')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Learning Hub
                </button>

                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase border border-blue-600/30">
                                {course.courseType === 'recorded' ? 'Recorded Series' : 'Live Batch'}
                            </span>
                            {course.isPremium && (
                                <span className="bg-purple-600/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase border border-purple-600/30">
                                    Premium
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {course.name}
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {course.description}
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                            <img
                                src={course.image || 'https://via.placeholder.com/800x600'}
                                alt={course.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-gray-900/40 rounded-3xl border border-gray-800 p-8 md:p-12 shadow-inner">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Curriculum Content</h2>
                            <p className="text-gray-500 text-sm">Access the recorded modules and supplementary resources below.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-xl text-sm border border-blue-400/20">
                            <FaVideo /> {course.content?.length || 0} Modules Ready
                        </div>
                    </div>

                    {!course.content || course.content.length === 0 ? (
                        <div className="text-center py-12 bg-gray-800/20 rounded-2xl border border-dashed border-gray-700">
                            <FaInfoCircle className="text-4xl text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 italic">No content has been uploaded for this course yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {course.content.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    onClick={() => handleContentAccess(item)}
                                    className="group flex items-center justify-between p-5 bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all duration-300"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-blue-400 border border-gray-700 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {item.contentType === 'video' ? <FaPlay size={14} /> : <FaFileAlt size={14} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">{item.title}</h4>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{item.contentType || 'Module'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {(!isAuthenticated || !user?.isFullAccess) && !item.isPublic ? (
                                            <div className="flex items-center gap-2 text-gray-500 text-sm bg-black/30 px-3 py-1.5 rounded-full border border-gray-800">
                                                <FaLock size={12} /> <span className="hidden sm:inline">Locked</span>
                                            </div>
                                        ) : (
                                            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FaArrowLeft className="rotate-180" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help? Contact support at <a href="mailto:codementees@gmail.com" className="text-blue-400 hover:underline">codementees@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveCourseDetails;
