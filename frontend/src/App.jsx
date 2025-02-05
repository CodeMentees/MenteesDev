import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import AboutPage from './Pages/About';
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
import AdminRoutes from "./AdminRoute"
import BlogPage from './Pages/BlogPage';
import HomeSite from './Pages/Home/HomeSite';
import CategoryList from './Pages/Course/CategoryList';
import Chat from './Pages/Chat/Chat';
function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="font-sans bg-gray-100   min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/all-course" element={<AllCourse />} />
            <Route path="/course-details/:courseId" element={<CourseDetails />} />
            <Route path="/unauth" element={<Unauth />} />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat/>
                </ProtectedRoute>
              }
            />
          </Routes>

          <Routes>
            <Route path="dashboard" element={<AdminRoutes><DashboardLayout /></AdminRoutes>}>
              <Route path="add-site-data" element={<HomeSite />} />
              <Route path="add-post" element={<AddPost />} />
              <Route path="post-list" element={<PostList />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="course-list" element={<CourseList />} />
              <Route path="courses/:courseId/details" element={<UpdateCourseDetails />} />
              <Route path="add-category" element={<AddCourseCategory />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="query-list" element={<QueryList />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  )
}

export default App
