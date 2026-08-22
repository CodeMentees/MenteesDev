import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleGuard from "./routes/RoleGuard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MentorDashboard from "./pages/Dashboard/MentorDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import StudyPathway from "./pages/Dashboard/StudyPathway";
import Analytics from "./pages/Dashboard/Analytics";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import KnowledgeBaseManager from "./pages/Dashboard/KnowledgeBaseManager";

export default function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      {/* NORMAL PAGE ROUTES */}
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />


            <Route
              path="student"
              element={
                <RoleGuard allowedRoles={['user']}>
                  <StudentDashboard />
                </RoleGuard>
              }
            />

            <Route
              path="student/course/:id"
              element={
                <RoleGuard allowedRoles={['user']}>
                  <StudyPathway />
                </RoleGuard>
              }
            />

            <Route
              path="mentor"
              element={
                <RoleGuard allowedRoles={['mentor', 'admin']}>
                  <MentorDashboard />
                </RoleGuard>
              }
            />

            <Route
              path="admin"
              element={
                <RoleGuard allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleGuard>
              }
            />

            <Route
              path="analytics"
              element={
                <RoleGuard allowedRoles={['admin']}>
                  <Analytics />
                </RoleGuard>
              }
            />

            <Route
              path="knowledge"
              element={
                <RoleGuard allowedRoles={['mentor', 'admin']}>
                  <KnowledgeBaseManager />
                </RoleGuard>
              }
            />

          </Route>


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* MODAL ROUTE */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/courses/:id"
            element={<CourseDetail modal />}
          />
        </Routes>
      )}
    </>
  );
}
