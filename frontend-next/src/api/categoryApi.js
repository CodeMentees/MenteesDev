'use client';

import api from './api';

/**
 * useCategoryAPI — hooks for course category CRUD operations.
 */
export function useCategoryAPI() {
  const fetchCategories = async () => {
    const res = await api.get('/category');
    return res.data;
  };

  const deleteCategory = async (id) => {
    const res = await api.delete(`/category/${id}`);
    return res.data;
  };

  const createCategory = async (data) => {
    const res = await api.post('/category', data);
    return res.data;
  };

  const updateCategory = async (id, data) => {
    const res = await api.put(`/category/${id}`, data);
    return res.data;
  };

  const getCategoryById = async (id) => {
    const res = await api.get(`/category/${id}`);
    return res.data;
  };

  return { fetchCategories, deleteCategory, createCategory, updateCategory, getCategoryById };
}
