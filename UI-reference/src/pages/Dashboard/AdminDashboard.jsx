import { useEffect, useState } from "react";
import {
    getAdminStats,
    getAdminUsers,
    getAdminCourses,
    assignCourse,
    getSystemPrompt,
    updateSystemPrompt,
} from "../../services/adminService";
import { toggleCoursePublish, deleteCourse } from "../../services/courseService";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Assign Course state
    const [assignForm, setAssignForm] = useState({ userId: "", courseId: "", dueDate: "" });
    const [assignLoading, setAssignLoading] = useState(false);
    const [assignMsg, setAssignMsg] = useState({ type: "", text: "" });

    // AI Prompt state
    const [promptText, setPromptText] = useState("");
    const [promptLoading, setPromptLoading] = useState(false);
    const [promptMsg, setPromptMsg] = useState({ type: "", text: "" });

    const loadAdminData = async () => {
        try {
            setLoading(true);
            const [statsRes, usersRes, coursesRes, promptRes] = await Promise.all([
                getAdminStats(),
                getAdminUsers(1, 8),
                getAdminCourses(1, 8),
                getSystemPrompt(),
            ]);
            setStats(statsRes.stats || null);
            setUsers(usersRes.users || []);
            setCourses(coursesRes.courses || []);
            setPromptText(promptRes.aiSystemPrompt || "");
            setError("");
        } catch (err) {
            setError(err.message || "Failed to load admin data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    const handleTogglePublish = async (id) => {
        try {
            await toggleCoursePublish(id);
            loadAdminData();
        } catch (err) {
            setError(err.message || "Failed to update course status");
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourse(id);
            loadAdminData();
        } catch (err) {
            setError(err.message || "Failed to delete course");
        }
    };

    const handleAssignCourse = async (e) => {
        e.preventDefault();
        setAssignLoading(true);
        setAssignMsg({ type: "", text: "" });
        try {
            await assignCourse(assignForm.userId, assignForm.courseId, assignForm.dueDate || null);
            setAssignMsg({ type: "success", text: "✅ Course successfully assigned to employee!" });
            setAssignForm({ userId: "", courseId: "", dueDate: "" });
        } catch (err) {
            setAssignMsg({ type: "error", text: `❌ ${err.message}` });
        } finally {
            setAssignLoading(false);
        }
    };

    const handleSavePrompt = async (e) => {
        e.preventDefault();
        setPromptLoading(true);
        setPromptMsg({ type: "", text: "" });
        try {
            await updateSystemPrompt(promptText);
            setPromptMsg({ type: "success", text: "✅ AI system prompt updated successfully!" });
        } catch (err) {
            setPromptMsg({ type: "error", text: `❌ ${err.message}` });
        } finally {
            setPromptLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 fade-in">
            <div>
                <h1 className="text-3xl font-semibold mb-2">Admin Control</h1>
                <p className="text-muted">Overview of platform activity and latest updates.</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* STATS */}
            <div className="dash-grid dash-grid-3 stagger">
                <div className="stat-card">
                    <p className="text-sm text-muted">Total Employees</p>
                    <p className="stat-number">{stats?.totalUsers ?? 0}</p>
                    <span className="badge-soft">Active</span>
                </div>
                <div className="stat-card">
                    <p className="text-sm text-muted">Managers</p>
                    <p className="stat-number">{stats?.totalMentors ?? 0}</p>
                    <span className="badge-soft">Verified</span>
                </div>
                <div className="stat-card">
                    <p className="text-sm text-muted">Onboarding Paths</p>
                    <p className="stat-number">{stats?.totalCourses ?? 0}</p>
                    <p className="text-xs text-muted">Published: {stats?.publishedCourses ?? 0}</p>
                </div>
            </div>

            {/* ASSIGN COURSE PANEL */}
            <div className="panel">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">📋 Assign Course to Employee</h2>
                    <p className="text-sm text-muted mt-1">
                        Manually enroll an employee into an onboarding path and optionally set a completion deadline.
                    </p>
                </div>
                <form onSubmit={handleAssignCourse} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted">Employee</label>
                        <select
                            className="border border-default rounded-lg px-3 py-2 text-sm bg-surface focus:outline-none focus:border-teal-500"
                            value={assignForm.userId}
                            onChange={(e) => setAssignForm((f) => ({ ...f, userId: e.target.value }))}
                            required
                        >
                            <option value="">Select employee...</option>
                            {users.map((u) => (
                                <option key={u._id} value={u._id}>
                                    {u.name} ({u.role})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted">Onboarding Path</label>
                        <select
                            className="border border-default rounded-lg px-3 py-2 text-sm bg-surface focus:outline-none focus:border-teal-500"
                            value={assignForm.courseId}
                            onChange={(e) => setAssignForm((f) => ({ ...f, courseId: e.target.value }))}
                            required
                        >
                            <option value="">Select course...</option>
                            {courses.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted">Due Date (optional)</label>
                        <input
                            type="date"
                            className="border border-default rounded-lg px-3 py-2 text-sm bg-surface focus:outline-none focus:border-teal-500"
                            value={assignForm.dueDate}
                            onChange={(e) => setAssignForm((f) => ({ ...f, dueDate: e.target.value }))}
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={assignLoading}
                        className="btn btn-primary text-sm disabled:opacity-60"
                    >
                        {assignLoading ? "Assigning..." : "Assign Course"}
                    </button>
                </form>
                {assignMsg.text && (
                    <p className={`mt-3 text-sm font-medium ${assignMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                        {assignMsg.text}
                    </p>
                )}
            </div>

            {/* AI SYSTEM PROMPT PANEL */}
            <div className="panel">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">🤖 AI Agent System Prompt</h2>
                    <p className="text-sm text-muted mt-1">
                        Configure the base personality and instructions for the OnboardAI agent. This prompt is injected before every conversation.
                    </p>
                </div>
                <form onSubmit={handleSavePrompt} className="flex flex-col gap-3">
                    <textarea
                        className="border border-default rounded-lg px-3 py-2 text-sm bg-surface focus:outline-none focus:border-teal-500 resize-y min-h-[120px] font-mono"
                        placeholder="e.g. You are OnboardAI, a professional assistant. Always be concise and friendly. Prioritize HR policies above all else."
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted">
                            Changes take effect immediately on the next chat message.
                        </p>
                        <button
                            type="submit"
                            disabled={promptLoading}
                            className="btn btn-primary text-sm disabled:opacity-60"
                        >
                            {promptLoading ? "Saving..." : "Save Prompt"}
                        </button>
                    </div>
                </form>
                {promptMsg.text && (
                    <p className={`mt-3 text-sm font-medium ${promptMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                        {promptMsg.text}
                    </p>
                )}
            </div>

            {/* USERS */}
            <div className="panel">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Users</h2>
                    <span className="text-xs text-muted">Latest 8</span>
                </div>
                <div className="overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left text-muted">
                            <tr>
                                <th className="py-2">Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Role</th>
                                <th className="py-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-muted">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id} className="border-t">
                                        <td className="py-2">{user.name}</td>
                                        <td className="py-2">{user.email}</td>
                                        <td className="py-2 capitalize">{user.role}</td>
                                        <td className="py-2">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* COURSES */}
            <div className="panel">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Onboarding Paths</h2>
                    <span className="text-xs text-muted">Latest 8</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {courses.length === 0 ? (
                        <p className="text-muted">No onboarding paths available.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course._id} className="dash-card flex flex-col gap-3">
                                <div>
                                    <h3 className="font-semibold">{course.title}</h3>
                                    <p className="text-sm text-muted">{course.description}</p>
                                </div>
                                <div className="text-xs text-muted">
                                    Creator: {course.createdBy?.name || "Unknown"}
                                </div>
                                <div className="text-xs">
                                    Status: {course.isPublished ? "Published" : "Draft"}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleTogglePublish(course._id)}
                                        className="btn btn-secondary text-xs"
                                    >
                                        {course.isPublished ? "Unpublish" : "Publish"}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourse(course._id)}
                                        className="btn btn-primary text-xs"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}