import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, allowedPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  
  const isAuthenticated = user && user.role !== 'student';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific permission is required, check it
  if (allowedPermissions.length > 0) {
    const hasPermission = allowedPermissions.some(p => user?.permissions?.includes(p)) || user?.role === 'super admin';
    if (!hasPermission) {
      return <Navigate to="/admin" replace />;
    }
  }
  
  return children;
};
export default AdminRoute;
