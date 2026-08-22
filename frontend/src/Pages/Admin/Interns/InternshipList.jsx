import React, { useEffect, useState } from "react";
import axios from "axios";

function InternshipList() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIntern, setEditingIntern] = useState(null);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await axios.get("/api/internships");
      setInterns(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching internships:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`/api/internships/${id}`);
        setInterns(interns.filter((intern) => intern._id !== id));
      } catch (error) {
        console.error("Failed to delete application:", error);
        alert("Failed to delete application");
      }
    }
  };

  const handleEditClick = (intern) => {
    setEditingIntern(intern);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditingIntern({ ...editingIntern, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/internships/${editingIntern._id}`, editingIntern);
      setInterns(interns.map((intern) => 
        intern._id === editingIntern._id ? response.data.data : intern
      ));
      setIsEditModalOpen(false);
      setEditingIntern(null);
    } catch (error) {
      console.error("Failed to update application:", error);
      alert("Failed to update application");
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>Internship Applications</h2>
      </div>

      <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
      {loading ? (
        <div className="text-center py-10" style={{ color: "rgb(var(--text-secondary))" }}>Loading applications...</div>
      ) : interns.length === 0 ? (
        <div className="text-center py-10 rounded-lg border border-dashed" style={{ color: "rgb(var(--text-secondary))", borderColor: "rgba(var(--dash-border))" }}>
          No applications received yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-b" style={{ color: "rgb(var(--text-primary))", borderColor: "rgba(var(--dash-border))" }}>
            <thead className="text-xs uppercase" style={{ backgroundColor: "rgba(var(--dash-border))", color: "rgb(var(--text-secondary))" }}>
              <tr>
                <th className="px-6 py-3">Applicant Name</th>
                <th className="px-6 py-3">Contact Details</th>
                <th className="px-6 py-3">College</th>
                <th className="px-6 py-3">Tech Track</th>
                <th className="px-6 py-3 text-center">Resume</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern._id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: "rgba(var(--dash-border))" }}>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {intern.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <a href={`mailto:${intern.email}`} className="text-blue-500 hover:underline">{intern.email}</a>
                      <a href={`tel:${intern.phone}`} className="hover:underline" style={{ color: "rgb(var(--text-secondary))" }}>{intern.phone}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {intern.college}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium border border-purple-200">
                      {intern.techStack}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {intern.resumeDriveLink ? (
                      <a 
                        href={intern.resumeDriveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Not Provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEditClick(intern)}
                        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(intern._id)}
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

      {/* Edit Modal */}
      {isEditModalOpen && editingIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="rounded-xl shadow-2xl w-full max-w-md m-4 p-6 relative border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>Edit Application</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={editingIntern.name} 
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={editingIntern.phone} 
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                <input 
                  type="text" 
                  name="college" 
                  value={editingIntern.college} 
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Track</label>
                <select 
                  name="techStack" 
                  value={editingIntern.techStack} 
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  required
                >
                  <option value="Full Stack Web Development (React + Node.js)">Full Stack Web Development (React + Node.js)</option>
                  <option value="Python & Django Backend Development">Python & Django Backend Development</option>
                  <option value="Data Structures & Algorithms (C++ / Python)">Data Structures & Algorithms (C++ / Python)</option>
                  <option value="C++ Programming & Competitive Coding">C++ Programming & Competitive Coding</option>
                  <option value="Python for Data Science">Python for Data Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning & Generative AI">Deep Learning & Generative AI</option>
                  <option value="Flutter Mobile Development">Flutter Mobile Development</option>
                  <option value="UI/UX Design (Figma)">UI/UX Design (Figma)</option>
                  <option value="DevOps & Cloud (Docker + AWS)">DevOps & Cloud (Docker + AWS)</option>
                  <option value="FULL STACK AI MERN STACK">FULL STACK AI MERN STACK</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternshipList;
