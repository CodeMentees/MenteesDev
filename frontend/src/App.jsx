import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
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
import AdminRoutes from "./AdminRoute"
import BlogPage from './Pages/BlogPage';
import HomeSite from './Pages/Home/HomeSite';
import CategoryList from './Pages/Course/CategoryList';
// import Chat from './Pages/Chat/Chat';
// import CreateGroup from './Pages/Chat/CreateGroup';
import {EventManager, CreateEvent} from './Pages/Event/AddEvent';
import BlogCategoryManager from './Components/Blog/BlogCategoryManger';
import NotFound from './Pages/Error/NotFound';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import FAQ from './Pages/FAQ/FAQ';
import UserList from './Pages/User/UserList';
function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="font-sans bg-dark-box mt-12 min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/courses" element={<AllCourse />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path='/about' element={<About/>}/>
            <Route path="/unauthorized" element={<Unauth />} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path='/faq' element={<FAQ/>} />


            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            /> */}

            {/* Admin Routes (Dashboard) */}
            <Route
              path="/admin"
              element={
                <AdminRoutes>
                  <DashboardLayout />
                </AdminRoutes>
              }
            >
              <Route path="site-settings" element={<HomeSite />} />

              {/* Post Management */}
              <Route path="posts/create" element={<AddPost />} />
              <Route path="posts/edit/:id" element={<AddPost />} />
              <Route path="posts/categories" element={<BlogCategoryManager />} />
              <Route path="posts" element={<PostList />} />

              {/* Course Management */}
              <Route path="courses/create" element={<AddCourse />} />
              <Route path="courses/edit/:id" element={<AddCourse />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/:id/edit" element={<UpdateCourseDetails />} />

              {/* Category Management */}
              <Route path="categories/create" element={<AddCourseCategory />} />
              <Route path="categories/edit/:id" element={<AddCourseCategory />} />
              <Route path="categories" element={<CategoryList />} />

              {/* Queries, Groups & Events */}
              <Route path="queries" element={<QueryList />} />
              {/* <Route path="groups/create" element={<CreateGroup />} /> */}
              <Route path="events" element={<EventManager />} />
              <Route path="events/create" element={<CreateEvent />} />
              <Route path="events/edit/:id" element={<CreateEvent />} />

              {/* users  */}
              <Route path="users" element={<UserList/>} />

            </Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>

      </Router>
      <Footer />
    </>
  )
}

export default App
