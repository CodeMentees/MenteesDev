import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  const isAuthenticated = user && user.role !== 'student';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
export default AdminRoute;
