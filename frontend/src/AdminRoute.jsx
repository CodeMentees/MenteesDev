import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from "./Slices/authSlice";

const AdminRoute = ({ children, allowedPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Force legacy users with stale sessions to re-authenticate
    if (user && user.isAdmin && (!user.role || !user.permissions)) {
      dispatch(logout());
      window.location.href = "/login";
    }
  }, [user, dispatch]);
  
  const isAuthenticated = user && (user.role !== 'student' || user.isAdmin);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific permission is required, check it
  if (allowedPermissions.length > 0) {
    const hasPermission = allowedPermissions.some(p => user?.permissions?.includes(p)) || user?.role === 'super admin' || user?.isAdmin;
    if (!hasPermission) {
      return <Navigate to="/admin" replace />;
    }
  }
  
  return children;
};
export default AdminRoute;
