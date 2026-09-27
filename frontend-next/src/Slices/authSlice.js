'use client';

import { createSlice } from '@reduxjs/toolkit';

/**
 * Safe localStorage helpers — return null/false when running on the server.
 */
const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const isStoredUserPresent = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('user');
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredUser(),
    isAuthenticated: isStoredUserPresent(),
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      // Save user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Remove user metadata from localStorage (token is NOT stored here — it's in the httpOnly cookie)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    updateUserSession: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
  },
});

export const { login, logout, updateUserSession } = authSlice.actions;
export default authSlice.reducer;
