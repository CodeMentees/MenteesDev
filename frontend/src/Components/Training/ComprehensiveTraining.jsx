import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainingCard = ({ title, duration, description, btnGradient }) => {
    const navigate = useNavigate();

    return (
        <div
            className="group relative flex flex-col p-7 rounded-2xl transition-all duration-300 cursor-default hover:-translate-y-1"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                flex: "1 1 280px",
                maxWidth: "400px",
            }}
        >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                <FaGraduationCap className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{duration}</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>{description}</p>
            <button
                onClick={() => navigate("/contact")}
                className={`mt-auto self-start text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${btnGradient}`}
            >
                Know More →
            </button>
        </div>
    );
};

const ComprehensiveTraining = () => {
    const trainingModules = [
        {
            title: "Spring Bootcamp",
            duration: "30 Days",
            priceColor: "bg-blue-600",
            description:
                "Project Based Training. It focuses on practical coding skills, teamwork, and real-world application development.",
            btnGradient: "bg-gradient-to-r from-violet-600 to-blue-600",
        },
        {
            title: "Winter Training",
            duration: "15-30 Days",
            priceColor: "bg-blue-600",
            description:
                "Seasonal Based Training. It provides focused learning opportunities during the winter break.",
            btnGradient: "bg-gradient-to-r from-violet-600 to-blue-600",
        },
    ];

    return (
        <section className="py-24 px-6 relative" style={{ background: "rgb(4,4,8)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
            <div className="max-w-5xl mx-auto">
                <div className="mb-14">
                    <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">Programs</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Training for every season
                    </h2>
                </div>

                <div className="flex flex-wrap gap-6">
                    {trainingModules.map((module, index) => (
                        <TrainingCard key={index} {...module} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveTraining;
