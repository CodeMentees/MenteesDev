import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserAPI } from "../api/userApi";
import { FaUsers, FaUserPlus, FaUserSlash, FaArrowRight, FaEdit, FaChartLine, FaBriefcase, FaBook, FaGlobe } from "react-icons/fa";
import DeleteConfirmModal from "../Components/UI/DeleteConfirmModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOverview = () => {
    const { fetchUsers, deleteUser, fetchGrowth } = useUserAPI();
    const user = useSelector((state) => state.auth.user);
    const [stats, setStats] = useState({ totalUsers: 0, recentUsers: [] });
    const [growthData, setGrowthData] = useState([]);
    const [visitorStats, setVisitorStats] = useState({ todayVisitors: 0, totalVisitors: 0 });
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers(1, 5);
            setStats({
                totalUsers: data.totalUsers || 0,
                recentUsers: data.data || [],
            });

            // Fetch user growth data
            const growth = await fetchGrowth();
            setGrowthData(growth || []);

            // Fetch visitor stats
            const visitorRes = await fetch("/api/visitors/stats");
            const visitorData = await visitorRes.json();
            if (visitorData.success) {
                setVisitorStats(visitorData.data);
            }
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        try {
            await deleteUser(userToDelete._id);
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
            loadData(); // Refresh stats and list
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Total Users</p>
                            <h3 className="stat-number mt-1">{stats.totalUsers}</h3>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
                            <FaUsers size={22} style={{ color: "rgb(249,115,22)" }} />
                        </div>
                    </div>
                    <Link to="/admin/users" className="mt-5 flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: "rgb(249,115,22)" }}>
                        Manage Users <FaArrowRight className="h-3 w-3" />
                    </Link>
                </div>

                <Link to="/admin/users/create" className="stat-card block">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Add User</p>
                            <h3 className="stat-number mt-1 text-2xl">New Member</h3>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                            <FaUserPlus size={22} style={{ color: "rgb(34,197,94)" }} />
                        </div>
                    </div>
                    <p className="mt-5 text-sm" style={{ color: "rgb(var(--dash-muted))" }}>Onboard a new instructor or admin.</p>
                </Link>

                <div className="stat-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Site Visitors (Today / Total)</p>
                            <h3 className="stat-number mt-1 text-2xl">{visitorStats.todayVisitors} <span className="text-sm text-gray-500">/ {visitorStats.totalVisitors}</span></h3>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                            <FaGlobe size={22} style={{ color: "rgb(99,102,241)" }} />
                        </div>
                    </div>
                    <p className="mt-5 text-sm" style={{ color: "rgb(var(--dash-muted))" }}>Track traffic across the site.</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="panel">
                <h2 className="text-xl font-bold mb-6" style={{ color: "rgb(var(--dash-ink))" }}>Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(user?.isAdmin || user?.isFullAccess) && (
                        <Link to="/admin/posts" className="p-4 rounded-xl border hover:bg-gray-800 transition flex flex-col items-center justify-center text-center gap-3" style={{ borderColor: "rgba(var(--dash-border))", background: "rgba(255,255,255,0.02)" }}>
                            <FaEdit size={24} style={{ color: "rgb(249,115,22)" }} />
                            <span className="font-semibold text-white">Manage Blogs</span>
                        </Link>
                    )}
                    {(user?.isAdmin || user?.isFullAccess) && (
                        <Link to="/admin/jobs" className="p-4 rounded-xl border hover:bg-gray-800 transition flex flex-col items-center justify-center text-center gap-3" style={{ borderColor: "rgba(var(--dash-border))", background: "rgba(255,255,255,0.02)" }}>
                            <FaBriefcase size={24} style={{ color: "rgb(34,197,94)" }} />
                            <span className="font-semibold text-white">Manage Jobs</span>
                        </Link>
                    )}
                    {(user?.isAdmin || user?.isFullAccess) && (
                        <Link to="/admin/courses" className="p-4 rounded-xl border hover:bg-gray-800 transition flex flex-col items-center justify-center text-center gap-3" style={{ borderColor: "rgba(var(--dash-border))", background: "rgba(255,255,255,0.02)" }}>
                            <FaBook size={24} style={{ color: "rgb(99,102,241)" }} />
                            <span className="font-semibold text-white">Manage Courses</span>
                        </Link>
                    )}
                    <Link to="/admin/users" className="p-4 rounded-xl border hover:bg-gray-800 transition flex flex-col items-center justify-center text-center gap-3" style={{ borderColor: "rgba(var(--dash-border))", background: "rgba(255,255,255,0.02)" }}>
                        <FaUsers size={24} style={{ color: "rgb(234,179,8)" }} />
                        <span className="font-semibold text-white">Manage Users</span>
                    </Link>
                </div>
            </div>

            {/* Chart Section */}
            <div className="panel">
                <h2 className="text-xl font-bold mb-6" style={{ color: "rgb(var(--dash-ink))" }}>User Growth (7 Days)</h2>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(140,140,140,0.5)" tick={{fill: 'rgb(140,140,140)'}} axisLine={false} tickLine={false} />
                            <YAxis stroke="rgba(140,140,140,0.5)" tick={{fill: 'rgb(140,140,140)'}} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgb(3,20,40)', borderColor: 'rgba(249,115,22,0.2)', color: '#fff', borderRadius: '0.75rem' }}
                                itemStyle={{ color: 'rgb(249,115,22)' }}
                            />
                            <Line type="monotone" dataKey="users" stroke="rgb(249,115,22)" strokeWidth={2.5}
                                dot={{ r: 4, fill: 'rgb(249,115,22)', strokeWidth: 2, stroke: 'rgb(234,88,12)' }}
                                activeDot={{ r: 6, fill: 'rgb(249,115,22)' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="panel overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>Recent Users</h2>
                    <Link to="/admin/users" className="text-sm font-semibold transition-colors"
                        style={{ color: "rgb(249,115,22)" }}>View All</Link>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-10 text-center" style={{ color: "rgb(var(--dash-muted))" }}>Loading users...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(var(--dash-border))" }}>
                                    <th className="pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Name</th>
                                    <th className="pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Email</th>
                                    <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "rgb(var(--dash-muted))" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentUsers.map((user) => (
                                    <tr key={user._id}
                                        className="transition-colors"
                                        style={{ borderBottom: "1px solid rgba(var(--dash-border))" }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(249,115,22,0.04)"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                    >
                                        <td className="py-3 font-medium" style={{ color: "rgb(var(--dash-ink))" }}>{user.name}</td>
                                        <td className="py-3 text-sm" style={{ color: "rgb(var(--dash-muted))" }}>{user.email}</td>
                                        <td className="py-3 text-right flex justify-end gap-2">
                                            <Link
                                                to={`/admin/users/edit/${user._id}`}
                                                className="p-2 rounded-lg transition-all"
                                                style={{ color: "rgb(249,115,22)" }}
                                                title="Edit User"
                                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
                                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(user)}
                                                className="p-2 rounded-lg transition-all"
                                                style={{ color: "rgb(239,68,68)" }}
                                                title="Delete User"
                                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                            >
                                                <FaUserSlash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-10 text-center italic" style={{ color: "rgb(var(--dash-muted))" }}>No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={userToDelete?.name}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default DashboardOverview;
