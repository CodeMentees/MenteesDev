import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Toast from "../UI/Toast";

import { useQueryAPI } from "../../api/queryApi";

function QueryForm({ courseName, setQuery }) {
    const { createQuery } = useQueryAPI();
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phoneNumber: "", 
        courseName: courseName,
        message: "Enrolling for " + courseName 
    });
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        initFlowbite();
    }, []);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = await createQuery(formData);
            if (data) {
                setToast({ visible: true, message: data.message || "Success!", type: "success" });
                setFormData({ name: "", email: "", phoneNumber: "", courseName: courseName, message: "Enrolling for " + courseName });
                setTimeout(() => {
                    setToast({ visible: false, message: "", type: "success" });
                    setQuery(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setToast({ 
                visible: true, 
                message: error.message || "An error occurred", 
                type: "error" 
            });
            setTimeout(() => {
                setToast({ visible: false, message: "", type: "error" });
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
            {toast.visible && <Toast message={toast.message} type={toast.type} />}
            <div className="relative p-4 w-full max-w-md bg-gray-800 rounded-lg shadow-sm">
                <div className="flex justify-between p-4 border-b border-gray-600">
                    <h3 className="text-lg font-semibold text-white">Get Course</h3>
                    <button className="text-gray-400 hover:text-white" onClick={() => setQuery(false)}>✕</button>
                </div>
                <form className="p-4 w-full" onSubmit={handleSubmit}>
                    {['name', 'email', 'phoneNumber'].map(field => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-white" htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                id={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 p-2 bg-transparent text-white"
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="course">Select your course</label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            value={courseName}
                            disabled
                            className="w-full border-b-2 border-blue-500 focus:outline-none p-2 bg-transparent text-gray-400"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default QueryForm;