import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from "./Slices/authSlice";

const AdminRoute = ({ children, allowedPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Force ANY legacy user with a stale session to re-authenticate
    if (user && (!user.role || !user.permissions)) {
      dispatch(logout());
      window.location.href = "/login";
    }
  }, [user, dispatch]);
  
  // If the user's role is undefined (stale session before they get logged out),
  // we must strictly fallback. If they had isAdmin, they were an admin, otherwise they are a student.
  const effectiveRole = user?.role || (user?.isAdmin ? 'editor' : 'student');
  const isAuthenticated = user && (effectiveRole !== 'student' || user.isAdmin);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific permission is required, check it
  if (allowedPermissions.length > 0) {
    const hasPermission = allowedPermissions.some(p => user?.permissions?.includes(p)) || effectiveRole === 'super admin' || user?.isAdmin;
    if (!hasPermission) {
      return <Navigate to="/admin" replace />;
    }
  }
  
  return children;
};
export default AdminRoute;
