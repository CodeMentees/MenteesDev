import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Toast from "../UI/Toast";
import { useSchoolCodingLeadAPI } from "../../api/schoolCodingLeadApi";

function SchoolCodingQueryForm({ courseName, setQuery }) {
    const { createLead } = useSchoolCodingLeadAPI();
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phoneNumber: "", 
        courseName: courseName 
    });
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

    useEffect(() => {
        initFlowbite();
    }, []);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await createLead(formData);
        if (data) {
            setToast({ visible: true, message: data.message, type: "success" });
            setFormData({ name: "", email: "", phoneNumber: "", courseName: courseName });
            setTimeout(() => {
                setToast({ visible: false, message: "", type: "success" });
                setQuery(false);
            }, 3000);
        } else {
            setToast({ visible: true, message: "Something went wrong. Please try again.", type: "error" });
            setTimeout(() => {
                setToast({ visible: false, message: "", type: "error" });
            }, 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/80 backdrop-blur-sm p-4">
            {toast.visible && <Toast message={toast.message} type={toast.type} visible={toast.visible} />}
            <div className="relative w-full max-w-md bg-[#0a0f1a] border border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Join the Program</h3>
                        <p className="text-xs text-gray-400">Apply for {courseName}</p>
                    </div>
                    <button 
                        className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition-colors" 
                        onClick={() => setQuery(false)}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    {['name', 'email', 'phoneNumber'].map(field => (
                        <div key={field} className="relative group">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-blue-400 transition-colors" htmlFor={field}>
                                {field === 'phoneNumber' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                id={field}
                                placeholder={`Enter your ${field === 'phoneNumber' ? 'phone' : field}...`}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600"
                            />
                        </div>
                    ))}

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-xl text-lg font-black transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                        >
                            Submit Application
                        </button>
                    </div>
                    
                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">
                        By submitting, you agree to our terms of educational partnership.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SchoolCodingQueryForm;
