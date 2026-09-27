'use client';

import api from './api';
import { useDispatch } from 'react-redux';
import { login, logout } from '../Slices/authSlice.js';

/**
 * useAuth — authentication API hooks.
 */
export function useAuth() {
  const dispatch = useDispatch();

  const loginUser = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    // Backend returns user fields flat: { _id, name, email, role, ... }
    // (not nested under res.data.user)
    if (res.data?._id) {
      dispatch(login(res.data));
    }
    return res.data;
  };

  const registerUser = async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  };

  const logoutUser = async () => {
    await api.post('/auth/logout');
    dispatch(logout());
  };

  const googleLogin = async (credential) => {
    const res = await api.post('/auth/google', { credential });
    if (res.data?.user) {
      dispatch(login(res.data.user));
    }
    return res.data;
  };

  const checkAuth = async () => {
    const res = await api.get('/auth/check');
    return res.data;
  };

  return { loginUser, registerUser, logoutUser, googleLogin, checkAuth };
}
