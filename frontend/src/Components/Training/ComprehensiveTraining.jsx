import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainingCard = ({ title, duration, price, priceColor, description, btnGradient }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1e2736] rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300 flex flex-col items-center p-6 w-full md:w-80 relative">
            <div
                className={`absolute top-0 left-0 text-white text-xs font-bold px-3 py-1 rounded-br-lg ${priceColor}`}
            >
                {price}
            </div>

            <div className="bg-[#2d3748] p-4 rounded-full mb-4 mt-4">
                <FaGraduationCap className="text-4xl text-blue-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 text-center font-medium">({duration})</p>

            <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
                {description}
            </p>

            <button
                onClick={() => navigate("/contact")}
                className={`text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform transition hover:-translate-y-1 ${btnGradient}`}
            >
                Know More
            </button>
        </div>
    );
};

const ComprehensiveTraining = () => {
    const trainingModules = [
        {
            title: "Spring Bootcamp",
            duration: "30 Days",
            price: "₹ 6,000",
            priceColor: "bg-blue-600",
            description:
                "Project Based Training. It focuses on practical coding skills, teamwork, and real-world application development.",
            btnGradient: "bg-gradient-to-r from-red-500 to-orange-500",
        },
        {
            title: "Summer Training",
            duration: "45-60 Days",
            price: "₹ 7,000",
            priceColor: "bg-orange-600",
            description:
                "Objective Based Training. It is designed to enhance knowledge and skills in specific areas of technology.",
            btnGradient: "bg-gradient-to-r from-red-500 to-orange-500",
        },
        {
            title: "Winter Training",
            duration: "15-30 Days",
            price: "₹ 4,500",
            priceColor: "bg-blue-600",
            description:
                "Seasonal Based Training. It provides focused learning opportunities during the winter break.",
            btnGradient: "bg-gradient-to-r from-red-500 to-orange-500",
        },
    ];

    return (
        <section className="bg-dark-background py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Comprehensive <span className="text-pink-500">Training Solutions</span>
                    </h2>
                    <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {trainingModules.map((module, index) => (
                        <TrainingCard key={index} {...module} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveTraining;
