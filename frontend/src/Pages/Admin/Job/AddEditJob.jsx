import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, Link as LinkIcon, Building, ArrowLeft, Save } from "lucide-react";

function AddEditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    applyLink: "",
    expirationDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`/api/jobs`);
      // Finding the specific job from the list since I didn't implement getJobById separately (though I could)
      const job = response.data.data.find(j => j._id === id);
      if (job) {
        setFormData({
          role: job.role,
          company: job.company || "",
          applyLink: job.applyLink,
          expirationDate: job.expirationDate ? new Date(job.expirationDate).toISOString().split('T')[0] : "",
        });
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to fetch job details");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEditMode) {
        await axios.put(`/api/jobs/${id}`, formData);
      } else {
        await axios.post("/api/jobs", formData);
      }
      navigate("/admin/jobs");
    } catch (err) {
      console.error("Error saving job:", err);
      setError(err.response?.data?.message || "Failed to save job opportunity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgb(var(--dash-bg))" }}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to list
        </button>

        <div className="rounded-3xl shadow-xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
          <div className="px-8 py-6" style={{ backgroundColor: "rgb(var(--accent))" }}>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Briefcase />
              {isEditMode ? "Edit Job Opportunity" : "Post New Job Opportunity"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" />
                Job Role *
              </label>
              <input
                type="text"
                name="role"
                required
                placeholder="e.g. Frontend Developer Intern"
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Building size={16} className="text-purple-500" />
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Google, Microsoft, or Recruiting Agency"
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <LinkIcon size={16} className="text-green-500" />
                Application Link *
              </label>
              <input
                type="url"
                name="applyLink"
                required
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                value={formData.applyLink}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <span className="text-red-500">⏳</span>
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                name="expirationDate"
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                value={formData.expirationDate}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-2">After this date, the job post will be hidden automatically.</p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 text-white font-bold rounded-xl transition-all transform active:scale-95 disabled:opacity-50 shadow-lg"
                style={{ backgroundColor: "rgb(var(--accent))" }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={20} />
                    {isEditMode ? "Update Opportunity" : "Post Opportunity"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditJob;
