import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAPI } from "../api/userApi";
import { FaUsers, FaUserPlus, FaUserSlash, FaArrowRight, FaEdit, FaChartLine } from "react-icons/fa";
import DeleteConfirmModal from "../Components/UI/DeleteConfirmModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Mon', users: 12 },
  { name: 'Tue', users: 19 },
  { name: 'Wed', users: 15 },
  { name: 'Thu', users: 22 },
  { name: 'Fri', users: 30 },
  { name: 'Sat', users: 25 },
  { name: 'Sun', users: 35 },
];

const DashboardOverview = () => {
    const { fetchUsers, deleteUser } = useUserAPI();
    const [stats, setStats] = useState({ totalUsers: 0, recentUsers: [] });
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
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgb(var(--dash-muted))" }}>Engagement</p>
                            <h3 className="stat-number mt-1 text-2xl">+24%</h3>
                        </div>
                        <div className="p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                            <FaChartLine size={22} style={{ color: "rgb(99,102,241)" }} />
                        </div>
                    </div>
                    <p className="mt-5 text-sm" style={{ color: "rgb(var(--dash-muted))" }}>Active user sessions this week.</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="panel">
                <h2 className="text-xl font-bold mb-6" style={{ color: "rgb(var(--dash-ink))" }}>User Growth (7 Days)</h2>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dummyData}>
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
