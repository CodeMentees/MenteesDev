import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLiveCourseAPI } from '../../api/liveCourseApi';
import SEOHead from '../../seo/SEOHead';
import { SkeletonGrid } from '../../Components/UI/LoadingSpinner';
import { FaPlayCircle, FaCalendarAlt, FaLock, FaGlobe, FaLaptopCode, FaVideo, FaClock, FaCheckCircle } from 'react-icons/fa';


const CourseCard = ({ course, handleAction, actionLabel, actionIcon, isRecorded }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl hover:border-gray-600 transition-all duration-300 group flex flex-col">
        <div className="relative h-48 overflow-hidden">
            <img 
                src={course.image || 'https://via.placeholder.com/400x200?text=Course'} 
                alt={course.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-2">
                {course.liveStatus && !isRecorded && (
                    <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE NOW
                    </span>
                )}
                {course.isPremium ? (
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">Premium</span>
                ) : (
                    <span className="bg-green-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">Free</span>
                )}
            </div>
        </div>

        <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
            
            <div className="flex flex-col gap-3 mb-5">
                {course.schedule && !isRecorded && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FaClock className="text-blue-400" /> 
                        <span>Next: {new Date(course.schedule).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                )}
                {isRecorded && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FaVideo className="text-blue-400" /> 
                        <span>{course.content?.length || 0} Recorded Lectures</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-400 flex items-center gap-1">
                        <FaCheckCircle className="text-green-500"/> Validated
                    </span>
                </div>
            </div>

            <div className="mt-auto">
                <button 
                    onClick={handleAction}
                    className={`w-full ${course.liveStatus && !isRecorded ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors`}
                >
                    {actionIcon} {actionLabel}
                </button>
            </div>
        </div>
    </div>
);

function LiveCourse() {
    const { fetchLiveCourses } = useLiveCourseAPI();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState({ visible: false, message: "" });
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchLiveCourses(1, 100); // Fetch all for now
                setCourses(data.data || data || []);
            } catch (error) {
                console.error("Failed to load live courses:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getCourses();
    }, []);

    const handleJoinClick = (course) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (!user?.isFullAccess) {
            setToast({ visible: true, message: "Please register for this course to get full access" });
            setTimeout(() => {
                setToast({ visible: false, message: "" });
                navigate('/courses');
            }, 2500);
            return;
        }

        if (course.meetLink) {
            window.open(course.meetLink, '_blank');
        } else {
            setToast({ visible: true, message: "Meeting link is not available right now." });
            setTimeout(() => setToast({ visible: false, message: "" }), 2500);
        }
    };

    const liveSessions = courses.filter(c => c.courseType === 'live' || !c.courseType);
    const recordedSessions = courses.filter(c => c.courseType === 'recorded');

    return (
        <div className="bg-dark-background min-h-screen pt-8 pb-20 font-sans relative">
            <SEOHead path="/live" />

            {toast.visible && (
                <div className="fixed z-50 top-20 right-5 p-4 bg-gray-800 text-white border-l-4 border-blue-500 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-down">
                    <span className="text-xl">🔒</span> {toast.message}
                </div>
            )}
            
            {/* Hero Banner Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between border border-blue-800">
                    <div className="md:w-3/5 space-y-6">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse inline-flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-white"></span> EXPERIENCE CODEMENTEES
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Interactive Live Classes & <br/><span className="text-blue-400">Self-Paced Learning</span>
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl max-w-xl">
                            Join our premium live coding sessions or learn at your own pace with our comprehensive recorded lecture series.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg">
                                <FaVideo className="text-blue-300" /> Real-time Interactive
                            </div>
                            <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg">
                                <FaPlayCircle className="text-blue-300" /> Recorded Content
                            </div>
                        </div>
                    </div>
                    <div className="md:w-2/5 mt-8 md:mt-0 flex justify-center relative">
                        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                           <FaLaptopCode className="text-7xl text-white opacity-90" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Sessions Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        Live Interactive Lectures
                    </h2>
                    <p className="text-gray-400">Join ongoing batches and interact with mentors in real-time.</p>
                </div>

                {isLoading ? (
                    <SkeletonGrid count={3} />
                ) : liveSessions.length === 0 ? (
                    <div className="text-center py-10 bg-gray-800/30 rounded-xl border border-gray-700/50">
                        <p className="text-gray-400 italic">No live interactive lectures available right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {liveSessions.map((course) => (
                            <CourseCard 
                                key={course._id} 
                                course={course} 
                                handleAction={() => handleJoinClick(course)} 
                                actionLabel="Join Now" 
                                actionIcon={<FaVideo />} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Recorded Sessions Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <FaPlayCircle className="text-blue-400" />
                        Self Paced Learning
                    </h2>
                    <p className="text-gray-400">Access high-quality recorded sessions and learn at your own convenience.</p>
                </div>

                {isLoading ? (
                    <SkeletonGrid count={3} />
                ) : recordedSessions.length === 0 ? (
                    <div className="text-center py-10 bg-gray-800/30 rounded-xl border border-gray-700/50">
                        <p className="text-gray-400 italic">No self-paced learning content available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recordedSessions.map((course) => (
                            <CourseCard 
                                key={course._id} 
                                course={course} 
                                handleAction={() => {
                                    if (!isAuthenticated) {
                                        navigate('/login');
                                    } else {
                                        navigate(`/live/${course._id}`);
                                    }
                                }} 
                                actionLabel="Explore Recordings" 
                                actionIcon={<FaPlayCircle />} 
                                isRecorded 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LiveCourse;