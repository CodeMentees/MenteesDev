import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAPI } from "../api/userApi";
import { FaUsers, FaUserPlus, FaUserSlash, FaArrowRight, FaEdit } from "react-icons/fa";
import DeleteConfirmModal from "../Components/UI/DeleteConfirmModal";

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl hover:border-blue-500/50 transition-all group">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Users</p>
                            <h3 className="text-4xl font-black text-white mt-1">{stats.totalUsers}</h3>
                        </div>
                        <div className="p-4 bg-blue-900/30 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                            <FaUsers size={24} />
                        </div>
                    </div>
                    <Link to="/admin/users" className="mt-6 flex items-center text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
                        Manage Users <FaArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                </div>

                <Link to="/admin/users/create" className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl hover:border-green-500/50 transition-all group">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Add User</p>
                            <h3 className="text-2xl font-bold text-white mt-1">New Member</h3>
                        </div>
                        <div className="p-4 bg-green-900/30 rounded-xl text-green-500 group-hover:scale-110 transition-transform">
                            <FaUserPlus size={24} />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-500 text-sm">Onboard a new instructor or admin.</p>
                </Link>
            </div>

            {/* Recent Users Table */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Recent Users</h2>
                    <Link to="/admin/users" className="text-sm text-blue-400 hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-10 text-center text-gray-400">Loading users...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {stats.recentUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                                        <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <Link
                                                to={`/admin/users/edit/${user._id}`}
                                                className="text-blue-500 hover:text-blue-400 p-2 hover:bg-blue-900/20 rounded-lg transition-all"
                                                title="Edit User"
                                            >
                                                <FaEdit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(user)}
                                                className="text-red-500 hover:text-red-400 p-2 hover:bg-red-900/20 rounded-lg transition-all"
                                                title="Delete User"
                                            >
                                                <FaUserSlash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-500 italic">No users found.</td>
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
