import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  // Any logged in user can view the student dashboard
  const isAuthenticated = !!user;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
export default StudentRoute;
