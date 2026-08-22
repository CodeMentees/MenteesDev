import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { coursesData } from "../data/coursesData";
import { getCourseById, getEnrolledCourses } from "../services/courseService";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { toast } from "../utils/toast";
import EnrollButton from "../components/EnrollButton";
import LoadingSpinner from "../components/LoadingSpinner";

const typeIcon = { video: "🎬", text: "📝", link: "🔗" };

export default function CourseDetail({ modal = false }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isStatic, setIsStatic] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourseAndEnrollment = async () => {
            try {
                const staticMatch = coursesData.find(c => c.id === id);
                if (staticMatch) {
                    setCourse(staticMatch);
                    setIsStatic(true);
                    setLoading(false);
                    return;
                }

                const data = await getCourseById(id);
                if (data?.course) {
                    setCourse(data.course);
                    setIsStatic(false);

                    if (user) {
                        try {
                            const enrollRes = await getEnrolledCourses();
                            setIsEnrolled(enrollRes.enrollments?.some(e => e.course?._id === id));
                        } catch { /* enrollment check is non-critical */ }
                    }
                } else {
                    throw new Error("Course not found");
                }
            } catch {
                const fallback = coursesData.find(c => c.id === id);
                setCourse(fallback || null);
                if (fallback) setIsStatic(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseAndEnrollment();
    }, [id, user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24" style={{ background: "rgb(0,0,0)" }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center" style={{ background: "rgb(0,0,0)" }}>
                <p className="text-lg font-bold text-white mb-4">Course not found</p>
                <button className="btn btn-secondary" onClick={() => navigate("/courses")}>
                    ← Back to Courses
                </button>
            </div>
        );
    }

    const handleStaticEnrollClick = () => {
        if (!user) {
            toast.error("Please login first to enroll.");
            navigate("/login");
            return;
        }
        toast.info("This is a static path. Create a real course via the Admin Dashboard to enable enrollments.");
    };

    const content = (
        <motion.div
            className={`w-full max-w-3xl relative z-50 rounded-2xl p-6 md:p-8 ${modal ? "max-h-[85vh] overflow-y-auto no-scrollbar" : ""}`}
            style={{ background: "rgb(var(--surface))", border: "1px solid rgba(var(--border))" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
        >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                <h1 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: "rgb(var(--text-primary))" }}>
                    {course.title}
                </h1>
                {isEnrolled && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "rgb(34,197,94)" }}>
                        ✓ Enrolled
                    </span>
                )}
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgb(var(--text-secondary))" }}>
                {course.description}
            </p>

            {/* Meta info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                    { label: "Duration", value: course.duration },
                    { label: "Level", value: course.level },
                    { label: "Technologies", value: Array.isArray(course.techStack) ? course.techStack.join(", ") : "General" },
                ].map(item => (
                    <div key={item.label} className="p-4 rounded-xl"
                        style={{ background: "rgb(var(--bg))", border: "1px solid rgba(var(--border))" }}>
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgb(var(--text-secondary))", opacity: 0.7 }}>
                            {item.label}
                        </span>
                        <p className="font-bold text-sm mt-1 truncate" style={{ color: "rgb(var(--text-primary))" }}>{item.value}</p>
                    </div>
                ))}
            </div>

            {/* What you'll learn */}
            {course.includes?.length > 0 && (
                <>
                    <h2 className="text-base font-bold mb-3" style={{ color: "rgb(var(--text-primary))" }}>What you'll learn</h2>
                    <ul className="space-y-2 mb-6">
                        {course.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                                    style={{ background: "rgba(249,115,22,0.15)", color: "rgb(249,115,22)" }}>✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Syllabus & Content */}
            {(course.syllabus?.length > 0 || course.content?.length > 0) && (
                <div className="mt-6 pt-6 space-y-6" style={{ borderTop: "1px solid rgba(var(--border))" }}>
                    <h2 className="text-base font-black" style={{ color: "rgb(var(--text-primary))" }}>Pathway Curriculum</h2>

                    {course.syllabus?.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "rgb(249,115,22)" }}>
                                📚 Syllabus Concepts
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                {course.syllabus.map((item, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl"
                                        style={{ background: "rgb(var(--bg))", border: "1px solid rgba(var(--border))" }}>
                                        <h4 className="font-bold text-sm" style={{ color: "rgb(var(--text-primary))" }}>{item.title}</h4>
                                        {item.description && (
                                            <p className="text-xs mt-1" style={{ color: "rgb(var(--text-secondary))" }}>{item.description}</p>
                                        )}
                                        {item.topics?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {item.topics.map((t, i) => (
                                                    <span key={i} className="tag text-[10px]">{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {course.content?.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "rgb(249,115,22)" }}>
                                🎬 Training Modules &amp; Resources
                            </h3>
                            {course.content.map((item, idx) => (
                                <div key={idx} className="p-3.5 rounded-xl flex items-center gap-3"
                                    style={{ background: "rgb(var(--bg))", border: "1px solid rgba(var(--border))" }}>
                                    <span className="text-xl shrink-0">{typeIcon[item.type] || "📎"}</span>
                                    <div>
                                        <h4 className="font-bold text-sm" style={{ color: "rgb(var(--text-primary))" }}>{item.title}</h4>
                                        {item.description && (
                                            <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-secondary))" }}>{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Enroll CTA */}
            <div className="mt-8">
                {isEnrolled ? (
                    <button
                        onClick={() => navigate(`/dashboard/student/course/${course._id}`)}
                        className="btn btn-primary gap-2 cursor-pointer w-full sm:w-auto">
                        📖 Resume Pathway
                    </button>
                ) : isStatic ? (
                    <button onClick={handleStaticEnrollClick} className="btn btn-primary cursor-pointer w-full sm:w-auto">
                        Enroll Now →
                    </button>
                ) : (
                    <EnrollButton course={course} onEnrollSuccess={() => setIsEnrolled(true)} />
                )}
            </div>
        </motion.div>
    );

    if (modal) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
                <motion.div
                    className="absolute inset-0 backdrop-blur-sm"
                    style={{ background: "rgba(0,0,0,0.7)" }}
                    onClick={() => navigate(-1)}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                />
                {content}
            </div>
        );
    }

    return (
        <div style={{ background: "rgb(var(--bg))", minHeight: "100vh", paddingTop: "2.5rem", paddingBottom: "5rem" }}>
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                <button
                    className="text-sm font-semibold mb-6 inline-flex items-center gap-1.5 transition-colors"
                    style={{ color: "rgb(var(--text-secondary))" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgb(249,115,22)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgb(var(--text-secondary))"}
                    onClick={() => navigate(-1)}>
                    ← Back to Courses
                </button>
                {content}
            </div>
        </div>
    );
}