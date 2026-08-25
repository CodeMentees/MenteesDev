import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RouteProgressBar from './Components/UI/RouteProgressBar';
import Loading from './Components/Helpers/Loading';
import useScrollReveal from './hooks/useScrollReveal';
import ScrollToTop from './Components/UI/ScrollToTop';

// Lazy load components
const Home = lazy(() => import('./Pages/Home'));
const LoginPage = lazy(() => import('./Pages/Login'));
const RegisterPage = lazy(() => import('./Pages/Register'));
const Header = lazy(() => import('./Components/Header/Header'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const Blog = lazy(() => import('./Pages/Blog'));
const DashboardLayout = lazy(() => import('./Pages/Dashboard'));
const AddPost = lazy(() => import('./Pages/Post/AddPost'));
const PostList = lazy(() => import('./Pages/Post/PostList'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
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
const HelmetWrapper = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/images/home.jpg",
  noindex = false,
  nofollow = false,
  children
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={`https://codementees.com${canonical}`} />

        {noindex || nofollow ? (
          <meta name="robots" content={`${noindex ? 'noindex' : ''}${nofollow ? ',nofollow' : ''}`} />
        ) : (
          <meta name="robots" content="index, follow" />
        )}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://codementees.com${canonical}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://codementees.com${ogImage}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://codementees.com${canonical}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`https://codementees.com${ogImage}`} />
      </Helmet>
      {children}
    </>
  );
};

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

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen" style={{ background: "#000005" }}>
          <RouteProgressBar />
          <AppInner />
          <Suspense fallback={<Loading />}>
            <Header />
            <main className="flex-grow font-sans mt-12 page-mount">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <HelmetWrapper
                      title="Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees"
                      description="Live 1:1 mentorship in Web Development, DSA & Interview Prep — from engineers at JPMorgan and Freecharge. Join 500+ developers already learning."
                      keywords="coding mentorship, 1:1 mentorship, web development, DSA, interview prep, job ready, remote coding, JavaScript, React"
                      canonical="/"
                    >
                      <Home />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <HelmetWrapper
                      title="Register | Start Your Coding Journey with CodeMentees"
                      description="Create an account at CodeMentees to access expert-led courses in AI/ML, Data Science, and DSA. Join our community of learners today."
                      keywords="register, join codementees, learning platform, coding courses"
                      canonical="/register"
                    >
                      <RegisterPage />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/summer-internships"
                  element={
                    <HelmetWrapper
                      title="Summer Training & Internships | CodeMentees"
                      description="Apply for our Summer Training and Internship program. Choose from 12+ tech stacks including AI, Data Science, MERN, and more!"
                      keywords="summer training, internship, MERN stack internship, AI internship, CodeMentees internship"
                      canonical="/summer-internships"
                    >
                      <SummerInternship />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/verify-otp"
                  element={
                    <HelmetWrapper
                      title="Verify Account | CodeMentees"
                      description="Enter the 6-digit code to verify your CodeMentees account"
                      canonical="/verify-otp"
                      noindex={true}
                    >
                      <OTPVerification />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <HelmetWrapper
                      title="Login | CodeMentees"
                      description="Login to your account to continue learning"
                      canonical="/login"
                    >
                      <LoginPage />
                    </HelmetWrapper>
                  }
                />\n\n                <Route
                  path="/forgot-password"
                  element={
                    <HelmetWrapper
                      title="Forgot Password | CodeMentees"
                      description="Reset your CodeMentees account password securely"
                      canonical="/forgot-password"
                      noindex={true}
                    >
                      <ForgotPassword />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/courses"
                  element={
                    <HelmetWrapper
                      title="All Courses | Coding, AI/ML, DSA & Tech Certification"
                      description="Explore our wide range of technical courses including AI/ML, Data Science, DSA, and Java/Python Programming. Get certified and prepare for your dream job."
                      keywords="AI/ML courses, Data Science classes, DSA course, Java Programming, Python Programming, Tech Certifications"
                      canonical="/courses"
                    >
                      <AllCourse />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/courses/:courseId"
                  element={
                    <HelmetWrapper
                      title="Course Details | Learn with Expert Mentors | CodeMentees"
                      description="Explore this mentor-led course at CodeMentees. Build real, hireable skills with 1:1 guidance from industry engineers."
                      canonical="/courses"
                    >
                      <CourseDetails />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/live"
                  element={
                    <HelmetWrapper
                      title="Live Courses | Interactive Classes | CodeMentees"
                      description="Join our live interactive coding classes. Expert-led sessions with real-time doubt clearing and certificate."
                      keywords="live coding classes, interactive courses, live DSA, live AI/ML"
                      canonical="/live"
                    >
                      <LivePage />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/live/:id"
                  element={
                    <HelmetWrapper
                      title="Live Course Details | CodeMentees"
                      description="View live course content and join sessions."
                      canonical="/live/:id"
                    >
                      <LiveCourseDetails />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path='/about'
                  element={
                    <HelmetWrapper
                      title="About Us | CodeMentees"
                      description="Learn about our mission, vision, and team of coding experts"
                      canonical="/about"
                    >
                      <About />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/unauthorized"
                  element={
                    <HelmetWrapper
                      title="Unauthorized | CodeMentees"
                      description="You don't have permission to access this page"
                      canonical="/unauthorized"
                      noindex={true}
                    >
                      <Unauth />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <HelmetWrapper
                      title="Contact Us | CodeMentees"
                      description="Get in touch with our team for questions and support"
                      canonical="/contact"
                    >
                      <Contact />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path='/faq'
                  element={
                    <HelmetWrapper
                      title="FAQ | CodeMentees"
                      description="Frequently asked questions about our platform and courses"
                      canonical="/faq"
                    >
                      <FAQ />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/school-coding"
                  element={
                    <HelmetWrapper
                      title="School Coding | K-12 Computer Science Curriculum"
                      description="Complete coding curriculum for schools. Teach kids Python, Scratch, and Computer Science fundamentals with CodeMentees' global standards."
                      keywords="School Coding, K-12 Coding, Kids Coding, Coding for Schools"
                      canonical="/school-coding"
                    >
                      <SchoolCoding />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/placement-support"
                  element={
                    <HelmetWrapper
                      title="Placement Support | Live Job Opportunities | CodeMentees"
                      description="Access live job opportunities and placement support from CodeMentees. Hand-picked roles for our students."
                      keywords="placement support, job opportunities, tech jobs, internships"
                      canonical="/placement-support"
                    >
                      <PlacementSupport />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/school-coding/catalog"
                  element={
                    <HelmetWrapper
                      title="Curriculum Catalog | CodeMentees"
                      description="Explore our full school coding curriculum."
                      canonical="/school-coding/catalog"
                    >
                      <CurriculumCatalog />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/school-courses/edit/:id"
                  element={
                    <AdminRoutes>
                      <HelmetWrapper
                        title="Edit School Course | CodeMentees"
                        description="Edit school course details"
                        noindex={true}
                      >
                        <AddEditSchoolCourse />
                      </HelmetWrapper>
                    </AdminRoutes>
                  }
                />

                <Route
                  path="/blogs"
                  element={
                    <HelmetWrapper
                      title="Blog | CodeMentees"
                      description="Read our latest articles and insights about coding and technology"
                      canonical="/blogs"
                    >
                      <Blog />
                    </HelmetWrapper>
                  }
                />

                <Route
                  path="/blogs/:id"
                  element={
                    <HelmetWrapper
                      title="Blog Post | CodeMentees"
                      description="Read the latest coding guides, DSA tips, and web development articles from the CodeMentees mentor community."
                      canonical="/blogs"
                    >
                      <BlogPage />
                    </HelmetWrapper>
                  }
                />

                {/* Admin Routes (Dashboard) */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoutes>
                      <HelmetWrapper
                        title="Admin Dashboard | CodeMentees"
                        description="Admin dashboard for managing content"
                        noindex={true}
                        nofollow={true}
                      >
                        <DashboardLayout />
                      </HelmetWrapper>
                    </AdminRoutes>
                  }
                >
                  {adminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <HelmetWrapper
                          title={`${route.title} | Admin`}
                          noindex={true}
                          nofollow={true}
                        >
                          {route.element}
                        </HelmetWrapper>
                      }
                    />
                  ))}
                </Route>

                <Route
                  path="*"
                  element={
                    <HelmetWrapper
                      title="Page Not Found | CodeMentees"
                      description="The page you're looking for doesn't exist"
                      noindex={true}
                    >
                      <NotFound />
                    </HelmetWrapper>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </>
  );
}

export default App;