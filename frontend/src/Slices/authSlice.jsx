import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage if available
    isAuthenticated: !!localStorage.getItem('user'),       // Check if user is logged in
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Remove user from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserSession: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateUserSession } = authSlice.actions;
export default authSlice.reducer;
