import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
function App() {
  const firstPath = location.pathname.split('/')[1];
  let showHeader = true;
  if (firstPath == 'dashboard') {
    showHeader = false
  }
  return (
    <>
      <Header/>
      <Router>
       <div className="font-sans bg-gray-100   min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
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
          </Routes>

          <Routes>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="add-post" element={<AddPost />} />
              <Route path="post-list" element={<PostList />} />
            </Route>
          </Routes>
        </div>

      </Router>
      <Footer/>
    </>
  )
}

export default App
