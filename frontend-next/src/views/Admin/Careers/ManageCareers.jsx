'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Type, AlignLeft, GraduationCap, DollarSign, CheckCircle, Tag, Smile } from "lucide-react";
import DeleteConfirmModal from "../../../Components/UI/DeleteConfirmModal";

function ManageCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    icon: "🚀",
    description: "",
    stipend: "",
    preferredBackground: "",
    jobType: "Internship",
    isActive: true
  });
  
  const COLORS = [
    "from-blue-500 to-cyan-400",
    "from-green-500 to-emerald-400",
    "from-purple-500 to-pink-500",
    "from-indigo-500 to-blue-500",
    "from-yellow-500 to-orange-400",
    "from-red-500 to-rose-400",
    "from-teal-500 to-emerald-500",
    "from-fuchsia-500 to-purple-600",
    "from-cyan-400 to-blue-500",
    "from-pink-500 to-rose-400"
  ];
  
  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get("/api/careers");
      setCareers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching careers:", error);
      setLoading(false);
    }
  };

  const handleOpenModal = (career = null) => {
    if (career) {
      setEditingCareer(career);
      setFormData({
        title: career.title,
        icon: career.icon,
        description: career.description,
        stipend: career.stipend || "",
        preferredBackground: career.preferredBackground || "",
        jobType: career.jobType || "Internship",
        isActive: career.isActive
      });
    } else {
      setEditingCareer(null);
      setFormData({
        title: "",
        icon: "🚀",
        description: "",
        stipend: "",
        preferredBackground: "",
        jobType: "Internship",
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!editingCareer) {
        payload.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      if (editingCareer) {
        await axios.put(`/api/careers/${editingCareer._id}`, payload);
      } else {
        await axios.post("/api/careers", payload);
      }
      setIsModalOpen(false);
      fetchCareers();
    } catch (error) {
      console.error("Failed to save career:", error);
      alert("Failed to save career");
    }
  };

  const handleDelete = (id) => {
    setDeleteTarget(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`/api/careers/${deleteTarget}`);
      setCareers(careers.filter((c) => c._id !== deleteTarget));
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete career:", error);
      alert("Failed to delete career");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>Manage Careers</h2>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenModal()}
            className="text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-sm"
          >
            + Add New Career
          </button>
        </div>
      </div>

      <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
      {loading ? (
        <div className="text-center py-10" style={{ color: "rgb(var(--text-secondary))" }}>Loading careers...</div>
      ) : careers.length === 0 ? (
        <div className="text-center py-10 rounded-lg border border-dashed" style={{ color: "rgb(var(--text-secondary))", borderColor: "rgba(var(--dash-border))" }}>
          No careers found. Create one to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-b" style={{ color: "rgb(var(--text-primary))", borderColor: "rgba(var(--dash-border))" }}>
            <thead className="text-xs uppercase" style={{ backgroundColor: "rgba(var(--dash-border))", color: "rgb(var(--text-secondary))" }}>
              <tr>
                <th className="px-6 py-3">Icon</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Background</th>
                <th className="px-6 py-3">Stipend</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr key={career._id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: "rgba(var(--dash-border))" }}>
                  <td className="px-6 py-4 text-2xl">
                    {career.icon}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {career.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-semibold border border-purple-200">
                      {career.jobType || "Internship"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-xs">{career.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {career.preferredBackground || "Any"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                    {career.stipend || "Not specified"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${career.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {career.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(career)}
                        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(career._id)}
                        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
          <div className="rounded-2xl shadow-2xl w-full max-w-4xl relative border animate-in fade-in zoom-in-95 duration-200" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
            
            <div className="flex justify-between items-center px-8 py-6 border-b" style={{ borderColor: "rgba(var(--dash-border))" }}>
              <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: "rgb(var(--dash-ink))" }}>
                <Briefcase className="text-purple-500" size={28} />
                {editingCareer ? "Edit Career Track" : "Create New Career Track"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-colors focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Type size={16} className="text-blue-500" /> Track Title
                    </label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
                      placeholder="e.g. Frontend Developer"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Smile size={16} className="text-yellow-500" /> Emoji Icon
                      </label>
                      <input 
                        type="text" 
                        name="icon" 
                        value={formData.icon} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white text-center text-xl"
                        placeholder="🚀"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Tag size={16} className="text-pink-500" /> Job Type
                      </label>
                      <select 
                        name="jobType" 
                        value={formData.jobType} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white appearance-none cursor-pointer"
                      >
                        <option value="Internship">Internship</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <GraduationCap size={16} className="text-green-500" /> Preferred Background
                    </label>
                    <input 
                      type="text" 
                      name="preferredBackground" 
                      value={formData.preferredBackground} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
                      placeholder="e.g. B.Tech CS/IT, Design Student"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <DollarSign size={16} className="text-emerald-500" /> Stipend / Salary
                    </label>
                    <input 
                      type="text" 
                      name="stipend" 
                      value={formData.stipend} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
                      placeholder="e.g. $500/month or Unpaid"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col h-full space-y-6">
                  <div className="flex-grow flex flex-col">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-2">
                        <AlignLeft size={16} className="text-purple-500" /> Description
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-md font-semibold">Markdown Supported</span>
                    </label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange}
                      className="w-full flex-grow min-h-[220px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 dark:text-white resize-none font-mono text-sm"
                      placeholder="Describe the role, responsibilities, and requirements. You can use Markdown (**bold**, *italic*, - lists)!"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}>
                    <div className="flex items-center h-5">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={formData.isActive} 
                        onChange={handleChange}
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="ml-3 text-sm flex-grow">
                      <label className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer flex items-center gap-2">
                        <CheckCircle size={16} className={formData.isActive ? "text-green-500" : "text-gray-400"} />
                        Active Status
                      </label>
                      <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                        If unchecked, this role will be hidden from the public careers page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end gap-4" style={{ borderColor: "rgba(var(--dash-border))" }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none transition-all dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-3 font-bold text-white bg-purple-600 border border-transparent rounded-xl hover:bg-purple-700 hover:shadow-lg focus:outline-none transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <Briefcase size={18} />
                  {editingCareer ? "Update Track" : "Publish Track"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={"this career"}
        isLoading={false}
      />
    </div>
  );
}

export default ManageCareers;
