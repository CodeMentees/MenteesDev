import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  let isAuthenticated = false;
  if(user?.isAdmin){
    isAuthenticated = user.isAdmin
  }
  return isAuthenticated ? children : <Navigate to="/unauth" />;
};
export default AdminRoutes;
