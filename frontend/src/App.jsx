import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';
import RouteProgressBar from './Components/UI/RouteProgressBar';
import Loading from './Components/Helpers/Loading';
import useScrollReveal from './hooks/useScrollReveal';
import ScrollToTop from './Components/UI/ScrollToTop';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// Lazy load components
const Home = lazy(() => import('./Pages/Home'));
const LoginPage = lazy(() => import('./Pages/Login'));
const RegisterPage = lazy(() => import('./Pages/Register'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const Blog = lazy(() => import('./Pages/Blog'));
const DashboardLayout = lazy(() => import('./Pages/Dashboard'));
const AddPost = lazy(() => import('./Pages/Post/AddPost'));
const PostList = lazy(() => import('./Pages/Post/PostList'));
const AllCourse = lazy(() => import('./Pages/AllCourse'));
const CourseDetails = lazy(() => import('./Pages/CourseDetails'));
const UpdateCourseDetails = lazy(() => import('./Pages/Course/UpdateCourseDetails'));
const AddCourse = lazy(() => import('./Pages/Course/AddCourse'));
const AddCourseCategory = lazy(() => import('./Pages/Course/AddCourseCategory'));
const QueryList = lazy(() => import('./Pages/Query/QueryList'));
const SchoolCodingLeadList = lazy(() => import('./Pages/Query/SchoolCodingLeadList'));
const CourseList = lazy(() => import('./Pages/Course/CourseList'));
const Unauth = lazy(() => import('./Pages/Error/Unauth'));
const AdminRoutes = lazy(() => import("./AdminRoute"));
const StudentRoute = lazy(() => import("./StudentRoute"));
const StudentDashboard = lazy(() => import("./Pages/Student/StudentDashboard"));
const MyCourses = lazy(() => import("./Pages/Student/MyCourses"));
const BlogPage = lazy(() => import('./Pages/BlogPage'));
const HomeSite = lazy(() => import('./Pages/Home/HomeSite'));
const CategoryList = lazy(() => import('./Pages/Course/CategoryList'));
const EventManager = lazy(() => import('./Pages/Event/AddEvent').then(m => ({ default: m.EventManager })));
const CreateEvent = lazy(() => import('./Pages/Event/AddEvent').then(m => ({ default: m.CreateEvent })));
const BlogCategoryManager = lazy(() => import('./Components/Blog/BlogCategoryManger'));
const NotFound = lazy(() => import('./Pages/Error/NotFound'));
const About = lazy(() => import('./Pages/About/About'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const FAQ = lazy(() => import('./Pages/FAQ/FAQ'));
const UserList = lazy(() => import('./Pages/User/UserList'));
const AddEditUser = lazy(() => import('./Pages/User/AddEditUser'));
const DashboardOverview = lazy(() => import('./Pages/DashboardOverview'));
const SchoolCoding = lazy(() => import('./Pages/SchoolCoding'));
const CurriculumCatalog = lazy(() => import('./Pages/CurriculumCatalog'));
const SchoolCourseList = lazy(() => import('./Pages/Course/SchoolCourseList'));
const AddEditSchoolCourse = lazy(() => import('./Pages/Course/AddEditSchoolCourse'));
const CourseManagement = lazy(() => import('./Pages/Course/CourseManagement'));
const OTPVerification = lazy(() => import('./Pages/OTPVerification'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const LivePage = lazy(() => import('./Pages/Live/LiveCourse'));
const LiveCourseDetails = lazy(() => import('./Pages/Live/LiveCourseDetails'));
const LiveCourseList = lazy(() => import('./Pages/Admin/LiveCourse/LiveCourseList'));
const AddEditLiveCourse = lazy(() => import('./Pages/Admin/LiveCourse/AddEditLiveCourse'));
const LiveCourseContent = lazy(() => import('./Pages/Admin/LiveCourse/LiveCourseContent'));
const PlacementSupport = lazy(() => import('./Pages/PlacementSupport'));
const JobManagement = lazy(() => import('./Pages/Admin/Job/JobManagement'));
const AddEditJob = lazy(() => import('./Pages/Admin/Job/AddEditJob'));
const SummerInternship = lazy(() => import('./Pages/Internship/SummerInternship'));
const InternshipList = lazy(() => import('./Pages/Admin/Interns/InternshipList'));
const BulkMailSender = lazy(() => import('./Pages/Admin/BulkMail/BulkMailSender'));

// HelmetWrapper component to handle SEO meta tags
import SEOHead from './seo/SEOHead';

const SEOHeadWrapper = ({ path, noindex, title, children }) => (
  <>
    <SEOHead path={path} noindex={noindex} title={title} />
    {children}
  </>
);

// Admin routes configuration
const adminRoutes = [
  { path: "", title: "Overview", element: <DashboardOverview /> },
  { path: "site-settings", title: "Site Settings", element: <HomeSite /> },
  { path: "posts/create", title: "Create Post", element: <AddPost /> },
  { path: "posts/edit/:id", title: "Edit Post", element: <AddPost /> },
  { path: "posts/categories", title: "Post Categories", element: <BlogCategoryManager /> },
  { path: "posts", title: "Posts", element: <PostList /> },
  { path: "courses", title: "Courses", element: <CourseList /> },
  { path: "courses/create", title: "Create Course", element: <CourseManagement /> },
  { path: "courses/:id/manage", title: "Manage Course", element: <CourseManagement /> },
  { path: "courses/:id/edit", title: "Update Course", element: <UpdateCourseDetails /> },
  { path: "categories/create", title: "Create Category", element: <AddCourseCategory /> },
  { path: "categories/edit/:id", title: "Edit Category", element: <AddCourseCategory /> },
  { path: "categories", title: "Categories", element: <CategoryList /> },
  { path: "queries", title: "Queries", element: <QueryList /> },
  { path: "school-coding-leads", title: "School Coding Leads", element: <SchoolCodingLeadList /> },
  { path: "events", title: "Events", element: <EventManager /> },
  { path: "events/create", title: "Create Event", element: <CreateEvent /> },
  { path: "events/edit/:id", title: "Edit Event", element: <CreateEvent /> },
  { path: "users", title: "Users", element: <UserList /> },
  { path: "users/create", title: "Add User", element: <AddEditUser /> },
  { path: "users/edit/:id", title: "Edit User", element: <AddEditUser /> },
  { path: "school-courses", title: "School Courses", element: <SchoolCourseList /> },
  { path: "school-courses/add", title: "Add School Course", element: <AddEditSchoolCourse /> },
  { path: "school-courses/edit/:id", title: "Edit School Course", element: <AddEditSchoolCourse /> },
  { path: "live-courses", title: "Live Courses", element: <LiveCourseList /> },
  { path: "live-courses/create", title: "Create Live Course", element: <AddEditLiveCourse /> },
  { path: "live-courses/edit/:id", title: "Edit Live Course", element: <AddEditLiveCourse /> },
  { path: "live-courses/:id/content", title: "Manage Content", element: <LiveCourseContent /> },
  { path: "jobs", title: "Job Opportunities", element: <JobManagement /> },
  { path: "jobs/create", title: "Add Job Opportunity", element: <AddEditJob /> },
  { path: "jobs/edit/:id", title: "Edit Job Opportunity", element: <AddEditJob /> },
  { path: "interns", title: "Internship Applications", element: <InternshipList /> },
  { path: "bulk-mail", title: "Bulk Email Sender", element: <BulkMailSender /> }
];


// Inner component so hooks can access Router context
function AppInner() {
  useScrollReveal();

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      fetch('/api/visitors/track', { method: 'POST' })
        .catch(err => {
            console.error('Failed to track visitor:', err);
            // Optional: revert if it fails, though usually okay to keep it true
            // sessionStorage.removeItem('visited');
        });
    }
  }, []);

  return <ScrollToTop />;
}

function MainLayout({ children }) {
  const location = useLocation();
  
  // Do not show public header/footer on admin and student dashboards
  const isDashboardRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/student');

  return (
    <>
      {!isDashboardRoute && <Header />}
      <main className={`flex-grow font-sans ${!isDashboardRoute ? 'mt-12' : ''} page-mount`}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen" style={{ background: "#000005" }}>
          <RouteProgressBar />
          <AppInner />
          <MainLayout>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <SEOHeadWrapper path="/" noindex={false}>
                      <Home />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <SEOHeadWrapper path="/register" noindex={false}>
                      <RegisterPage />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/internships"
                  element={
                    <SEOHeadWrapper path="/internships" noindex={false}>
                      <SummerInternship />
                    </SEOHeadWrapper>
                  }
                />
                {/* Legacy redirect: keep /summer-internships working */}
                <Route path="/summer-internships" element={<Navigate to="/internships" replace />} />

                <Route
                  path="/verify-otp"
                  element={
                    <SEOHeadWrapper path="/verify-otp" noindex={true}>
                      <OTPVerification />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <SEOHeadWrapper path="/login" noindex={false}>
                      <LoginPage />
                    </SEOHeadWrapper>
                  }
                />\n\n                <Route
                  path="/forgot-password"
                  element={
                    <SEOHeadWrapper path="/forgot-password" noindex={true}>
                      <ForgotPassword />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/courses"
                  element={
                    <SEOHeadWrapper path="/courses" noindex={false}>
                      <AllCourse />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/courses/:courseId"
                  element={
                    <SEOHeadWrapper path="/courses" noindex={false}>
                      <CourseDetails />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/live"
                  element={
                    <SEOHeadWrapper path="/live" noindex={false}>
                      <LivePage />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/live/:id"
                  element={
                    <SEOHeadWrapper path="/live/:id" noindex={false}>
                      <LiveCourseDetails />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path='/about'
                  element={
                    <SEOHeadWrapper path="/about" noindex={false}>
                      <About />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/unauthorized"
                  element={
                    <SEOHeadWrapper path="/unauthorized" noindex={true}>
                      <Unauth />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <SEOHeadWrapper path="/contact" noindex={false}>
                      <Contact />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path='/faq'
                  element={
                    <SEOHeadWrapper path="/faq" noindex={false}>
                      <FAQ />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/school-coding"
                  element={
                    <SEOHeadWrapper path="/school-coding" noindex={false}>
                      <SchoolCoding />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/placement-support"
                  element={
                    <SEOHeadWrapper path="/placement-support" noindex={false}>
                      <PlacementSupport />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/school-coding/catalog"
                  element={
                    <SEOHeadWrapper path="/school-coding/catalog" noindex={false}>
                      <CurriculumCatalog />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/school-courses/edit/:id"
                  element={
                    <AdminRoutes>
                      <SEOHeadWrapper noindex={true} title="Edit School Course | CodeMentees">
                        <AddEditSchoolCourse />
                      </SEOHeadWrapper>
                    </AdminRoutes>
                  }
                />

                <Route
                  path="/blogs"
                  element={
                    <SEOHeadWrapper path="/blogs" noindex={false}>
                      <Blog />
                    </SEOHeadWrapper>
                  }
                />

                <Route
                  path="/blogs/:slug"
                  element={
                    <SEOHeadWrapper path="/blogs" noindex={false}>
                      <BlogPage />
                    </SEOHeadWrapper>
                  }
                />

                {/* Admin Routes (Dashboard) */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoutes>
                      <SEOHeadWrapper noindex={true} title="Admin Dashboard | CodeMentees">
                        <DashboardLayout />
                      </SEOHeadWrapper>
                    </AdminRoutes>
                  }
                >
                  {adminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <SEOHeadWrapper noindex={true} title={`${route.title} | CodeMentees`}>
                          {route.element}
                        </SEOHeadWrapper>
                      }
                    />
                  ))}
                </Route>

                <Route
                  path="*"
                  element={
                    <SEOHeadWrapper noindex={true} title="Page Not Found | CodeMentees">
                      <NotFound />
                    </SEOHeadWrapper>
                  }
                />
                {/* ─── Student Routes ─── */}
                <Route
                  path="/student"
                  element={
                    <StudentRoute>
                      <StudentDashboard />
                    </StudentRoute>
                  }
                >
                  {/* Default redirect or dashboard home */}
                  <Route index element={<MyCourses />} />
                  <Route path="courses" element={<MyCourses />} />
                  <Route path="live-classes" element={<div className="p-10 text-white">Live Classes feature coming soon.</div>} />
                  <Route path="certificates" element={<div className="p-10 text-white">Certificates feature coming soon.</div>} />
                  <Route path="profile" element={<div className="p-10 text-white">Student Profile feature coming soon.</div>} />
                </Route>

              </Routes>
            </Suspense>
          </MainLayout>
        </div>
      </Router>
    </>
  );
}

export default App;