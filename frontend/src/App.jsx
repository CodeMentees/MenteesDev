import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import Header from './Components/Header/Header';
import ProtectedRoute from './ProtectedRoute';
import Blog from './Pages/Blog';
import DashboardLayout from './Pages/Dashboard';
import AddPost from './Pages/Post/AddPost';
import PostList from './Pages/Post/PostList';
import Footer from './Components/Footer/Footer';
import AllCourse from './Pages/AllCourse';
import CourseDetails from './Pages/CourseDetails';
import UpdateCourseDetails from './Pages/Course/UpdateCourseDetails';
import AddCourse from './Pages/Course/AddCourse';
import AddCourseCategory from './Pages/Course/AddCourseCategory';
import QueryList from './Pages/Query/QueryList';
import CourseList from './Pages/Course/CourseList';
import Unauth from './Pages/Error/Unauth';
import AdminRoutes from "./AdminRoute";
import BlogPage from './Pages/BlogPage';
import HomeSite from './Pages/Home/HomeSite';
import CategoryList from './Pages/Course/CategoryList';
import { EventManager, CreateEvent } from './Pages/Event/AddEvent';
import BlogCategoryManager from './Components/Blog/BlogCategoryManger';
import NotFound from './Pages/Error/NotFound';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import FAQ from './Pages/FAQ/FAQ';
import UserList from './Pages/User/UserList';
import AddEditUser from './Pages/User/AddEditUser';
import DashboardOverview from './Pages/DashboardOverview';

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
  { path: "users/edit/:id", title: "Edit User", element: <AddEditUser /> }
];

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="font-sans bg-dark-box mt-12 min-h-screen">
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
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;