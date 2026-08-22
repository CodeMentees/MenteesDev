import { useState, useEffect } from 'react';
import api from '../../services/api';
import { SkeletonCard } from '../../components/LoadingSpinner';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeUsers: 0,
    recentEnrollments: [],
    courseStats: [],
    userGrowth: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch all required data
      const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
        api.get('/admin/users?limit=1000'),
        api.get('/admin/courses?limit=1000'),
        api.get('/admin/enrollments?limit=200')
      ]);

      const users = usersRes.data.users || [];
      const courses = coursesRes.data.courses || [];
      const enrollments = enrollmentsRes.data.enrollments || [];

      // Calculate stats
      const totalUsers = users.length;
      const totalCourses = courses.length;
      const totalEnrollments = enrollments.length;
      const activeUsers = users.filter(u => {
        const lastActive = new Date(u.lastLogin || u.createdAt);
        const daysSince = (Date.now() - lastActive) / (1000 * 60 * 60 * 24);
        return daysSince <= 30;
      }).length;

      // Course enrollment stats
      const courseStats = courses.map(course => {
        const enrollmentCount = enrollments.filter(e => e.course?._id === course._id).length;
        return {
          name: course.title,
          enrollments: enrollmentCount,
          capacity: course.capacity || 100
        };
      }).sort((a, b) => b.enrollments - a.enrollments).slice(0, 5);

      // Recent enrollments
      const recentEnrollments = enrollments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(e => ({
          ...e,
          user: e.user || users.find(u => u._id === e.user),
          course: e.course || courses.find(c => c._id === e.course)
        }));

      // User growth (last 6 months)
      const userGrowth = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        const month = date.toLocaleString('default', { month: 'short' });
        
        const count = users.filter(u => {
          const userDate = new Date(u.createdAt);
          return userDate.getMonth() === date.getMonth() && userDate.getFullYear() === date.getFullYear();
        }).length;

        return { month, users: count };
      });

      setStats({
        totalUsers,
        totalCourses,
        totalEnrollments,
        activeUsers,
        recentEnrollments,
        courseStats,
        userGrowth
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-dash-ink dark:text-white">📊 Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon="📚"
          color="from-teal-500 to-teal-600"
        />
        <StatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          icon="✓"
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Active Users (30d)"
          value={stats.activeUsers}
          icon="⚡"
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="dash-card">
          <h3 className="text-xl font-bold mb-4 text-dash-ink dark:text-white">📈 User Growth</h3>
          <div className="space-y-3">
            {stats.userGrowth.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted w-12">{item.month}</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-full flex items-center justify-end pr-2 text-white text-xs font-bold transition-all"
                    style={{ width: `${Math.max((item.users / Math.max(...stats.userGrowth.map(g => g.users))) * 100, 5)}%` }}
                  >
                    {item.users}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="dash-card">
          <h3 className="text-xl font-bold mb-4 text-dash-ink dark:text-white">🏆 Top Courses</h3>
          <div className="space-y-3">
            {stats.courseStats.map((course, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-2xl font-bold text-teal-600 w-8">#{idx + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-dash-ink dark:text-white truncate">
                    {course.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-full rounded-full"
                        style={{ width: `${(course.enrollments / course.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted">{course.enrollments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="dash-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-dash-ink dark:text-white">🔔 Recent Enrollments</h3>
          <button
            onClick={() => {
              const rows = [
                ["Employee", "Course", "Date", "Status", "Due Date"],
                ...stats.recentEnrollments.map((e) => [
                  e.user?.name || "Unknown",
                  e.course?.title || "Unknown",
                  new Date(e.createdAt).toLocaleDateString(),
                  "Active",
                  e.dueDate ? new Date(e.dueDate).toLocaleDateString() : "None",
                ]),
              ];
              const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "onboarding_report.csv";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition"
          >
            ⬇ Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-default">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted">Course</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentEnrollments.map((enrollment, idx) => (
                <tr key={idx} className="border-b border-default hover:bg-surface transition">
                  <td className="py-3 px-4">
                    <p className="font-medium text-dash-ink dark:text-white">
                      {enrollment.user?.name || 'Unknown'}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted">
                    {enrollment.course?.title || 'Unknown Course'}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="dash-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-muted mb-1">{title}</p>
          <p className="text-3xl font-bold text-dash-ink dark:text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
