import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";
import LoadingSpinner from "../../Components/UI/LoadingSpinner";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      // In a real scenario, you'd fetch from /api/users/enrollments or similar.
      // For now, we mock the UI until the backend controller for getEnrollments is ready.
      // const { data } = await api.get("/enrollments/my-courses");
      // setEnrollments(data);
      
      // MOCK DATA for layout testing
      setTimeout(() => {
        setEnrollments([
          {
            _id: "1",
            course: {
              _id: "c1",
              title: "Full Stack Web Development",
              image: "https://via.placeholder.com/300x200",
              category: "Engineering",
            },
            progress: 45,
            status: "active",
          },
          {
            _id: "2",
            course: {
              _id: "c2",
              title: "Data Structures & Algorithms",
              image: "https://via.placeholder.com/300x200",
              category: "Engineering",
            },
            progress: 100,
            status: "completed",
          }
        ]);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError("Failed to fetch enrolled courses");
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-10 flex justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">My Courses</h1>
      
      {enrollments.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">You are not enrolled in any courses yet.</p>
          <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col">
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src={enrollment.course.image} 
                  alt={enrollment.course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-400 mb-2">{enrollment.course.category}</span>
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{enrollment.course.title}</h3>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full ${enrollment.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>
                  
                  <Link 
                    to={`/student/courses/${enrollment.course._id}`}
                    className={`block text-center w-full py-2 rounded-lg font-medium transition ${
                      enrollment.status === 'completed' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
