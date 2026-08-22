import { useState, useEffect } from "react";
import { coursesData } from "../data/coursesData";
import { getCourses } from "../services/courseService";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProgramsSection() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data?.courses?.length > 0 ? data.courses.slice(0, 3) : coursesData.slice(0, 3));
            } catch {
                setCourses(coursesData.slice(0, 3));
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <section className="relative py-24" style={{ background: "rgb(var(--surface))" }}>
            {/* Subtle orange glow bottom-right */}
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
                {/* Header — split layout with CTA right */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
                            style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "rgb(249,115,22)" }}>
                            Featured Paths
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Onboarding Pathways
                        </h2>
                        <p className="mt-2 text-base" style={{ color: "rgb(140,140,140)" }}>
                            Structured training modules designed to ramp up new hires fast.
                        </p>
                    </div>
                    <Link to="/courses" className="btn btn-secondary shrink-0 self-start md:self-auto">
                        View All Paths →
                    </Link>
                </div>

                {/* Cards */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-5">
                        {courses.map((course, idx) => (
                            <motion.div
                                key={course.id || course._id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                viewport={{ once: true }}
                                className="flex flex-col h-full"
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}