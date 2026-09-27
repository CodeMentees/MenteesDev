import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js';
import categoryReducer from './Slices/categorySlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
