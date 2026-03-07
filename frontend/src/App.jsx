import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

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
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));

// HelmetWrapper component to handle SEO meta tags
const HelmetWrapper = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  children
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
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

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://codementees.com${canonical}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
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
  { path: "courses/create", title: "Create Course", element: <AddCourse /> },
  { path: "courses/edit/:id", title: "Edit Course", element: <AddCourse /> },
  { path: "courses", title: "Courses", element: <CourseList /> },
  { path: "courses/:id/edit", title: "Update Course", element: <UpdateCourseDetails /> },
  { path: "categories/create", title: "Create Category", element: <AddCourseCategory /> },
  { path: "categories/edit/:id", title: "Edit Category", element: <AddCourseCategory /> },
  { path: "categories", title: "Categories", element: <CategoryList /> },
  { path: "queries", title: "Queries", element: <QueryList /> },
  { path: "events", title: "Events", element: <EventManager /> },
  { path: "events/create", title: "Create Event", element: <CreateEvent /> },
  { path: "events/edit/:id", title: "Edit Event", element: <CreateEvent /> },
  { path: "users", title: "Users", element: <UserList /> },
  { path: "users/create", title: "Add User", element: <AddEditUser /> },
  { path: "users/edit/:id", title: "Edit User", element: <AddEditUser /> },
  { path: "school-courses", title: "School Courses", element: <SchoolCourseList /> },
  { path: "school-courses/add", title: "Add School Course", element: <AddEditSchoolCourse /> },
  { path: "school-courses/edit/:id", title: "Edit School Course", element: <AddEditSchoolCourse /> }
];

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-box">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Loading...</div>}>
            <Header />
            <main className="flex-grow font-sans mt-12">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <HelmetWrapper
                      title="Home | CodeMentees"
                      description="Welcome to CodeMentees - The best platform for learning coding and development skills"
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
                      title="Register | CodeMentees"
                      description="Create an account to access our courses and resources"
                      canonical="/register"
                    >
                      <RegisterPage />
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
                      title="All Courses | CodeMentees"
                      description="Browse our comprehensive collection of coding courses"
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
                      title={`CodeMentees course`}
                      description={`Learn  with our comprehensive course`}
                      canonical="/courses/:courseId"
                    >
                      <CourseDetails />
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
                      title="School Coding | CodeMentees"
                      description="Explore our comprehensive K-12 computer science curriculum designed for schools."
                      canonical="/school-coding"
                    >
                      <SchoolCoding />
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
                      title={`CodeMentees Blog`}
                      description={`Read our article about`}
                      canonical="/blogs/:id"
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